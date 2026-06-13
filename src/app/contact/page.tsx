import { SCHOOL } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-aps-magenta">
          Contact
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-aps-navy">
          Get in Touch
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-aps-navy p-8 text-white">
          <h2 className="text-xl font-semibold">School Office</h2>
          <ul className="mt-6 space-y-4 text-gray-200">
            <li>
              <p className="text-sm text-gray-400">Address</p>
              <p>{SCHOOL.name}, {SCHOOL.location}</p>
            </li>
            <li>
              <p className="text-sm text-gray-400">Phone</p>
              <p>{SCHOOL.phone}</p>
            </li>
            <li>
              <p className="text-sm text-gray-400">Email</p>
              <p>{SCHOOL.email}</p>
            </li>
            <li>
              <p className="text-sm text-gray-400">Admissions</p>
              <p>{SCHOOL.admissionEmail}</p>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-aps-navy">Office Hours</h2>
          <ul className="mt-6 space-y-3 text-gray-600">
            <li className="flex justify-between border-b pb-2">
              <span>Monday – Friday</span>
              <span>8:00 AM – 3:00 PM</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Saturday</span>
              <span>8:00 AM – 12:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span>Closed</span>
            </li>
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            For admissions enquiries, please visit our{" "}
            <a href="/admissions" className="font-medium text-aps-magenta hover:underline">
              online admission form
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
