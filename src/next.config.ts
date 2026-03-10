import type { NextConfig } from "next";
import { loadEnvConfig } from '@next/env';
import path from 'path';

const projectDir = path.join(process.cwd(), '..');
loadEnvConfig(projectDir);

const nextConfig: NextConfig = {
  distDir: '.next',
  /* config options here */
  allowedDevOrigins: ['abelohost.docker', '*.abelohost.docker'],
  async headers() {
    return [
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif']
  },

  turbopack: {
    rules: {
      // SVG как React компоненты (по умолчанию)
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Для продакшена (webpack всё ещё используется для build)
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => never } }) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
