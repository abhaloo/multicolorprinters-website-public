export interface ServiceDetail {
  slug: string
  title: string
  tagline: string
  description: string[]
  features: {
    icon: string
    title: string
    description: string
  }[]
  idealFor: string[]
  heroImage: string
  metaDescription: string
  startingPrice?: string
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    tagline: "From concept to print-ready artwork — designed to make your brand stand out.",
    description: [
      "Our in-house graphic design team works closely with you to bring your brand vision to life. Whether you need a complete brand identity, marketing collateral, or print-ready artwork, we handle every detail with precision.",
      "From logo design and business card layouts to complex brochure designs and packaging artwork, our designers combine creative flair with deep technical knowledge of the printing process to ensure your designs translate perfectly from screen to paper.",
    ],
    features: [
      { icon: "Palette", title: "Brand Identity", description: "Logos, color systems, and visual guidelines that define your brand." },
      { icon: "Layout", title: "Print Layout", description: "Brochures, catalogs, and marketing materials designed for impact." },
      { icon: "Image", title: "Photo Editing", description: "Professional retouching and color correction for print-perfect images." },
      { icon: "FileCheck", title: "Pre-Press", description: "File preparation, proofing, and quality checks before production." },
      { icon: "Layers", title: "Packaging Design", description: "Structural and graphic design for custom product packaging." },
    ],
    idealFor: ["Brand Identity Projects", "Marketing Campaigns", "Product Packaging", "Corporate Stationery", "Event Materials", "Publication Design"],
    heroImage: "/images/services/graphic-design-hero.webp",
    metaDescription: "Professional graphic design services in Zanzibar. Brand identity, print layouts, packaging design, and pre-press preparation by Multi Color Printers.",
  },
  {
    slug: "digital-printing",
    title: "Digital Printing",
    tagline: "Fast, flexible, and vibrant — perfect for short runs and variable data.",
    description: [
      "Digital printing delivers stunning full-color output with the speed and flexibility that modern businesses need. Ideal for short runs, personalized marketing, and projects that need a fast turnaround without sacrificing quality.",
      "Our digital press produces offset-quality results on a wide range of paper stocks and specialty substrates. Variable data printing lets you personalize each piece — perfect for direct mail campaigns, event invitations, and targeted marketing.",
    ],
    features: [
      { icon: "Zap", title: "Fast Turnaround", description: "Same-day and next-day options available for urgent projects." },
      { icon: "Users", title: "Variable Data", description: "Personalize each print with unique names, codes, or images." },
      { icon: "Layers", title: "Short Run Friendly", description: "Cost-effective for quantities from 1 to 5,000 pieces." },
      { icon: "Palette", title: "Color Accuracy", description: "Pantone matching and calibrated color for brand consistency." },
      { icon: "FileText", title: "Multi-Substrate", description: "Print on coated, uncoated, textured, and specialty papers." },
    ],
    idealFor: ["Marketing Campaigns", "Personalized Mailers", "Short-Run Brochures", "Event Materials", "Variable Data Printing", "Prototyping"],
    heroImage: "/images/services/digital-printing-hero.webp",
    metaDescription: "Digital printing services in Zanzibar. Fast turnaround, variable data, short runs, and Pantone-matched color from Multi Color Printers.",
  },
  {
    slug: "offset-printing",
    title: "Offset Printing",
    tagline: "Unmatched consistency and quality for high-volume commercial print runs.",
    description: [
      "Offset printing is the gold standard for large-volume commercial jobs. When you need thousands of brochures, magazines, or books with consistent color and sharp detail on every sheet, offset delivers results that digital simply cannot match at scale.",
      "Our commercial offset press handles runs from 1,000 to 100,000+ with exceptional color fidelity. Add varnish coating, UV finishes, or spot colors to elevate your printed materials to premium quality.",
    ],
    features: [
      { icon: "BarChart3", title: "High Volume", description: "Cost-effective for runs of 1,000 to 100,000+ pieces." },
      { icon: "Paintbrush", title: "Spot Colors", description: "PMS/Pantone spot colors for exact brand matching." },
      { icon: "Sparkles", title: "Premium Finishes", description: "Varnish coating, UV finish, and specialty treatments." },
      { icon: "Repeat", title: "Consistency", description: "Identical color and quality from first sheet to last." },
      { icon: "BookOpen", title: "Publications", description: "Ideal for books, magazines, catalogs, and annual reports." },
    ],
    idealFor: ["Magazines & Catalogs", "Books & Annual Reports", "Marketing Collateral", "Corporate Stationery", "High-Volume Brochures", "Product Manuals"],
    heroImage: "/images/services/offset-printing-hero.webp",
    metaDescription: "Offset printing services in Zanzibar. High-volume commercial printing with consistent color, varnish coating, and spot colors by Multi Color Printers.",
  },
  {
    slug: "packaging",
    title: "Packaging Solutions",
    tagline: "Custom packaging that protects your product and elevates your brand.",
    description: [
      "Great packaging does more than protect — it sells. Our packaging solutions combine structural engineering with stunning print to create boxes, cartons, and containers that make your products stand out on any shelf.",
      "From concept through die-cutting and finishing, we handle every step in-house. Whether you need rigid gift boxes, folding cartons, or custom product packaging, our team ensures a perfect fit and a premium feel.",
    ],
    features: [
      { icon: "Box", title: "Custom Structures", description: "Die-cut designs engineered for your specific product dimensions." },
      { icon: "Sparkles", title: "Premium Finishes", description: "Embossing, foil stamping, and spot UV for a luxury feel." },
      { icon: "Palette", title: "Full-Color Print", description: "Vibrant CMYK and Pantone printing on all packaging surfaces." },
      { icon: "Shield", title: "Durable Materials", description: "Corrugated, rigid board, and specialty stocks for protection." },
      { icon: "Package", title: "Prototyping", description: "Physical samples before committing to a full production run." },
    ],
    idealFor: ["Product Packaging", "Gift Boxes", "Food & Beverage", "Retail Display Boxes", "Cosmetics & Beauty", "E-Commerce Shipping"],
    heroImage: "/images/services/packaging-hero.webp",
    metaDescription: "Custom packaging solutions in Zanzibar. Die-cut boxes, cartons, and branded packaging with premium finishes by Multi Color Printers.",
  },
  {
    slug: "large-format-printing",
    title: "Large Format Printing",
    tagline: "Go big — banners, signage, and displays that command attention.",
    description: [
      "When you need to make a big impression, large format printing delivers. From towering banners and exhibition displays to vehicle wraps and window graphics, we print vivid, high-resolution output on virtually any large-scale material.",
      "Our wide-format printers handle vinyl, fabric, mesh, rigid boards, and more. Whether it is an indoor exhibition stand or an outdoor billboard, we match the right material and finish to your environment for maximum impact and durability.",
    ],
    features: [
      { icon: "Maximize2", title: "Any Size", description: "From A2 posters to multi-meter banners and billboards." },
      { icon: "Sun", title: "Indoor & Outdoor", description: "UV-resistant inks and weatherproof materials for outdoor use." },
      { icon: "Layers", title: "Multiple Materials", description: "Vinyl, fabric, mesh, foam board, acrylic, and more." },
      { icon: "Eye", title: "High Resolution", description: "Photo-quality output at any scale for stunning visual impact." },
      { icon: "Truck", title: "Installation", description: "Delivery and installation support for large displays." },
    ],
    idealFor: ["Trade Show Displays", "Retail Signage", "Billboards & Outdoor Ads", "Vehicle Wraps", "Window Graphics", "Event Backdrops"],
    heroImage: "/images/services/large-format-hero.webp",
    metaDescription: "Large format printing in Zanzibar. Banners, signage, vehicle wraps, and exhibition displays by Multi Color Printers.",
  },
  {
    slug: "garment-printing",
    title: "Garment & T-Shirt Printing",
    tagline: "Custom apparel — from single samples to bulk uniform orders.",
    description: [
      "Turn any garment into a branded statement. Our garment printing services cover t-shirts, polo shirts, hoodies, caps, and workwear with vibrant, durable prints that withstand repeated washing.",
      "We offer multiple printing methods to match your design and budget — from heat transfer and DTF (direct-to-film) for photographic detail to screen printing for bulk orders. Whether you need 10 custom event shirts or 1,000 corporate uniforms, we deliver quality you can wear with pride.",
    ],
    features: [
      { icon: "Shirt", title: "DTF Printing", description: "Photographic detail and full-color gradients on any fabric color." },
      { icon: "Users", title: "Bulk Orders", description: "Competitive pricing for corporate uniforms and team apparel." },
      { icon: "Palette", title: "Vibrant Colors", description: "Rich, wash-resistant inks that stay bright over time." },
      { icon: "Ruler", title: "Any Garment", description: "T-shirts, polos, hoodies, caps, bags, and workwear." },
      { icon: "Heart", title: "Custom Designs", description: "We can design your artwork or print from your files." },
    ],
    idealFor: ["Custom Apparel", "Corporate Uniforms", "Event T-Shirts", "Sports Jerseys", "Promotional Giveaways", "Fashion Prints"],
    heroImage: "/images/services/garment-printing-hero.webp",
    metaDescription: "Garment and t-shirt printing in Zanzibar. Custom apparel, corporate uniforms, and event shirts by Multi Color Printers.",
  },
  {
    slug: "label-sticker-printing",
    title: "Label & Sticker Printing",
    tagline: "Precision labels and custom stickers for products, packaging, and promotion.",
    description: [
      "From product labels that meet regulatory standards to promotional stickers that spread your brand, we produce high-quality adhesive prints in any shape, size, or finish.",
      "Our label printing covers everything from simple paper stickers to durable waterproof vinyl labels with custom die-cut shapes. We handle short runs for product launches and high-volume orders for established product lines with equal precision.",
    ],
    features: [
      { icon: "Tag", title: "Custom Shapes", description: "Die-cut to any shape — circles, squares, or custom contours." },
      { icon: "Droplets", title: "Waterproof Options", description: "Vinyl and laminated labels that resist moisture and wear." },
      { icon: "Layers", title: "Multiple Finishes", description: "Matte, gloss, metallic, transparent, and textured stocks." },
      { icon: "BarChart3", title: "Any Quantity", description: "From 100 prototype labels to 100,000 production rolls." },
      { icon: "QrCode", title: "Variable Data", description: "Sequential numbering, barcodes, and QR codes per label." },
    ],
    idealFor: ["Product Packaging", "Brand Labels", "Promotional Stickers", "Price Tags", "Barcode Labels", "Safety Labels"],
    heroImage: "/images/services/label-sticker-hero.webp",
    metaDescription: "Label and sticker printing in Zanzibar. Custom die-cut labels, waterproof stickers, and product labels by Multi Color Printers.",
  },
  {
    slug: "uv-printing",
    title: "UV Printing",
    tagline: "Print on anything — wood, glass, metal, acrylic, and rigid surfaces.",
    description: [
      "UV printing uses ultraviolet light to instantly cure ink directly onto virtually any surface. This means vibrant, durable prints on materials that traditional presses cannot handle — acrylic, wood, metal, glass, leather, and rigid boards.",
      "The result is a scratch-resistant, fade-resistant print with exceptional detail and color vibrancy. Ideal for signage, promotional products, awards, and architectural panels where conventional printing falls short.",
    ],
    features: [
      { icon: "Sun", title: "Any Surface", description: "Print directly onto rigid and unconventional materials." },
      { icon: "Shield", title: "Durable Output", description: "Scratch-resistant, fade-resistant UV-cured inks." },
      { icon: "Sparkles", title: "Raised Effects", description: "Build up layers for textured, tactile print effects." },
      { icon: "Palette", title: "Vivid Colors", description: "CMYK + white ink for vibrant prints on dark surfaces." },
      { icon: "Zap", title: "Instant Cure", description: "UV light cures ink instantly — no drying time needed." },
    ],
    idealFor: ["Acrylic Signs", "Promotional Items", "Rigid Displays", "Custom Products", "Industrial Labels", "Architectural Panels"],
    heroImage: "/images/services/uv-printing-hero.webp",
    metaDescription: "UV printing in Zanzibar. Print on acrylic, wood, metal, glass, and rigid surfaces by Multi Color Printers.",
  },
  {
    slug: "embroidery",
    title: "Embroidery",
    tagline: "Premium stitched branding that adds texture, durability, and prestige.",
    description: [
      "Embroidery adds a level of quality and permanence that printing alone cannot achieve. Stitched logos and designs on polo shirts, caps, jackets, and workwear convey professionalism and durability that lasts the lifetime of the garment.",
      "Our embroidery service handles everything from single-color logos to complex multicolor designs. We digitize your artwork for optimal stitch quality and offer a wide selection of thread colors to match your exact brand palette.",
    ],
    features: [
      { icon: "Scissors", title: "Logo Digitization", description: "We convert your artwork into optimized embroidery files." },
      { icon: "Palette", title: "Color Matching", description: "Wide thread palette to match your exact brand colors." },
      { icon: "Shield", title: "Lasting Quality", description: "Stitched designs that outlast the garment itself." },
      { icon: "Shirt", title: "Any Garment", description: "Polos, caps, jackets, bags, towels, and workwear." },
      { icon: "Users", title: "Bulk Friendly", description: "Competitive pricing for corporate and uniform orders." },
    ],
    idealFor: ["Corporate Uniforms", "Caps & Hats", "Polo Shirts", "Workwear", "Hotel & Resort Staff", "School Uniforms"],
    heroImage: "/images/services/embroidery-hero.webp",
    metaDescription: "Professional embroidery services in Zanzibar. Stitched logos on uniforms, caps, and corporate apparel by Multi Color Printers.",
  },
  {
    slug: "screen-printing",
    title: "Screen Printing",
    tagline: "Bold, vibrant prints built for bulk — the classic method for apparel and signage.",
    description: [
      "Screen printing remains the go-to method for bulk apparel and promotional items. Each color is applied through a fine mesh screen, building up rich, opaque layers that pop on any fabric color — especially darks.",
      "For orders of 50 or more, screen printing offers the lowest per-unit cost with the most vibrant results. It is the industry standard for event shirts, team uniforms, promotional giveaways, and retail merchandise.",
    ],
    features: [
      { icon: "Layers", title: "Opaque Inks", description: "Rich, vibrant coverage even on dark-colored garments." },
      { icon: "DollarSign", title: "Bulk Value", description: "Per-unit cost drops significantly at higher quantities." },
      { icon: "Paintbrush", title: "Specialty Inks", description: "Metallic, glow-in-the-dark, puff, and discharge options." },
      { icon: "Shirt", title: "Versatile", description: "T-shirts, hoodies, tote bags, and other fabric items." },
      { icon: "Repeat", title: "Consistent", description: "Identical prints across hundreds or thousands of garments." },
    ],
    idealFor: ["Bulk Apparel", "Team Uniforms", "Promotional Giveaways", "Sports Jerseys", "Work Wear", "Event T-Shirts"],
    heroImage: "/images/services/screen-printing-hero.webp",
    metaDescription: "Screen printing in Zanzibar. Bulk t-shirt printing, team uniforms, and promotional apparel by Multi Color Printers.",
  },
]

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return serviceDetails.map((s) => s.slug)
}
