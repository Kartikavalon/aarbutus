# Components and App Structure

This file explains the main website components, App Router pages, and the content/data workflow used by the Aarbutus site.

## Key directories

- `app/`
  - Contains App Router pages and page-specific metadata.
  - Each page folder maps directly to a public route.
  - Special files:
    - `app/layout.js` defines the global site layout, default metadata, fonts, and organization JSON-LD.
    - `app/robots.js` controls crawler rules and sitemap location.
    - `app/sitemap.js` generates the XML sitemap dynamically at build time.

- `components/`
  - `SiteHeader.js` renders the top navigation and brand link.
  - `SiteFooter.js` renders the footer with contact information and quick links.
  - `InquiryForm.js` is a client-side contact form that opens a pre-populated email.

- `lib/`
  - `products.js` reads `public/data/products.csv` and converts it into product records.
  - `content.js` provides static content arrays used for industries, news, and certificates.

- `public/`
  - `public/assets/images/` contains branded icons and product placeholders.
  - `public/data/products.csv` is the editable product catalog source.

- `scripts/`
  - `scripts/generate-products.js` converts the CSV into `data/products.json` for legacy workflows.

## How the product pages work

- The product catalog is built by reading `public/data/products.csv` in `lib/products.js`.
- Each CSV row is normalized into a product object with fields such as `product`, `slug`, `family`, `applications`, `overview`, and optional SEO fields.
- Dynamic pages are generated using App Router:
  - `app/products/page.js` lists all products and categories.
  - `app/products/[slug]/page.js` renders individual product detail pages.
  - `app/products/category/[slug]/page.js` renders category landing pages.

## SEO features in the current design

- `app/layout.js` provides default site metadata and organization structured data.
- `app/page.js`, `app/about/page.js`, `app/contact/page.js`, `app/products/page.js`, and `app/products/category/[slug]/page.js` all define page-specific metadata with titles, descriptions, canonical URLs, and Open Graph settings.
- `app/products/[slug]/page.js` generates:
  - dynamic metadata using product-specific `seo_title` and `meta_description` fields,
  - Open Graph image and URL metadata,
  - JSON-LD `Product` and `BreadcrumbList` schema for search engines.

## Main components

### `SiteHeader.js`

- Renders main navigation links.
- Links to the homepage, about, products, industries, applications, resources, downloads, and contact.
- Includes a CTA "Request a quote" button.

### `SiteFooter.js`

- Displays company contact details and address.
- Includes navigation shortcuts for product and resource pages.
- Provides legal copyright text.

### `InquiryForm.js`

- Client-side React form with required fields for product and email.
- On submit, opens the user
efault email client with a pre-filled message.
- Useful for quick customer inquiries from the contact page.

## Updating the site

### Change company metadata

- Update the brand information in `app/layout.js` and `components/SiteFooter.js`.
- Adjust page titles and descriptions in `app/*.js`.

### Add or update products

1. Edit `public/data/products.csv`.
2. Ensure each product has a unique `Slug` value.
3. For better search listings, add optional columns:
   - `seo_title`
   - `meta_description`
   - `image_alt`
4. Run `npm run generate-products` to refresh generated JSON.

### Add new pages

- Add a new folder under `app/` and export a page component.
- For SEO, include a `metadata` export or `generateMetadata` function.

### Add new categories

- Categories are derived from the `Family` column.
- Add products with a new `Family` value and regenerate the site.

## Notes for maintainers

- `public/data/products.csv` is the source of truth for product data.
- While legacy static HTML exists under `products/`, the active site uses App Router pages in `app/`.
- Keep the product CSV delimiter consistent with the parser configuration, currently `|` in `scripts/generate-products.js`.
- If Open Graph previews fail, check the metadata settings and ensure image URLs are absolute when required.
