"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { SCHOOL, IMAGES } from "@/lib/constants";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.heroSlideshow.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.heroSlideshow.length) % IMAGES.heroSlideshow.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEndRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  return (
    <section 
      className="relative min-h-[90vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background slideshow */}
      {IMAGES.heroSlideshow.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={src}
            alt={`${SCHOOL.name} campus - slide ${index + 1}`}
            fill
            className="object-cover object-center brightness-[0.6]"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
      
      {/* Modern gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-aps-navy via-aps-navy/80 to-aps-purple/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(245,184,0,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(156,23,105,0.2),transparent_50%)]" />
      
      {/* Content container */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="space-y-8 md:space-y-10">
          {/* Badge */}
          <div className="animate-in slide-in-from-bottom duration-700 ease-out">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-aps-gold backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-aps-gold animate-ping"></span>
              <span className="h-2 w-2 rounded-full bg-aps-gold"></span>
              {SCHOOL.legacy}
            </p>
          </div>

          {/* Main heading */}
          <div className="animate-in slide-in-from-bottom duration-700 ease-out delay-100">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-bold leading-[1.1] text-white max-w-3xl">
              Nurturing Minds,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-aps-gold to-yellow-300 bg-clip-text text-transparent">
                  Building Futures
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-aps-gold/40 to-yellow-300/40 -z-10"></span>
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="animate-in slide-in-from-bottom duration-700 ease-out delay-200">
            <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed">
              At {SCHOOL.name}, we empower students to achieve academic excellence, 
              build strong character, and become future leaders.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="animate-in slide-in-from-bottom duration-700 ease-out delay-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <Link
              href="/admissions"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-aps-gold to-yellow-400 px-8 py-5 text-base sm:text-lg font-bold text-aps-navy shadow-2xl shadow-aps-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-aps-gold/50 text-center inline-flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Apply for Admission
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-aps-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <Link
              href="/about"
              className="group rounded-2xl border-2 border-white/30 bg-white/5 px-8 py-5 text-base sm:text-lg font-bold text-white backdrop-blur-xl shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-aps-gold hover:bg-white/15 hover:shadow-aps-gold/20 text-center inline-flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-in slide-in-from-bottom duration-700 ease-out delay-400 grid grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
            {[
              { label: "Years Legacy", value: "20+" },
              { label: "Students", value: "500+" },
              { label: "Faculty", value: "30+" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-aps-gold">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-200 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slideshow indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {IMAGES.heroSlideshow.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "w-12 bg-gradient-to-r from-aps-gold to-yellow-400 shadow-lg shadow-aps-gold/50" 
                : "w-4 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-aps-gold hover:text-aps-navy hover:border-aps-gold transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-aps-gold hover:text-aps-navy hover:border-aps-gold transition-all duration-300 flex items-center justify-center hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
