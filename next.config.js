/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
    mode: 'production',
    disableDevLogs: true,
});

const nextConfig =  withPWA({
  reactStrictMode: true,
  env: {
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
  },

  images: {
    domains: ["i.ibb.co", "www.tesla.com", "storage.googleapis.com","nftimagespharos.s3.ap-northeast-2.amazonaws.com"],
  },
});

module.exports = nextConfig;
