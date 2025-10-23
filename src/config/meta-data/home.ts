import { Metadata } from "next";
import { siteConfig } from "../site";
import { getPageByPageId } from "@/lib/contentful/contentful-queries";
import { PageId } from "@/lib/contentful/contentful-types";

export async function generateHomeMetadata(): Promise<Metadata> {
  const pageData = await getPageByPageId(PageId.HOME);

  const title = pageData?.fields.metaTitle || siteConfig.name;
  const description =
    pageData?.fields.metaDescription || siteConfig.description;

  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
    },
    twitter: {
      title: title,
      description: description,
    },
  };
}
