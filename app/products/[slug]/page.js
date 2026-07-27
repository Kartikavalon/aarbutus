import Link from 'next/link';
import Image from 'next/image';
import { getProducts, getProductBySlug } from '@/lib/products';

const base = 'https://aarbutus.co.in';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product | Aarbutus Technologies' };

  const imageUrl = product.image.startsWith('http') ? product.image : `${base}${product.image}`;
  return {
    title: product.seo_title || `${product.product} | Aarbutus Technologies`,
    description: product.meta_description || product.overview,
    alternates: {
      canonical: `${base}/products/${product.slug}`,
    },
    openGraph: {
      title: product.seo_title || `${product.product} | Aarbutus Technologies`,
      description: product.meta_description || product.overview,
      url: `${base}/products/${product.slug}`,
      images: [{ url: imageUrl, alt: product.image_alt || product.product }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return (
      <main className="section container">
        <h1>Product not found</h1>
        <p>The requested product could not be located in the current catalog.</p>
      </main>
    );
  }

  return (
    <main>
      {/* Product structured data for improved SERP */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Product',
            name: product.product,
            description: product.overview,
            image: product.image.startsWith('http') ? product.image : `${base}${product.image}`,
            url: `${base}/products/${product.slug}`,
            sku: product.slug,
            brand: { '@type': 'Brand', name: 'Aarbutus Technologies' },
            category: product.family,
            additionalProperty: [
              { '@type': 'PropertyValue', name: 'Grades', value: product.grades },
              { '@type': 'PropertyValue', name: 'Specs', value: product.specs },
            ],
            potentialAction: { '@type': 'Action', name: 'Request quote', target: `${base}/quote` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
              { '@type': 'ListItem', position: 2, name: 'Products', item: `${base}/products` },
              { '@type': 'ListItem', position: 3, name: product.product, item: `${base}/products/${product.slug}` },
            ],
          },
        ],
      }) }} />
      <section className="page-intro">
        <div className="container">
      <div className="breadcrumb"><Link href="/">Home</Link> / <Link href="/products">Products</Link> / {product.product}</div>
      <h1>{product.product}</h1>
          <p>{product.overview}</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-2">
          <div className="card" style={{ padding: '1.4rem' }}>
            <Image src={product.image} alt={product.product} width={800} height={500} style={{ borderRadius: '16px' }} />
          </div>
          <div className="info-card">
            <span className="kicker">Technical overview</span>
            <h2 style={{ marginBottom: '0.6rem' }}>{product.product}</h2>
            <p>{product.technicalNotes}</p>
            <ul className="list-inline">
              <li>{product.family}</li>
              <li>{product.subcategory}</li>
              <li>{product.grades}</li>
            </ul>
            <div className="hero-actions" style={{ marginTop: '1rem' }}>
              <Link href="/quote" className="btn btn-primary">Request quote</Link>
              <Link href="/downloads" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)' }}>Download datasheet</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="grid-2">
          <div className="info-card">
            <h3>Applications</h3>
            <p>{product.applications}</p>
            <h3>Specifications</h3>
            <p>{product.specs}</p>
          </div>
          <div className="info-card">
            <h3>Documentation</h3>
            <p>{product.documentation}</p>
            <h3>Packaging</h3>
            <p>{product.grades}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
