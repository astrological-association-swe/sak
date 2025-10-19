# App Configuration Guide

This document explains how the site configuration works and how to maintain it.

## 📁 Configuration File

**Location**: `src/config/site.ts`

This is the single source of truth for all site-wide configuration values. Instead of hardcoding URLs, names, and descriptions throughout the codebase, everything is centralized here.

## 🎯 Why Use a Config File?

### ✅ Benefits

1. **Single Source of Truth**: Change the domain once, updates everywhere
2. **Easy Maintenance**: No hunting through files to update URLs
3. **Type Safety**: TypeScript ensures you use the right values
4. **Consistency**: Same values everywhere automatically
5. **KISS Principle**: Simple, straightforward, no complex abstractions

### 📝 Configuration Structure

```typescript
export const siteConfig = {
  // Basic site info
  name: "Stockholms Astrologiska Konferens",
  shortName: "SAK",
  description: "...",
  baseUrl: "https://astrokonferens.se",
  locale: "sv_SE",
  language: "sv",

  // Event details
  event: {
    startDate: "2025-02-28",
    endDate: "2025-03-01",
    location: {
      city: "Stockholm",
      country: "Sverige",
      countryCode: "SE",
    },
  },

  // Organizer info
  organizer: {
    name: "Sveriges Astrologiska Förening",
    shortName: "SAF",
  },

  // SEO keywords
  keywords: [...],

  // Social media (optional)
  social: {
    // Add when available
  },
};
```

## 🔧 How to Update

### Change the Domain

**Current**: `https://astroloferens.se`

To update, edit one line in `src/config/site.ts`:

```typescript
baseUrl: "https://your-new-domain.com",
```

This automatically updates:

- ✅ Metadata in layout.tsx
- ✅ Robots.txt
- ✅ Sitemap
- ✅ OpenGraph images
- ✅ Twitter cards
- ✅ Structured data (JSON-LD)

### Update Event Dates

```typescript
event: {
  startDate: "2026-03-01", // Change here
  endDate: "2026-03-02",   // And here
  ...
}
```

This updates:

- ✅ Metadata description
- ✅ OG image date display
- ✅ Twitter card date display
- ✅ Structured data

### Change Site Name or Description

```typescript
name: "Your New Conference Name",
description: "Your new description...",
```

Updates everywhere automatically.

## 📍 Where Config is Used

### 1. Layout (src/app/layout.tsx)

- Page metadata
- OpenGraph tags
- Twitter cards
- Structured data (JSON-LD)
- HTML lang attribute

### 2. Robots (src/app/robots.ts)

- Sitemap URL
- Host domain

### 3. Sitemap (src/app/sitemap.ts)

- Base URL for all pages

### 4. OpenGraph Image (src/app/opengraph-image.tsx)

- Conference name
- Event dates
- Description
- Alt text

### 5. Twitter Image (src/app/twitter-image.tsx)

- Conference name
- Event dates
- Description
- Alt text

### 6. Web Manifest (src/app/manifest.ts)

- App name and short name
- Description
- Theme and background colors
- PWA configuration

## 🚀 Usage Examples

### Import the Config

```typescript
import { siteConfig } from "@/config/site";
```

### Use in Components

```typescript
// In a React component
export function MyComponent() {
  return (
    <div>
      <h1>{siteConfig.name}</h1>
      <p>{siteConfig.description}</p>
      <a href={siteConfig.baseUrl}>Visit site</a>
    </div>
  );
}
```

### Use in Metadata

```typescript
export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  // ...
};
```

## 🔄 Adding New Config Values

To add new configuration:

1. Add to `src/config/site.ts`:

```typescript
export const siteConfig = {
  // ...existing config

  contact: {
    email: "info@example.com",
    phone: "+46 123 456 789",
  },
};
```

2. TypeScript will auto-complete it everywhere:

```typescript
import { siteConfig } from "@/config/site";

const email = siteConfig.contact.email; // ✅ Type-safe
```

## 📊 Migration Checklist

When you see hardcoded values, replace them:

### ❌ Before (hardcoded)

```typescript
const url = "https://stockholmsastrologiskakonferens.se";
const name = "Stockholms Astrologiska Konferens";
```

### ✅ After (using config)

```typescript
import { siteConfig } from "@/config/site";

const url = siteConfig.baseUrl;
const name = siteConfig.name;
```

## 🎨 Best Practices

1. **Always Import**: Never hardcode values that exist in config
2. **Keep it Simple**: Config is for site-wide constants, not business logic
3. **Type Safety**: Let TypeScript catch errors for you
4. **Comment When Needed**: Add comments for optional or future values
5. **Group Related Values**: Use nested objects (event, organizer, etc.)

## 🔍 Verification

After updating config, verify changes:

```bash
# Build to check for errors
npm run build

# Check generated files
# - /opengraph-image (should show new values)
# - /robots.txt (should have new domain)
# - /sitemap.xml (should have new domain)
```

## 💡 Tips

- Use `siteConfig.baseUrl` not `process.env.NEXT_PUBLIC_SITE_URL`
- Config values are available at both build time and runtime
- No need for environment variables for public site info
- For secrets (API keys), still use `.env.local`

## 🆘 Troubleshooting

### TypeScript Errors

If you see readonly errors, the config object shouldn't use `as const`:

```typescript
// ❌ Don't use
} as const;

// ✅ Use
};
```

### Values Not Updating

1. Clear `.next` cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Restart dev server

### Import Errors

Make sure you're using the correct path alias:

```typescript
import { siteConfig } from "@/config/site"; // ✅
import { siteConfig } from "../config/site"; // ❌ relative paths
```

---

**Last Updated**: October 2025  
**Maintained By**: Development Team
