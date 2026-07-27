import Link from 'next/link';

export const metadata = {
  title: 'About Us | Aarbutus Technologies',
  description: 'Aarbutus Technologies supplies industrial chemicals, adsorbents and industrial minerals with technical support and export capability.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    title: 'About Us | Aarbutus Technologies',
    description: 'Aarbutus Technologies supplies industrial chemicals, adsorbents and industrial minerals with technical support and export capability.',
    url: 'https://aarbutus.co.in/about',
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / About Us</div>
          <h1>About Aarbutus Technologies Pvt Ltd</h1>
          <p>Aarbutus Technologies Pvt Ltd is an Indian specialty chemicals and advanced materials company engaged in the sourcing, manufacturing, processing and global distribution of industrial chemicals, adsorbents, catalyst supports and performance materials.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-2">
          <div className="info-card">
            <h3>Our profile</h3>
            <p>The company serves customers across chemical processing, petrochemicals, pharmaceuticals, biotechnology, water treatment, gas purification, electronics, energy, construction chemicals and advanced manufacturing industries.</p>
            <p>Our objective is to bridge the gap between global material suppliers and industrial consumers by delivering technically compliant materials, consistent quality and dependable commercial support.</p>
          </div>
          <div className="info-card">
            <h3>Operations</h3>
            <p>Operating from Ghaziabad, Uttar Pradesh, Aarbutus combines engineering expertise with strong domestic and international sourcing capabilities to offer customized solutions for a wide spectrum of industrial applications.</p>
            <h4>Mission</h4>
            <p>To become one of India's most trusted suppliers of specialty chemicals and advanced industrial materials by delivering quality, reliability and technical excellence.</p>
            <h4>Vision</h4>
            <p>To build a globally respected chemical company recognized for technical capability, ethical business practices and long-term customer relationships.</p>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Gallery</span>
            <h2>Factory and team images</h2>
          </div>
        </div>
        <p>Place high-resolution images in <code>public/assets/images/</code> and reference them on this page. Recommended sizes: 1200×800 for landscape images. Example files: <code>factory1.jpg</code>, <code>team1.jpg</code>.</p>
        <div className="gallery-grid">
          <img src="/assets/images/factory-placeholder.svg" alt="Factory placeholder" style={{ maxWidth: '100%', borderRadius: 8 }} />
          <img src="/assets/images/team-placeholder.svg" alt="Team placeholder" style={{ maxWidth: '100%', borderRadius: 8 }} />
        </div>
      </section>
      <section className="section container">
        <div className="section-title">
          <div>
            <span className="kicker">Our leadership</span>
            <h2>Founders and technical leadership</h2>
          </div>
        </div>
        <div className="grid-2">
          <div className="info-card">
            <h3>Kartik Gupta</h3>
            <p>Founder & Director. Kartik is a graduate of IIT Roorkee with a B.Tech in Chemical Engineering, and brings experience in industrial sourcing, process optimization, international trade and specialty materials supply.</p>
          </div>
          <div className="info-card">
            <h3>Kaustubh Gupta</h3>
            <p>Co-Founder & Director. Kaustubh is a graduate of Delhi Technological University (DTU) in Chemical Engineering, contributing technical expertise in chemical engineering, process understanding and product applications.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
