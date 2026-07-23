# Aarbutus Technologies Website and Brochure Package

This workspace contains a professional B2B industrial website and brochure package for `aarbutus.co.in`.

## Files
- `index.html` – homepage
- `products.html` – product catalog
- `applications.html` – application and industry mapping
- `about.html` – company story and positioning
- `resources.html` – technical resources and FAQ
- `contact.html` – inquiry / contact page
- `brochure.html` – multi-page brochure layout suitable for print-to-PDF
- `styles.css` – corporate styling and responsive layout
- `script.js` – reusable product catalog renderer
- `data/products.csv` – editable product master data sheet
- `assets/images/` – sample placeholder product image repository

## Product data maintenance
Update `data/products.csv` to revise, add, or remove products. The website product catalog automatically reads the CSV and reflects changes on reload.

## Image repository
Use the SVG placeholder files in `assets/images/` as a starting repository. Map each image name in the `Image File` column of `data/products.csv`.

## Host locally
From the workspace root, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.
