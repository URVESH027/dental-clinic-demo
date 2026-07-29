/**
 * Centralized Configuration Module
 * All configurable values for Thousand Smile Dental Clinic
 * Update values here and they propagate site-wide
 */

export const SITE_CONFIG = {
    name: "Thousand Smile Dental Clinic",
    tagline: "Creating Confident Smiles for Every Generation",
    url: "https://thousandsmiledental.com",
    description: "Premier multispecialty dental clinic offering implants, cosmetic dentistry, orthodontics, pediatric care, and emergency services.",

    contact: {
        phone: process.env.NEXT_PUBLIC_PHONE || "(555) 123-4567",
        email: process.env.NEXT_PUBLIC_EMAIL || "smile@thousandsmile.com",
        address: "12345 Smile Boulevard, Suite 100",
        city: "Los Angeles",
        state: "CA",
        zip: "90025",
        hours: [
            { days: "Mon–Thu", hours: "7:00 AM – 7:00 PM" },
            { days: "Friday", hours: "7:00 AM – 4:00 PM" },
            { days: "Saturday", hours: "8:00 AM – 2:00 PM" },
            { days: "Sunday", hours: "Closed" },
        ],
        mapUrl: "https://maps.google.com/?q=Thousand+Smile+Dental+Clinic",
        whatsapp: "15551234567",
    },

    seo: {
        twitterHandle: "@thousandsmile",
        googleVerification: "google-site-verification-code",
    },

    social: {
        instagram: "https://instagram.com/thousandsmiledental",
        facebook: "https://facebook.com/thousandsmiledental",
        youtube: "https://youtube.com/@thousandsmiledental",
        linkedin: "https://linkedin.com/company/thousandsmiledental",
        twitter: "https://twitter.com/thousandsmiledental",
        googleReviews: "https://g.page/thousandsmile",
    },

    features: {
        appointmentTimeout: 15000, // 15 seconds
        testimonialsAutoPlayInterval: 6000, // 6 seconds
    },
} as const;

export const WHATSAPP_MESSAGE = "Hello%2C%20I%27d%20like%20to%20book%20an%20appointment";

