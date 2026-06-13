"use client";

import { useState } from "react";

export default function CreateUserForm({ onCreated }: { onCreated?: () => void }) {
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
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to create account");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      form.reset();
      onCreated?.();
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-aps-navy focus:outline-none focus:ring-1 focus:ring-aps-navy";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Full Name</label>
          <input name="fullName" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
          <input name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
          <input name="password" type="password" required minLength={6} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">Role</label>
          <select name="role" required className={inputClass}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
      </div>

      {message && (
        <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded bg-aps-green px-4 py-2 text-sm font-semibold text-white hover:bg-aps-navy disabled:opacity-60"
      >
        {status === "loading" ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}
