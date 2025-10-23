"use client";

import { useText } from "@/lib/contentful/text-context";
import { TextKey } from "@/lib/contentful/contentful-types";
import type { Tickets, Ticket } from "@/lib/contentful/contentful-types";
import {
  sortTicketsByOrder,
  formatTicketPrice,
} from "@/lib/contentful/contentful-queries";

interface TicketsExampleProps {
  ticketsData: Tickets | null;
}

export function Tickets({ ticketsData }: TicketsExampleProps) {
  const text = useText();

  if (!ticketsData?.fields.tickets) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tickets available at the moment.</p>
      </div>
    );
  }

  const sortedTickets = sortTicketsByOrder(ticketsData.fields.tickets);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{ticketsData.fields.name}</h2>
        <p className="text-lg text-gray-600">
          {text(TextKey.HERO_DATE)} • {text(TextKey.HERO_TIME)}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {sortedTickets.map((ticket, index) => (
          <TicketCard key={ticket.sys.id} ticket={ticket} index={index} />
        ))}
      </div>
    </div>
  );
}

function TicketCard({ ticket, index }: { ticket: Ticket; index: number }) {
  const isPopular = index === 1; // Middle ticket is popular

  return (
    <div
      className={`relative p-6 rounded-lg border-2 ${
        isPopular
          ? "border-blue-500 bg-blue-50 scale-105"
          : "border-gray-200 bg-white"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{ticket.fields.title}</h3>

        {ticket.fields.description && (
          <p className="text-gray-600 mb-4">{ticket.fields.description}</p>
        )}

        {ticket.fields.price && (
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">
              {formatTicketPrice(ticket.fields.price)}
            </span>
          </div>
        )}

        {ticket.fields.ticketLink && (
          <a
            href={ticket.fields.ticketLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block w-full py-3 px-6 rounded-md font-medium transition-colors ${
              isPopular
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-800 text-white hover:bg-gray-900"
            }`}
          >
            {ticket.fields.ctaText || "Buy Ticket"}
          </a>
        )}
      </div>
    </div>
  );
}
