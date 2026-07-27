import Link from 'next/link';

const applicationAreas = [
  { title: 'Gas drying', summary: 'Moisture removal for compressed air, natural gas and process gases.' },
  { title: 'Water treatment', summary: 'Clarification, softening and conditioning support for utility and process water.' },
  { title: 'Hydrocarbon purification', summary: 'Selective adsorption and separation for hydrocarbons and refinery streams.' },
  { title: 'Catalyst support', summary: 'Structural media and support layers for reactor and tower systems.' },
  { title: 'Packaging protection', summary: 'Moisture control and desiccant applications for export shipments and storage.' },
  { title: 'Air separation', summary: 'Adsorbent-based gas treatment for integrated air separation and purification systems.' },
];

export const metadata = {
  title: 'Applications | Aarbutus Technologies',
  description: 'Applications include gas drying, water treatment, hydrocarbon purification and catalyst support.',
};

export default function ApplicationsPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Applications</div>
          <h1>Applications matched to technical process requirements</h1>
          <p>Aarbutus Technologies supports buyers who need materials selected for specific process functions, not just general catalog supply.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {applicationAreas.map((item) => (
            <div key={item.title} className="info-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
