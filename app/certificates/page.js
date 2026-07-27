import Link from 'next/link';
import { certificates } from '@/lib/content';

export const metadata = {
  title: 'Certificates | Aarbutus Technologies',
  description: 'Certificates and documentation available for industrial buyers.',
};

export default function CertificatesPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Certificates</div>
          <h1>Certificates and supporting documentation</h1>
          <p>Key documents for buyer review, compliance and vendor qualification are maintained in structured data.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {certificates.map((item) => (
            <div key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
