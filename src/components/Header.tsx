"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SCHOOL, IMAGES } from "@/lib/constants";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/admissions", label: "Admissions" },
  { href: "/latest-updates", label: "Latest Updates" },
  { href: "/events", label: "Events" },
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
      <div className="bg-gradient-to-r from-aps-navy via-aps-magenta to-aps-navy text-white text-center py-2 text-xs md:text-sm font-medium tracking-wide">
        {SCHOOL.legacy} · {SCHOOL.tagline}
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <Image
            src={IMAGES.logo}
            alt={`${SCHOOL.name} logo`}
            width={50}
            height={50}
            className="h-12 w-12 md:h-16 md:w-16 object-contain transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div>
            <p className="font-serif text-lg md:text-xl font-bold text-aps-navy leading-tight">
              {SCHOOL.name}
            </p>
            <p className="text-[10px] md:text-xs text-gray-500">{SCHOOL.location}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold uppercase tracking-wide text-aps-navy transition-all duration-300 hover:text-aps-magenta"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-aps-navy to-aps-magenta transition-all duration-300 hover:w-full"></span>
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
          className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-aps-navy lg:hidden transition-all duration-300 hover:bg-aps-navy hover:text-white"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 transition-all duration-300">
            <span className={`h-0.5 w-6 bg-aps-navy transition-all duration-300 group-hover:bg-white ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-aps-navy transition-all duration-300 group-hover:bg-white ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-0.5 w-6 bg-aps-navy transition-all duration-300 group-hover:bg-white ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="border-t bg-aps-navy px-6 py-6">
          <div className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="animate-in slide-in-from-right text-base font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:text-aps-gold"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mt-3 animate-in slide-in-from-right rounded-2xl bg-aps-gold px-6 py-3 text-center text-base font-semibold text-aps-navy transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${navLinks.length * 50}ms` }}
            >
              Portal Login
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
