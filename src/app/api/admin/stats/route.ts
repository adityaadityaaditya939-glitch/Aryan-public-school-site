import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonSuccess, requireAuth } from "@/lib/api-utils";

export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session, ["admin"]);
  if (authError) return authError;

  try {
    const sql = getDb();

    const [admissions, complaints, announcements, users] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM admissions`,
      sql`SELECT COUNT(*)::int AS count FROM complaints`,
      sql`SELECT COUNT(*)::int AS count FROM announcements`,
      sql`SELECT COUNT(*)::int AS count FROM users`,
    ]);

    const recentAdmissions = await sql`
      SELECT id, student_name, class_applying, status, created_at
      FROM admissions
      ORDER BY created_at DESC
      LIMIT 5
    `;

    const recentComplaints = await sql`
      SELECT id, submitted_by, subject, status, created_at
      FROM complaints
      ORDER BY created_at DESC
      LIMIT 5
    `;

    return jsonSuccess({
      stats: {
        admissions: admissions[0]?.count ?? 0,
        complaints: complaints[0]?.count ?? 0,
        announcements: announcements[0]?.count ?? 0,
        users: users[0]?.count ?? 0,
      },
      recentAdmissions,
      recentComplaints,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return jsonSuccess({
      stats: { admissions: 0, complaints: 0, announcements: 0, users: 0 },
      recentAdmissions: [],
      recentComplaints: [],
    });
  }
}
