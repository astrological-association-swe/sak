import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import { Speakers } from "@/components/speakers";

export default function Home() {
  return (
    <main>
      <Hero />
      <Speakers />
      <Pricing />
    </main>
  );
}
