# Aarbutus Technologies Website

This project has been rebuilt as a production-grade Next.js industrial website for Aarbutus Technologies.

## Project structure
- app/ – app-router pages for the website experience
- components/ – shared headers, footers and layout blocks
- data/ – generated structured product data and content files
- lib/ – data access and content helpers
- public/ – static assets, images and downloadable files
- scripts/ – content and product generation scripts

## Update product data from Excel
1. Update the CSV file in public/data/products.csv.
2. Run:
   ```bash
   node scripts/generate-products.js
   ```
3. Restart the dev server to reflect the new data.

## Add products
- Add a new row to public/data/products.csv using the same columns.
- Ensure the Slug value is unique.
- Regenerate the JSON file with the command above.

## Add categories
- Categories are derived from the Family column in the product spreadsheet.
- New families appear automatically in the products listing and category pages.

## Deploy to Vercel
1. Connect the repository to Vercel.
2. Set the framework to Next.js.
3. Deploy from the repository root.

## Regenerate content
- Products: node scripts/generate-products.js

## Update downloadable PDFs
- Place PDFs in public/downloads and reference them from the relevant content files.

## Update company information
- Edit the content helpers in lib/content.js and the page metadata in app/.

## Add new industries
- Extend the industries array in lib/content.js.

## Maintain the website
- Keep product data in the spreadsheet as the source of truth.
- Regenerate data whenever product information changes.
- Use the app router pages to add or refine new pages.
