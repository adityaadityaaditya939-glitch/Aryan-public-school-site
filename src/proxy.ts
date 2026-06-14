import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import type { Role } from "@/lib/constants";

const PROTECTED_PREFIXES = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("aps_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifySessionToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const roleFromPath = pathname.split("/")[2] as Role | undefined;
  if (roleFromPath && user.role !== roleFromPath) {
    return NextResponse.redirect(new URL(`/dashboard/${user.role}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
