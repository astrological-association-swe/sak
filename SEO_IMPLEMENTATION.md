# SEO Implementation Guide

This document describes the complete SEO and metadata implementation for Stockholms Astrologiska Konferens website.

## 📋 What Was Implemented

### 1. Enhanced Metadata (`src/app/layout.tsx`)

✅ **Basic SEO**

- Title with template support
- Meta description
- Keywords (Swedish astrology-focused)
- Canonical URL
- Language attribute (`lang="sv"`)

✅ **Open Graph (Facebook, LinkedIn, etc.)**

- Type: website
- Locale: sv_SE (Swedish)
- Title, description, and images
- Custom dynamic OG image

✅ **Twitter Cards**

- Card type: summary_large_image
- Custom Twitter image
- Title and description

✅ **Search Engine Directives**

- Robots: index, follow
- Google-specific settings for max previews

✅ **Icons & Manifest**

- Multiple favicon sizes
- Apple touch icon
- Web app manifest

✅ **Structured Data (JSON-LD)**

- Schema.org Event markup
- Event dates, location, organizer
- Helps Google show rich snippets

---

### 2. Dynamic OG Image (`src/app/opengraph-image.tsx`)

✅ Automatically generated at `/opengraph-image`

- Size: 1200x630px (optimal for social media)
- Branded with SAK colors (Deep Teal gradient)
- Shows conference title and dates
- Uses Edge runtime for fast generation

**Preview URL**: `/opengraph-image`

---

### 3. Twitter Image (`src/app/twitter-image.tsx`)

✅ Automatically generated at `/twitter-image`

- Size: 1200x630px
- Optimized for Twitter cards
- Matches OG image design
- Uses Edge runtime

**Preview URL**: `/twitter-image`

---

### 4. Robots.txt (`src/app/robots.ts`)

✅ Guides search engine crawlers

- Allows all user agents
- Disallows `/api/` and `/admin/` paths
- Points to sitemap
- Specifies host domain

**Generated URL**: `/robots.txt`

---

### 5. Sitemap (`src/app/sitemap.ts`)

✅ XML sitemap for search engines

- Homepage with priority 1.0
- Weekly change frequency
- Auto-updates last modified date
- Commented template for adding more pages

**Generated URL**: `/sitemap.xml`

---

### 6. Web Manifest (`src/app/manifest.ts`)

✅ PWA support and app metadata

- Dynamically generated from site config
- App name and description from `siteConfig`
- Android Chrome icons (192x192, 512x512)
- Theme colors matching brand (Deep Teal #1b3e45)
- Standalone display mode
- Type-safe with TypeScript

**Generated URL**: `/manifest.webmanifest`

---

## 🔍 How Search Engines See Your Site

### Google Search Results

- **Title**: "Stockholms Astrologiska Konferens 2025 - SAK"
- **Description**: Conference description with dates
- **Rich Snippet**: Event card with date, location, organizer

### Social Media Sharing

#### Facebook/LinkedIn

- Beautiful branded image (1200x630)
- Conference title and dates
- Description text
- Proper locale (Swedish)

#### Twitter

- Summary card with large image
- Conference branding
- Event details

---

## 🚀 What This Achieves

### SEO Benefits

1. ✅ Better search rankings with comprehensive metadata
2. ✅ Rich snippets in Google (Event cards)
3. ✅ Faster indexing with sitemap
4. ✅ Controlled crawling with robots.txt
5. ✅ Swedish language targeting (`sv_SE`)

### Social Media Benefits

1. ✅ Professional-looking share cards
2. ✅ Branded images when shared
3. ✅ Accurate event information
4. ✅ Increased click-through rates

### Technical Benefits

1. ✅ Dynamic image generation (no manual design needed)
2. ✅ Type-safe metadata with TypeScript
3. ✅ Edge runtime for fast performance
4. ✅ Next.js 15 best practices

---

## 📝 Customization Notes

### Update Domain or Site Info

**✨ Easy Mode**: All site configuration is centralized!

Edit **ONE FILE**: `src/config/site.ts`

```typescript
export const siteConfig = {
  baseUrl: "https://astroloferens.se", // Change domain here
  name: "Stockholms Astrologiska Konferens",
  description: "...",
  // ... and all other site-wide settings
};
```

This automatically updates:

- ✅ Layout metadata
- ✅ OpenGraph tags
- ✅ Twitter cards
- ✅ Robots.txt
- ✅ Sitemap
- ✅ OG/Twitter images
- ✅ Structured data

See `CONFIG_GUIDE.md` for full details.

### Add More Pages to Sitemap

Edit `src/app/sitemap.ts` and uncomment/add page entries.

### Add Verification Codes

When you have Google Search Console or other verification codes:

```tsx
verification: {
  google: 'your-code-here',
  yandex: 'your-code-here',
}
```

### Update Event Details

The structured data in `layout.tsx` (lines 121-154) contains event information. Update as needed.

---

## 🧪 Testing

### Test Your SEO

1. **OG Image Preview**:

   - Run `npm run dev`
   - Visit `http://localhost:3000/opengraph-image`

2. **Social Media Cards**:

   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

3. **Structured Data**:

   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema Markup Validator](https://validator.schema.org/)

4. **General SEO**:
   - [Google Search Console](https://search.google.com/search-console)
   - Check `/robots.txt` and `/sitemap.xml` after deployment

---

## ✨ Next Steps

### When Deploying

1. Update `metadataBase` URL to your actual domain
2. Submit sitemap to Google Search Console
3. Verify site ownership (add verification codes)
4. Test all social media cards
5. Monitor search performance

### As Site Grows

1. Add new pages to sitemap.ts
2. Create page-specific OG images if needed
3. Update structured data with ticket prices, venue, etc.
4. Consider adding FAQ or Article schema for blog posts

---

## 🎯 Keywords Targeted

Swedish astrology-related keywords:

- astrologi
- konferens
- Stockholm
- astrologi Sverige
- astrologiska konferensen
- SAK
- Sveriges Astrologiska Förening
- horoskop
- föreläsare
- astrologi utbildning
- spiritualitet

---

## 📚 Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org Event](https://schema.org/Event)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

---

**Implementation Date**: October 2025  
**Next.js Version**: 15.5.6  
**Framework**: Next.js with App Router
