import Link from 'next/link';

export default function Contact() {
  return (
    <div>
      <header className="navbar">
        <div className="container nav-wrap">
          <Link href="/" className="brand"><span className="brand-mark"></span> AARBUTUS TECHNOLOGIES</Link>
          <nav className="menu">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/applications">Applications</Link>
            <Link href="/about">About</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="page-banner">
          <div className="container">
            <h1>Contact & Inquiry</h1>
            <p>Direct your technical query, price request, or CoA/TDS request to the Aarbutus Technologies team in Ghaziabad NCR.</p>
          </div>
        </section>
        <section className="section">
          <div className="container contact-grid">
            <div className="card">
              <h2>Get in Touch</h2>
              <p><strong>Email:</strong> aarbutustechnologies@gmail.com</p>
              <p><strong>Phone:</strong> +91-9650463811</p>
              <p><strong>Director:</strong> Kartik Gupta</p>
              <p><strong>Address:</strong> A-12 Ashok Nagar, Ghaziabad 201001</p>
              <p><strong>Operations:</strong> NCR / North India focused with pan-India supply capability</p>
            </div>
            <div className="form-wrap">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your full name" />
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Your email" />
              <label htmlFor="company">Company</label>
              <input id="company" type="text" placeholder="Company or plant name" />
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="What product or application do you need support for?"></textarea>
              <button className="btn btn-primary" type="button">Send Inquiry</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
