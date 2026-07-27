import Link from 'next/link';

export const metadata = {
  title: 'About Us | Kaytherix Industries',
  description: 'Kaytherix Industries supplies industrial chemicals and adsorbents to global process sectors.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / About Us</div>
          <h1>Established industrial supplier serving process, utility and export markets</h1>
          <p>Kaytherix Industries operates as a technical export company focused on specialty chemicals, adsorbents and industrial materials for global buyers who require dependable supply, documented quality and responsive engineering support.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-2">
          <div className="info-card">
            <span className="kicker">Corporate profile</span>
            <h2>Technical orientation and export discipline</h2>
            <p>Our work is centered on supplying materials that support drying, purification, separation, clarification and bed support applications across industrial plants and utility systems.</p>
          </div>
          <div className="info-card">
            <span className="kicker">Quality focus</span>
            <h2>Documented product support</h2>
            <p>We support prospect and procurement teams with product selection guidance, technical data, shipment coordination and repeatable supply programs tailored to specification-driven buyers.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
