import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';

export const metadata = {
  title: 'Request Quote | Aarbutus Technologies',
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
      <section className="section container"><InquiryForm source="Quotation request" /></section>
    </main>
  );
}
