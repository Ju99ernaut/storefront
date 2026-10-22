import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import '../styles/sidebar.css';
import '../styles/fonts/pixelfabric-clothes/style.css';
import 'font-awesome/css/font-awesome.min.css';

export const metadata: Metadata = {
  title: 'Storefront',
  description: 'Modernized React & Next.js Storefront',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/icons/icon-192x192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#2A2B30',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="flexbox no-touch">
      <body>{children}</body>
    </html>
  );
}
