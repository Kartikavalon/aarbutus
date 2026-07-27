import './globals.css';
import { Inter, Roboto_Condensed } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const condensed = Roboto_Condensed({ subsets: ['latin'], variable: '--font-condensed' });

export const metadata = {
  title: 'Aarbutus Technologies | Specialty Chemicals, Adsorbents and Industrial Minerals',
  description: 'Aarbutus Technologies supplies specialty chemicals, adsorbents, catalyst supports and industrial raw materials to global industrial buyers.',
  metadataBase: new URL('https://aarbutus.example.com'),
  icons: {
    icon: '/favicon.svg',
  },
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
