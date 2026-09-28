/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Replaces the separate `next export` CLI step (removed in modern
  // Next.js) -- `next build` now produces the static /out export directly.
  output: 'export',
  // Replaces .babelrc's styled-components babel plugin. With no .babelrc
  // present, Next.js 16 compiles with SWC (faster, and what the framework
  // now expects) instead of silently falling back to Babel -- the fallback
  // was what produced the build warning this removes.
  compiler: {
    styledComponents: true,
  },
  // Next 16's dev-only static-route indicator crashes on the pages router
  // with output: 'export' ("[HMR] Invalid message: isrManifest" in the
  // console on every page). Dev-only; production builds are unaffected.
  devIndicators: false,
};

module.exports = nextConfig;

