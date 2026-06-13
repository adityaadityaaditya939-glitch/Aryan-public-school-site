"use client";

import { useState } from "react";

export default function AdmissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Submission failed");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-aps-navy focus:outline-none focus:ring-1 focus:ring-aps-navy";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Student Name *</label>
          <input name="studentName" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Date of Birth *</label>
          <input name="dateOfBirth" type="date" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Gender *</label>
          <select name="gender" required className={inputClass}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Class Applying For *</label>
          <select name="classApplying" required className={inputClass}>
            <option value="">Select class</option>
            {["Nursery", "LKG", "UKG", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Parent / Guardian Name *</label>
          <input name="parentName" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Parent Phone *</label>
          <input name="parentPhone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Parent Email *</label>
          <input name="parentEmail" type="email" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Previous School</label>
          <input name="previousSchool" className={inputClass} />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Address *</label>
        <textarea name="address" required rows={3} className={inputClass} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Additional Notes</label>
        <textarea name="notes" rows={2} className={inputClass} />
      </div>

      {message && (
        <p className={`rounded-lg px-4 py-3 text-sm ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-aps-navy px-8 py-3 font-semibold text-white transition hover:bg-aps-magenta disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
