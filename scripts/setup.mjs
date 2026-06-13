/**
 * One-time database setup script.
 * Usage: node scripts/setup.mjs
 * Requires DATABASE_URL, JWT_SECRET, SETUP_SECRET in .env.local
 */

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) {
    console.error("Missing .env.local — copy .env.example and fill in values.");
    process.exit(1);
  }

  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnv();

  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set in .env.local");
    process.exit(1);
  }

  const sql = neon(url);

  console.log("Creating tables...");

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admissions (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      date_of_birth DATE NOT NULL,
      gender VARCHAR(20) NOT NULL,
      class_applying VARCHAR(50) NOT NULL,
      parent_name VARCHAR(255) NOT NULL,
      parent_phone VARCHAR(20) NOT NULL,
      parent_email VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      previous_school VARCHAR(255),
      notes TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS complaints (
      id SERIAL PRIMARY KEY,
      submitted_by VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      category VARCHAR(100) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      status VARCHAR(20) DEFAULT 'open',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS announcements (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      category VARCHAR(50) NOT NULL CHECK (category IN ('announcement', 'holiday', 'link')),
      link_url VARCHAR(500),
      created_by INTEGER REFERENCES users(id),
      is_published BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const adminEmail = process.env.ADMIN_EMAIL || "admin@aryanpublicschool.edu.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await sql`
    INSERT INTO users (email, password_hash, full_name, role)
    VALUES (${adminEmail}, ${passwordHash}, 'School Administrator', 'admin')
    ON CONFLICT (email) DO NOTHING
  `;

  console.log("Done!");
  console.log(`Admin email: ${adminEmail}`);
  console.log(`Admin password: ${adminPassword}`);
  console.log("Change the admin password after first login in production.");
}

main().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
