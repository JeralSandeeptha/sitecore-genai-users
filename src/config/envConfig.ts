import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export const envConfig = {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    DOMAIN: process.env.DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL
}