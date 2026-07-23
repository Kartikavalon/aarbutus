import Link from 'next/link';

export default function About() {
  return (
    <div>
      <header className="navbar">
        <div className="container nav-wrap">
          <Link href="/" className="brand"><span className="brand-mark"></span> AARBUTUS TECHNOLOGIES</Link>
          <nav className="menu">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/applications">Applications</Link>
            <Link href="/about">About</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>About Aarbutus</h1>
            <p>Technical reliability, application support, and disciplined supply for industrial buyers, led from Ghaziabad NCR.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="grid-2">
              <div className="card">
                <h2>Company Positioning</h2>
                <p>Aarbutus Technologies is positioned as a focused industrial trading company serving buyers who need practical product understanding and dependable supply continuity. Our emphasis is on adsorbents, treatment media, and process chemicals used in water and gas treatment systems.</p>
              </div>
              <div className="card">
                <h2>Why Buyers Work With Us</h2>
                <ul className="clean">
                  <li>Application-driven product selection support</li>
                  <li>Documentation including CoA, TDS, MSDS</li>
                  <li>India + imported supply options</li>
                  <li>Responsive support for technical and commercial discussions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
