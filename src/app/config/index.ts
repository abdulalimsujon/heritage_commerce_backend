import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_expires_in: process.env.JWT_EXPIRES,
  jwt_refresh_secret: process.env.REFRESH_TOKEN_KEY,
  jwt_refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRES,
  stipe_private_key: process.env.STRIPE_PRIVATE_KEY,
};
