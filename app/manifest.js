export default function manifest() {
  return {
    name: 'Aarbutus Technologies',
    short_name: 'Aarbutus',
    description: 'Industrial supplier of specialty chemicals, adsorbents and industrial minerals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f2f6d',
    icons: [
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon', purpose: 'any' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
