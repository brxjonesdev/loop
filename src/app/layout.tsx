import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  variable: '--space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Loop',
  description: 'Collaborative travel planning made easy. Plan trips, organize itineraries, and stay in the Loop with friends.',
  keywords: ['travel planning', 'collaboration', 'itinerary', 'Loop app', 'trip organization'],
  authors: [
    { name: "Braxton Jones" },
  ],
  openGraph: {
    title: 'Loop - Collaborative Travel Planning',
    description: 'Easily plan and organize trips with friends in real-time.',
    url: 'https://loop.braxtonjones.dev/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loop - Collaborative Travel Planning',
    description: 'Easily plan and organize trips with friends in real-time.',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
