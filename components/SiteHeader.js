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
          <span className="brand-mark" />
          <span>Kaytherix Industries</span>
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
