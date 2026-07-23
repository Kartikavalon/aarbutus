# Next.js Version for Aarbutus Website

This workspace now includes a minimal Next.js app so the site can be deployed on Vercel and use `@vercel/analytics`.

## Setup

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Product data

The product catalog still loads from `data/products.csv` at runtime.

## Analytics

The app already imports `@vercel/analytics/react` in `pages/_app.js`.

## Notes

- Static files in `assets/` are served from `/assets/...`
- Add product images to `assets/images/products/`
- Add datasheets to `assets/datasheets/`
- Add company images to `assets/images/company/`
