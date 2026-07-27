import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Kaytherix Industries',
  description: 'Privacy policy for visitors and inquiry submissions.',
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / Privacy Policy</div>
          <h1>Privacy policy</h1>
          <p>We use inquiry and contact information solely for response, quotation preparation and business communication purposes.</p>
        </div>
      </section>
    </main>
  );
}
