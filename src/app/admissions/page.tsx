import AdmissionForm from "@/components/AdmissionForm";
import { SCHOOL } from "@/lib/constants";

export default function AdmissionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-aps-magenta">
          Admissions
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-aps-navy">
          Apply for Admission
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Fill out the form below to apply for admission at {SCHOOL.name}.
          Our admissions team will contact you after reviewing your application.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
        <AdmissionForm />
      </div>
    </div>
  );
}
