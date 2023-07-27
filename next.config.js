const dev = process.env.NODE_ENV !== "production";

module.exports = {
  //output: "standalone",
  reactStrictMode: dev,
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: dev
      ? "http://127.0.0.1:1337/api"
      : process.env.NEXT_PUBLIC_STRAPI_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
};
