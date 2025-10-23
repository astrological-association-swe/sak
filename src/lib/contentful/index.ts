import { createClient } from "contentful";
import { ContentfulEntry } from "./contentful-types";

// Lazy Contentful client creation (server-side only)
let contentfulClient: ReturnType<typeof createClient> | null = null;

export function getContentfulClient() {
  if (typeof window !== "undefined") {
    throw new Error("Contentful client can only be used server-side");
  }

  if (!contentfulClient) {
    const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

    if (!CONTENTFUL_ACCESS_TOKEN) {
      throw new Error("Missing CONTENTFUL_ACCESS_TOKEN environment variable");
    }

    contentfulClient = createClient({
      space: "gtrj9826yu6k",
      environment: "master",
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
  }

  return contentfulClient;
}

// Generic query functions
export async function getEntries<T = ContentfulEntry>(
  contentType?: string,
  options: {
    limit?: number;
    skip?: number;
    order?: string;
    "fields.slug"?: string;
    "fields.published"?: boolean;
    include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    [key: string]: unknown;
  } = {}
): Promise<{ items: T[]; total: number }> {
  try {
    const query: Record<string, unknown> = {
      limit: options.limit || 100,
      skip: options.skip || 0,
      include: options.include || 2,
    };

    if (contentType) {
      query.content_type = contentType;
    }

    if (options.order) {
      query.order = options.order;
    }

    if (options["fields.slug"]) {
      query["fields.slug"] = options["fields.slug"];
    }

    if (options["fields.published"] !== undefined) {
      query["fields.published"] = options["fields.published"];
    }

    // Add any additional query parameters
    Object.keys(options).forEach((key) => {
      if (
        ![
          "limit",
          "skip",
          "order",
          "fields.slug",
          "fields.published",
          "include",
        ].includes(key)
      ) {
        query[key] = options[key];
      }
    });

    const client = getContentfulClient();
    const response = await client.getEntries(query);
    return {
      items: response.items as T[],
      total: response.total,
    };
  } catch (error) {
    console.error("Error fetching entries from Contentful:", error);
    throw error;
  }
}

export async function getEntry<T = ContentfulEntry>(
  entryId: string,
  options: { include?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 } = {}
): Promise<T> {
  try {
    const client = getContentfulClient();
    const response = await client.getEntry(entryId, {
      include: options.include || 2,
    });
    return response as T;
  } catch (error) {
    console.error(`Error fetching entry ${entryId} from Contentful:`, error);
    throw error;
  }
}
