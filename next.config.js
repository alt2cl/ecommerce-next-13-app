/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    formats: ['image/avif', 'image/webp'],
    domains: [`${process.env.DOMAIN}`]
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL
  }
}

module.exports = nextConfig
