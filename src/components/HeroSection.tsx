"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { SCHOOL, IMAGES } from "@/lib/constants";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.heroSlideshow.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {IMAGES.heroSlideshow.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <Image
                src={src}
                alt={`${SCHOOL.name} campus - slide ${index + 1}`}
                fill
                className="object-cover object-top"
                priority={index === 0}
                sizes="100vw"
              />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-aps-navy/95 via-aps-navy/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(156,23,105,0.15),transparent_50%)]" />
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 lg:px-8">
        <div className="animate-in slide-in-from-left duration-1000 ease-out">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-aps-gold backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-aps-gold animate-pulse"></span>
            {SCHOOL.legacy}
          </p>
        </div>
        <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl animate-in slide-in-from-left duration-1000 ease-out delay-100">
          Nurturing Minds, Building Futures
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-200 animate-in slide-in-from-left duration-1000 ease-out delay-200">
          At {SCHOOL.name}, we are committed to excellence in education with
          dedication, quality, and a legacy of over two decades.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-in slide-in-from-left duration-1000 ease-out delay-300">
          <Link
            href="/admissions"
            className="group relative overflow-hidden rounded-2xl bg-aps-gold px-8 py-4 font-semibold text-aps-navy transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,184,0,0.4)]"
          >
            <span className="relative z-10">Apply for Admission</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-aps-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href="/about"
            className="group rounded-2xl border-2 border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-aps-gold hover:bg-white/20 hover:shadow-[0_0_30px_rgba(245,184,0,0.2)]"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {IMAGES.heroSlideshow.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === currentIndex ? "w-10 bg-aps-gold shadow-[0_0_20px_rgba(245,184,0,0.5)]" : "w-3 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
