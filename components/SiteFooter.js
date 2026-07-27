import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>Aarbutus Technologies Pvt Ltd</h3>
          <p>Technical trading partner for adsorbents, water-treatment chemicals, ion-exchange resins and process media.</p>
          <p style={{ marginTop: '0.6rem' }}><a href="mailto:aarbutustechnologies@gmail.com">aarbutustechnologies@gmail.com</a> • <a href="tel:+919650463811">+91 9650463811</a></p>
          <p style={{ marginTop: '0.35rem' }}>A-12 Ashok Nagar, Ghaziabad 201001, India</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/industries">Industries</Link></li>
            <li><Link href="/applications">Applications</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3>Quick actions</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><Link href="/quote">Request a quote</Link></li>
            <li><Link href="/resources">Technical resources</Link></li>
            <li><Link href="/downloads">Downloads</Link></li>
            <li><Link href="/supplier-registration">Supplier registration</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Aarbutus Technologies Pvt Ltd. All rights reserved.</span>
      </div>
    </footer>
  );
}
