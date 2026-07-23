import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts } from '@/lib/products';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

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
            <h1>Product Catalog</h1>
            <p>Each product entry is structured to support technical know-how, application mapping, and clean documentation-led industrial buying.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="filters">
              <button className="filter-chip active" type="button">All</button>
              <button className="filter-chip" type="button">Adsorbents</button>
              <button className="filter-chip" type="button">Water Treatment</button>
              <button className="filter-chip" type="button">Process Media</button>
            </div>
            <div className="grid-3">
              {products.map((item) => (
                <article key={item.slug} className="product-card">
                  <div className="product-thumb">
                    <img src={item.image || '/assets/images/product-placeholder.svg'} alt={item.product} />
                  </div>
                  <div className="product-meta">
                    <span className="tag">{item.family}</span>
                    <h3>{item.product}</h3>
                    <p>{item.overview}</p>
                    <p><strong>Applications:</strong> {item.applications}</p>
                    <p><strong>Typical spec:</strong> {item.specs}</p>
                    <p><strong>Grades / forms:</strong> {item.grades}</p>
                    <div className="cta-row">
                      <Link className="btn btn-primary" href={`/products/${item.slug}`}>Product Page</Link>
                      <Link className="btn btn-ghost" href="/contact">Request Data</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
