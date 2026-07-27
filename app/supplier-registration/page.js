import Link from 'next/link';

export const metadata = {
  title: 'Supplier Registration | Kaytherix Industries',
  description: 'Register as a supplier or vendor with Kaytherix Industries.',
};

export default function SupplierRegistrationPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Supplier Registration</div>
          <h1>Supplier and vendor registration</h1>
          <p>Provide your company profile, capabilities and compliance details for vendor onboarding.</p>
        </div>
      </section>
      <section className="section container">
        <div className="info-card">
          <div className="form-grid">
            <div className="field"><label>Company name</label><input placeholder="Supplier company" /></div>
            <div className="field"><label>Contact email</label><input placeholder="vendor@company.com" /></div>
            <div className="field"><label>Category</label><input placeholder="Logistics / Packaging / Raw material" /></div>
            <div className="field"><label>Country</label><input placeholder="India" /></div>
          </div>
          <div className="field"><label>Capability statement</label><textarea rows="5" placeholder="Describe your company, products and regulatory certifications." /></div>
          <button className="btn btn-primary">Register supplier</button>
        </div>
      </section>
    </main>
  );
}
