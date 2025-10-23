import { NextRequest, NextResponse } from "next/server";
import { verifyBasicAuth, createAuthError } from "@/lib/auth";
import { PageId, TextKey } from "@/lib/contentful/contentful-types";

export async function POST(request: NextRequest) {
  try {
    // Verify basic authentication
    if (!verifyBasicAuth(request)) {
      return createAuthError();
    }

    const body = await request.json();
    const { sys, fields } = body;

    // Verify the webhook is from Contentful (optional but recommended)
    const contentType = sys?.contentType?.sys?.id;
    const entryId = sys?.id;

    if (!contentType || !entryId) {
      return NextResponse.json(
        { message: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    // Determine which tags to revalidate based on content type
    const tagsToRevalidate: string[] = [];
    const pathsToRevalidate: string[] = [];

    if (contentType === "text") {
      // Revalidate text content
      tagsToRevalidate.push("texts");

      // Revalidate specific text key if available
      if (fields?.textKey) {
        tagsToRevalidate.push(`text-${fields.textKey}`);
      } else {
        // Revalidate all text keys if we can't determine specific one
        Object.values(TextKey).forEach((textKey) => {
          tagsToRevalidate.push(`text-${textKey}`);
        });
      }
    } else if (contentType === "page") {
      // Revalidate page content
      tagsToRevalidate.push("pages");

      // Revalidate specific page if available
      if (fields?.pageId) {
        tagsToRevalidate.push(`page-${fields.pageId}`);

        // Revalidate corresponding path
        const pagePath =
          fields.pageId === "Home" ? "/" : `/${fields.pageId.toLowerCase()}`;
        pathsToRevalidate.push(pagePath);
      } else {
        // Revalidate all pages if we can't determine specific one
        Object.values(PageId).forEach((pageId) => {
          tagsToRevalidate.push(`page-${pageId}`);
          const pagePath = pageId === "Home" ? "/" : `/${pageId.toLowerCase()}`;
          pathsToRevalidate.push(pagePath);
        });
      }
    } else if (contentType === "tickets" || contentType === "ticket") {
      // Revalidate tickets content
      tagsToRevalidate.push("tickets");

      // Revalidate homepage since tickets are displayed there
      pathsToRevalidate.push("/");
    } else if (contentType === "lecturer") {
      // Revalidate lecturers content
      tagsToRevalidate.push("lecturers");

      // Revalidate homepage since speakers are displayed there
      pathsToRevalidate.push("/");
    } else if (contentType === "hero") {
      // Revalidate hero content
      tagsToRevalidate.push("hero");

      // Revalidate homepage since hero is displayed there
      pathsToRevalidate.push("/");
    }

    // Call the revalidation API with basic auth
    const apiUsername = process.env.BASIC_AUTH_USERNAME;
    const apiPassword = process.env.BASIC_AUTH_PASSWORD;
    const basicAuth = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
      "base64"
    );

    const revalidateResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/api/revalidate`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tags: tagsToRevalidate,
          paths: pathsToRevalidate,
        }),
      }
    );

    if (!revalidateResponse.ok) {
      throw new Error(`Revalidation failed: ${revalidateResponse.statusText}`);
    }

    const revalidateResult = await revalidateResponse.json();

    return NextResponse.json({
      message: "Webhook processed successfully",
      contentType,
      entryId,
      revalidatedTags: tagsToRevalidate,
      revalidatedPaths: pathsToRevalidate,
      revalidationResult: revalidateResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Contentful webhook error:", error);
    return NextResponse.json(
      {
        message: "Webhook processing failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  // Verify basic authentication
  if (!verifyBasicAuth(request)) {
    return createAuthError();
  }

  return NextResponse.json({
    message: "Contentful webhook endpoint",
    status: "active",
    timestamp: new Date().toISOString(),
    usage: {
      method: "POST",
      headers: {
        Authorization: "Basic base64(username:password)",
        "Content-Type": "application/json",
      },
    },
  });
}
