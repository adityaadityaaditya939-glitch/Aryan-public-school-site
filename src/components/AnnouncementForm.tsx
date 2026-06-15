"use client";

import { useState } from "react";

interface AnnouncementFormProps {
  onPosted?: () => void;
}

export default function AnnouncementForm({ onPosted }: AnnouncementFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      linkUrl: formData.get("linkUrl") || "",
      isPublished: true,
    };

    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Failed to publish");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      form.reset();
      onPosted?.();
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-aps-navy focus:outline-none focus:ring-1 focus:ring-aps-navy";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Title *</label>
        <input name="title" required className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Category *</label>
        <select name="category" required className={inputClass}>
          <option value="announcement">Announcement</option>
          <option value="holiday">Holiday</option>
          <option value="link">Important Link</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Content *</label>
        <textarea name="content" required rows={3} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Link URL (optional)</label>
        <input name="linkUrl" type="url" className={inputClass} placeholder="https://" />
      </div>

      {message && (
        <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-aps-navy px-6 py-2.5 text-sm font-semibold text-white hover:bg-aps-magenta disabled:opacity-60"
      >
        {status === "loading" ? "Publishing..." : "Publish Update"}
      </button>
    </form>
  );
}
