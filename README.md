# master — interactive showroom

A reference-inspired streetwear showroom for **master**, with custom product imagery and the developer credit **“built and developed by omkar_.builds”**.

## Run

```bash
npm install
npm run dev
```

The Vite server binds to `0.0.0.0` and allows preview hosts.

## Production

```bash
npm run build
npm run preview
```

## Included interactions

- 3D hanging-garment carousel
- Mouse drag, touch swipe, mouse wheel, and arrow-key navigation
- Animated collection-to-product zoom
- Hanging color tags for the distressed tank
- Front/back product views where back artwork is available
- Availability dialog with size selection
- Responsive desktop and mobile layouts
- Reduced-motion-friendly CSS and accessible controls
- Neon scrolling footer and persistent developer watermark

## Customize

- Product names, descriptions, prices, colors, and image paths: `src/data.js`
- Product imagery: `public/products/`
- High-resolution source artwork: `artwork-source/products/`
- Colors, spacing, motion styling, and responsive rules: `src/styles.css`
- Developer credit: `src/components/Watermark.jsx`

All storefront images are local optimized WebP assets; no external image or font service is required.
