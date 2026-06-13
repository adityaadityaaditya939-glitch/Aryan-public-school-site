import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { statusUpdateSchema } from "@/lib/validations";
import { jsonError, jsonSuccess, requireAuth } from "@/lib/api-utils";

const ALLOWED_STATUSES = ["pending", "reviewed", "accepted", "rejected"];

export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  try {
    const sql = getDb();
    const admissions = await sql`
      SELECT id, student_name, date_of_birth, gender, class_applying,
             parent_name, parent_phone, parent_email, address,
             previous_school, notes, status, created_at
      FROM admissions
      ORDER BY created_at DESC
    `;
    return jsonSuccess({ admissions });
  } catch (error) {
    console.error("Admin admissions fetch error:", error);
    return jsonError("Failed to fetch admissions", 500);
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
      UPDATE admissions SET status = ${status} WHERE id = ${id}
    `;

    return jsonSuccess({ message: "Status updated" });
  } catch (error) {
    console.error("Admission status update error:", error);
    return jsonError("Failed to update status", 500);
  }
}
