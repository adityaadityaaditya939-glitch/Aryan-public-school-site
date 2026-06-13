import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, requireAuth } from "@/lib/api-utils";
import { toCsv, toExcelBuffer } from "@/lib/export";

type ExportType = "admissions" | "complaints";

export async function GET(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as ExportType | null;
  const format = searchParams.get("format") || "csv";

  if (!type || !["admissions", "complaints"].includes(type)) {
    return jsonError("Invalid export type");
  }

  try {
    const sql = getDb();
    let rows: Record<string, unknown>[] = [];
    let filename = "";

    if (type === "admissions") {
      rows = (await sql`
        SELECT id, student_name, date_of_birth, gender, class_applying,
               parent_name, parent_phone, parent_email, address,
               previous_school, notes, status, created_at
        FROM admissions
        ORDER BY created_at DESC
      `) as Record<string, unknown>[];
      filename = "admissions";
    } else {
      rows = (await sql`
        SELECT id, submitted_by, email, phone, category,
               subject, description, status, created_at
        FROM complaints
        ORDER BY created_at DESC
      `) as Record<string, unknown>[];
      filename = "complaints";
    }

    if (format === "xlsx") {
      const buffer = toExcelBuffer(rows, type);
      return new Response(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${filename}.xlsx"`,
        },
      });
    }

    const csv = toCsv(rows);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return jsonError("Export failed", 500);
  }
}
