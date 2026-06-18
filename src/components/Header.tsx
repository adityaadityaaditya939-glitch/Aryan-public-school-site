"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg" : "bg-white shadow-md"}`}>
      <div className="bg-gradient-to-r from-aps-navy via-aps-magenta to-aps-navy text-white text-center py-2 text-sm font-medium tracking-wide">
        {SCHOOL.legacy} · {SCHOOL.tagline}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={IMAGES.logo}
            alt={`${SCHOOL.name} logo`}
            width={60}
            height={60}
            className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div>
            <p className="font-serif text-xl font-bold text-aps-navy leading-tight">
              {SCHOOL.name}
            </p>
            <p className="text-xs text-gray-500">{SCHOOL.location}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold uppercase tracking-wide text-aps-navy transition-all duration-300 hover:text-aps-magenta"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-aps-navy to-aps-magenta transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="/login"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-aps-navy to-aps-magenta px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(27,42,107,0.4)] hover:scale-105"
          >
            <span className="relative z-10">Portal Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-aps-magenta to-aps-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-2xl border-2 border-aps-navy px-4 py-3 text-sm font-semibold text-aps-navy lg:hidden transition-all duration-300 hover:bg-aps-navy hover:text-white"
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t bg-aps-navy px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:text-aps-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-2xl bg-aps-gold px-6 py-3 text-center text-base font-semibold text-aps-navy transition-all duration-300 hover:scale-105"
            >
              Portal Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
