/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
  },

  images: {
    domains: ["i.ibb.co"],
    domains: ["storage.googleapis.com"],
  },
};

module.exports = nextConfig;
