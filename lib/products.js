import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const dataPath = path.join(process.cwd(), 'public', 'data', 'products.csv');

function normalizeRow(row) {
  const image = row['Image File'] || row['imagefile'] || '/assets/images/product-placeholder.svg';
  const normalizedImage = image.startsWith('/') ? image : `/${image}`;
  const companyImage = row['Company Image'] || row['companyimage'] || '/assets/images/product-placeholder.svg';
  const normalizedCompanyImage = companyImage.startsWith('/') ? companyImage : `/${companyImage}`;

  return {
    family: row.Family || row.family || '',
    subcategory: row.Subcategory || row.subcategory || '',
    product: row.Product || row.product || '',
    slug: row.Slug || row.slug || '',
    applications: row.Applications || row.applications || '',
    specs: row['Typical Spec'] || row['typicalspec'] || '',
    grades: row['Grades / Forms'] || row['grades/forms'] || '',
    overview: row.Overview || row.overview || '',
    technicalNotes: row['Technical Notes'] || row['technicalnotes'] || '',
    documentation: row.Documentation || row.documentation || '',
    datasheet: row.Datasheet || row.datasheet || '',
    image: normalizedImage,
    companyImage: normalizedCompanyImage,
  };
}

export async function getProducts() {
  const csvText = await fs.readFile(dataPath, 'utf8');
  const records = parse(csvText, { delimiter: '|', columns: true, skip_empty_lines: true, relax_column_count: true });
  return records.map(normalizeRow);
}

export async function getFeaturedProducts(limit = 4) {
  const products = await getProducts();
  return products.slice(0, limit);
}

export async function getCategories() {
  const products = await getProducts();
  const map = new Map();
  products.forEach((product) => {
    const key = product.family.trim();
    if (!key) return;
    const existing = map.get(key) || {
      slug: product.family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: key,
      description: `${key} products for industrial process applications.`,
      count: 0,
    };
    existing.count += 1;
    map.set(key, existing);
  });
  return Array.from(map.values());
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) || null;
}
