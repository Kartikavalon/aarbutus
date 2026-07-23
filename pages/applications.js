import Link from 'next/link';

export default function Applications() {
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
            <h1>Applications & Industries</h1>
            <p>Product and application mapping for industrial water, gas treatment, purification, and process support.</p>
          </div>
        </section>
        <section className="section">
          <div className="container grid-4">
            <div className="card"><h3>Gas Treatment & Drying</h3><p>Molecular sieve and activated alumina products for compressed air, natural gas dehydration, solvent drying, and PSA systems.</p></div>
            <div className="card"><h3>Water Treatment</h3><p>Coagulants, flocculants, and resins for clarification, softening, and utility systems.</p></div>
            <div className="card"><h3>Industrial Process</h3><p>Adsorbents and support media for refineries, chemicals, pharma, and food-grade applications.</p></div>
            <div className="card"><h3>Utilities & Energy</h3><p>Feed water, boiler treatment, air drying, and process gas purification support.</p></div>
          </div>
        </section>
      </main>
    </div>
  );
}
