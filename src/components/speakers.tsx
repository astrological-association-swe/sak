"use client";

import { Star } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import type { Lecturer, Tickets } from "@/lib/contentful/contentful-types";
import { getAssetUrl } from "@/lib/contentful/assets";
import { trackTicketPurchaseClick } from "@/lib/gtm";

interface SpeakersProps {
  lecturers: Lecturer[];
  ticketsData: Tickets | null;
}

export function Speakers({ lecturers, ticketsData }: SpeakersProps) {
  if (!lecturers || lecturers.length === 0) {
    return (
      <section
        id="forelesare"
        className="py-12 pb-0 sm:pb-0 sm:py-24 bg-secondary"
      >
        <div className="mx-auto px-4 sm:px-4 max-w-5xl">
          <h2 className="text-4xl font-semibold text-primary mb-8 sm:mb-12 text-center sm:text-left">
            Föreläsare
          </h2>
          <div className="text-center">
            <p className="text-primary text-lg">
              No speakers available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="forelesare"
      className="py-12 pb-0 sm:pb-0 sm:py-24 bg-secondary"
    >
      <div className="mx-auto px-4 sm:px-4 max-w-5xl">
        <h2 className="text-4xl font-heading font-semibold text-primary mb-8 sm:mb-12 text-center sm:text-left">
          Föreläsare
        </h2>

        <div className="flex flex-col mb-12 gap-6">
          {lecturers.map((lecturer) => (
            <SpeakerCard key={lecturer.sys.id} lecturer={lecturer} />
          ))}
        </div>

        {ticketsData?.fields.baseTicketUrl && (
          <div className="flex justify-center sm:justify-start">
            <Button
              variant="primary"
              size="lg"
              asChild
              trackingName="ticket_purchase"
              trackingLocation="speakers"
              onTrackingClick={() =>
                trackTicketPurchaseClick("general", "speakers")
              }
            >
              <a
                href={ticketsData.fields.baseTicketUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                Köp biljett
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function SpeakerCard({ lecturer }: { lecturer: Lecturer }) {
  const imageUrl = lecturer.fields.image
    ? getAssetUrl(lecturer.fields.image)
    : null;

  return (
    <div className="bg-muted rounded-sm p-6 flex flex-col sm:flex-row sm:items-stretch gap-6 min-h-[200px] sm:min-h-[180px]">
      <div className="w-32 h-40 sm:w-36 sm:h-44 bg-white/40 rounded flex-shrink-0 mx-auto sm:mx-0 overflow-hidden relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={lecturer.fields.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 128px, 144px"
            quality={80}
          />
        ) : (
          <div className="w-full h-full bg-white/40 rounded flex items-center justify-center">
            <span className="text-primary/60 text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow justify-between min-h-0 sm:py-6">
        <div>
          <h3 className="text-2xl text-accent font-accent font-semibold mb-3 text-center sm:text-left">
            {lecturer.fields.name}
          </h3>

          {lecturer.fields.shortDescription && (
            <p className="text-sm text-primary leading-relaxed text-center sm:text-left">
              {lecturer.fields.shortDescription}
            </p>
          )}

          {/* {lecturer.fields.longDescription && (
            <p className="text-sm text-primary/80 mb-6 leading-relaxed text-center sm:text-left">
              {lecturer.fields.longDescription}
            </p>
          )} */}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-fit mx-auto sm:mx-0 mt-6"
        >
          Läs mer
        </Button>
      </div>
    </div>
  );
}
