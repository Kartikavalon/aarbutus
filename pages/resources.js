import Link from 'next/link';

export default function Resources() {
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
            <h1>Technical Resources</h1>
            <p>CoA, TDS, MSDS, and application guidance can be referenced or requested through the product catalog.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="card">
              <h2>Data Sheet Management</h2>
              <p>
                Use the <code>Datasheet</code> field in <code>data/products.csv</code> to link each product to its custom PDF.
                Place the PDF in <code>public/assets/datasheets/</code> and reference it as <code>/assets/datasheets/{'{slug}'}.pdf</code>.
              </p>
            </div>
            <div className="card">
              <h2>Company Image Assets</h2>
              <p>
                Add facility or product-line images to <code>public/assets/images/company/</code> and reference them in the <code>Company Image</code> field of <code>data/products.csv</code>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
