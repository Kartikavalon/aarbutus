import Link from 'next/link';

export const metadata = {
  title: 'Terms | Aarbutus Technologies',
  description: 'Terms and conditions for website use and quotation requests.',
};

export default function TermsPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Terms</div>
          <h1>Terms of use</h1>
          <p>All quotation requests and technical information are subject to confirmation by the commercial team and applicable export and trade terms.</p>
        </div>
      </section>
    </main>
  );
}
