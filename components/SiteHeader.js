import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/industries', label: 'Industries' },
  { href: '/applications', label: 'Applications' },
  { href: '/resources', label: 'Resources' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container navbar">
        <Link href="/" className="brand-wrap">
          <img src="/assets/logo-icon.svg" alt="Aarbutus Technologies" style={{ width: 28, height: 28, borderRadius: 4 }} />
          <span>Aarbutus Technologies</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
