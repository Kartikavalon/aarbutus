const parseCsv = (text) => {
  const rows = text.trim().split(/\r?\n/).slice(1).filter(Boolean);
  return rows.map((row) => {
    const [
      family = '',
      subcategory = '',
      product = '',
      slug = '',
      applications = '',
      specs = '',
      grades = '',
      overview = '',
      technicalNotes = '',
      documentation = '',
      datasheet = null,
      image = null,
      companyImage = null,
    ] = row.split('|');

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
      datasheet: datasheet || null,
      image: image || null,
      companyImage: companyImage || null,
    };
  });
};

export async function fetchProducts() {
  if (typeof window === 'undefined') {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');
    const text = await readFile(join(process.cwd(), 'public', 'data', 'products.csv'), 'utf-8');
    return parseCsv(text);
  }

  const response = await fetch('/data/products.csv');
  if (!response.ok) throw new Error('Unable to load product data');
  const text = await response.text();
  return parseCsv(text);
}

export async function getProductBySlug(slugParam) {
  const products = await fetchProducts();
  return products.find((item) => item.slug === slugParam);
}
