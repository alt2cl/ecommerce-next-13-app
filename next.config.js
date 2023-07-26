const dev = process.env.NODE_ENV !== "production";

module.exports = {
  //output: "standalone",
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [`${process.env.DOMAIN}`],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: dev
      ? "http://127.0.0.1:1337/api"
      : process.env.NEXT_PUBLIC_STRAPI_URL,
  },
};
