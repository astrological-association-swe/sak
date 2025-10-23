import { Metadata } from "next";
import { siteConfig } from "../site";

export const homeMetadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.event.startDate} - ${siteConfig.event.endDate}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    title: `${siteConfig.name}`,
    description: siteConfig.description,
  },
};
