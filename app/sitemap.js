import { getCategories, getProducts } from '@/lib/products';

export default async function sitemap() {
  const products = await getProducts();
  const categories = await getCategories();
  const baseUrl = 'https://aarbutus.co.in';
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
  }));
  const categoryRoutes = categories.map((category) => ({ url: `${baseUrl}/products/category/${category.slug}`, lastModified: new Date() }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/products`, lastModified: new Date() },
    { url: `${baseUrl}/industries`, lastModified: new Date() },
    { url: `${baseUrl}/applications`, lastModified: new Date() },
    { url: `${baseUrl}/resources`, lastModified: new Date() },
    { url: `${baseUrl}/downloads`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/quote`, lastModified: new Date() },
    ...categoryRoutes,
    ...productRoutes,
  ];
}
