import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = "authjs.session-token";

  if (!session) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
