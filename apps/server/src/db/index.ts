import { Pool } from 'pg';
import { config } from '../config';
import { profilesDb } from '../data/profilesDb';
import { logger } from '../utils/logger';

export const pool = new Pool({
  connectionString: config.databaseUrl,
});

async function ensureDatabaseExists(): Promise<void> {
  try {
    const client = await pool.connect();
    client.release();
  } catch (err: any) {
    // 3D000 = database does not exist
    if (err?.code === '3D000') {
      const dbUrl = new URL(config.databaseUrl);
      const targetDb = dbUrl.pathname.replace(/^\//, '') || 'creator_profile';
      dbUrl.pathname = '/postgres';

      const adminPool = new Pool({ connectionString: dbUrl.toString() });
      try {
        logger.info(`Database "${targetDb}" does not exist. Creating it in local PostgreSQL 18...`);
        await adminPool.query(`CREATE DATABASE "${targetDb}"`);
        logger.info(`Database "${targetDb}" created successfully.`);
      } finally {
        await adminPool.end();
      }
    } else {
      throw err;
    }
  }
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS profiles (
  slug VARCHAR(100) PRIMARY KEY,
  id VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  avatar_url TEXT NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  bio TEXT NOT NULL DEFAULT '',
  bookings INTEGER NOT NULL DEFAULT 0,
  badges JSONB NOT NULL DEFAULT '[]'::jsonb,
  social_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  about TEXT NOT NULL DEFAULT '',
  categories JSONB NOT NULL DEFAULT '[]'::jsonb,
  ratings_average NUMERIC(3, 2) NOT NULL DEFAULT 0,
  total_ratings INTEGER NOT NULL DEFAULT 0,
  total_testimonials INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offerings (
  id VARCHAR(100) NOT NULL,
  profile_slug VARCHAR(100) NOT NULL REFERENCES profiles(slug) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT '₹',
  rating NUMERIC(3, 2),
  badge VARCHAR(100),
  badge_color VARCHAR(50),
  items JSONB,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (profile_slug, id)
);

CREATE INDEX IF NOT EXISTS idx_offerings_profile_slug ON offerings(profile_slug, sort_order);

CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(100) NOT NULL,
  profile_slug VARCHAR(100) NOT NULL REFERENCES profiles(slug) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  text TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (profile_slug, id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_profile_slug ON reviews(profile_slug, sort_order);
`;

export async function initDb(retries = 5, delayMs = 2000): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await ensureDatabaseExists();
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        await client.query(SCHEMA_SQL);

        for (const [slug, data] of Object.entries(profilesDb)) {
          const { profile, offerings, ratings, categories } = data;

          await client.query(
            `INSERT INTO profiles (
              slug, id, name, username, avatar_url, verified, bio, bookings,
              badges, social_links, about, categories,
              ratings_average, total_ratings, total_testimonials
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10::jsonb, $11, $12::jsonb, $13, $14, $15)
            ON CONFLICT (slug) DO NOTHING`,
            [
              slug.toLowerCase(),
              profile.id,
              profile.name,
              profile.username,
              profile.avatarUrl,
              profile.verified,
              profile.bio,
              profile.bookings,
              JSON.stringify(profile.badges),
              JSON.stringify(profile.socialLinks),
              profile.about,
              JSON.stringify(categories),
              ratings.average,
              ratings.totalRatings,
              ratings.totalTestimonials,
            ]
          );

          for (let i = 0; i < offerings.length; i++) {
            const offering = offerings[i];
            await client.query(
              `INSERT INTO offerings (
                id, profile_slug, type, category, title, description,
                price, original_price, currency, rating, badge, badge_color, items, sort_order
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::jsonb, $14)
              ON CONFLICT (profile_slug, id) DO NOTHING`,
              [
                offering.id,
                slug.toLowerCase(),
                offering.type,
                offering.category,
                offering.title,
                offering.description,
                offering.price,
                offering.originalPrice,
                offering.currency,
                offering.rating,
                offering.badge,
                offering.badgeColor,
                offering.items ? JSON.stringify(offering.items) : null,
                i,
              ]
            );
          }

          for (let i = 0; i < ratings.reviews.length; i++) {
            const review = ratings.reviews[i];
            await client.query(
              `INSERT INTO reviews (
                id, profile_slug, rating, text, author, date, sort_order
              ) VALUES ($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (profile_slug, id) DO NOTHING`,
              [
                review.id,
                slug.toLowerCase(),
                review.rating,
                review.text,
                review.author,
                review.date,
                i,
              ]
            );
          }
        }

        await client.query('COMMIT');
        logger.info('PostgreSQL schema initialized and default data seeded.');
        return;
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      logger.warn(
        `Database initialization attempt ${attempt}/${retries} failed: ${(err as Error).message}`
      );
      if (attempt === retries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

