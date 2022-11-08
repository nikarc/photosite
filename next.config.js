/** @type {import('next').NextConfig} */
const NEXT_TRUSTED_DOMAINS = process.env.NEXT_TRUSTED_DOMAINS ?? "";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: NEXT_TRUSTED_DOMAINS.split(","),
  },
};

module.exports = nextConfig;
