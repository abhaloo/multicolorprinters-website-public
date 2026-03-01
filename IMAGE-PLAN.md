# Multi Color Printers — Complete Image Plan

## Format & Resolution Standards

| Use Case | Format | Resolution | Notes |
|----------|--------|------------|-------|
| Hero / large photos | `.jpg` | 1400x1200px (2x for retina) | Displayed at 700x600, so 2x needed |
| Service section images | `.jpg` | 1600x1200px (2x for 4:3 aspect) | Displayed at ~800x600 in grid |
| Portfolio items | `.jpg` | 1200x900px (2x for 4:3 aspect) | Displayed at ~600x450 in 3-col grid |
| Favicons (light/dark) | `.png` | 32x32px | Exactly 32x32 |
| Apple touch icon | `.png` | 180x180px | Standard Apple spec |
| SVG favicon | `.svg` | Vector (any) | Scalable |
| OG / social sharing | `.jpg` | 1200x630px | Standard OG image size |

All photos should be optimized/compressed. Next.js Image component handles WebP conversion automatically, so `.jpg` source files are fine.

---

## CATEGORY 1: AI-Generated Stock Photos (7 images)

These are generic commercial/industrial scenes. Generate with an AI image generator (Midjourney, DALL-E, Flux, etc.).

### 1. Hero Image — `public/images/hero-printing.jpg`
**Currently exists** (107KB) — evaluate if quality is sufficient, otherwise regenerate.

**Prompt:** "Professional commercial printing press in action, vibrant CMYK sheets coming off a large-format offset printing machine, clean modern print shop interior, dramatic warm lighting, shallow depth of field, high-end industrial photography style, no text or logos visible"

**Resolution:** 1400x1200px, JPG, high quality

---

### 2. Graphic Design Service — `public/images/services/graphic-design.jpg`

**Prompt:** "Top-down flat lay of a graphic designer's workspace — a large monitor showing a colorful brochure layout, Pantone color swatches fanned out, printed proof sheets, stylus pen on a drawing tablet, clean white desk, soft natural lighting, editorial photography style, no faces visible"

**Resolution:** 1600x1200px, JPG

---

### 3. Digital Printing Service — `public/images/services/digital-printing.jpg`

**Prompt:** "Close-up of a modern HP Indigo digital printing press producing vivid full-color marketing materials, sheets of freshly printed brochures with rich saturated colors, clean high-tech print production environment, professional industrial photography, blue-tinted ambient lighting"

**Resolution:** 1600x1200px, JPG

---

### 4. Offset Printing Service — `public/images/services/offset-printing.jpg`

**Prompt:** "Heidelberg offset printing press in operation, CMYK ink rollers visible, large sheets of paper feeding through the press, high-volume commercial print production floor, warm industrial lighting, detailed mechanical close-up showing precision engineering, professional photography"

**Resolution:** 1600x1200px, JPG

---

### 5. Packaging Service — `public/images/services/packaging.jpg`

**Prompt:** "Beautifully designed custom product packaging boxes on a clean surface — luxury cosmetic boxes, food packaging, retail display boxes with embossed logos and foil stamping details, soft studio lighting, product photography style, variety of shapes and finishes, white background"

**Resolution:** 1600x1200px, JPG

---

### 6. About Page — Company/Workshop Shot — `public/images/about/workshop.jpg`
*(Optional — only if you don't have a real photo of the shop)*

**Prompt:** "Interior of a professional commercial printing house, organized workspace with stacks of freshly printed materials, large format printer in background, clean and well-lit production area, warm tones, conveying craftsmanship and professionalism, no people or faces visible"

**Resolution:** 1600x1200px, JPG

---

### 7. OG / Social Sharing Image — `public/og-image.jpg`

**Prompt:** "Professional marketing banner composition — vibrant printed materials (business cards, brochures, banners) arranged in an elegant spread on a dark navy surface, with dramatic lighting highlighting the print quality, rich saturated colors, clean commercial photography, horizontal orientation, leave space on left side for text overlay"

**Resolution:** 1200x630px, JPG

---

## CATEGORY 2: Portfolio Project Photos (15 images)

These replace the gradient placeholders on the home page (3 preview cards) and portfolio page (12 gallery items). You have two options:

### Option A: Use Real Photos of Past Work (Recommended)
Photograph or scan actual completed projects from Multi Color Printers' archives. See **CATEGORY 4** below for what to photograph.

### Option B: AI-Generate Representative Samples
If real portfolio photos aren't available yet, generate these:

| # | File Path | Prompt | Res |
|---|-----------|--------|-----|
| 1 | `public/images/portfolio/tourism-brochure.jpg` | "A set of luxury tourism brochures for a tropical island resort, tri-fold design with turquoise ocean imagery, laid flat on a dark surface, professional print photography, high-end paper stock visible" | 1200x900 |
| 2 | `public/images/portfolio/annual-report.jpg` | "Professional corporate annual report booklet, open to a spread showing data visualizations and charts, printed on premium matte paper, placed on a minimal desk surface, editorial photography" | 1200x900 |
| 3 | `public/images/portfolio/brand-identity.jpg` | "Complete brand identity package — business cards, letterhead, envelope, and folder all matching with a cohesive spice-themed design in warm earth tones, arranged on a textured surface, professional flat lay" | 1200x900 |
| 4 | `public/images/portfolio/hotel-menu.jpg` | "Luxury hotel restaurant menu set — dinner menu, wine list, and dessert card, printed on thick textured cream paper with gold foil accents, arranged on a dark wooden table, elegant product photography" | 1200x900 |
| 5 | `public/images/portfolio/product-boxes.jpg` | "Collection of custom retail product packaging boxes in various sizes, vibrant printed designs, some with embossed elements and spot UV, arranged on a clean white surface, commercial product photography" | 1200x900 |
| 6 | `public/images/portfolio/magazine-layout.jpg` | "Open lifestyle magazine showing a beautifully designed double-page spread, glossy paper with rich photography and clean typography, placed on a marble surface, editorial photography style" | 1200x900 |
| 7 | `public/images/portfolio/conference-materials.jpg` | "Corporate conference materials set — printed program booklet, name badges, branded folder, and event schedule cards, arranged neatly on a white surface, professional flat lay photography" | 1200x900 |
| 8 | `public/images/portfolio/food-packaging.jpg` | "Premium food product packaging — coffee bags, spice jars with custom labels, and tea boxes with tropical design elements, arranged in a styled product photography composition" | 1200x900 |
| 9 | `public/images/portfolio/wedding-invitation.jpg` | "Elegant wedding invitation suite — main invitation, RSVP card, details card, and envelope with calligraphy, printed on luxurious textured paper with gold foil details, romantic flat lay on a linen surface" | 1200x900 |
| 10 | `public/images/portfolio/corporate-stationery.jpg` | "Complete corporate stationery set — letterhead, business cards, compliment slips, and branded envelopes in a modern blue and white design, professional flat lay on a slate surface" | 1200x900 |
| 11 | `public/images/portfolio/retail-displays.jpg` | "Retail point-of-sale display stands and counter cards with bold colorful graphics, placed in a realistic retail environment, commercial photography style" | 1200x900 |
| 12 | `public/images/portfolio/event-posters.jpg` | "Collection of vibrant event promotion posters in various sizes, mounted and displayed together, bold typography and dynamic graphics, cultural event theme with African design elements" | 1200x900 |

**Home page preview cards** (3 images) — reuse portfolio images #1, #5, and #10 (tourism brochure, product boxes, corporate stationery) since the home page shows "Zanzibar Tourism Campaign," "Spice Island Product Packaging," and "Hotel Chain Brand Collateral."

---

## CATEGORY 3: Client/Brand Logos (18 logos)

These are for the scrolling clients strip on the home page. Currently shown as text only. If you want to upgrade to actual logos:

### Collection Plan

1. **Government & institutional logos** — typically available on official websites:
   - ZRA (Zanzibar Revenue Authority) — check zra.go.tz
   - Zanzibar Ports Corporation — check zpc.go.tz
   - Zanzibar University — check zu.ac.tz
   - Commission for Tourism (ZCT) — check zct.go.tz
   - Zanzibar Petroleum Ltd

2. **Hotel & resort logos** — check each hotel's official website or contact their marketing dept:
   - Sea Cliff Resort & Spa
   - The Residence Hotel
   - Neptune Pwani Beach Resort & Spa
   - TUI Blue Bahari
   - RIU Palace
   - Lux Marijani
   - Blue Bay Beach Resort
   - RIU Jambo
   - Zanzibar Serena Hotel
   - Ocean Paradise Beach Resort & Spa
   - Zuri White Sands
   - Sultan Sands Island Hotel
   - Kwanza Aldiana

### How to collect:
- Email each client's marketing/PR department requesting their logo in SVG or high-res PNG (transparent background)
- Download from their official media/press kit pages if available
- For hotels in international chains (RIU, TUI, Serena), logos are often on brand resource pages

### File specs needed:
- **Format:** SVG preferred (scales perfectly), or PNG with transparent background
- **Resolution:** If PNG, at least 400x200px
- **Color:** Full color original — we'll apply grayscale filter via CSS
- **Location:** `public/images/clients/[company-slug].svg` or `.png`

### Full list:
```
public/images/clients/sea-cliff-resort.svg
public/images/clients/the-residence-hotel.svg
public/images/clients/zra.svg
public/images/clients/zanzibar-ports.svg
public/images/clients/zanzibar-university.svg
public/images/clients/neptune-pwani.svg
public/images/clients/tui-blue-bahari.svg
public/images/clients/riu-palace.svg
public/images/clients/lux-marijani.svg
public/images/clients/blue-bay-beach.svg
public/images/clients/riu-jambo.svg
public/images/clients/zanzibar-serena.svg
public/images/clients/ocean-paradise.svg
public/images/clients/zct.svg
public/images/clients/zanzibar-petroleum.svg
public/images/clients/zuri-white-sands.svg
public/images/clients/sultan-sands.svg
public/images/clients/kwanza-aldiana.svg
```

**NOTE:** The current text-only carousel already looks professional. Collecting all 18 logos is a nice-to-have, not urgent. Prioritize real portfolio photos over logos.

---

## CATEGORY 4: Photos to Take Manually

These are photos that MUST be taken at the Multi Color Printers shop/office. No stock photo or AI image can substitute.

### Save to: `public/images/` (organize in subfolders)

### Required Manual Photos:

#### 4.1 The Shop / Facility
| Photo | Description | Resolution | Format | File Path |
|-------|-------------|------------|--------|-----------|
| Storefront | Front exterior of the shop with signage visible, good lighting (golden hour ideal) | 1600x1200px | JPG | `public/images/about/storefront.jpg` |
| Production floor (wide) | Wide-angle shot of the main production area showing the printing equipment | 1600x1200px | JPG | `public/images/about/production-floor.jpg` |
| HP Indigo 5500 | Clear, well-lit photo of the HP Indigo 5500 press (for equipment section on About page) | 1600x1200px | JPG | `public/images/about/hp-indigo-5500.jpg` |
| Heidelberg SpeedMaster | Clear, well-lit photo of the Heidelberg SpeedMaster press | 1600x1200px | JPG | `public/images/about/heidelberg-speedmaster.jpg` |

#### 4.2 The Team (Optional but recommended)
| Photo | Description | Resolution | Format | File Path |
|-------|-------------|------------|--------|-----------|
| Team group shot | Staff standing together in the shop or in front of equipment, looking professional and friendly | 1600x1200px | JPG | `public/images/about/team.jpg` |
| Founder/owner portrait | Professional headshot-style portrait for an About page leadership section | 800x800px | JPG | `public/images/about/founder.jpg` |

#### 4.3 Real Portfolio Work Samples
Photograph actual completed projects. Lay them out on a clean surface with good lighting.

| Photo | What to Capture | Resolution | Format | File Path |
|-------|-----------------|------------|--------|-----------|
| Business cards spread | Several business card designs fanned out | 1200x900px | JPG | `public/images/portfolio/real/business-cards.jpg` |
| Brochures | 2-3 brochure designs, one open showing interior | 1200x900px | JPG | `public/images/portfolio/real/brochures.jpg` |
| Large format sample | A banner or poster being printed or displayed | 1200x900px | JPG | `public/images/portfolio/real/large-format.jpg` |
| Packaging samples | Product boxes/packaging produced for clients | 1200x900px | JPG | `public/images/portfolio/real/packaging.jpg` |
| Books/booklets | Printed books or booklets, stacked or open | 1200x900px | JPG | `public/images/portfolio/real/books.jpg` |
| Stationery set | Letterheads + envelopes + cards from a real client | 1200x900px | JPG | `public/images/portfolio/real/stationery.jpg` |

#### Photography Tips:
- Use natural daylight or soft diffused lighting (avoid harsh shadows)
- Clean backgrounds — white table, dark desk, or clean shop floor
- Shoot slightly from above (30-45 degree angle) for flat-lay product shots
- Keep the camera steady (use a tripod if possible)
- Shoot at the highest resolution your camera allows, then resize down
- Avoid visible clutter in the background

---

## CATEGORY 5: Favicons & App Icons

These are generated from the company branding (the 4-color bar logo).

### Files Needed:
| File | Size | Format | Description |
|------|------|--------|-------------|
| `public/icon-light-32x32.png` | 32x32px | PNG | Favicon for light mode (dark icon on transparent bg) |
| `public/icon-dark-32x32.png` | 32x32px | PNG | Favicon for dark mode (light icon on transparent bg) |
| `public/icon.svg` | Vector | SVG | Scalable favicon — the 4-color bars mark |
| `public/apple-icon.png` | 180x180px | PNG | Apple touch icon — 4-color bars on white/navy bg |

### Design:
The favicon should be a simplified version of the navbar logo — the 4 colored vertical bars:
- Bar 1: `#F21D2F` (primary red)
- Bar 2: `#2E338C` (secondary navy)
- Bar 3: `#9395BF` (accent purple)
- Bar 4: `#F25764` (coral/salmon)

**Light mode version:** 4 bars on transparent background
**Dark mode version:** 4 bars on transparent background (same bars work on both)
**Apple icon:** 4 bars centered on a navy (`#2E338C`) background with rounded corners

These can be created in Figma, Illustrator, or any vector editor in 5 minutes.

---

## Summary — Priority Order

1. **Favicons** (Category 5) — Quick to create, currently broken/missing references
2. **Service page photos** (Category 1, items 2-5) — Replace gradient placeholders on main Services page
3. **Portfolio photos** (Category 2 or 4.3) — Replace gradient placeholders, use real work if possible
4. **Manual facility photos** (Category 4.1) — For About page equipment section
5. **Hero image** (Category 1, item 1) — Evaluate existing, regenerate if needed
6. **OG image** (Category 1, item 7) — For social sharing
7. **Client logos** (Category 3) — Nice-to-have, text carousel works well already
8. **Team photos** (Category 4.2) — Optional, only if you want a team section
