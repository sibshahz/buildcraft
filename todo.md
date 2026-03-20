# ✅ Next Steps for BuildCraft Flooring SEO

## 🛠️ Content & Admin Tasks
- [ ] **Fill Metadata**: Navigate to the Payload Admin panel and manually populate the "SEO" tab for every Page, Service, and Project using the target keywords (e.g., "Premium LVT Flooring Ajman").
- [ ] **Upload OG Images**: Upload high-quality, product-specific social share images for key services like Mosque Carpets and SPC Flooring.
- [ ] **Alt Text Audit**: Ensure all uploaded media has descriptive `alt` text for screen readers and Google Image search.

## 🚀 Advanced Technical SEO
- [ ] **Breadcrumbs**: Implement a Breadcrumb component with `BreadcrumbList` JSON-LD for better "crawling" and search results appearance.
- [ ] **Canonical Tags**: Add a global canonical link to the root layout to ensure Google treats `buildcraftflooring.com` as the primary source.
- [ ] **Refactor Industries**: Currently, individual industries use modals. To rank for "Mosque Carpets in Ajman", these should be converted to separate dedicated pages at `/industries/[slug]`.

## 🌐 Deployment & Indexing
- [ ] **Search Console**: Submit the dynamic sitemap (`https://buildcraftflooring.com/sitemap.xml`) to Google Search Console.
- [ ] **GBP Integration**: Link the website to a high-quality Google Business Profile rooted in Ajman, UAE for Map prominence.
- [ ] **Hreflang (Optional)**: If you plan to add an Arabic version, implement `hreflang` tags early.

## ⚡ Performance
- [ ] **Core Web Vitals**: Run a Lighthouse audit and ensure all images are being lazily loaded and compressed via the `sharp` library in Payload.
