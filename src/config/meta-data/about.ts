import { Metadata } from "next";
import { getPageByPageId } from "@/lib/contentful/contentful-queries";
import { PageId } from "@/lib/contentful/contentful-types";

export async function generateAboutMetadata(): Promise<Metadata> {
  const pageData = await getPageByPageId(PageId.ABOUT);

  return {
    title:
      pageData?.fields.metaTitle ||
      "Om Konferensen - Stockholms Astrologiska Konferens",
    description:
      pageData?.fields.metaDescription ||
      "Lär dig mer om Stockholms Astrologiska Konferens, vår mission och vision för att främja astrologi som både konst och vetenskap.",
  };
}
