import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Skip basic auth if credentials are not configured
  const basicAuthCredentials = process.env.BASIC_AUTH_CREDENTIALS;
  if (!basicAuthCredentials) {
    return NextResponse.next();
  }

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

  const [expectedUsername, expectedPassword] = basicAuthCredentials.split(":");
  if (username !== expectedUsername || password !== expectedPassword) {
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
