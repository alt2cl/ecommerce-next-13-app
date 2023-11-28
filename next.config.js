/**
 * @type {import('next').NextConfig}
 */

const dev = process.env.NODE_ENV !== "production";

const nextConfig = {
  reactStrictMode: dev,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: dev
      ? "http://127.0.0.1:1337/api"
      : process.env.NEXT_PUBLIC_STRAPI_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET:
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  },
};

module.exports = nextConfig;
