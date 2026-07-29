import { Technology } from "@/types";

export const technologies: Technology[] = [
  {
    id: "cbct",
    name: "3D CBCT Imaging",
    description: "Cone Beam Computed Tomography provides 3D views of teeth, bone, nerves, and sinuses for precise diagnosis and treatment planning.",
    image: "/technology/cbct.jpg",
    icon: "cube",
    benefits: [
      "Low-dose radiation",
      "3D implant planning",
      "Airway analysis",
      "TMJ evaluation",
      "Impacted tooth localization"
    ],
    category: "Imaging"
  },
  {
    id: "itero",
    name: "iTero 3D Scanner",
    description: "Digital impressions without the goop. Creates highly accurate 3D models for Invisalign, crowns, bridges, and smile design.",
    image: "/technology/itero.jpg",
    icon: "scan",
    benefits: [
      "No messy impressions",
      "Real-time visualization",
      "Invisalign Outcome Simulator",
      "Time-lapse wear tracking",
      "Same-day crown design"
    ],
    category: "Digital Scanning"
  },
  {
    id: "cerec",
    name: "CEREC CAD/CAM",
    description: "Chairside Economical Restoration of Esthetic Ceramics - design, mill, and place crowns, veneers, and bridges in a single visit.",
    image: "/technology/cerec.jpg",
    icon: "cpu",
    benefits: [
      "Same-day crowns",
      "No temporary crowns",
      "Digital impressions",
      "Metal-free ceramics",
      "Precise fit"
    ],
    category: "Same-Day Dentistry"
  },
  {
    id: "dental-microscope",
    name: "Dental Operating Microscope",
    description: "High-magnification surgical microscopes (up to 25x) for endodontics, periodontics, and restorative dentistry with unparalleled precision.",
    image: "/technology/microscope.jpg",
    icon: "microscope",
    benefits: [
      "Up to 25x magnification",
      "LED illumination",
      "Video documentation",
      "Ergonomic positioning",
      "Microsurgical precision"
    ],
    category: "Magnification"
  },
  {
    id: "zoom-whitening",
    name: "Zoom! WhiteSpeed",
    description: "Professional in-office whitening system using LED light-activated gel for up to 8 shades whiter in 45 minutes.",
    image: "/technology/zoom.jpg",
    icon: "sun",
    benefits: [
      "8 shades in 45 min",
      "Adjustable intensity",
      "Desensitizing protocol",
      "Custom take-home trays",
      "Long-lasting results"
    ],
    category: "Cosmetic"
  },
  {
    id: "lanap",
    name: "LANAP Laser Therapy",
    description: "Laser Assisted New Attachment Procedure - FDA-cleared laser treatment for gum disease without scalpels or sutures.",
    image: "/technology/lanap.jpg",
    icon: "zap",
    benefits: [
      "No cutting or sutures",
      "Regenerates bone & tissue",
      "Less pain & swelling",
      "Faster recovery",
      "Treats peri-implantitis"
    ],
    category: "Laser Dentistry"
  },
  {
    id: "prf",
    name: "PRF (Platelet-Rich Fibrin)",
    description: "Autologous blood concentrate rich in growth factors that accelerates healing after extractions, implants, and bone grafting.",
    image: "/technology/prf.jpg",
    icon: "droplet",
    benefits: [
      "100% natural (your blood)",
      "Faster healing",
      "Reduces inflammation",
      "Enhances bone growth",
      "Lowers complication risk"
    ],
    category: "Regenerative"
  },
  {
    id: "digital-smile-design",
    name: "Digital Smile Design (DSD)",
    description: "Comprehensive digital workflow for smile planning using photos, videos, and 3D scans to design and preview your new smile.",
    image: "/technology/dsd.jpg",
    icon: "palette",
    benefits: [
      "Visualize before treatment",
      "Facial analysis integration",
      "Interdisciplinary planning",
      "Patient co-design",
      "Predictable outcomes"
    ],
    category: "Smile Design"
  },
  {
    id: "nitrous-oxide",
    name: "Nitrous Oxide Sedation",
    description: "Safe, reversible inhalation sedation (laughing gas) for anxiety reduction during dental procedures. Effects wear off in minutes.",
    image: "/technology/nitrous.jpg",
    icon: "wind",
    benefits: [
      "Rapid onset (2-3 min)",
      "Quick recovery (5 min)",
      "Adjustable depth",
      "Safe for children",
      "Drive yourself home"
    ],
    category: "Sedation"
  },
  {
    id: "iv-sedation",
    name: "IV Sedation",
    description: "Deep conscious sedation administered by our board-certified anesthesiologist for complex procedures or severe dental anxiety.",
    image: "/technology/iv-sedation.jpg",
    icon: "iv-bag",
    benefits: [
      "Deep relaxation",
      "Amnesic effect",
      "Vital sign monitoring",
      "Board-certified anesthesiologist",
      "Same-day discharge"
    ],
    category: "Sedation"
  },
  {
    id: "piezoelectric",
    name: "Piezoelectric Surgery",
    description: "Ultrasonic bone surgery for precise, selective cutting of hard tissue while preserving soft tissue, nerves, and vessels.",
    image: "/technology/piezo.jpg",
    icon: "waves",
    benefits: [
      "Selective cutting (bone only)",
      "Preserves nerves & vessels",
      "Less trauma & swelling",
      "Ideal for sinus lifts",
      "Precise osteotomies"
    ],
    category: "Surgery"
  },
  {
    id: "intraoral-camera",
    name: "HD Intraoral Cameras",
    description: "High-definition cameras for detailed tooth-by-tooth visualization, patient education, and documentation.",
    image: "/technology/intraoral.jpg",
    icon: "camera",
    benefits: [
      "100x magnification",
      "Real-time patient viewing",
      "Documentation & insurance",
      "Early crack detection",
      "Improved communication"
    ],
    category: "Diagnostics"
  }
];