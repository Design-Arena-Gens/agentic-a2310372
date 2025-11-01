import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TFS 1.4.2 Explorer',
  description: 'The Forgotten Server v1.4.2 release info and downloads',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
