import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { PageId, TextKey } from "@/lib/contentful/contentful-types";
import { verifyBasicAuth, createAuthError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Verify basic authentication
    if (!verifyBasicAuth(request)) {
      return createAuthError();
    }

    const body = await request.json();
    const { tags, paths } = body;

    const revalidatedTags: string[] = [];
    const revalidatedPaths: string[] = [];

    // Revalidate specific tags
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag);
        revalidatedTags.push(tag);
      }
    }

    // Revalidate specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path);
        revalidatedPaths.push(path);
      }
    }

    // If no specific tags/paths provided, revalidate all content
    if (!tags && !paths) {
      // Revalidate all text content
      revalidateTag("texts");
      revalidatedTags.push("texts");

      // Revalidate all page content
      revalidateTag("pages");
      revalidatedTags.push("pages");

      // Revalidate all tickets content
      revalidateTag("tickets");
      revalidatedTags.push("tickets");

      // Revalidate all lecturers content
      revalidateTag("lecturers");
      revalidatedTags.push("lecturers");

      // Revalidate hero content
      revalidateTag("hero");
      revalidatedTags.push("hero");

      // Revalidate all individual page tags
      Object.values(PageId).forEach((pageId) => {
        revalidateTag(`page-${pageId}`);
        revalidatedTags.push(`page-${pageId}`);
      });

      // Revalidate all individual text tags
      Object.values(TextKey).forEach((textKey) => {
        revalidateTag(`text-${textKey}`);
        revalidatedTags.push(`text-${textKey}`);
      });

      // Revalidate common paths
      const commonPaths = ["/", "/about", "/contact"];
      commonPaths.forEach((path) => {
        revalidatePath(path);
        revalidatedPaths.push(path);
      });
    }

    return NextResponse.json({
      message: "Revalidation successful",
      revalidatedTags,
      revalidatedPaths,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// // GET endpoint for testing revalidation
// export async function GET(request: NextRequest) {
//   // Verify basic authentication
//   if (!verifyBasicAuth(request)) {
//     return createAuthError();
//   }

//   return NextResponse.json({
//     message: "Revalidation API endpoint",
//     usage: {
//       method: "POST",
//       headers: {
//         Authorization: "Basic base64(username:password)",
//         "Content-Type": "application/json",
//       },
//       body: {
//         tags: [
//           "texts",
//           "pages",
//           "page-Home",
//           "text-UNDER_CONSTRUCTION",
//           "text-OBS_TICKET_INFO",
//         ],
//         paths: ["/", "/about", "/contact"],
//       },
//     },
//     availableTags: {
//       texts: ["texts", "text-HERO_DATE", "text-HERO_TIME", "text-HERO_TEXT"],
//       pages: ["pages", "page-Home", "page-About", "page-Contact"],
//       tickets: ["tickets"],
//       lecturers: ["lecturers"],
//       hero: ["hero"],
//     },
//   });
// }
