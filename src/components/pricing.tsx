"use client";

import { Button } from "./button";
import {
  type Tickets,
  type Ticket,
  TextKey,
} from "@/lib/contentful/contentful-types";
import {
  sortTicketsByOrder,
  formatTicketPrice,
  getTicketUrl,
} from "@/lib/contentful/contentful-queries";
import { useText } from "@/lib/contentful/text-context";

interface PricingProps {
  ticketsData: Tickets | null;
}

export function Pricing({ ticketsData }: PricingProps) {
  const text = useText();
  if (!ticketsData?.fields.tickets) {
    return (
      <section className="bg-secondary">
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-16">
          <div className="text-center">
            <p className="text-primary text-lg">
              No tickets available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const sortedTickets = sortTicketsByOrder(ticketsData.fields.tickets);

  return (
    <section className="bg-secondary">
      <div className="max-w-5xl mx-auto px-4 pt-16">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <p className="flex flex-col text-primary text-lg text-balance sm:text-2xl sm:leading-6">
            {text(TextKey.OBS_TICKET_INFO)}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12 sm:pb-16">
        <div className="bg-primary-dark p-6 sm:p-12 max-w-5xl mx-auto">
          {/* Top row: First two tickets side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12 gap-6 sm:mb-12 mb-6">
            {sortedTickets.slice(0, 2).map((ticket) => (
              <TicketCard
                key={ticket.sys.id}
                ticket={ticket}
                baseTicketUrl={ticketsData.fields.baseTicketUrl}
              />
            ))}
          </div>

          {/* Bottom row: Remaining tickets full width */}
          {sortedTickets.slice(2).map((ticket) => (
            <div key={ticket.sys.id} className="grid grid-cols-1 mb-6">
              <TicketCard
                ticket={ticket}
                baseTicketUrl={ticketsData.fields.baseTicketUrl}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary text-base sm:text-lg leading-relaxed">
            {text(TextKey.UNDER_CONSTRUCTION)}
          </p>
        </div>
      </div>
    </section>
  );
}

function TicketCard({
  ticket,
  baseTicketUrl,
}: {
  ticket: Ticket;
  baseTicketUrl?: string;
}) {
  const variant = ticket.fields.variant || "white";
  const ticketUrl = getTicketUrl(ticket, baseTicketUrl);

  const getVariantStyles = () => {
    switch (variant) {
      case "dark":
        return {
          container: "bg-primary text-white",
          price: "text-white",
          button: "primary" as const,
        };
      case "light":
        return {
          container: "bg-muted text-primary",
          price: "text-accent",
          button: "dark" as const,
        };
      case "white":
      default:
        return {
          container: "bg-white text-primary",
          price: "text-primary",
          button: "dark" as const,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`p-6 sm:p-8 flex flex-col rounded-sm ${styles.container}`}>
      <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center">
        {ticket.fields.title}
      </h3>

      {ticket.fields.price && (
        <p
          className={`text-4xl sm:text-5xl font-bold mb-6 text-center ${styles.price}`}
        >
          {formatTicketPrice(ticket.fields.price)}
        </p>
      )}

      {ticket.fields.description && (
        <div className="mb-6 flex-grow">
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {ticket.fields.description}
          </p>
        </div>
      )}

      {ticketUrl && (
        <Button variant={styles.button} className="w-full" asChild>
          <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
            {ticket.fields.ctaText || "Köp biljett"}
          </a>
        </Button>
      )}
    </div>
  );
}
