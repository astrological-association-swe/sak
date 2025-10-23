import {
  getAllTexts,
  getPageByPageId,
  getTicketsByName,
  getAllContentCards,
} from "@/lib/contentful/contentful-queries";
import { PageTextProvider } from "@/lib/contentful/page-text-provider";
import { PageId, CardId } from "@/lib/contentful/contentful-types";
import { TrackingButton } from "@/components/tracking-button";
import { generateAboutMetadata } from "@/config/meta-data/about";

export const generateMetadata = generateAboutMetadata;

export default async function AboutPage() {
  // Fetch both text content and page-specific content
  const [texts, ticketsData, pageData, contentCards] = await Promise.all([
    getAllTexts(),
    getTicketsByName("Tickets"),
    getPageByPageId(PageId.ABOUT),
    getAllContentCards(),
  ]);

  // Find specific content cards
  const missionCard = contentCards.find(
    (card) => card.fields.cardId === CardId.MISSION
  );
  const visionCard = contentCards.find(
    (card) => card.fields.cardId === CardId.VISION
  );
  const whyParticipateCard = contentCards.find(
    (card) => card.fields.cardId === CardId.WHY_PARTICIPATE
  );

  return (
    <PageTextProvider texts={texts}>
      <main>
        {/* About Content Section */}
        <section className="bg-secondary py-12 sm:py-10 min-h-dvh">
          <div className="max-w-5xl mx-auto px-4 sm:px-4">
            <div className="bg-muted rounded-sm p-6 sm:p-8 mb-8">
              <h1 className="text-3xl sm:text-4xl font-heading text-primary mb-6 text-center">
                {pageData?.fields.heading || "Om Konferensen"}
              </h1>
              <p className="text-lg text-primary mb-6 leading-relaxed text-center">
                {pageData?.fields.subHeading ||
                  "Stockholms Astrologiska Konferens samlar ledande astrologer, forskare och entusiaster från hela världen för att utforska de senaste utvecklingarna inom astrologisk praxis och teori."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {missionCard && (
                <div className="bg-white rounded-sm p-6">
                  <h2 className="text-2xl font-heading text-accent mb-4">
                    {missionCard.fields.heading || "Vår Mission"}
                  </h2>
                  <p className="text-primary leading-relaxed">
                    {missionCard.fields.subHeading ||
                      "Vi strävar efter att främja förståelse och uppskattning av astrologi som både konst och vetenskap, och skapa dialog mellan praktiker och forskare med högsta standard inom forskning och praxis."}
                  </p>
                </div>
              )}

              {visionCard && (
                <div className="bg-white rounded-sm p-6">
                  <h2 className="text-2xl font-heading text-accent mb-4">
                    {visionCard.fields.heading || "Vår Vision"}
                  </h2>
                  <p className="text-primary leading-relaxed">
                    {visionCard.fields.subHeading ||
                      "Att skapa en inkluderande plattform där astrologins rika tradition möter modern forskning och innovation, och där deltagare kan dela kunskap och erfarenheter i en inspirerande miljö."}
                  </p>
                </div>
              )}
            </div>

            {whyParticipateCard && (
              <div className="bg-primary-dark rounded-sm p-6 sm:p-8 text-center">
                <h2 className="text-2xl sm:text-3xl font-heading text-white mb-4">
                  {whyParticipateCard.fields.heading || "Varför Delta?"}
                </h2>
                <p className="text-white/90 text-lg leading-relaxed mb-6">
                  {whyParticipateCard.fields.subHeading ||
                    "Konferensen erbjuder en unik möjlighet att träffa experter inom astrologi, delta i workshops och föreläsningar, samt bygga nätverk med likasinnade från hela världen."}
                </p>

                {ticketsData?.fields.baseTicketUrl && (
                  <TrackingButton
                    href={ticketsData.fields.baseTicketUrl}
                    variant="primary"
                    size="lg"
                    trackingName="ticket_purchase"
                    trackingLocation="about_content"
                    showIcon={true}
                  >
                    Boka din plats idag
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
