import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardHeader from "@/components/DashboardHeader";
import AnnouncementsList from "@/components/AnnouncementsList";

export default async function StudentDashboard() {
  const session = await getSession();
  if (!session || session.role !== "student") {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <DashboardHeader
        title={`Welcome, ${session.fullName}`}
        role="Student"
      />

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-aps-navy">
          Important Announcements & Links
        </h2>
        <div className="mt-4">
          <AnnouncementsList />
        </div>
      </section>
    </div>
  );
}
