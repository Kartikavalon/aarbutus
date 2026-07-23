const productDataUrl = '/data/products.csv';
const siteImagesUrl = '/data/site-images.json';

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Unable to load ${url}: ${response.status}`);
  return response.text();
}

function normalizePath(path, fallback) {
  if (!path || !path.trim()) return fallback;
  return path.trim();
}

async function loadProductData() {
  const text = await fetchText(productDataUrl);
  const rows = text.trim().split(/\r?\n/).slice(1).filter(Boolean);
  return rows.map((row) => {
    const [family, subcategory, product, slug, applications, specs, grades, overview, technicalNotes, documentation, datasheet, image, companyImage] = row.split('|');
    return {
      family,
      subcategory,
      product,
      slug,
      applications,
      specs,
      grades,
      overview,
      technicalNotes,
      documentation,
      datasheet,
      image,
      companyImage,
    };
  });
}

function pageLink(item) {
  const slug = item.slug || item.product.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `/products/${slug}.html`;
}

function imageSource(item) {
  if (item.image && item.image.trim()) return item.image.trim();
  const defaultSlug = item.slug || item.product.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `/assets/images/products/${defaultSlug}.svg`;
}

function renderProducts(products, containerId = 'productList') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map((item) => {
    const datasheet = item.datasheet && item.datasheet.trim();
    return `
    <article class="product-card">
      <div class="product-thumb">
        <img src="${imageSource(item)}" alt="${item.product}">
      </div>
      <div class="product-meta">
        <span class="tag">${item.family}</span>
        <h3>${item.product}</h3>
        <p>${item.overview || 'Technical trading product for industrial application support.'}</p>
        <p><strong>Applications:</strong> ${item.applications}</p>
        <p><strong>Typical spec:</strong> ${item.specs}</p>
        <p><strong>Grades / forms:</strong> ${item.grades}</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="${pageLink(item)}">Product Page</a>
          <a class="btn btn-ghost" href="/contact.html">Request Data</a>
          ${datasheet ? `<a class="btn btn-secondary" href="${datasheet}" target="_blank" rel="noopener">Download Datasheet</a>` : ''}
        </div>
      </div>
    </article>
  `;
  }).join('');
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

async function loadSiteImages() {
  const gallery = document.getElementById('companyGallery');
  if (!gallery) return;
  try {
    const response = await fetch(siteImagesUrl);
    if (!response.ok) return;
    const json = await response.json();
    const imagePaths = [
      ...(json.heroImages || []),
      ...(json.aboutImages || []),
      ...(json.productImages || []),
    ].filter(Boolean);
    gallery.innerHTML = imagePaths.map((src) => `<div class="image-card"><img src="${src}" alt="Company asset"></div>`).join('');
  } catch (error) {
    console.warn('Site image gallery not available:', error);
  }
}

async function initProductCatalog() {
  const products = await loadProductData();
  renderProducts(products);
  bindFilters(products);
  await loadSiteImages();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('productList')) {
    initProductCatalog();
  } else {
    loadSiteImages();
  }
});
