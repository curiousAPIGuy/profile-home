import dotenv from 'dotenv';
dotenv.config();

const defaultDbUser = process.env.POSTGRES_USER || process.env.USER || 'postgres';
const defaultDbPassword = process.env.POSTGRES_PASSWORD
  ? `:${process.env.POSTGRES_PASSWORD}`
  : '';
const defaultDbHost = process.env.POSTGRES_HOST || 'localhost';
const defaultDbPort = process.env.POSTGRES_PORT || '5432';
const defaultDbName = process.env.POSTGRES_DB || 'creator_profile';

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl:
    process.env.DATABASE_URL ||
    `postgresql://${defaultDbUser}${defaultDbPassword}@${defaultDbHost}:${defaultDbPort}/${defaultDbName}`,
};
