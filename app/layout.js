import './globals.css';
import { Inter, Roboto_Condensed } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const condensed = Roboto_Condensed({ subsets: ['latin'], variable: '--font-condensed' });

export const metadata = {
  title: 'Kaytherix Industries | Specialty Chemicals, Adsorbents and Industrial Minerals',
  description: 'Kaytherix Industries supplies specialty chemicals, adsorbents, catalyst supports and industrial raw materials to global industrial buyers.',
  metadataBase: new URL('https://kaytherix.example.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${condensed.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
