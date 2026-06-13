"use client";

import { useState } from "react";

export default function ComplaintForm() {
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
      const res = await fetch("/api/complaints", {
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
          <label className="mb-1 block text-sm font-medium">Your Name *</label>
          <input name="submittedBy" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email *</label>
          <input name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <input name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Category *</label>
          <select name="category" required className={inputClass}>
            <option value="">Select category</option>
            <option value="academic">Academic</option>
            <option value="discipline">Discipline</option>
            <option value="facilities">Facilities</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Subject *</label>
        <input name="subject" required className={inputClass} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Description *</label>
        <textarea name="description" required rows={5} minLength={20} className={inputClass} placeholder="Please describe your concern in detail..." />
      </div>

      {message && (
        <p className={`rounded-lg px-4 py-3 text-sm ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-aps-magenta px-8 py-3 font-semibold text-white transition hover:bg-aps-navy disabled:opacity-60"
      >
        {status === "loading" ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
