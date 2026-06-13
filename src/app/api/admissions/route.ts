import { getDb } from "@/lib/db";
import { admissionSchema } from "@/lib/validations";
import { jsonError, jsonSuccess, sanitizeString } from "@/lib/api-utils";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, student_name, date_of_birth, gender, class_applying,
             parent_name, parent_phone, parent_email, address,
             previous_school, notes, status, created_at
      FROM admissions
      ORDER BY created_at DESC
      LIMIT 20
    `;
    return jsonSuccess({ admissions: rows });
  } catch (error) {
    console.error("Fetch admissions error:", error);
    return jsonSuccess({ admissions: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = admissionSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const data = parsed.data;
    const sql = getDb();

    await sql`
      INSERT INTO admissions (
        student_name, date_of_birth, gender, class_applying,
        parent_name, parent_phone, parent_email, address,
        previous_school, notes
      ) VALUES (
        ${sanitizeString(data.studentName)},
        ${data.dateOfBirth},
        ${data.gender},
        ${sanitizeString(data.classApplying)},
        ${sanitizeString(data.parentName)},
        ${sanitizeString(data.parentPhone, 20)},
        ${sanitizeString(data.parentEmail, 255)},
        ${sanitizeString(data.address, 1000)},
        ${data.previousSchool ? sanitizeString(data.previousSchool) : null},
        ${data.notes ? sanitizeString(data.notes, 1000) : null}
      )
    `;

    return jsonSuccess({ message: "Admission application submitted successfully" }, 201);
  } catch (error) {
    console.error("Admission submit error:", error);
    return jsonError("Failed to submit application. Please try again.", 500);
  }
}
