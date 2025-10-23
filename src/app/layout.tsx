import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig } from "@/config/site";
import { layoutJsonLd, layoutMetaData } from "@/config/meta-data/layout";
import { glacialIndifference, halimun, tanPearl } from "@/lib/font";
import JsonLd from "@/components/json-ld";
import { GoogleTagManager } from "@next/third-parties/google";
import { PropsWithChildren } from "react";

export const metadata: Metadata = layoutMetaData;
export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang={siteConfig.language}>
      <body
        className={`${tanPearl.variable} ${glacialIndifference.variable} ${halimun.variable} antialiased`}
      >
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        <JsonLd jsonLd={layoutJsonLd} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
