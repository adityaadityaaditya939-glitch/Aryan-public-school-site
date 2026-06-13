import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { announcementSchema } from "@/lib/validations";
import { jsonError, jsonSuccess, requireAuth, sanitizeString } from "@/lib/api-utils";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, title, content, category, link_url, created_at
      FROM announcements
      WHERE is_published = true
      ORDER BY created_at DESC
      LIMIT 50
    `;
    return jsonSuccess({ announcements: rows });
  } catch {
    return jsonSuccess({ announcements: [] });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session, ["teacher", "admin"]);
  if (authError) return authError;

  try {
    const body = await request.json();
    const parsed = announcementSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const data = parsed.data;
    const sql = getDb();

    await sql`
      INSERT INTO announcements (title, content, category, link_url, created_by, is_published)
      VALUES (
        ${sanitizeString(data.title, 255)},
        ${sanitizeString(data.content, 2000)},
        ${data.category},
        ${data.linkUrl ? sanitizeString(data.linkUrl, 500) : null},
        ${session!.id},
        ${data.isPublished}
      )
    `;

    return jsonSuccess({ message: "Announcement published" }, 201);
  } catch (error) {
    console.error("Announcement create error:", error);
    return jsonError("Failed to create announcement", 500);
  }
}
