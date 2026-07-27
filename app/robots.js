export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://aarbutus.example.com/sitemap.xml',
  };
}
