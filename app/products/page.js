import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/products';

export const metadata = {
  title: 'Products | Aarbutus Technologies',
  description: 'Browse adsorbents, specialty chemicals and support media for industrial applications.',
};

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Products</div>
          <h1>Industrial products for drying, purification, separation and support systems</h1>
          <p>Each product family is structured for engineering selection, export procurement and technical review. Product data is sourced from the editable spreadsheet and updated centrally.</p>
        </div>
      </section>
      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Categories</span>
            <h2>Product families</h2>
          </div>
        </div>
        <div className="grid-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products/category/${category.slug}`} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="badge">{category.count} products</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Catalog</span>
            <h2>Products</h2>
          </div>
        </div>
        <div className="grid-3">
          {products.map((product) => (
            <div key={product.slug} className="product-card">
              <h3>{product.product}</h3>
              <p>{product.overview}</p>
              <p><strong>Family:</strong> {product.family}</p>
              <p><strong>Applications:</strong> {product.applications}</p>
              <Link href={`/products/${product.slug}`} className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)', padding: '0.55rem 0.75rem', marginTop: '0.6rem' }}>View product</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
