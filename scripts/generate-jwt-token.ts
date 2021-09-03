import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const genToken = () => {
  const secret = process.env.SESSION_ACCESS_TOKEN_SECRET || 'secret';
  return jwt.sign({ sub: '1' }, secret);
};

console.log('JWT Token Generated:', genToken());
