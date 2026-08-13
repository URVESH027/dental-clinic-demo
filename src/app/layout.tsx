import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
    default: "Thousand Smile Dental Clinic | Precision Designed Around You",
    template: "%s | Thousand Smile Dental Clinic",
  },
  description:
    "A precision dental studio in Los Angeles. Implants, cosmetic dentistry, orthodontics, full mouth rehabilitation — designed digitally, delivered by board-certified specialists.",
  keywords: [
    "dental clinic",
    "dental implants",
    "cosmetic dentistry",
    "orthodontics",
    "Invisalign",
    "smile makeover",
    "Digital Smile Design",
    "emergency dental",
    "veneer specialist",
    "Full mouth rehab",
  ],
  authors: [{ name: "Thousand Smile Dental Clinic" }],
  creator: "Thousand Smile Dental Clinic",
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
    title: "Thousand Smile Dental Clinic | Precision Designed Around You",
    description:
      "A precision dental studio for implants, cosmetic dentistry and full mouth rehabilitation. Book a consultation today.",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 800, alt: "Thousand Smile Dental Clinic" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thousand Smile Dental Clinic",
    description: "Precision designed around you.",
    images: ["/images/hero.jpg"],
    site: "@thousandsmile",
    creator: "@thousandsmile",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#12100F" },
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
    description:
      "Precision dental studio offering implants, cosmetic dentistry, orthodontics and full mouth rehabilitation.",
    url: "https://thousandsmiledental.com",
    logo: "https://thousandsmiledental.com/favicon.svg",
    image: "https://thousandsmiledental.com/images/hero.jpg",
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
    geo: { "@type": "GeoCoordinates", latitude: 34.0522, longitude: -118.2437 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "07:00",
        closes: "19:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "16:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    areaServed: "Los Angeles, CA",
    medicalSpecialty: "Dentistry",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      reviewCount: "847",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}