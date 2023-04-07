/** @type {import('next').NextConfig} */
const path = require("path");
const NEXT_TRUSTED_DOMAINS = process.env.NEXT_TRUSTED_DOMAINS ?? "";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: NEXT_TRUSTED_DOMAINS.split(","),
    minimumCacheTTL: 60,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
