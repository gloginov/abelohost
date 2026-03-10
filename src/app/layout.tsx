import type { Metadata } from 'next';

// components
import Layout from '@/components/Layout/Layout';

// global styles
import './globals.css';

export const metadata: Metadata = {
  title: 'Abelohost',
  description: 'Beautiful shop',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Подключаем manifest.json */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple-specific (PWA на iOS) */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="NextApp" />

      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
