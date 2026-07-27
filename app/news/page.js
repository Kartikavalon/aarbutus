import Link from 'next/link';
import { news } from '@/lib/content';

export const metadata = {
  title: 'News | Aarbutus Technologies',
  description: 'Recent technical updates and company news.',
};

export default function NewsPage() {
  return (
    <main>
      <section className="page-intro">
        <div className="container">
          <div className="breadcrumb"><Link href="/">Home</Link> / News</div>
          <h1>Current updates for product documentation and export support</h1>
          <p>News entries are structured as editable content so updates can be maintained without code changes.</p>
        </div>
      </section>
      <section className="section container">
        <div className="grid-3">
          {news.map((item) => (
            <div key={item.title} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <span className="badge">{item.date}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
