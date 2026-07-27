import Link from 'next/link';

export const metadata = {
  title: 'Request Quote | Kaytherix Industries',
  description: 'Request a quote for industrial products and technical materials.',
};

export default function QuotePage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Request Quote</div>
          <h1>Request a quotation for industrial supply and technical support</h1>
          <p>Provide your selected product, application need and import destination so we can prepare a commercial response.</p>
        </div>
      </section>
      <section className="section container">
        <div className="info-card">
          <div className="form-grid">
            <div className="field"><label>Product</label><input placeholder="Activated alumina" /></div>
            <div className="field"><label>Quantity</label><input placeholder="10 MT" /></div>
            <div className="field"><label>Destination</label><input placeholder="UAE" /></div>
            <div className="field"><label>Incoterms</label><input placeholder="CIF" /></div>
            <div className="field"><label>Company</label><input placeholder="Buyer company" /></div>
            <div className="field"><label>Email</label><input placeholder="procurement@company.com" /></div>
          </div>
          <div className="field"><label>Request details</label><textarea rows="5" placeholder="Share full specifications, delivery timeframe and application context." /></div>
          <button className="btn btn-primary">Send request</button>
        </div>
      </section>
    </main>
  );
}
