import {
  getAllTexts,
  getPageByPageId,
} from "@/lib/contentful/contentful-queries";
import { PageTextProvider } from "@/lib/contentful/page-text-provider";
import { PageId } from "@/lib/contentful/contentful-types";

export default async function AboutPage() {
  // Fetch both text content and page-specific content
  const [texts, pageData] = await Promise.all([
    getAllTexts(),
    getPageByPageId(PageId.ABOUT),
  ]);

  return (
    <PageTextProvider texts={texts}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          {pageData?.fields.metaTitle || "About Us"}
        </h1>

        {pageData?.fields.metaDescription && (
          <p className="text-xl text-gray-600 mb-8">
            {pageData.fields.metaDescription}
          </p>
        )}

        <section className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">About the Conference</h2>
          <p className="text-lg mb-4">
            The Stockholm Astrological Conference brings together leading
            astrologers, researchers, and enthusiasts from around the world to
            explore the latest developments in astrological practice and theory.
          </p>

          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-lg mb-4">
            We aim to promote the understanding and appreciation of astrology as
            both an art and a science, fostering dialogue between practitioners
            and researchers while maintaining the highest standards of
            scholarship and practice.
          </p>
        </section>
      </main>
    </PageTextProvider>
  );
}
