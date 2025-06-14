import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const isLoggedIn = userCookie?.value === "true";

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match everything EXCEPT these paths: /api, /login, /public, _next (for static files), and assets
    "/((?!api|_next/static|_next/image|favicon.ico|login|public).*)",
  ],
};
