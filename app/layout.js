import './globals.css';
import { Inter, Roboto_Condensed } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const condensed = Roboto_Condensed({ subsets: ['latin'], variable: '--font-condensed' });

export const metadata = {
  title: {
    default: 'Aarbutus Technologies | Adsorbents, Water Treatment & Process Media',
    template: '%s | Aarbutus Technologies',
  },
  description: 'Technical trading partner for adsorbents, water-treatment chemicals, ion-exchange resins and process media in India.',
  metadataBase: new URL('https://aarbutus.co.in'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Aarbutus Technologies',
    title: 'Aarbutus Technologies | Adsorbents, Water Treatment & Process Media',
    description: 'Technical trading partner for adsorbents, water-treatment chemicals, ion-exchange resins and process media in India.',
  },
  icons: {
    // primary vector icon (keeps sharp on modern browsers)
    icon: '/favicon.svg',
    // legacy shortcut/ico fallback (browsers will pick the best available)
    shortcut: '/favicon.svg',
    // apple touch icon entry (used when users add to home screen on iOS)
    apple: '/assets/logo-icon.svg',
    // extra hint for other consumers; Next will serialize these into link tags
    other: [
      { rel: 'icon', url: '/favicon.svg' },
      { rel: 'apple-touch-icon', url: '/assets/logo-icon.svg' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${condensed.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Aarbutus Technologies Pvt Ltd',
          url: 'https://aarbutus.co.in',
          email: 'aarbutustechnologies@gmail.com',
          telephone: '+91-9650463811',
          address: { '@type': 'PostalAddress', streetAddress: 'A-12 Ashok Nagar', addressLocality: 'Ghaziabad', postalCode: '201001', addressCountry: 'IN' },
        }) }} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
