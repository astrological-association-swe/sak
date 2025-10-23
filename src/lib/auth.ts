import { NextRequest } from "next/server";

export function verifyBasicAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  const expectedUsername = process.env.BASIC_AUTH_USERNAME;
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    console.error(
      "BASIC_AUTH_USERNAME or BASIC_AUTH_PASSWORD environment variables not set"
    );
    return false;
  }

  return username === expectedUsername && password === expectedPassword;
}

export function createAuthError() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="API Access"',
    },
  });
}
