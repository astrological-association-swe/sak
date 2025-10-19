import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "./button";

export function Hero() {
  return (
    <section className="bg-primary flex items-center py-10 relative min-h-dvh">
      <Image
        src="/images/hero_bg_webp.webp"
        alt="Stockholms Astrologiska Konferens"
        priority
        fill
        className="absolute object-cover inset-0 size-full object-[center_80%]"
      />
      <div className="w-full px-4 sm:px-8 flex flex-col gap-5 items-center justify-between text-center relative">
        <Image
          src="/images/SAK_hero_L.png"
          alt="Stockholms Astrologiska Konferens"
          width={450}
          height={373}
          priority
          quality={75}
          className="w-[280px] sm:w-[350px] lg:w-[450px] h-auto"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 450px"
        />

        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <div className="max-w-xl mx-auto border-2 border-primary-dark sm:border-3 bg-transparent p-1.5 sm:p-3">
            <div className="bg-primary-dark/60 px-6 py-4 sm:px-8 sm:pt-11 sm:pb-8 pt-8 pb-6">
              <p className="text-xl sm:text-3xl font-heading text-white/80 mb-1 sm:mb-2">
                Lör 28 feb - Sön 1 mar
              </p>
              <p className="text-xl sm:text-3xl font-body text-white/80">
                KL. 10.00 - 18.00
              </p>
            </div>
          </div>

          <div className="mx-auto text-gray-300/90 text-[16px] sm:text-2xl leading-4 sm:leading-7">
            <p className="max-w-[400px] sm:max-w-[520px] mx-auto">
              Konferensen vill samla svenska och internationella föreläsare för
              att förena och stärka astrologins kulturella status.
            </p>
            <p className="max-w-[400px] sm:max-w-[500px] mx-auto">
              Kom och lyssna på några av de främsta astrologerna under 2 hela
              dagar!
            </p>
          </div>

          <Button variant="primary" size="lg">
            <Star size={16} />
            Köp biljett
          </Button>

          <div className="bg-white/40 pb-2 px-2 sm:pt-1">
            <p className="text-primary-dark text-lg sm:text-2xl sm:mb-2">
              Arrangör:
            </p>
            <Image
              src="/images/SAF_logo_text_horiz_D.png"
              alt="Sveriges Astrologiska Förening"
              width={480}
              height={47}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
