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
    <section className="relative min-h-[70vh] overflow-hidden">
      {IMAGES.heroSlideshow.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
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
      <div className="absolute inset-0 bg-gradient-to-r from-aps-navy/90 via-aps-navy/70 to-transparent" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-20 lg:px-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-aps-gold">
          {SCHOOL.legacy}
        </p>
        <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
          Nurturing Minds, Building Futures
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-200">
          At {SCHOOL.name}, we are committed to excellence in education with
          dedication, quality, and a legacy of over two decades.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/admissions"
            className="rounded-xl bg-aps-gold px-6 py-3 font-semibold text-aps-navy transition hover:bg-yellow-400"
          >
            Apply for Admission
          </Link>
          <Link
            href="/about"
            className="rounded-xl border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {IMAGES.heroSlideshow.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-aps-gold" : "bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
