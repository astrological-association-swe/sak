// Contentful content type definitions for SAK (Stockholms Astrologiska Konferens)
// Based on actual Contentful schema

// Type definitions for common content types
export interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulEntry {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: Record<string, unknown>;
}

// Enums for Contentful field values
export enum PageId {
  ABOUT = "About",
  CONTACT = "Contact",
  HOME = "Home",
}

export enum TextKey {
  OBS_TICKET_INFO = "OBS_TICKET_INFO",
  UNDER_CONSTRUCTION = "UNDER_CONSTRUCTION",
}

export interface Page {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: {
    pageId: PageId;
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Text {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: {
    textKey: TextKey;
    textValue?: string;
  };
}

export interface Ticket {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: {
    title?: string;
    description?: string;
    price?: number;
    ctaText?: string;
    ticketLink?: string;
    order?: number;
    variant?: "light" | "dark" | "white";
  };
}

export interface Tickets {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: {
    name: string;
    tickets?: Ticket[];
    baseTicketUrl?: string;
  };
}

export interface Lecturer {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: {
    name: string;
    shortDescription?: string;
    longDescription?: string;
    image?: ContentfulAsset;
  };
}

export interface Hero {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
        type: string;
      };
    };
  };
  fields: {
    id: "Hero";
    date: string;
    time: string;
    text: string;
  };
}
