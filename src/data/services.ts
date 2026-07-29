export const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "dental-implants", label: "Dental Implants" },
  { value: "all-on-4", label: "All-on-4 / All-on-6" },
  { value: "veneers", label: "Porcelain Veneers" },
  { value: "invisalign", label: "Invisalign Clear Aligners" },
  { value: "teeth-whitening", label: "Professional Teeth Whitening" },
  { value: "crowns-bridges", label: "Crowns & Bridges" },
  { value: "root-canal", label: "Root Canal Therapy" },
  { value: "periodontal", label: "Gum Disease Treatment" },
  { value: "pediatric", label: "Pediatric Dentistry" },
  { value: "wisdom-teeth", label: "Wisdom Teeth Removal" },
  { value: "smile-makeover", label: "Complete Smile Makeover" },
  { value: "emergency", label: "Emergency Dental Care" },
  { value: "sleep-apnea", label: "Sleep Apnea & Snoring" },
  { value: "general", label: "General Checkup & Cleaning" },
];

export const timeSlots = [
  { value: "", label: "Select preferred time" },
  { value: "morning-early", label: "Early Morning (7:00 - 9:00 AM)" },
  { value: "morning-late", label: "Late Morning (9:00 - 11:00 AM)" },
  { value: "midday", label: "Midday (11:00 AM - 1:00 PM)" },
  { value: "afternoon-early", label: "Early Afternoon (1:00 - 3:00 PM)" },
  { value: "afternoon-late", label: "Late Afternoon (3:00 - 5:00 PM)" },
  { value: "evening", label: "Evening (5:00 - 7:00 PM)" },
  { value: "flexible", label: "Flexible - Any Time" },
];

export const services = [
  {
    id: "dental-implants",
    name: "Dental Implants",
    description: "Permanent tooth replacement solution that looks, feels, and functions like natural teeth. Our implant specialists use advanced 3D guided surgery for precise placement and optimal results.",
    icon: "tooth",
    image: "/images/treatment.jpg",
    features: [
      "Single & Multiple Implants",
      "All-on-4 Full Arch Restoration",
      "Bone Grafting & Sinus Lifts",
      "Immediate Load Implants",
      "3D Guided Surgery Planning",
      "Lifetime Warranty Options"
    ],
    price: "Starting from $3,500"
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    description: "Painless root canal therapy using rotary endodontics and dental microscopes. Save your natural tooth with our advanced techniques and comfortable experience.",
    icon: "heart-pulse",
    image: "/images/treatment.jpg",
    features: [
      "Microscopic Root Canal Therapy",
      "Rotary Instrumentation",
      "Single Visit Treatment",
      "Painless Anesthesia Delivery",
      "Retreatment of Failed Canals",
      "Apexification & Apexogenesis"
    ],
    price: "Starting from $800"
  },
  {
    id: "teeth-whitening",
    name: "Teeth Whitening",
    description: "Professional teeth whitening for a brighter, more confident smile. Choose from in-office Zoom whitening or custom take-home kits for gradual results.",
    icon: "sparkles",
    image: "/images/treatment.jpg",
    features: [
      "Zoom In-Office Whitening",
      "Custom Take-Home Trays",
      "Opalescence Go Prefilled Trays",
      "Sensitivity Management",
      "Maintenance Programs",
      "Internal Bleaching for Dark Teeth"
    ],
    price: "Starting from $350"
  },
  {
    id: "braces-aligners",
    name: "Braces & Aligners",
    description: "Comprehensive orthodontic solutions for all ages. From traditional braces to invisible aligners, we create beautiful, healthy smiles with personalized treatment plans.",
    icon: "align-center-horizontal",
    image: "/images/treatment.jpg",
    features: [
      "Invisalign Clear Aligners",
      "Ceramic & Metal Braces",
      "Lingual Braces (Hidden)",
      "Early Interceptive Treatment",
      "Surgical Orthodontics",
      "Retention & Maintenance"
    ],
    price: "Starting from $4,500"
  },
  {
    id: "smile-makeover",
    name: "Smile Makeover",
    description: "Complete smile transformation combining multiple cosmetic procedures. Digital Smile Design technology lets you preview your new smile before treatment begins.",
    icon: "palette",
    image: "/images/treatment.jpg",
    features: [
      "Digital Smile Design (DSD)",
      "Porcelain Veneers & Lumineers",
      "Gum Contouring & Reshaping",
      "Composite Bonding",
      "Full Mouth Reconstruction",
      "Trial Smile Preview"
    ],
    price: "Starting from $8,000"
  },
  {
    id: "pediatric-dentistry",
    name: "Pediatric Dentistry",
    description: "Gentle, comprehensive dental care for children in a fun, welcoming environment. We focus on prevention, education, and creating positive dental experiences for life.",
    icon: "baby",
    image: "/images/treatment.jpg",
    features: [
      "First Dental Visits (Age 1)",
      "Preventive Sealants & Fluoride",
      "Tooth-Colored Fillings",
      "Space Maintainers",
      "Nitrous Oxide Sedation",
      "Special Needs Dentistry"
    ],
    price: "Starting from $120"
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    description: "Enhance your smile's aesthetics with our range of cosmetic treatments. From subtle improvements to dramatic transformations, we tailor every procedure to your unique goals.",
    icon: "star",
    image: "/images/treatment.jpg",
    features: [
      "Porcelain Veneers",
      "Composite Veneers",
      "Teeth Reshaping & Contouring",
      "Gum Depigmentation",
      "Diastema Closure",
      "Smile Analysis & Planning"
    ],
    price: "Starting from $500"
  },
  {
    id: "tooth-extraction",
    name: "Tooth Extraction",
    description: "Safe, comfortable tooth removal including wisdom teeth extractions. Our oral surgeons use minimally invasive techniques for faster healing and minimal discomfort.",
    icon: "scissors",
    image: "/images/treatment.jpg",
    features: [
      "Simple & Surgical Extractions",
      "Wisdom Teeth Removal",
      "IV Sedation Available",
      "Socket Preservation Grafting",
      "Platelet-Rich Fibrin (PRF)",
      "Same-Day Emergency Extractions"
    ],
    price: "Starting from $200"
  }
];