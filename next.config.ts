import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Development placeholder service
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      // TODO (P6): Add your production CDN or image host before going live.
      // Examples:
      //   { protocol: 'https', hostname: 'images.trustfamily.com' },       // custom CDN
      //   { protocol: 'https', hostname: 'res.cloudinary.com' },           // Cloudinary
      //   { protocol: 'https', hostname: '*.vercel-storage.com' },         // Vercel Blob
      //   { protocol: 'https', hostname: 'your-bucket.s3.amazonaws.com' }, // S3
    ],
  },
};

export default withNextIntl(nextConfig);
