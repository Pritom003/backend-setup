import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000, // Default to 5000 if not defined
  NODE_ENV:process.env.Node_Env,
  DB_URL: process.env.DB_URL as string,
  default_pass:process.env.Default_pass,
  bycrypt_pass:process.env. MY_PlaintextPassword,
  JWT_SECRET: process.env.JWT_ACCESS_SECRET as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_IN:process.env.JWT_REFRESH_IN as string,
  JWT_ACCESS_IN:process.env.JWT_ACCESS_IN as string,
};
