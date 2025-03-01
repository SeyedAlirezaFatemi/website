/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '*.amazonaws.com',
        protocol: 'https',
      },
    ],
  },
};

/**
 * @type {import("@sentry/nextjs/types/config/types").SentryBuildOptions}
 */
const sentryBuildOptions = {
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  org: 'alireza-fatemi',
  project: 'personal-website',
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
};

module.exports = withSentryConfig(nextConfig, sentryBuildOptions);
