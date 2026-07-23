from pathlib import Path
import csv

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS_DIR = ROOT / 'products'
CSV_PATH = ROOT / 'data' / 'products.csv'

TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{product} | Aarbutus Technologies</title>
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <div class="topbar"><div class="container">Aarbutus Technologies • Technical product detail page</div></div>
  <nav class="navbar"><div class="container nav-wrap"><a class="brand" href="../index.html"><span class="brand-mark"></span> AARBUTUS</a><div class="menu"><a href="../index.html">Home</a><a href="../products.html">Products</a><a href="../applications.html">Applications</a><a href="../about.html">About</a><a href="../resources.html">Technical Resources</a><a href="../contact.html">Contact</a></div></div></nav>
  <section class="page-banner"><div class="container"><h1>{product}</h1><p>{family} • {subcategory}</p></div></section>
  <section class="section">
    <div class="container product-layout">
      <div class="card product-side-card">
        <div class="product-thumb" style="min-height: 220px; margin-bottom: 16px;"><img src="../{image}" alt="{product}"></div>
        <div class="tag">{family}</div>
        <h3>{product}</h3>
        <p>{overview}</p>
        <a class="btn btn-primary" href="../contact.html">Request TDS / CoA / Quote</a>
      </div>
      <div class="card">
        <div class="spec-list">
          <div class="spec-item"><strong>Applications</strong><div>{applications}</div></div>
          <div class="spec-item"><strong>Typical Specifications</strong><div>{specs}</div></div>
          <div class="spec-item"><strong>Grades / Forms</strong><div>{grades}</div></div>
          <div class="spec-item"><strong>Technical Notes</strong><div>{technical_notes}</div></div>
          <div class="spec-item"><strong>Documentation</strong><div>{documentation}</div></div>
          <div class="spec-item"><strong>Recommended Use</strong><div>{recommended_use}</div></div>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
'''

PRODUCTS_DIR.mkdir(exist_ok=True)

with CSV_PATH.open('r', encoding='utf-8', newline='') as fh:
    rows = list(csv.DictReader(fh, delimiter='|'))

for row in rows:
    slug = (row.get('Slug') or row['Product']).strip().lower().replace(' ', '-')
    slug = ''.join(ch for ch in slug if ch.isalnum() or ch == '-')
    product_name = row['Product'].strip()
    html = TEMPLATE.format(
        product=product_name,
        family=row['Family'].strip(),
        subcategory=row['Subcategory'].strip(),
        image=row['Image File'].strip(),
        overview=row['Overview'].strip(),
        applications=row['Applications'].strip(),
        specs=row['Typical Spec'].strip(),
        grades=row['Grades / Forms'].strip(),
        technical_notes=row['Technical Notes'].strip(),
        documentation=row['Documentation'].strip(),
        recommended_use=row['Recommended Use'].strip(),
    )
    (PRODUCTS_DIR / f'{slug}.html').write_text(html, encoding='utf-8')

print(f'Generated {len(rows)} product pages in {PRODUCTS_DIR}')
