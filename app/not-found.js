import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section container">
      <div className="info-card">
        <h1>Page not found</h1>
        <p>The requested page could not be found. Please return to the homepage or browse the catalog.</p>
        <Link href="/" className="btn btn-primary">Return home</Link>
      </div>
    </main>
  );
}
