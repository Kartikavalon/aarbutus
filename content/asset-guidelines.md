# Asset Naming Guidelines

Use these conventions so the website automatically picks up product images and datasheets.

## Product images
Place product images in `assets/images/products/`.

Use the product slug as the filename, for example:
- `molecular-sieve-3a.jpg`
- `activated-alumina.jpg`
- `ion-exchange.jpg`

Then set the `Image File` column in `data/products.csv` to the path:
- `/assets/images/products/molecular-sieve-3a.jpg`

If `Image File` is left empty, the site will attempt to load:
- `/assets/images/products/{slug}.jpg`

## Datasheets
Place technical datasheets in `assets/datasheets/`.

Use the product slug as the filename, for example:
- `molecular-sieve-3a.pdf`
- `activated-alumina.pdf`

Then set the `Datasheet` column in `data/products.csv` to the path:
- `/assets/datasheets/molecular-sieve-3a.pdf`

If `Datasheet` is left empty, the site will attempt to load:
- `/assets/datasheets/{slug}.pdf`

## Company and facility images
Place company-level images in `assets/images/company/`.

Use descriptive names such as:
- `facility-1.jpg`
- `plant-line.jpg`
- `warehouse-1.jpg`

Then set the `Company Image` column in `data/products.csv` to the path:
- `/assets/images/company/facility-1.jpg`

If `Company Image` is left empty, the site will default to:
- `/assets/images/company/{slug}-facility.jpg`
