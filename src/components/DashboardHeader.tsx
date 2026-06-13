"use client";

import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  title: string;
  role: string;
}

export default function DashboardHeader({ title, role }: DashboardHeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-4">
      <div>
        <p className="text-sm uppercase tracking-wide text-aps-magenta">{role} Portal</p>
        <h1 className="text-2xl font-bold text-aps-navy">{title}</h1>
      </div>
      <button
        onClick={handleLogout}
        className="rounded border border-aps-navy px-4 py-2 text-sm font-semibold text-aps-navy hover:bg-aps-navy hover:text-white"
      >
        Logout
      </button>
    </div>
  );
}
