import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { Speakers } from "@/components/speakers";
import {
  getAllTexts,
  getTicketsByName,
  getAllLecturers,
  getHero,
} from "@/lib/contentful/contentful-queries";
import { PageTextProvider } from "@/lib/contentful/page-text-provider";
import { homeMetadata } from "@/config/meta-data/home";

export const metadata = homeMetadata;

export default async function Home() {
  const [texts, ticketsData, lecturers, heroData] = await Promise.all([
    getAllTexts(),
    getTicketsByName("Tickets"),
    getAllLecturers(),
    getHero(),
  ]);

  return (
    <PageTextProvider texts={texts}>
      <main>
        <Hero heroData={heroData} ticketsData={ticketsData} />
        <Speakers lecturers={lecturers} ticketsData={ticketsData} />
        <Pricing ticketsData={ticketsData} />
      </main>
    </PageTextProvider>
  );
}
