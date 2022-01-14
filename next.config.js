/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
})
