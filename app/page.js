import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedProducts, getCategories } from '@/lib/products';
import { industries, news, certificates } from '@/lib/content';

export const metadata = {
  title: 'Aarbutus Technologies | Adsorbents, Water Treatment Chemicals & Process Media',
  description: 'Technical trading partner for adsorbents, water-treatment chemicals, ion-exchange resins and process media in India.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Aarbutus Technologies | Adsorbents, Water Treatment Chemicals & Process Media',
    description: 'Technical trading partner for adsorbents, water-treatment chemicals, ion-exchange resins and process media in India.',
    url: 'https://aarbutus.co.in/',
  },
};

export default async function HomePage() {
  const products = await getFeaturedProducts(4);
  const categories = await getCategories();

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker">Technical industrial supply</span>
            <h1>Adsorbents, water-treatment chemicals and process media for industrial applications.</h1>
            <p>Aarbutus Technologies helps industrial buyers source materials for water treatment, gas drying, purification, filtration and separation duties across North India and beyond.</p>
            <div className="hero-actions">
              <Link href="/quote" className="btn btn-primary">Request quotation</Link>
              <Link href="/products" className="btn btn-secondary">Explore products</Link>
              <Link href="/contact" className="btn btn-outline">Speak with a specialist</Link>
            </div>
          </div>
          <div className="hero-card">
            <h3>Core capabilities</h3>
            <ul>
              <li>Adsorbents including molecular sieves, activated alumina and silica gel</li>
              <li>Water treatment chemicals and ion exchange media</li>
              <li>Filter media and selective gas-treatment solutions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Get a faster quotation</span>
            <h2>Send the technical details that matter</h2>
          </div>
        </div>
        <p>Share the information below in your inquiry so we can assess suitability and prepare a more relevant quotation.</p>
        <div className="grid-3">
          <div className="info-card"><h3>Product and grade</h3><p>Name the required product, grade, mesh size or form. A target specification or existing TDS helps us match the right option.</p></div>
          <div className="info-card"><h3>Application and quantity</h3><p>Share the process duty, feed-water or gas condition where relevant, and expected monthly or one-time quantity.</p></div>
          <div className="info-card"><h3>Delivery requirement</h3><p>Include delivery location, packaging preference and required timeline so we can prepare a useful commercial response.</p></div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Featured categories</span>
            <h2>Structured product families for process and utility applications</h2>
          </div>
          <Link href="/products" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)' }}>View full catalog</Link>
        </div>
        <div className="grid-3">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.slug} href={`/products/category/${category.slug}`} className="category-card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="badge">{category.count} products</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-title">
            <div>
              <span className="kicker">Industries served</span>
              <h2>Serving critical industrial sectors with technical consistency</h2>
            </div>
            <Link href="/industries" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)' }}>All industries</Link>
          </div>
          <div className="grid-3">
            {industries.slice(0, 6).map((industry) => (
              <div key={industry.slug} className="industry-card">
                <h3>{industry.title}</h3>
                <p>{industry.summary}</p>
                <ul className="list-inline">
                  {industry.products.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Featured products</span>
            <h2>Selected materials used in drying, purification and separation duties</h2>
          </div>
          <Link href="/products" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)' }}>Browse catalog</Link>
        </div>
        <div className="grid-3">
          {products.map((product) => (
            <article key={product.slug} className="product-card">
              <Image src={product.image} alt={product.product} width={500} height={260} style={{ borderRadius: '12px', marginBottom: '0.8rem' }} />
              <h3>{product.product}</h3>
              <p>{product.overview}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge">{product.family}</span>
                <Link href={`/products/${product.slug}`} className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)', padding: '0.55rem 0.75rem' }}>View details</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(180deg, #fdfefe 0%, #f6f9fe 100%)' }}>
        <div className="container">
          <div className="section-title">
            <div>
            <span className="kicker">Why buyers contact us</span>
            <h2>Clear product selection, documentation support and responsive commercial coordination</h2>
            </div>
          </div>
          <div className="stat-grid">
            <div className="stat-box"><strong>35</strong><span>Launch-range products and media</span></div>
            <div className="stat-box"><strong>6</strong><span>Industrial product categories</span></div>
            <div className="stat-box"><strong>CoA / TDS</strong><span>Documentation available on request</span></div>
            <div className="stat-box"><strong>India + import</strong><span>Dual-sourcing approach for eligible products</span></div>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Recent updates</span>
            <h2>Current technical documentation and regional updates</h2>
          </div>
          <Link href="/news" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)' }}>View all news</Link>
        </div>
        <div className="grid-3">
          {news.slice(0, 3).map((item) => (
            <div key={item.title} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="badge">{item.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Certificates</span>
            <h2>Documents available for buyers and procurement teams</h2>
          </div>
          <Link href="/certificates" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)' }}>See certificates</Link>
        </div>
        <div className="grid-3">
          {certificates.map((certificate) => (
            <div key={certificate.title} className="info-card">
              <h3>{certificate.title}</h3>
              <p>{certificate.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
