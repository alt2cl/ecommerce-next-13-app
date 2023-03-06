/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    formats: ['image/avif', 'image/webp'],
    domains: [`${process.env.DOMAIN}`]
  }
}

module.exports = nextConfig
