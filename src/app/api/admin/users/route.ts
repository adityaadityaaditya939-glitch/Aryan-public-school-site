import { getDb } from "@/lib/db";
import { getSession, hashPassword } from "@/lib/auth";
import { createUserSchema } from "@/lib/validations";
import { jsonError, jsonSuccess, requireAuth, sanitizeString } from "@/lib/api-utils";

export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  try {
    const sql = getDb();
    const users = await sql`
      SELECT id, email, full_name, role, created_at
      FROM users
      ORDER BY created_at DESC
    `;
    return jsonSuccess({ users });
  } catch (error) {
    console.error("Fetch users error:", error);
    return jsonError("Failed to fetch users", 500);
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  try {
    const body = await request.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const { email, password, fullName, role } = parsed.data;
    const sql = getDb();
    const passwordHash = await hashPassword(password);

    await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES (
        ${sanitizeString(email, 255)},
        ${passwordHash},
        ${sanitizeString(fullName, 255)},
        ${role}
      )
    `;

    return jsonSuccess({ message: `${role} account created successfully` }, 201);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "";
    if (message.includes("duplicate") || message.includes("unique")) {
      return jsonError("An account with this email already exists");
    }
    console.error("Create user error:", error);
    return jsonError("Failed to create user", 500);
  }
}
