# Aarbutus Technologies Website

This repository powers the Aarbutus Technologies website built with Next.js. It is designed for industrial chemical product marketing, product catalog browsing, quotations, and SEO-friendly buyer engagement.

## What this site includes
- A modern homepage with product highlights and capability messaging
- Product catalog pages generated from CSV data
- Dynamic product detail pages with SEO metadata and structured data
- A contact and inquiry experience that opens a pre-filled email
- Shared header, footer, and reusable UI components

## Main folders and their purpose
- `app/` – Route pages and page metadata. This is where homepage, about, products, contact, and other pages live.
- `components/` – Reusable sections such as the header, footer, and inquiry form.
- `lib/` – Data helpers and content arrays used to populate pages.
- `public/` – Static files such as images, icons, PDFs, and the main product CSV.
- `scripts/` – Helper scripts for product generation and catalog maintenance.
- `products/` – Legacy static product pages. The active site now primarily uses the App Router in `app/`.

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the local site in your browser.
4. Build for production when you are ready:
   ```bash
   npm run build
   ```

## How to edit the homepage content
The homepage content is defined in `app/page.js`.

You can change:
- Hero heading and supporting text
- Featured product section copy
- Category cards and industry cards
- CTA copy and client trust messaging
- Statistics and recent updates section

If you want to change the main message, edit the JSX inside the relevant section blocks in `app/page.js`.

## How to edit the About page
The About page is in `app/about/page.js`.

You can update:
- Company description and mission
- Leadership text
- Gallery section content
- Page title and SEO description

## How to add images to the About page
The About page now auto-discovers gallery images from the `public/assets/images/` folder and uses Next.js `Image` components for optimized delivery. You usually do not need to edit code — simply add images to the public folder and the gallery will pick them up.

Recommended process:

1. Place the image file in [public/assets/images/](public/assets/images/).
   - Good examples: `factory1.jpg`, `team1.jpg`, `plant1.webp`.
   - Keep filenames short and descriptive; avoid spaces.

2. Supported formats:
   - `.jpg`, `.jpeg`, `.png`, `.svg`, `.webp`.

3. No code change required for most uploads.
   - The gallery uses `app/about/page.js`'s `getGalleryImages()` which automatically selects preferred filenames (e.g. `factory1.jpg`, `team1.jpg`) or any files that match `/factory|team|plant|office|lab|about/i`.
   - It will pick up up to 6 images and fall back to placeholders if none are found.

4. If you prefer to control images manually, open [app/about/page.js](app/about/page.js#L1-L120) and either:
   - Edit the `preferredNames` array inside `getGalleryImages()` to match your filenames, or
   - Replace the gallery rendering with static `Image` entries, for example:
     ```jsx
     <div className="gallery-grid">
       <div className="gallery-item">
         <Image src="/assets/images/factory1.jpg" alt="Factory view" width={1200} height={800} priority />
       </div>
     </div>
     ```

5. Best practices:
   - Use landscape images for gallery cards; aim for an export width around 1200px and keep file sizes reasonable (prefer < 200–300 KB).
   - Convert to `webp` when possible for better compression.
   - Provide meaningful `alt` text; this helps accessibility and SEO.
   - If you want the image to load earlier for LCP, add `priority` to a specific `Image` or add a preload in `app/layout.js`.

6. Troubleshooting
   - If an image does not appear, confirm the file exists in [public/assets/images/](public/assets/images/) and matches the supported extensions.
   - To force-refresh images during development, restart the dev server or clear the browser cache.

This README previously showed manual `<img>` tags; the code now uses Next.js `Image` for better performance and automatic selection logic.

## How to change the logo and favicon
- Logo: update the file referenced in `components/SiteHeader.js`
- Favicon: update the icon entry in `app/layout.js`

Typical workflow:
1. Place the new image in `public/assets/images/` or `public/`
2. Update the `src` or `icon` path
3. Restart the dev server if needed

## How to edit contact details
The main contact information lives in:
- `components/SiteFooter.js`
- `app/contact/page.js`
- `app/layout.js`

Update:
- Company email
- Phone number
- Office address
- Contact page copy

## How to change the inquiry form behavior
The inquiry form is in `components/InquiryForm.js`.

You can change:
- The form fields
- The labels and placeholders
- The email recipient
- The pre-filled subject and body format

If the mail portal does not open in a browser, the form now tries a fallback method that opens the mail client or redirects to the generated `mailto:` link.

## How to edit product data
Products are driven from `public/data/products.csv`.

### Recommended workflow
1. Open `public/data/products.csv`
2. Update the product information you need
3. Keep the `Slug` value unique and URL-friendly
4. Run:
   ```bash
   npm run generate-products
   ```
5. Restart the app if necessary

### Useful product columns
- `Product` – display name
- `Slug` – URL slug
- `Family` – category/family name
- `Overview` – short summary shown on cards
- `Applications` – use case description
- `Typical Spec` – technical specification text
- `Grades / Forms` – packaging or grade information
- `seo_title` – custom SEO title
- `meta_description` – custom SEO description
- `image_alt` – alt text for product image

## How to add or change product categories
Categories are derived from the `Family` column in the CSV.

To add a new category:
1. Add a new product with a new `Family` value
2. Regenerate the product data
3. The category page will appear automatically

## How to edit a product image
Product images are controlled through the product data in `public/data/products.csv`.

### Step-by-step
1. Open `public/data/products.csv`.
2. Find the product row you want to update.
3. Look for the column named `Image File`.
4. Enter the image path you want to use.
   - Example: `/assets/images/activated-carbon.jpg`
5. Save the CSV file.
6. Run the regeneration command:
   ```bash
   npm run generate-products
   ```
7. Restart the development server if the existing page still shows the old image.

### Important notes
- The image path must start with `/assets/images/` if it is stored in the public image folder.
- The file must actually exist in `public/assets/images/`.
- Good file formats are `.jpg`, `.jpeg`, `.png`, `.svg`, and `.webp`.
- Use short, descriptive names such as `activated-carbon.jpg` or `molecular-sieve-4a.png`.

### Example
If you want to change the image for a product, use a row like this:
```csv
Product|Slug|Family|Image File
Activated Carbon|activated-carbon|Adsorbents|/assets/images/activated-carbon.jpg
```

### Where the image appears
- The image will appear on the product cards and the product detail page.
- If the product image is missing or the path is wrong, the site will fall back to the placeholder image.

## How to update SEO metadata
SEO and metadata are controlled in:
- `app/layout.js` for global defaults
- `app/page.js` for homepage metadata
- `app/about/page.js` for about page metadata
- `app/contact/page.js` for contact page metadata
- `app/products/[slug]/page.js` for product-specific metadata

You can update:
- Page titles
- Descriptions
- Canonical URLs
- Open Graph preview images and text

## How to add a new page
To create a new page:
1. Create a folder inside `app/` with the page name
2. Add a `page.js` file inside it
3. Export a component from that file
4. Add metadata if you want SEO support

Example:
```bash
app/pricing/page.js
```

## How to add a new section to an existing page
You can insert a new section by adding JSX inside the page component.

Example pattern:
```jsx
<section className="section container">
  <h2>New section</h2>
  <p>Write your content here.</p>
</section>
```

## How to style sections
The website uses global CSS from `styles.css`.

You can add new styles there for:
- layout spacing
- section backgrounds
- cards and buttons
- typography and headings

## Deployment on Vercel
1. Connect the repository to Vercel
2. Choose the Next.js framework
3. Deploy from the repository root
4. Make sure the environment and build settings remain standard

## Common troubleshooting
- If the build fails, check the JSX carefully for missing tags
- If a product page returns 404, verify the slug is unique and valid
- If an image does not show, confirm the file path is correct and exists in `public/assets/images/`
- If the inquiry form does not open email correctly, try your browser’s mail app permissions and confirm the generated `mailto:` link is valid

## Favicon, HTTPS and Search Console checklist
Follow these steps to ensure HTTPS, favicon visibility and Search Console coverage.

1. Verify HTTPS on your deployment
   - Visit `https://aarbutus.co.in` and confirm the browser shows a secure lock without warnings.
   - In Vercel, ensure the custom domain is added and the SSL certificate status is `Enabled`.

2. Add canonical and HTTPS to Search Console
   - In Google Search Console add the property `https://aarbutus.co.in` (use the exact protocol + host).
   - Submit `https://aarbutus.co.in/sitemap.xml` from the Sitemaps section.

3. Improve favicon/favicon.ico support
   - The site includes `public/favicon.svg` and a logo in `public/assets/`.
   - For best compatibility, generate a `favicon.ico` and `favicon-192.png` (favicon generators online can create these from your SVG).
   - Place them in `public/` and verify the files exist.
   - If you need a quick conversion, use an online favicon generator and upload the `favicon.svg` or `logo-icon.svg` to produce `favicon.ico` and `apple-touch-icon.png`.

4. Claim your Google Business Profile
   - Go to Google Business Profile and claim the listing for `Aarbutus Technologies Pvt Ltd`.
   - Use the exact address, phone, and `https://aarbutus.co.in` as the website.

5. Re-crawl and monitor
   - In Search Console use the URL inspection tool for your homepage and request indexing.
   - Monitor coverage and Core Web Vitals reports; address any HTTPS or mixed-content warnings.

### Commands and quick checks (run locally)
```powershell
# Check that the site is reachable over HTTPS
curl -I https://aarbutus.co.in

# Ensure sitemap is reachable
curl -I https://aarbutus.co.in/sitemap.xml
```

## Lighthouse remediation checklist (priority actions)
Use this checklist to improve the Lighthouse scores reported for `https://aarbutus.co.in`.

1. Identify and preload the LCP resource
   - Find the Largest Contentful Paint (usually the main hero image or prominent product image).
   - Use Next.js `Image` with `priority` or add a `<link rel="preload" as="image" href="/path/to/lcp.jpg">` in `app/layout.js` for that resource.

2. Optimize images
   - Convert large JPEG/PNG to `webp` where supported and keep appropriate dimensions.
   - Use Next.js `<Image />` (automatic resizing and modern formats).

3. Reduce main-thread blocking JavaScript
   - Audit large bundles via `next build` output and source-map-explorer or webpack-bundle-analyzer.
   - Use dynamic imports (`next/dynamic`) for non-critical components and defer analytics or heavy widgets.

4. Avoid long main-thread tasks
   - Move heavy computation off the main thread or into server-side code when possible.
   - Replace synchronous loops and large JS libraries with lighter alternatives.

5. Accessibility fixes (quick wins)
   - Fix contrast issues (adjust colors in `styles.css` and ensure text meets WCAG ratios).
   - Ensure heading order is semantically correct (H1 → H2 → H3) across pages.
   - Add or correct `alt` attributes on image tags (avoid redundant text).

6. Re-run Lighthouse
   - Use Chrome DevTools Lighthouse or Lighthouse CI to re-evaluate after each change.

Quick Lighthouse command (requires Node & npm package):
```bash
npx lhci autorun --collect.url=https://aarbutus.co.in --upload.target=temporary-public-storage
```

## Recommended maintenance habits
- Keep product CSV data as the main source of truth
- Update the README whenever you add major features or page sections
- Review page metadata after changing company messaging or service descriptions
- Keep images compressed and descriptive for better performance and SEO
