import Link from 'next/link';

const downloads = [
  { title: 'Company profile', description: 'Corporate overview and capability summary.' },
  { title: 'Product brochure', description: 'Selected materials and application overview.' },
  { title: 'Technical datasheet set', description: 'Engineering notes and application guidance.' },
  { title: 'Certificates', description: 'Quality and compliance documentation.' },
];

export const metadata = {
  title: 'Downloads | Aarbutus Technologies',
  description: 'Download company brochures, certificates and technical documents.',
};

export default function DownloadsPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Downloads</div>
          <h1>Download center for documentation and technical literature</h1>
          <p>This section is prepared for procurement, plant engineering and quality review workflows.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {downloads.map((item) => (
            <div key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href="/contact" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)', marginTop: '0.7rem' }}>Request document</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
