import Link from 'next/link';
import { industries } from '@/lib/content';

export const metadata = {
  title: 'Industries Served | Kaytherix Industries',
  description: 'Technical materials for oil and gas, water treatment, petrochemicals, steel, battery and semiconductor applications.',
};

export default function IndustriesPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Industries Served</div>
          <h1>Industries supported by adsorbents, resins, chemicals and specialist media</h1>
          <p>Our product portfolio is aligned with applications that require controlled moisture removal, selective adsorption, separation, clarification and support layer performance.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {industries.map((industry) => (
            <div key={industry.slug} className="industry-card">
              <h3>{industry.title}</h3>
              <p>{industry.summary}</p>
              <ul className="list-inline">
                {industry.products.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
