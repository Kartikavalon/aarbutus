import Link from 'next/link';

const resources = [
  { title: 'Technical datasheets', summary: 'Product selection sheets and engineering notes.' },
  { title: 'Certificates', summary: 'Quality certificates and shipment documentation.' },
  { title: 'Product brochures', summary: 'Catalog and capability overviews for buyer review.' },
];

export const metadata = {
  title: 'Resources | Aarbutus Technologies',
  description: 'Technical resources, certificates and brochures for industrial buyers.',
};

export default function ResourcesPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Resources</div>
          <h1>Technical documents and support materials for procurement and engineering teams</h1>
          <p>Resources are provided in a format intended for technical review, project planning and supplier qualification.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {resources.map((item) => (
            <div key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Link href="/downloads" className="btn btn-outline" style={{ borderColor: 'var(--border)', color: 'var(--blue)', marginTop: '0.7rem' }}>Open downloads</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
