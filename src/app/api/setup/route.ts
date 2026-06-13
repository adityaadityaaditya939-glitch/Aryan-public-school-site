import { NextRequest, NextResponse } from "next/server";
import { getDb, initDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-setup-secret");
  if (!secret || secret !== process.env.SETUP_SECRET) {
    return jsonError("Unauthorized", 401);
  }

  try {
    await initDatabase();
    const sql = getDb();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@aryanpublicschool.edu.in";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
    const passwordHash = await hashPassword(adminPassword);

    await sql`
      INSERT INTO users (email, password_hash, full_name, role)
      VALUES (${adminEmail}, ${passwordHash}, 'School Administrator', 'admin')
      ON CONFLICT (email) DO NOTHING
    `;

    return jsonSuccess({
      message: "Database initialized successfully",
      adminEmail,
    });
  } catch (error) {
    console.error("Setup error:", error);
    return jsonError("Failed to initialize database", 500);
  }
}
