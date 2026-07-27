import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Kaytherix Industries</h3>
          <p>Global supplier of specialty chemicals, adsorbents, catalyst supports and industrial raw materials for process industries and export buyers.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/industries">Industries</Link></li>
            <li><Link href="/downloads">Downloads</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>Quick actions</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/quote">Request quote</Link></li>
            <li><Link href="/supplier-registration">Supplier registration</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/resources">Technical resources</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Kaytherix Industries. All rights reserved.</span>
      </div>
    </footer>
  );
}
