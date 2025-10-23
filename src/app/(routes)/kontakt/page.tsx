import {
  getAllTexts,
  getPageByPageId,
  getTicketsByName,
  getContactDetails,
  getAllContentCards,
} from "@/lib/contentful/contentful-queries";
import { PageTextProvider } from "@/lib/contentful/page-text-provider";
import { PageId, CardId } from "@/lib/contentful/contentful-types";
import { TrackingButton } from "@/components/tracking-button";
import { Button } from "@/components/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { generateContactMetadata } from "@/config/meta-data/contact";

export const generateMetadata = generateContactMetadata;

export default async function ContactPage() {
  // Fetch both text content and page-specific content
  const [texts, ticketsData, contactDetails, pageData, contentCards] =
    await Promise.all([
      getAllTexts(),
      getTicketsByName("Tickets"),
      getContactDetails(),
      getPageByPageId(PageId.CONTACT),
      getAllContentCards(),
    ]);

  // Find the interested in participating card
  const interestedCard = contentCards.find(
    (card) => card.fields.cardId === CardId.INTERESTED_IN_PARTICIPATING
  );

  return (
    <PageTextProvider texts={texts}>
      <main>
        {/* Contact Content Section */}
        <section className="bg-secondary py-12 sm:py-10 min-h-dvh">
          <div className="max-w-5xl mx-auto px-4 sm:px-4">
            <div className="bg-muted rounded-sm p-6 sm:p-8 mb-8">
              <h1 className="text-3xl sm:text-4xl font-heading text-primary mb-6 text-center">
                {pageData?.fields.heading || "Kontakt"}
              </h1>
              <p className="text-lg text-primary mb-6 leading-relaxed text-center">
                {pageData?.fields.subHeading ||
                  "Vi hjälper dig gärna med frågor om konferensen. Kontakta oss för mer information."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Contact Information */}
              <div className="bg-white rounded-sm p-6">
                <h2 className="text-xl font-heading text-accent mb-6 break-words">
                  Kontaktinformation
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        E-post
                      </h3>
                      <p className="text-primary">
                        {contactDetails?.fields.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        Telefon
                      </h3>
                      <p className="text-primary">
                        {contactDetails?.fields.phone || "+46 (0)8 123 456 78"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">
                        Adress
                      </h3>
                      <p className="text-primary whitespace-pre-line">
                        {contactDetails?.fields.address ||
                          "Stockholm Conference Center\nAstrologigatan 1\n111 22 Stockholm, Sverige"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-sm p-6">
                <h2 className="text-xl font-heading text-accent mb-6">
                  Skicka meddelande
                </h2>

                <form
                  action={`mailto:${contactDetails?.fields.email}?subject=Kontakt från SAK hemsida`}
                  method="post"
                  encType="text/plain"
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Namn
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-primary/20 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                      placeholder="Ditt namn"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Ämne
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-primary/20 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                      placeholder="Ämne för ditt meddelande"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-primary mb-2"
                    >
                      Meddelande
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 border border-primary/20 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                      placeholder="Skriv ditt meddelande här..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    <Send size={16} />
                    Skicka meddelande
                  </Button>
                </form>
              </div>
            </div>

            {/* Call to Action */}
            {interestedCard && (
              <div className="bg-primary-dark rounded-sm p-6 sm:p-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-heading text-white mb-4">
                  {interestedCard.fields.heading || "Intresserad av att delta?"}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {interestedCard.fields.subHeading ||
                    "Boka din plats redan idag och var med på årets mest spännande astrologiska konferens i Stockholm."}
                </p>

                {ticketsData?.fields.baseTicketUrl && (
                  <TrackingButton
                    href={ticketsData.fields.baseTicketUrl}
                    variant="primary"
                    size="lg"
                    trackingName="ticket_purchase"
                    trackingLocation="contact"
                    showIcon={true}
                  >
                    Köp biljett nu
                  </TrackingButton>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </PageTextProvider>
  );
}
