import path from 'node:path';
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};
export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; // 15 minutes in milliseconds
export const REFRESH_TOKEN_TTL = 24 * 30 * 60 * 60 * 1000; // 30 days in milliseconds

export const ROLES = {
  USER: 'user',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

// export const CLOUDINARY = {
//   CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
//   API_KEY: process.env.CLOUDINARY_API_KEY,
//   API_SECRET: process.env.CLOUDINARY_API_SECRET,
// };

export const TEMPLATE_DIR = path.resolve('src', 'templates');
