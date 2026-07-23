const productDataUrl = './data/products.csv';

async function loadProductData() {
  const response = await fetch(productDataUrl);
  const text = await response.text();
  const rows = text.trim().split(/\r?\n/).slice(1).filter(Boolean);
  return rows.map((row) => {
    const [family, subcategory, product, slug, applications, specs, grades, overview, technicalNotes, documentation, recommendedUse, image] = row.split('|');
    return { family, subcategory, product, slug, applications, specs, grades, overview, technicalNotes, documentation, recommendedUse, image };
  });
}

function renderProducts(products, containerId = 'productList') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map((item) => `
    <article class="product-card">
      <div class="product-thumb">
        <img src="${item.image || './assets/images/product-placeholder.svg'}" alt="${item.product}">
      </div>
      <div class="product-meta">
        <span class="tag">${item.family}</span>
        <h3>${item.product}</h3>
        <p>${item.overview || 'Technical trading product for industrial application support.'}</p>
        <p><strong>Applications:</strong> ${item.applications}</p>
        <p><strong>Typical spec:</strong> ${item.specs}</p>
        <p><strong>Grades / forms:</strong> ${item.grades}</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="products/${item.slug || item.product.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.html">Product Page</a>
          <a class="btn btn-ghost" href="contact.html">Request Data</a>
        </div>
      </div>
    </article>
  `).join('');
}

function bindFilters(products) {
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const selected = chip.dataset.filter;
      const filtered = selected === 'all' ? products : products.filter((item) => item.family === selected);
      renderProducts(filtered);
    });
  });
}

async function initProductCatalog() {
  const products = await loadProductData();
  renderProducts(products);
  bindFilters(products);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productList')) {
    initProductCatalog();
  }
});
