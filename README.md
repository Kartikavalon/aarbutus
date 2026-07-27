# Aarbutus Technologies Website

This repository contains the Next.js website for Aarbutus Technologies, rebuilt to support industrial chemicals, adsorbents, water-treatment media and product catalog pages.

## Repository overview
- `app/` – App Router pages and SEO metadata for all visible site pages.
- `components/` – Shared UI components: header, footer and inquiry form.
- `lib/` – Data access, CSV parsing and content helpers.
- `public/` – Static assets, images, downloads and the editable product CSV.
- `scripts/` – Scripts for generating product data and supporting content workflows.
- `products/` – Legacy static product HTML pages (can be deprecated once App Router pages are fully adopted).

## SEO and site metadata
- Root metadata is defined in `app/layout.js`, including default title, description, canonical base URL and organization schema.
- Page-specific metadata uses `export const metadata` and `generateMetadata()` for dynamic product pages.
- Product detail pages include JSON-LD structured data for `Product` and `BreadcrumbList` schema.
- `app/robots.js` allows all pages and points search engines to `https://aarbutus.co.in/sitemap.xml`.
- `app/sitemap.js` generates a sitemap from product and category data at build time.

## Core product workflow
1. Maintain product data in `public/data/products.csv`.
2. Generate the product catalog with:
   ```bash
   npm run generate-products
   ```
3. The site reads from `public/data/products.csv` at build time and creates dynamic product and category pages.

## Editing product data
- Add or update rows in `public/data/products.csv`.
- Keep the `Slug` column unique and URL-friendly.
- Include optional SEO fields:
  - `seo_title`
  - `meta_description`
  - `image_alt`
- Regenerate product data after editing.

## Add or update images
- Store product and brand images under `public/assets/images/`.
- Use descriptive filenames and alt text.
- The home and about pages include guidance for adding image slots and gallery images.
- Recommended image size: 1200×800 for large hero or gallery images.

## Running locally
- Install dependencies:
  ```bash
  npm install
  ```
- Start local development:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Serve the production build locally:
  ```bash
  npm run start
  ```

## Vercel deployment
- Connect this repository to Vercel.
- Use the default Next.js build settings.
- Ensure the `public/data/products.csv` file is included in the deployment.
- `next build` will generate the required app routes and sitemap.

## Content and page maintenance
- Update page copy directly in `app/*.js`.
- Add new pages by creating new folders in `app/` and exporting page components.
- Use `components/SiteHeader.js` and `components/SiteFooter.js` for shared layout updates.
- For reusable page sections, add new components under `components/` and import them in App Router pages.

## Adding product categories
- Categories are derived automatically from `Family` values in the product CSV.
- Category slugs are normalized from the family name.
- To add a new category, add products with a new `Family` value and regenerate the site.

## Search Console and sitemap guidance
- Submit `https://aarbutus.co.in/sitemap.xml` to Google Search Console.
- Confirm the site is indexed with the canonical URL patterns shown in page metadata.
- Ensure no-disallow directives exist in `app/robots.js`.

## Troubleshooting
- If a page fails to build, verify `public/data/products.csv` columns and row completeness.
- If a product page returns 404, confirm the slug exists and is unique.
- If Open Graph previews are incorrect, confirm the page metadata and image URLs are valid.

## Recommended maintenance
- Keep the product spreadsheet as the source of truth.
- Regenerate product data after every catalog update.
- Review `README.md` and `components-explained.md` for site structure and maintenance workflows.
