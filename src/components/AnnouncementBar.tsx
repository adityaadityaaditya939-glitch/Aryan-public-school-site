"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  link_url?: string | null;
}

export default function AnnouncementBar() {
  const [items, setItems] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setItems(data.announcements || []))
      .catch(() => setItems([]));
  }, []);

  const displayItems =
    items.length > 0
      ? items.map((a) => a.title)
      : [
          "Admissions open for Academic Year 2026–27",
          "Annual Day celebrations coming soon",
          "Check the portal for holiday updates",
        ];

  return (
    <div className="flex items-center gap-3 overflow-hidden border-b bg-gray-50 px-4 py-2.5">
      <span className="shrink-0 rounded bg-aps-magenta px-2 py-0.5 text-xs font-bold uppercase text-white">
        Announcement
      </span>
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm font-medium text-aps-navy">
          {displayItems.join("  •  ")}  •  {displayItems.join("  •  ")}
        </div>
      </div>
    </div>
  );
}
