import { getDb } from "@/lib/db";
import {
  getSession,
  setSessionCookie,
  verifyPassword,
  clearSessionCookie,
} from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const { email, password, role } = parsed.data;
    const sql = getDb();

    const rows = await sql`
      SELECT id, email, password_hash, full_name, role
      FROM users
      WHERE email = ${email} AND role = ${role}
      LIMIT 1
    `;

    const user = rows[0];
    if (!user) {
      return jsonError("Invalid credentials", 401);
    }

    const valid = await verifyPassword(password, user.password_hash as string);
    if (!valid) {
      return jsonError("Invalid credentials", 401);
    }

    const sessionUser = {
      id: user.id as number,
      email: user.email as string,
      fullName: user.full_name as string,
      role: user.role as "student" | "teacher" | "admin",
    };

    await setSessionCookie(sessionUser);

    return jsonSuccess({ user: sessionUser });
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Login failed", 500);
  }
}

export async function DELETE() {
  await clearSessionCookie();
  return jsonSuccess({ message: "Logged out" });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return jsonError("Not authenticated", 401);
  }
  return jsonSuccess({ user: session });
}
