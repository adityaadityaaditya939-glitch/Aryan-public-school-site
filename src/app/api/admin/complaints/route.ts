import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { statusUpdateSchema } from "@/lib/validations";
import { jsonError, jsonSuccess, requireAuth } from "@/lib/api-utils";

const ALLOWED_STATUSES = ["open", "in_progress", "resolved", "closed"];

export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  try {
    const sql = getDb();
    const complaints = await sql`
      SELECT id, submitted_by, email, phone, category,
             subject, description, status, created_at
      FROM complaints
      ORDER BY created_at DESC
    `;
    return jsonSuccess({ complaints });
  } catch (error) {
    console.error("Admin complaints fetch error:", error);
    return jsonError("Failed to fetch complaints", 500);
  }
}

export async function PATCH(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  try {
    const body = await request.json();
    const parsed = statusUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const { id, status } = parsed.data;
    if (!ALLOWED_STATUSES.includes(status)) {
      return jsonError("Invalid status");
    }

    const sql = getDb();
    await sql`
      UPDATE complaints SET status = ${status} WHERE id = ${id}
    `;

    return jsonSuccess({ message: "Status updated" });
  } catch (error) {
    console.error("Complaint status update error:", error);
    return jsonError("Failed to update status", 500);
  }
}
