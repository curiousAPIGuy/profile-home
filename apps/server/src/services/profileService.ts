import { Profile, Offering, Ratings, Review } from '@creator-profile/types';
import { pool } from '../db';

export async function getProfileByUsername(
  username: string
): Promise<Profile | null> {
  const key = username.toLowerCase();
  const { rows } = await pool.query(
    `SELECT id, name, username, avatar_url, verified, bio, bookings, badges, social_links, about
     FROM profiles
     WHERE slug = $1 OR LOWER(username) = $1
     LIMIT 1`,
    [key]
  );

  if (rows.length === 0) return null;
  const row = rows[0];

  return {
    id: row.id,
    name: row.name,
    username: row.username,
    avatarUrl: row.avatar_url,
    verified: row.verified,
    bio: row.bio,
    bookings: Number(row.bookings),
    badges: row.badges ?? [],
    socialLinks: row.social_links ?? [],
    about: row.about ?? '',
  };
}

export async function getOfferingsByUsername(
  username: string
): Promise<Offering[] | null> {
  const key = username.toLowerCase();
  const profileResult = await pool.query(
    `SELECT slug FROM profiles WHERE slug = $1 OR LOWER(username) = $1 LIMIT 1`,
    [key]
  );

  if (profileResult.rows.length === 0) return null;
  const slug = profileResult.rows[0].slug;

  const { rows } = await pool.query(
    `SELECT id, type, category, title, description, price, original_price, currency, rating, badge, badge_color, items
     FROM offerings
     WHERE profile_slug = $1
     ORDER BY sort_order ASC`,
    [slug]
  );

  return rows.map((row: any) => {
    const offering: Offering = {
      id: row.id,
      type: row.type,
      category: row.category,
      title: row.title,
      description: row.description,
      price: Number(row.price),
      originalPrice: Number(row.original_price),
      currency: row.currency,
      rating: row.rating !== null ? Number(row.rating) : null,
      badge: row.badge,
      badgeColor: row.badge_color,
    };
    if (row.items) {
      offering.items = row.items;
    }
    return offering;
  });
}

export async function getRatingsByUsername(
  username: string
): Promise<Ratings | null> {
  const key = username.toLowerCase();
  const profileResult = await pool.query(
    `SELECT slug, ratings_average, total_ratings, total_testimonials
     FROM profiles
     WHERE slug = $1 OR LOWER(username) = $1
     LIMIT 1`,
    [key]
  );

  if (profileResult.rows.length === 0) return null;
  const profileRow = profileResult.rows[0];

  const { rows } = await pool.query(
    `SELECT id, rating, text, author, date
     FROM reviews
     WHERE profile_slug = $1
     ORDER BY sort_order ASC`,
    [profileRow.slug]
  );

  const reviews: Review[] = rows.map((row: any) => ({
    id: row.id,
    rating: Number(row.rating),
    text: row.text,
    author: row.author,
    date: row.date,
  }));

  return {
    average: Number(profileRow.ratings_average),
    totalRatings: Number(profileRow.total_ratings),
    totalTestimonials: Number(profileRow.total_testimonials),
    reviews,
  };
}

export async function getCategoriesByUsername(
  username: string
): Promise<string[] | null> {
  const key = username.toLowerCase();
  const { rows } = await pool.query(
    `SELECT categories
     FROM profiles
     WHERE slug = $1 OR LOWER(username) = $1
     LIMIT 1`,
    [key]
  );

  if (rows.length === 0) return null;
  return rows[0].categories ?? [];
}
