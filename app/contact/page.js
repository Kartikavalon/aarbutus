import Link from 'next/link';

export const metadata = {
  title: 'Contact | Kaytherix Industries',
  description: 'Contact Kaytherix Industries for quotations, technical support and product inquiries.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Contact</div>
          <h1>Contact our industrial sales and technical support team</h1>
          <p>Share your application, required material, quantity and destination so we can route your inquiry appropriately.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-2">
          <div className="info-card">
            <h3>Inquiry details</h3>
            <div className="form-grid">
              <div className="field"><label>Company</label><input placeholder="Company name" /></div>
              <div className="field"><label>Email</label><input placeholder="name@company.com" /></div>
              <div className="field"><label>Product interest</label><input placeholder="Molecular sieve 4A" /></div>
              <div className="field"><label>Country</label><input placeholder="United Arab Emirates" /></div>
              <div className="field"><label>Quantity</label><input placeholder="1 MT / 20 MT" /></div>
              <div className="field"><label>Preferred incoterms</label><input placeholder="FOB / CIF" /></div>
            </div>
            <div className="field"><label>Message</label><textarea rows="5" placeholder="Describe your application, specifications and target delivery requirements." /></div>
            <button className="btn btn-primary">Submit inquiry</button>
          </div>
          <div className="info-card">
            <h3>Commercial contact</h3>
            <p>For quotation requests, technical support and product selection, contact our export team directly.</p>
            <p>Email: sales@kaytherix.example.com</p>
            <p>Phone: +91 00000 00000</p>
            <p>Address: Industrial Corridor, Export Zone, India</p>
          </div>
        </div>
      </section>
    </main>
  );
}
