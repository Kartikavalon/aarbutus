import Link from 'next/link';

export default function Home() {
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
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="kicker">Industrial B2B Supplier</span>
              <h1>Adsorbents & Water/Gas Treatment Solutions for Industry</h1>
              <p>Aarbutus Technologies supports factories, refineries, city gas distribution, pharmaceuticals, municipal utilities, and industrial process plants with high-performance adsorbents, coagulants, flocculants, ion exchange resins, and process media.</p>
              <div className="cta-row">
                <Link className="btn btn-primary" href="/contact">Request TDS / CoA</Link>
                <Link className="btn btn-secondary" href="/products">View Product Range</Link>
                <Link className="btn btn-ghost" href="/contact">Talk to Specialist</Link>
              </div>
            </div>
            <div className="hero-card">
              <h3>Core Focus</h3>
              <ul className="hero-list">
                <li>Adsorbents: Molecular Sieve 3A / 4A / 5A / 13X, Activated Alumina, Activated Carbon, Silica Gel</li>
                <li>Water treatment: Coagulants, Flocculants, Ion Exchange Resins, Antiscalants</li>
                <li>Process support: Catalyst support media, tower packings, ceramic balls, specialty media</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
