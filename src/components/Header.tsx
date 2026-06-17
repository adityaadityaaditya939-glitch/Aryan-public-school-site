"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SCHOOL, IMAGES } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/admissions", label: "Admissions" },
  { href: "/complaints", label: "Feedback" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-aps-magenta text-white text-center py-1.5 text-sm font-medium tracking-wide">
        {SCHOOL.legacy} · {SCHOOL.tagline}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={IMAGES.logo}
            alt={`${SCHOOL.name} logo`}
            width={56}
            height={56}
            className="h-14 w-14 object-contain"
            priority
          />
          <div>
            <p className="font-serif text-lg font-bold text-aps-navy leading-tight">
              {SCHOOL.name}
            </p>
            <p className="text-xs text-gray-500">{SCHOOL.location}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-aps-navy transition hover:text-aps-magenta"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="rounded-xl bg-aps-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-aps-magenta"
          >
            Portal Login
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-aps-navy px-3 py-2 text-sm font-semibold text-aps-navy lg:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t bg-aps-navy px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wide text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-xl bg-aps-gold px-4 py-2 text-center text-sm font-semibold text-aps-navy"
            >
              Portal Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
