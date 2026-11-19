export interface NavItem {
  name: string;
  slug: string;
  badge?: string;
  subcategories?: {
    name: string;
    slug: string;
    subcategories?: {
      name: string;
      slug: string;
    }[];
  }[];
}

export const navigationItems: NavItem[] = [
  {
    name: "Home Decor & Accessories",
    slug: "home-decor-accessories",
    badge: "Popular",
    subcategories: [
      {
        name: "Vases & Plant Pots",
        slug: "vases-plant-pots",
        subcategories: [
          { name: "Ceramic Vases", slug: "ceramic-vases" },
          { name: "Glass Floral Vessels", slug: "glass-floral-vessels" },
          { name: "Sculptural Pots", slug: "sculptural-pots" },
          { name: "Hanging Planters", slug: "hanging-planters" }
        ]
      },
      {
        name: "Mirrors & Wall Art",
        slug: "mirrors-wall-art",
        subcategories: [
          { name: "Organic Shape Mirrors", slug: "organic-shape-mirrors" },
          { name: "Arched Floor Mirrors", slug: "arched-floor-mirrors" },
          { name: "Canvas Art Prints", slug: "canvas-art-prints" },
          { name: "Handmade Tapestries", slug: "handmade-tapestries" }
        ]
      },
      {
        name: "Candles & Scents",
        slug: "candles-scents",
        subcategories: [
          { name: "Botanical Soy Candles", slug: "botanical-soy-candles" },
          { name: "Reed Diffusers", slug: "reed-diffusers" },
          { name: "Sculptural Candleholders", slug: "sculptural-candleholders" },
          { name: "Incense & Burners", slug: "incense-burners" }
        ]
      },
      {
        name: "Clocks & Table Decor",
        slug: "clocks-table-decor",
        subcategories: [
          { name: "Minimalist Wall Clocks", slug: "minimalist-wall-clocks" },
          { name: "Marble & Travertine Trays", slug: "marble-travertine-trays" },
          { name: "Decorative Bowls", slug: "decorative-bowls" },
          { name: "Bookends & Sculptures", slug: "bookends-sculptures" }
        ]
      }
    ]
  },
  {
    name: "Desks & Desk Chairs",
    slug: "desks-desk-chairs",
    subcategories: [
      {
        name: "Working Desks",
        slug: "working-desks",
        subcategories: [
          { name: "Solid Oak Desks", slug: "solid-oak-desks" },
          { name: "Standing & Adjustable Desks", slug: "standing-adjustable-desks" },
          { name: "Compact Writing Desks", slug: "compact-writing-desks" },
          { name: "Corner & Executive Desks", slug: "corner-executive-desks" }
        ]
      },
      {
        name: "Ergonomic & Task Chairs",
        slug: "ergonomic-task-chairs",
        subcategories: [
          { name: "Ergonomic Mesh Chairs", slug: "ergonomic-mesh-chairs" },
          { name: "Bouclé Office Chairs", slug: "boucle-office-chairs" },
          { name: "Leather Executive Chairs", slug: "leather-executive-chairs" },
          { name: "Swivel Studio Chairs", slug: "swivel-studio-chairs" }
        ]
      },
      {
        name: "Desk Organization",
        slug: "desk-organization",
        subcategories: [
          { name: "Monitor Risers & Stands", slug: "monitor-risers-stands" },
          { name: "Cable Organizers", slug: "cable-organizers" },
          { name: "Leather Desk Mats", slug: "leather-desk-mats" },
          { name: "Stationery Trays", slug: "stationery-trays" }
        ]
      }
    ]
  },
  {
    name: "Rugs & Home Textiles",
    slug: "rugs-home-textiles",
    subcategories: [
      {
        name: "Area Rugs",
        slug: "area-rugs",
        subcategories: [
          { name: "Hand-Knotted Wool Rugs", slug: "hand-knotted-wool-rugs" },
          { name: "Natural Jute & Sisal Rugs", slug: "natural-jute-sisal-rugs" },
          { name: "Nordic Geometric Rugs", slug: "nordic-geometric-rugs" },
          { name: "Washable Runner Rugs", slug: "washable-runner-rugs" }
        ]
      },
      {
        name: "Cushions & Throws",
        slug: "cushions-throws",
        subcategories: [
          { name: "Linen Cushion Covers", slug: "linen-cushion-covers" },
          { name: "Textured Knit Throws", slug: "textured-knit-throws" },
          { name: "Velvet Accent Pillows", slug: "velvet-accent-pillows" },
          { name: "Wool Bed Blankets", slug: "wool-bed-blankets" }
        ]
      },
      {
        name: "Curtains & Bed Linens",
        slug: "curtains-bed-linens",
        subcategories: [
          { name: "Sheer Voile Curtains", slug: "sheer-voile-curtains" },
          { name: "Blackout Linen Drapes", slug: "blackout-linen-drapes" },
          { name: "Washed Cotton Bedding Sets", slug: "washed-cotton-bedding-sets" },
          { name: "Duvet & Pillow Sets", slug: "duvet-pillow-sets" }
        ]
      }
    ]
  },
  {
    name: "Lighting",
    slug: "lighting",
    badge: "Trending",
    subcategories: [
      {
        name: "Pendant & Ceiling Lights",
        slug: "pendant-ceiling-lights",
        subcategories: [
          { name: "Woven Rattan Pendants", slug: "woven-rattan-pendants" },
          { name: "Nordic Opal Glass Chandeliers", slug: "nordic-opal-glass-chandeliers" },
          { name: "Linear Dining Lights", slug: "linear-dining-lights" },
          { name: "Flush Mount Fixtures", slug: "flush-mount-fixtures" }
        ]
      },
      {
        name: "Table & Desk Lamps",
        slug: "table-desk-lamps",
        subcategories: [
          { name: "Mushroom Accent Lamps", slug: "mushroom-accent-lamps" },
          { name: "Ceramic Base Lamps", slug: "ceramic-base-lamps" },
          { name: "Brass Reading Lamps", slug: "brass-reading-lamps" },
          { name: "Rechargeable Cordless Lamps", slug: "rechargeable-cordless-lamps" }
        ]
      },
      {
        name: "Floor & Wall Lights",
        slug: "floor-wall-lights",
        subcategories: [
          { name: "Arched Floor Lamps", slug: "arched-floor-lamps" },
          { name: "Tripod Wood Lamps", slug: "tripod-wood-lamps" },
          { name: "Adjustable Wall Sconces", slug: "adjustable-wall-sconces" },
          { name: "Dimmable Ambient Bars", slug: "dimmable-ambient-bars" }
        ]
      }
    ]
  },
  {
    name: "Sofas & Armchairs",
    slug: "sofas-armchairs",
    subcategories: [
      {
        name: "Sofas & Couches",
        slug: "sofas-couches",
        subcategories: [
          { name: "Modular Sectional Sofas", slug: "modular-sectional-sofas" },
          { name: "3-Seater Linen Sofas", slug: "3-seater-linen-sofas" },
          { name: "Convertible Sofa Beds", slug: "convertible-sofa-beds" },
          { name: "Curved Bouclé Sofas", slug: "curved-boucle-sofas" }
        ]
      },
      {
        name: "Armchairs & Loungers",
        slug: "armchairs-loungers",
        subcategories: [
          { name: "Mid-Century Lounge Chairs", slug: "mid-century-lounge-chairs" },
          { name: "Cozy Accent Armchairs", slug: "cozy-accent-armchairs" },
          { name: "Rocking & Reclining Chairs", slug: "rocking-reclining-chairs" },
          { name: "Rattan & Wicker Chairs", slug: "rattan-wicker-chairs" }
        ]
      },
      {
        name: "Ottomans & Benches",
        slug: "ottomans-benches",
        subcategories: [
          { name: "Storage Footstools", slug: "storage-footstools" },
          { name: "Entryway Benches", slug: "entryway-benches" },
          { name: "Round Poufs", slug: "round-poufs" }
        ]
      }
    ]
  },
  {
    name: "Storage & Organization",
    slug: "storage-organization",
    subcategories: [
      {
        name: "Shelving & Bookcases",
        slug: "shelving-bookcases",
        subcategories: [
          { name: "Modular Cube Units", slug: "modular-cube-units" },
          { name: "Wall Floating Shelves", slug: "wall-floating-shelves" },
          { name: "Solid Oak Bookcases", slug: "solid-oak-bookcases" },
          { name: "Ladder Shelf Stands", slug: "ladder-shelf-stands" }
        ]
      },
      {
        name: "Sideboards & Cabinets",
        slug: "sideboards-cabinets",
        subcategories: [
          { name: "Cane Webbing Sideboards", slug: "cane-webbing-sideboards" },
          { name: "Media & TV Consoles", slug: "media-tv-consoles" },
          { name: "Display Glass Cabinets", slug: "display-glass-cabinets" },
          { name: "Shoe Storage Cabinets", slug: "shoe-storage-cabinets" }
        ]
      },
      {
        name: "Baskets & Storage Boxes",
        slug: "baskets-storage-boxes",
        subcategories: [
          { name: "Seagrass Woven Baskets", slug: "seagrass-woven-baskets" },
          { name: "Fabric Storage Bins", slug: "fabric-storage-bins" },
          { name: "Stackable Wooden Crates", slug: "stackable-wooden-crates" },
          { name: "Closet Hanging Organizers", slug: "closet-hanging-organizers" }
        ]
      }
    ]
  }
];
