import { Metadata } from "next";
import { getPageByPageId } from "@/lib/contentful/contentful-queries";
import { PageId } from "@/lib/contentful/contentful-types";

export async function generateContactMetadata(): Promise<Metadata> {
  const pageData = await getPageByPageId(PageId.CONTACT);

  return {
    title:
      pageData?.fields.metaTitle ||
      "Kontakt - Stockholms Astrologiska Konferens",
    description:
      pageData?.fields.metaDescription ||
      "Kontakta oss för frågor om Stockholms Astrologiska Konferens. Vi hjälper dig gärna med information om konferensen.",
  };
}
