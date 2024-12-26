import crypto from 'crypto';
import dotenv from 'dotenv';
// import { SECRET } from '../env.db.config';
dotenv.config();

const SECRET = process.env.SECRET;
if (!SECRET) {
  throw new Error('Please provide a secret key');
}

export const randBytes = () => crypto.randomBytes(128).toString('base64');

export const authenticate = (salt: string, password: string) => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET || '')
    .digest('hex');
};
