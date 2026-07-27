import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/products';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }) {
  const products = await getProducts();
  const categoryProducts = products.filter((product) => product.family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === params.slug);

  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / {params.slug}</div>
          <h1>{params.slug.replace(/-/g, ' ')}</h1>
          <p>Category pages are generated from the product family data in the editable spreadsheet.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {categoryProducts.map((product) => (
            <div key={product.slug} className="product-card">
              <h3>{product.product}</h3>
              <p>{product.overview}</p>
              <Link href={`/products/${product.slug}`} className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)', padding: '0.55rem 0.75rem', marginTop: '0.6rem' }}>View product</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
