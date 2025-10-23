# Contentful CMS Setup Guide

This project is configured to use Contentful as a headless CMS. Follow these steps to set up your Contentful integration.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Contentful CMS Configuration
# Get these values from your Contentful space settings

# Required: Your Contentful Space ID
CONTENTFUL_SPACE_ID=your_space_id_here

# Required: Your Contentful Content Delivery API access token
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Optional: Contentful Preview API access token (for draft content)
CONTENTFUL_PREVIEW_TOKEN=your_preview_token_here

# Optional: Contentful environment (defaults to 'master')
CONTENTFUL_ENVIRONMENT=master

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://astrokonferens.se

# API Authentication (for cache invalidation and webhooks)
BASIC_AUTH_USERNAME=your-api-username
BASIC_AUTH_PASSWORD=your-secure-password
```

## Getting Your Contentful Credentials

1. **Space ID**: Go to your Contentful space → Settings → General settings
2. **Access Token**: Go to your Contentful space → Settings → API keys → Content delivery / preview tokens
3. **Preview Token**: Same location as access token, but select "Content preview tokens"

## Content Types

The following content types are configured in your Contentful space:

### Page

- `pageId` (Symbol, required, unique)
  - Allowed values: "About", "Contact", "Home"
- `metaTitle` (Symbol, optional)
- `metaDescription` (Symbol, optional)

### Text

- `textKey` (Symbol, required, unique)
  - Allowed values: "HERO_DATE", "HERO_TIME", "HERO_TEXT"
- `textValue` (Symbol, optional)

### Ticket

- `title` (Symbol, optional)
- `description` (Text, optional)
- `price` (Integer, optional)
- `ctaText` (Symbol, optional)
- `ticketLink` (Symbol, optional)
- `order` (Integer, optional)
- `variant` (Symbol, optional)
  - Allowed values: "light", "dark", "white"

### Tickets

- `name` (Symbol, required)
- `tickets` (Array of Ticket entries, optional)
  - Min: 1, Max: 3 tickets
- `baseTicketUrl` (Symbol, optional)
  - Fallback URL for all "Köp biljett" buttons

### Lecturer

- `name` (Symbol, required, unique)
- `shortDescription` (Symbol, optional)
- `longDescription` (Symbol, optional)
- `image` (Asset link, optional)

### Hero

- `id` (Symbol, required, unique)
  - Allowed values: "Hero"
- `date` (Symbol, required)
- `time` (Symbol, required)
- `text` (Text, required)

## Enums

The implementation includes TypeScript enums to ensure type safety and consistency with your Contentful schema:

### PageId Enum

```typescript
enum PageId {
  ABOUT = "About",
  CONTACT = "Contact",
  HOME = "Home",
}
```

### TextKey Enum

```typescript
enum TextKey {
  HERO_DATE = "HERO_DATE",
  HERO_TIME = "HERO_TIME",
  HERO_TEXT = "HERO_TEXT",
}
```

These enums ensure that you always use the correct values that match your Contentful content types, preventing runtime errors and providing better IDE support.

## Usage Examples

```typescript
import {
  getPageByPageId,
  getTextByKey,
  getAllTexts,
  getAllTickets,
  getTicketsByName,
  sortTicketsByOrder,
  formatTicketPrice,
} from "@/lib/contentful/contentful-queries";
import { PageId, TextKey } from "@/lib/contentful/contentful-types";
import { useText } from "@/lib/contentful/text-context";

// Server-side usage (in server components or API routes)
const homePage = await getPageByPageId(PageId.HOME);
const aboutPage = await getPageByPageId(PageId.ABOUT);
const contactPage = await getPageByPageId(PageId.CONTACT);

const heroText = await getTextByKey(TextKey.HERO_TEXT);
const heroDate = await getTextByKey(TextKey.HERO_DATE);
const heroTime = await getTextByKey(TextKey.HERO_TIME);

// Tickets usage
const allTickets = await getAllTickets();
const conferenceTickets = await getTicketsByName("Conference Tickets");
const sortedTickets = sortTicketsByOrder(
  conferenceTickets?.fields.tickets || []
);
const formattedPrice = formatTicketPrice(1500); // "1 500,00 kr"

// Lecturers usage
const allLecturers = await getAllLecturers();
const specificLecturer = await getLecturerByName("John Doe");

// Hero usage
const heroData = await getHero();

// Page-level usage (recommended pattern)
export default async function MyPage() {
  // Fetch text content at the page level
  const texts = await getAllTexts();

  return (
    <PageTextProvider texts={texts}>
      <main>
        <MyComponent />
      </main>
    </PageTextProvider>
  );
}

// Client-side usage (in React components within a PageTextProvider)
function MyComponent() {
  const text = useText();

  return (
    <div>
      <h1>{text(TextKey.HERO_TEXT)}</h1>
      <p>Date: {text(TextKey.HERO_DATE)}</p>
      <p>Time: {text(TextKey.HERO_TIME)}</p>
    </div>
  );
}
```

## Page-Level Text Management

The recommended pattern is to use `PageTextProvider` at the page level:

### Benefits of Page-Level TextProvider

- **Security**: Text content is fetched server-side per page
- **Performance**: Only loads text content needed for that specific page
- **Clean Architecture**: Each page manages its own text dependencies
- **Type Safety**: Full TypeScript support with enums
- **Caching**: Leverages Next.js ISR for optimal performance

### Page Structure

```typescript
// app/my-page/page.tsx
import { getAllTexts } from "@/lib/contentful/contentful-queries";
import { PageTextProvider } from "@/lib/contentful/page-text-provider";

export default async function MyPage() {
  const texts = await getAllTexts();

  return (
    <PageTextProvider texts={texts}>
      <main>
        {/* Your page content here */}
        <MyComponent />
      </main>
    </PageTextProvider>
  );
}
```

## Features

- ✅ TypeScript support with full type definitions
- ✅ Simple content management for pages and text content
- ✅ Type-safe content queries
- ✅ Utility functions for easy content access
- ✅ Error handling and logging
- ✅ Swedish locale formatting for dates and times
- ✅ Next.js cache tags for optimal performance
- ✅ Automatic revalidation via webhooks
- ✅ Manual revalidation API endpoints
- ✅ Page-level text management for better security and performance

## Content Management

### Pages

Use the Page content type to manage different sections of your website:

- **Home**: Main landing page content
- **About**: About page content
- **Contact**: Contact page content

Each page can have custom meta titles and descriptions for SEO.

### Text Content

Use the Text content type to manage reusable text content:

- **HERO_DATE**: Date displayed in hero section
- **HERO_TIME**: Time displayed in hero section
- **HERO_TEXT**: Main text displayed in hero section

This allows you to easily update text content without code changes.

## Cache Management

### Cache Tags

The implementation uses Next.js cache tags for optimal performance:

- **Text Tags**: `texts`, `text-HERO_DATE`, `text-HERO_TIME`, `text-HERO_TEXT`
- **Page Tags**: `pages`, `page-Home`, `page-About`, `page-Contact`
- **Tickets Tags**: `tickets`
- **Lecturers Tags**: `lecturers`
- **Hero Tags**: `hero`

### Revalidation

#### Manual Revalidation

Use the revalidation API to manually invalidate cache:

```bash
# Revalidate all content
curl -X POST https://astrokonferens.se/api/revalidate \
  -H "Authorization: Basic $(echo -n 'username:password' | base64)" \
  -H "Content-Type: application/json" \
  -d '{}'

# Revalidate specific tags
curl -X POST https://astrokonferens.se/api/revalidate \
  -H "Authorization: Basic $(echo -n 'username:password' | base64)" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["texts", "pages"]}'

# Revalidate specific paths
curl -X POST https://astrokonferens.se/api/revalidate \
  -H "Authorization: Basic $(echo -n 'username:password' | base64)" \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/", "/about"]}'
```

#### Automatic Revalidation (Webhooks)

Set up Contentful webhooks to automatically revalidate cache when content changes:

1. Go to your Contentful space → Settings → Webhooks
2. Create a new webhook with URL: `https://astrokonferens.se/api/webhooks/contentful`
3. Add Basic Authentication:
   - Username: Your `BASIC_AUTH_USERNAME` value
   - Password: Your `BASIC_AUTH_PASSWORD` value
4. Select triggers for "Entry publish" and "Entry unpublish"
5. The webhook will automatically revalidate the appropriate cache tags

### Cache Configuration

- **Revalidation Time**: 1 hour (3600 seconds)
- **Cache Strategy**: ISR (Incremental Static Regeneration)
- **Automatic Invalidation**: Via Contentful webhooks
