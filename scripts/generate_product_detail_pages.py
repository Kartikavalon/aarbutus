from pathlib import Path
import json

BASE = Path(__file__).resolve().parents[1]
DATA = BASE / 'data' / 'product-detail-template.json'
OUT = BASE / 'products'
OUT.mkdir(exist_ok=True)

with DATA.open('r', encoding='utf-8') as f:
    data = json.load(f)

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{data['product']} | Aarbutus Technologies</title>
  <link rel="stylesheet" href="../styles.css" />
</head>
<body>
  <div class="topbar"><div class="container">Aarbutus Technologies • Technical data sheet page</div></div>
  <nav class="navbar"><div class="container nav-wrap"><a class="brand" href="../index.html"><span class="brand-mark"></span> AARBUTUS</a><div class="menu"><a href="../index.html">Home</a><a href="../products.html">Products</a><a href="../applications.html">Applications</a><a href="../about.html">About</a><a href="../resources.html">Resources</a><a href="../contact.html">Contact</a></div></div></nav>
  <section class="page-banner"><div class="container"><h1>{data['product']}</h1><p>{data['family']} • {data['subcategory']}</p></div></section>
  <section class="section">
    <div class="container product-layout">
      <div class="card product-side-card">
        <div class="product-thumb" style="min-height:220px"><img src="../{data['image']}" alt="{data['product']}"></div>
        <div class="tag">{data['family']}</div>
        <h3>{data['product']}</h3>
        <p>{data['overview']}</p>
        <a class="btn btn-primary" href="../contact.html">Request TDS / CoA / Quote</a>
      </div>
      <div class="card">
        <div class="spec-list">
          <div class="spec-item"><strong>Applications</strong><div>{'<br>'.join(data['applications'])}</div></div>
          <div class="spec-item"><strong>Typical Specifications</strong><div>{'<br>'.join([f"{k}: {v}" for k, v in data['specifications'].items()])}</div></div>
          <div class="spec-item"><strong>Grades / Forms</strong><div>{'<br>'.join(data['grades'])}</div></div>
          <div class="spec-item"><strong>Technical Notes</strong><div>{data['technicalNotes']}</div></div>
          <div class="spec-item"><strong>Documentation</strong><div>{data['documentation']}</div></div>
          <div class="spec-item"><strong>Recommended Use</strong><div>{data['recommendedUse']}</div></div>
        </div>
      </div>
    </div>
  </section>
</body>
</html>
'''

(OUT / 'example-product.html').write_text(html, encoding='utf-8')
print('Generated example product detail page at', OUT / 'example-product.html')
