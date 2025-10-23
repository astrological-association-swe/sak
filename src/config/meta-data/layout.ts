import { Metadata, Viewport } from "next";
import { siteConfig } from "../site";

export const layoutMetaData: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} 2025 - ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.organizer.name }],
  creator: siteConfig.organizer.name,
  publisher: siteConfig.organizer.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} 2025`,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} 2025`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} 2025`,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
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
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export const layoutJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${siteConfig.name} 2025`,
  description: siteConfig.description,
  startDate: siteConfig.event.startDate,
  endDate: siteConfig.event.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: `${siteConfig.event.location.city}, ${siteConfig.event.location.country}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.event.location.city,
      addressCountry: siteConfig.event.location.countryCode,
    },
  },
  organizer: {
    "@type": "Organization",
    name: siteConfig.organizer.name,
    url: siteConfig.baseUrl,
  },
  image: [`${siteConfig.baseUrl}/opengraph-image`],
  offers: {
    "@type": "Offer",
    url: siteConfig.baseUrl,
    availability: "https://schema.org/InStock",
    validFrom: "2024-10-01",
  },
};
