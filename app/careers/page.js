import Link from 'next/link';

export const metadata = {
  title: 'Careers | Kaytherix Industries',
  description: 'Career opportunities with Kaytherix Industries.',
};

export default function CareersPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Careers</div>
          <h1>Career opportunities in industrial operations, export and technical support</h1>
          <p>We welcome professionals with experience in operations, industrial sales, export coordination and technical documentation.</p>
        </div>
      </section>
      <section className="section container">
        <div className="info-card">
          <h3>Current openings</h3>
          <p>Sales and technical support roles for chemical and industrial materials supply.</p>
        </div>
      </section>
    </main>
  );
}
