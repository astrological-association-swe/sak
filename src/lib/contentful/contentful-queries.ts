import { getEntries } from ".";
import type {
  Page,
  Text,
  Tickets,
  Ticket,
  Lecturer,
  Hero,
} from "./contentful-types";
import { PageId, TextKey } from "./contentful-types";
import { unstable_cache } from "next/cache";

// Page queries with cache tags
export const getPageByPageId = unstable_cache(
  async (pageId: PageId): Promise<Page | null> => {
    const response = await getEntries<Page>("page", {
      "fields.pageId": pageId,
      limit: 1,
    });
    return response.items[0] || null;
  },
  ["page-by-id"],
  {
    tags: [
      "pages",
      `page-${PageId.HOME}`,
      `page-${PageId.ABOUT}`,
      `page-${PageId.CONTACT}`,
    ],
    revalidate: 604800, // 1 week
  }
);

export const getAllPages = unstable_cache(
  async (): Promise<Page[]> => {
    const response = await getEntries<Page>("page");
    return response.items;
  },
  ["all-pages"],
  {
    tags: ["pages"],
    revalidate: 604800, // 1 week
  }
);

// Text queries with cache tags
export const getTextByKey = unstable_cache(
  async (textKey: TextKey): Promise<Text | null> => {
    const response = await getEntries<Text>("text", {
      "fields.textKey": textKey,
      limit: 1,
    });
    return response.items[0] || null;
  },
  ["text-by-key"],
  {
    tags: [
      "texts",
      `text-${TextKey.UNDER_CONSTRUCTION}`,
      `text-${TextKey.OBS_TICKET_INFO}`,
    ],
    revalidate: 604800, // 1 week
  }
);

export const getAllTexts = unstable_cache(
  async (): Promise<Text[]> => {
    const response = await getEntries<Text>("text");
    return response.items;
  },
  ["all-texts"],
  {
    tags: ["texts"],
    revalidate: 604800, // 1 week
  }
);

// Utility functions
export function getTextValue(texts: Text[], key: TextKey): string {
  const text = texts.find((t) => t.fields.textKey === key);
  return text?.fields.textValue || "";
}

export function getPageMetaTitle(page: Page): string {
  return page.fields.metaTitle || "";
}

export function getPageMetaDescription(page: Page): string {
  return page.fields.metaDescription || "";
}

// Tickets queries with cache tags
export const getAllTickets = unstable_cache(
  async (): Promise<Tickets[]> => {
    const response = await getEntries<Tickets>("tickets");
    return response.items;
  },
  ["all-tickets"],
  {
    tags: ["tickets"],
    revalidate: 604800, // 1 week
  }
);

export const getTicketsByName = unstable_cache(
  async (name: string): Promise<Tickets | null> => {
    const response = await getEntries<Tickets>("tickets", {
      "fields.name": name,
      limit: 1,
    });
    return response.items[0] || null;
  },
  ["tickets-by-name"],
  {
    tags: ["tickets"],
    revalidate: 604800, // 1 week
  }
);

// Utility functions for tickets
export function sortTicketsByOrder(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort(
    (a, b) => (a.fields.order || 0) - (b.fields.order || 0)
  );
}

export function formatTicketPrice(price: number): string {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(price);
}

// Utility function to get ticket URL with fallback
export function getTicketUrl(
  ticket: Ticket,
  baseTicketUrl?: string
): string | null {
  // Use individual ticket link if available
  if (ticket.fields.ticketLink) {
    return ticket.fields.ticketLink;
  }

  // Fall back to base ticket URL if available
  if (baseTicketUrl) {
    return baseTicketUrl;
  }

  // No URL available
  return null;
}

// Lecturer queries with cache tags
export const getAllLecturers = unstable_cache(
  async (): Promise<Lecturer[]> => {
    const response = await getEntries<Lecturer>("lecturer");
    return response.items;
  },
  ["all-lecturers"],
  {
    tags: ["lecturers"],
    revalidate: 604800, // 1 week
  }
);

export const getLecturerByName = unstable_cache(
  async (name: string): Promise<Lecturer | null> => {
    const response = await getEntries<Lecturer>("lecturer", {
      "fields.name": name,
      limit: 1,
    });
    return response.items[0] || null;
  },
  ["lecturer-by-name"],
  {
    tags: ["lecturers"],
    revalidate: 604800, // 1 week
  }
);

// Hero queries with cache tags
export const getHero = unstable_cache(
  async (): Promise<Hero | null> => {
    const response = await getEntries<Hero>("hero", {
      "fields.id": "Hero",
      limit: 1,
    });
    return response.items[0] || null;
  },
  ["hero"],
  {
    tags: ["hero"],
    revalidate: 604800, // 1 week
  }
);
