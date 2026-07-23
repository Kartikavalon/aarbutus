import Link from 'next/link';
import { getProductBySlug, fetchProducts } from '@/lib/products';

export async function getStaticPaths() {
  const products = await fetchProducts();
  return {
    paths: products.map((item) => ({ params: { slug: item.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return { props: { product } };
}

export default function ProductDetail({ product }) {
  if (!product) {
    return <div>Product not found</div>;
  }

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
            <h1>{product.product}</h1>
            <p>{product.family} • {product.subcategory}</p>
          </div>
        </section>
        <section className="section">
          <div className="container product-layout">
            <div className="card product-side-card">
              <div className="product-thumb" style={{ minHeight: 220, marginBottom: 16 }}>
                <img src={product.image || '/assets/images/product-placeholder.svg'} alt={product.product} />
              </div>
              <div className="tag">{product.family}</div>
              <h3>{product.product}</h3>
              <p>{product.overview}</p>
              <div className="cta-row">
                {product.datasheet && (
                  <a className="btn btn-secondary" href={product.datasheet} target="_blank" rel="noopener noreferrer">Download Datasheet</a>
                )}
                <Link className="btn btn-primary" href="/contact">Request TDS / CoA / Quote</Link>
              </div>
            </div>
            <div className="card">
              <div className="spec-list">
                <div className="spec-item"><strong>Applications</strong><div>{product.applications}</div></div>
                <div className="spec-item"><strong>Typical Specifications</strong><div>{product.specs}</div></div>
                <div className="spec-item"><strong>Grades / Forms</strong><div>{product.grades}</div></div>
                <div className="spec-item"><strong>Technical Notes</strong><div>{product.technicalNotes}</div></div>
                <div className="spec-item"><strong>Documentation</strong><div>{product.documentation}</div></div>
                <div className="spec-item"><strong>Company Image</strong><div>{product.companyImage || 'No company image assigned in data/products.csv'}</div></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
