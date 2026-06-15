"use client";

import { useCallback, useEffect, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import CreateUserForm from "@/components/CreateUserForm";
import AnnouncementForm from "@/components/AnnouncementForm";

interface Stats {
  admissions: number;
  complaints: number;
  announcements: number;
  users: number;
}

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface Admission {
  id: number;
  student_name: string;
  class_applying: string;
  parent_name: string;
  parent_phone: string;
  status: string;
  created_at: string;
}

interface Complaint {
  id: number;
  submitted_by: string;
  subject: string;
  category: string;
  status: string;
  created_at: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  category: string;
  link_url?: string | null;
  created_at: string;
}

interface AdminDashboardProps {
  adminName: string;
}

type Tab = "overview" | "admissions" | "complaints" | "users" | "announcements";

export default function AdminDashboard({ adminName }: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats>({
    admissions: 0,
    complaints: 0,
    announcements: 0,
    users: 0,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const loadStats = useCallback(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats))
      .catch(() => {});
  }, []);

  const loadUsers = useCallback(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users || []))
      .catch(() => {});
  }, []);

  const loadAdmissions = useCallback(() => {
    fetch("/api/admin/admissions")
      .then((res) => res.json())
      .then((data) => setAdmissions(data.admissions || []))
      .catch(() => {});
  }, []);

  const loadComplaints = useCallback(() => {
    fetch("/api/admin/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data.complaints || []))
      .catch(() => {});
  }, []);

  const loadAnnouncements = useCallback(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.announcements || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadStats();
    loadUsers();
    loadAdmissions();
    loadComplaints();
    loadAnnouncements();
  }, [loadStats, loadUsers, loadAdmissions, loadComplaints, loadAnnouncements]);

  function download(type: "admissions" | "complaints", format: "csv" | "xlsx") {
    window.location.href = `/api/admin/export?type=${type}&format=${format}`;
  }

  async function updateAdmissionStatus(id: number, status: string) {
    await fetch("/api/admin/admissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadAdmissions();
    loadStats();
  }

  async function updateComplaintStatus(id: number, status: string) {
    await fetch("/api/admin/complaints", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadComplaints();
    loadStats();
  }

  async function deleteAnnouncement(id: number) {
    await fetch(`/api/announcements?id=${id}`, {
      method: "DELETE",
    });
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    loadStats();
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "admissions", label: "Admissions" },
    { id: "complaints", label: "Complaints" },
    { id: "users", label: "Users" },
    { id: "announcements", label: "Announcements" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <DashboardHeader title={`Welcome, ${adminName}`} role="Admin" />

      <div className="mb-6 flex flex-wrap gap-2 border-b pb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === t.id
                ? "bg-aps-navy text-white"
                : "text-aps-navy hover:bg-gray-100"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Admissions", value: stats.admissions, color: "border-aps-magenta" },
              { label: "Complaints", value: stats.complaints, color: "border-aps-navy" },
              { label: "Announcements", value: stats.announcements, color: "border-aps-gold" },
              { label: "Users", value: stats.users, color: "border-aps-green" },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border-l-4 ${item.color} bg-white p-5 shadow-sm`}
              >
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-3xl font-bold text-aps-navy">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-aps-navy">Export Data</h2>
              <p className="mt-1 text-sm text-gray-500">
                Download submissions as CSV or Excel — no database access needed.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => download("admissions", "csv")}
                  className="rounded bg-aps-navy px-4 py-2 text-sm font-semibold text-white hover:bg-aps-magenta"
                >
                  Admissions (CSV)
                </button>
                <button
                  onClick={() => download("admissions", "xlsx")}
                  className="rounded border border-aps-navy px-4 py-2 text-sm font-semibold text-aps-navy hover:bg-aps-navy hover:text-white"
                >
                  Admissions (Excel)
                </button>
                <button
                  onClick={() => download("complaints", "csv")}
                  className="rounded bg-aps-magenta px-4 py-2 text-sm font-semibold text-white hover:bg-aps-navy"
                >
                  Complaints (CSV)
                </button>
                <button
                  onClick={() => download("complaints", "xlsx")}
                  className="rounded border border-aps-magenta px-4 py-2 text-sm font-semibold text-aps-magenta hover:bg-aps-magenta hover:text-white"
                >
                  Complaints (Excel)
                </button>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-aps-navy">Post Announcement</h2>
              <p className="mt-1 text-sm text-gray-500">
                Admins can also publish updates to the public site.
              </p>
              <div className="mt-4">
                <AnnouncementForm onPosted={() => { loadAnnouncements(); loadStats(); }} />
              </div>
            </section>
          </div>
        </>
      )}

      {tab === "admissions" && (
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-aps-navy">All Admission Applications</h2>
            <div className="flex gap-2">
              <button
                onClick={() => download("admissions", "csv")}
                className="rounded border border-aps-navy px-3 py-1.5 text-xs font-semibold text-aps-navy"
              >
                Export CSV
              </button>
              <button
                onClick={() => download("admissions", "xlsx")}
                className="rounded bg-aps-navy px-3 py-1.5 text-xs font-semibold text-white"
              >
                Export Excel
              </button>
            </div>
          </div>

          {admissions.length === 0 ? (
            <p className="text-sm text-gray-500">No applications yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-gray-500">
                    <th className="py-2 pr-4">Student</th>
                    <th className="py-2 pr-4">Class</th>
                    <th className="py-2 pr-4">Parent</th>
                    <th className="py-2 pr-4">Phone</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {admissions.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 pr-4 font-medium">{item.student_name}</td>
                      <td className="py-3 pr-4">{item.class_applying}</td>
                      <td className="py-3 pr-4">{item.parent_name}</td>
                      <td className="py-3 pr-4">{item.parent_phone}</td>
                      <td className="py-3 pr-4 text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <select
                          value={item.status}
                          onChange={(e) => updateAdmissionStatus(item.id, e.target.value)}
                          className="rounded border border-gray-300 px-2 py-1 text-xs"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tab === "complaints" && (
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-aps-navy">All Complaints & Feedback</h2>
            <div className="flex gap-2">
              <button
                onClick={() => download("complaints", "csv")}
                className="rounded border border-aps-magenta px-3 py-1.5 text-xs font-semibold text-aps-magenta"
              >
                Export CSV
              </button>
              <button
                onClick={() => download("complaints", "xlsx")}
                className="rounded bg-aps-magenta px-3 py-1.5 text-xs font-semibold text-white"
              >
                Export Excel
              </button>
            </div>
          </div>

          {complaints.length === 0 ? (
            <p className="text-sm text-gray-500">No complaints yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-gray-500">
                    <th className="py-2 pr-4">Subject</th>
                    <th className="py-2 pr-4">From</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 pr-4 font-medium">{item.subject}</td>
                      <td className="py-3 pr-4">{item.submitted_by}</td>
                      <td className="py-3 pr-4 capitalize">{item.category}</td>
                      <td className="py-3 pr-4 text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3">
                        <select
                          value={item.status}
                          onChange={(e) => updateComplaintStatus(item.id, e.target.value)}
                          className="rounded border border-gray-300 px-2 py-1 text-xs"
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {tab === "users" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-aps-navy">Create Student / Teacher Account</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add portal login credentials for students and teachers.
            </p>
            <div className="mt-4">
              <CreateUserForm onCreated={() => { loadUsers(); loadStats(); }} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-aps-navy">All Users</h2>
            {users.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">No users yet.</p>
            ) : (
              <ul className="mt-4 max-h-96 space-y-3 overflow-y-auto">
                {users.map((user) => (
                  <li key={user.id} className="flex items-center justify-between border-b pb-2 text-sm">
                    <div>
                      <p className="font-medium">{user.full_name}</p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                    <span className="rounded bg-aps-navy/10 px-2 py-0.5 text-xs font-semibold capitalize text-aps-navy">
                      {user.role}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {tab === "announcements" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-aps-navy">Post Announcement</h2>
            <p className="mt-1 text-sm text-gray-500">
              Admins can publish updates to the public site.
            </p>
            <div className="mt-4">
              <AnnouncementForm onPosted={() => { loadAnnouncements(); loadStats(); }} />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-aps-navy">All Announcements</h2>
            {announcements.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">No announcements yet.</p>
            ) : (
              <ul className="mt-4 max-h-96 space-y-3 overflow-y-auto">
                {announcements.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-3 border-b pb-3">
                    <div className="flex-1">
                      <span className="rounded bg-aps-gold/10 px-2 py-0.5 text-xs font-semibold uppercase text-aps-gold">
                        {item.category}
                      </span>
                      <h4 className="mt-1 font-semibold text-aps-navy">{item.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{item.content}</p>
                      {item.link_url && (
                        <a
                          href={item.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-xs font-medium text-aps-magenta hover:underline"
                        >
                          Open link →
                        </a>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteAnnouncement(item.id)}
                      className="shrink-0 rounded border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
