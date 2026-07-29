import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thousandsmiledental.com"),
  title: {
    default: "Thousand Smile Dental Clinic | Advanced Dental Care for Every Generation",
    template: "%s | Thousand Smile Dental Clinic",
  },
  description: "Premier multispecialty dental clinic offering implants, cosmetic dentistry, orthodontics, pediatric care, and emergency services. Board-certified specialists, digital technology, same-day appointments.",
  keywords: [
    "dental clinic",
    "dental implants",
    "cosmetic dentistry",
    "orthodontics",
    "Invisalign",
    "teeth whitening",
    "root canal",
    "pediatric dentist",
    "emergency dental",
    "smile makeover",
    "veneers",
    "All-on-4",
  ],
  authors: [{ name: "Thousand Smile Dental Clinic" }],
  creator: "Thousand Smile Dental Clinic",
  publisher: "Thousand Smile Dental Clinic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thousandsmiledental.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thousandsmiledental.com",
    siteName: "Thousand Smile Dental Clinic",
    title: "Thousand Smile Dental Clinic | Creating Confident Smiles",
    description: "Advanced dental care for every generation. Implants, cosmetic, orthodontics, pediatrics & more. Book your appointment today.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thousand Smile Dental Clinic - Modern dental office",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thousand Smile Dental Clinic",
    description: "Creating confident smiles for every generation with advanced dental care.",
    images: ["/og-image.jpg"],
    site: "@thousandsmile",
    creator: "@thousandsmile",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1120" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Thousand Smile Dental Clinic",
    description: "Premier multispecialty dental clinic offering comprehensive dental care including implants, cosmetic dentistry, orthodontics, and pediatric dentistry.",
    url: "https://thousandsmiledental.com",
    logo: "https://thousandsmiledental.com/logo.png",
    image: "https://thousandsmiledental.com/clinic.jpg",
    telephone: "+15551234567",
    email: "smile@thousandsmile.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12345 Smile Boulevard, Suite 100",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90025",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0522,
      longitude: -118.2437,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "07:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Insurance, Financing",
    currenciesAccepted: "USD",
    areaServed: "Los Angeles, CA",
    medicalSpecialty: "Dentistry",
    hasMap: "https://maps.google.com/?q=Thousand+Smile+Dental+Clinic",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "847",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jennifer Martinez" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Dr. Chen and her team transformed my smile with porcelain veneers. The Digital Smile Design preview was incredible — I knew exactly what to expect.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Amanda Chen" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "As a teacher, I needed flexible scheduling for my Invisalign treatment. The team worked around my school hours perfectly. My teeth are straight and I couldn't be happier.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Marcus Johnson" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Had a dental emergency on a Saturday morning. They got me in within an hour and the root canal was completely painless. Saved my tooth and my weekend.",
      },
    ],
    sameAs: [
      "https://facebook.com/thousandsmiledental",
      "https://instagram.com/thousandsmiledental",
      "https://youtube.com/@thousandsmiledental",
      "https://linkedin.com/company/thousandsmiledental",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        ></script>
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider defaultTheme="system" enableSystem>
          <TooltipProvider>
            <ScrollProgress />
            <Navbar />
            <main className="flex-1" id="main-content">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}