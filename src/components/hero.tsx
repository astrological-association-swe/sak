"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "./button";
import type { Hero, Tickets } from "@/lib/contentful/contentful-types";
import { trackTicketPurchaseClick } from "@/lib/gtm";
import { HeroLogo } from "./logo";

interface HeroProps {
  heroData: Hero | null;
  ticketsData: Tickets | null;
}

export function Hero({ heroData, ticketsData }: HeroProps) {
  if (!heroData) {
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
          <div className="text-white text-xl">
            No hero content available at the moment.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary flex items-center sm:pb-10 pb-10 pt-5 sm:pt-10 relative min-h-dvh">
      <Image
        src="/images/hero_bg.png"
        alt="Stockholms Astrologiska Konferens"
        priority
        fill
        quality={50}
        className="absolute object-cover inset-0 size-full object-[center_80%]"
      />
      <div className="w-full px-4 sm:px-8 flex flex-col gap-5 items-center justify-between text-center relative">
        {/* <Image
          src="/images/SAK_hero_L.png"
          alt="Stockholms Astrologiska Konferens"
          width={450}
          height={373}
          priority
          quality={75}
          className="w-[280px] sm:w-[350px] lg:w-[450px] h-auto"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 350px, 450px"
        /> */}

        <HeroLogo className="mb-4 sm:mb-8" />

        <div className="flex flex-col items-center gap-8 sm:gap-10">
          <div className="max-w-xl mx-auto border-2 border-primary-dark sm:border-3 bg-transparent p-1.5 sm:p-3">
            <h2 className="bg-primary-dark/60 px-6 py-4 sm:px-8 sm:pt-11 sm:pb-8 pt-8 pb-6">
              <span className="block text-xl sm:text-3xl font-heading text-white/80 mb-1 sm:mb-2">
                {heroData.fields.date}
              </span>
              <span className="block text-xl sm:text-3xl font-body text-white/80">
                {heroData.fields.time}
              </span>
            </h2>
          </div>

          <div className="mx-auto text-gray-300/90 text-[16px] sm:text-2xl leading-4 sm:leading-7">
            <p className="max-w-[400px] sm:max-w-[520px] mx-auto whitespace-pre-line">
              {heroData.fields.text}
            </p>
          </div>

          {ticketsData?.fields.baseTicketUrl && (
            <Button
              className="text-2xl"
              variant="primary"
              size="lg"
              asChild
              trackingName="ticket_purchase"
              trackingLocation="hero"
              onTrackingClick={() =>
                trackTicketPurchaseClick("general", "hero")
              }
            >
              <a
                href={ticketsData.fields.baseTicketUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star size={16} />
                Köp biljett
              </a>
            </Button>
          )}

          <div className="bg-white/50 pb-2 px-2 sm:pt-1 rounded">
            <p className="text-primary-dark text-lg sm:text-xl sm:mb-2">
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
