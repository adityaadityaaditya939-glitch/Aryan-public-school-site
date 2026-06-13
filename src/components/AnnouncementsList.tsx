"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  link_url?: string | null;
  created_at: string;
}

export default function AnnouncementsList() {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setItems(data.announcements || []))
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) {
    return (
      <p className="text-sm text-gray-500">No announcements yet. Check back soon.</p>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="rounded bg-aps-navy/10 px-2 py-0.5 text-xs font-semibold uppercase text-aps-navy">
                {item.category}
              </span>
              <h4 className="mt-2 font-semibold text-aps-navy">{item.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{item.content}</p>
              {item.link_url && (
                <a
                  href={item.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-aps-magenta hover:underline"
                >
                  Open link →
                </a>
              )}
            </div>
            <time className="shrink-0 text-xs text-gray-400">
              {new Date(item.created_at).toLocaleDateString()}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
