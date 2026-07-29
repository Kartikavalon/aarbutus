const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const inputPath = path.join(__dirname, '..', 'public', 'data', 'products.csv');
const outputPath = path.join(__dirname, '..', 'data', 'products.json');

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

const csvText = fs.readFileSync(inputPath, 'utf8');
const products = parse(csvText, { columns: true, skip_empty_lines: true, relax_column_count: true, bom: true }).map(normalizeRow);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products in ${outputPath}`);
