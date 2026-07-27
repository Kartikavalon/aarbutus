export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://kaytherix.example.com/sitemap.xml',
  };
}
