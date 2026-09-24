import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isComingSoonEnabled() {
  const value = process.env.COMING_SOON_ENABLED?.trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

export function proxy(request: NextRequest) {
  if (!isComingSoonEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const allowed = ["/coming-soon"];

  if (
    allowed.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect so only /coming-soon loads — no underlying route content.
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
