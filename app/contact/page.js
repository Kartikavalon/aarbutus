import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'Contact | Aarbutus Technologies',
  description: 'Contact Aarbutus Technologies for quotations, technical support and product inquiries.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact | Aarbutus Technologies',
    description: 'Contact Aarbutus Technologies for quotations, technical support and product inquiries.',
    url: 'https://aarbutus.co.in/contact',
  },
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Contact</div>
          <h1>Contact our commercial and technical support team</h1>
          <p>Share your application, required material, quantity and destination so we can route your inquiry appropriately. Use the contact details or the inquiry form below to reach our export and technical teams.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-2">
          <InquiryForm />
          <div className="info-card">
            <h3>Commercial contact</h3>
            <p>For quotation requests, technical support and product selection, contact our export team directly.</p>
            <p>Email: aarbutustechnologies@gmail.com</p>
            <p>Phone: +91 9650463811</p>
            <p>Address: A-12 Ashok Nagar, Ghaziabad 201001, India</p>
          </div>
        </div>
      </section>
    </main>
  );
}
