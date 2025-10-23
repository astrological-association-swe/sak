import {
  getAllTexts,
  getPageByPageId,
} from "@/lib/contentful/contentful-queries";
import { PageTextProvider } from "@/lib/contentful/page-text-provider";
import { PageId } from "@/lib/contentful/contentful-types";

export default async function ContactPage() {
  // Fetch both text content and page-specific content
  const [texts, pageData] = await Promise.all([
    getAllTexts(),
    getPageByPageId(PageId.CONTACT),
  ]);

  return (
    <PageTextProvider texts={texts}>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          {pageData?.fields.metaTitle || "Contact Us"}
        </h1>

        {pageData?.fields.metaDescription && (
          <p className="text-xl text-gray-600 mb-8">
            {pageData.fields.metaDescription}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email</h3>
                <p>info@astrokonferens.se</p>
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+46 (0)8 123 456 78</p>
              </div>

              <div>
                <h3 className="font-semibold">Address</h3>
                <p>
                  Stockholm Conference Center
                  <br />
                  Astrologigatan 1<br />
                  111 22 Stockholm, Sweden
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </form>
          </section>
        </div>
      </main>
    </PageTextProvider>
  );
}
