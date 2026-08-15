/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Replaces the separate `next export` CLI step (removed in modern
  // Next.js) -- `next build` now produces the static /out export directly.
  output: 'export',
};

module.exports = nextConfig;

