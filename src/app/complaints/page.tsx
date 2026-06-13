import ComplaintForm from "@/components/ComplaintForm";
import { SCHOOL } from "@/lib/constants";

export default function ComplaintsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-aps-magenta">
          Feedback
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-aps-navy">
          Complaints & Feedback
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Students and parents can use this section to share concerns or feedback.
          All submissions are reviewed by the {SCHOOL.name} administration.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <ComplaintForm />
      </div>
    </div>
  );
}
