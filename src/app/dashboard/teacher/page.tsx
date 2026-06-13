import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardHeader from "@/components/DashboardHeader";
import AnnouncementForm from "@/components/AnnouncementForm";
import AnnouncementsList from "@/components/AnnouncementsList";

export default async function TeacherDashboard() {
  const session = await getSession();
  if (!session || session.role !== "teacher") {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <DashboardHeader
        title={`Welcome, ${session.fullName}`}
        role="Teacher"
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-aps-navy">Post Update</h2>
          <p className="mt-1 text-sm text-gray-500">
            Publish announcements, holidays, or important links for students and parents.
          </p>
          <div className="mt-6">
            <AnnouncementForm />
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-aps-navy">
            Important Announcements & Links
          </h2>
          <div className="mt-4">
            <AnnouncementsList />
          </div>
        </section>
      </div>
    </div>
  );
}
