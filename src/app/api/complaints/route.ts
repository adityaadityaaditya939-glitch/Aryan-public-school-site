import { getDb } from "@/lib/db";
import { complaintSchema } from "@/lib/validations";
import { jsonError, jsonSuccess, sanitizeString } from "@/lib/api-utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = complaintSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const data = parsed.data;
    const sql = getDb();

    await sql`
      INSERT INTO complaints (
        submitted_by, email, phone, category, subject, description
      ) VALUES (
        ${sanitizeString(data.submittedBy)},
        ${sanitizeString(data.email, 255)},
        ${data.phone ? sanitizeString(data.phone, 20) : null},
        ${data.category},
        ${sanitizeString(data.subject, 255)},
        ${sanitizeString(data.description, 2000)}
      )
    `;

    return jsonSuccess({ message: "Complaint submitted successfully" }, 201);
  } catch (error) {
    console.error("Complaint submit error:", error);
    return jsonError("Failed to submit complaint. Please try again.", 500);
  }
}
