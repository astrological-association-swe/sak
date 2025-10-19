import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const tanPearl = localFont({
  src: "../../public/fonts/tan-pearl.woff2",
  variable: "--font-tan-pearl",
  display: "block",
});

export const haliman = localFont({
  src: "../../public/fonts/Halimun.woff",
  variable: "--font-haliman",
  display: "block",
});

export const glacialIndifference = localFont({
  src: [
    {
      path: "../../public/fonts/GlacialIndifference-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GlacialIndifference-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial-indifference",
  display: "block",
});

export const metadata: Metadata = {
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
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  themeColor: siteConfig.themeColor,
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
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

  return (
    <html lang={siteConfig.language}>
      <body
        className={`${tanPearl.variable} ${glacialIndifference.variable} ${haliman.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
