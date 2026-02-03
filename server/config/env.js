import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

const MONGO_URI =
  process.env.MONGO_URI ??
  (isProduction ? '' : 'mongodb://127.0.0.1:27017/mera-khata');
const JWT_SECRET =
  process.env.JWT_SECRET ?? (isProduction ? '' : 'fallback_dev_secret_key');
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const missing = [];
if (!process.env.MONGO_URI) missing.push('MONGO_URI');
if (!process.env.JWT_SECRET) missing.push('JWT_SECRET');

if (missing.length) {
  const message = `Missing required environment variables: ${missing.join(', ')}`;
  if (isProduction) {
    throw new Error(message);
  }
  console.warn(`⚠️ ${message}. Using development fallbacks where possible.`);
}

export { NODE_ENV, isProduction, MONGO_URI, JWT_SECRET, CLIENT_URL };
