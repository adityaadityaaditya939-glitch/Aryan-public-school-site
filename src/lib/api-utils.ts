import { NextResponse } from "next/server";
import type { Role } from "./constants";
import type { SessionUser } from "./auth";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonSuccess<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function requireAuth(user: SessionUser | null, roles?: Role[]) {
  if (!user) {
    return jsonError("Unauthorized", 401);
  }
  if (roles && !roles.includes(user.role)) {
    return jsonError("Forbidden", 403);
  }
  return null;
}

export function sanitizeString(value: string, maxLength = 500) {
  return value.trim().slice(0, maxLength);
}
