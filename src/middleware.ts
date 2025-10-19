import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const auth = authHeader.split(" ")[1];
  const [username, password] = Buffer.from(auth, "base64")
    .toString()
    .split(":");

  if (username !== "astro" || password !== "freak") {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Only apply auth to:
     * - Page routes (/, /about, etc.)
     * - API routes (/api/*)
     * All static assets remain publicly accessible
     */
    "/",
    "/api/:path*",
  ],
};
