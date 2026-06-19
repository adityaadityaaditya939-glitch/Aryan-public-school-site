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
      className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
                className="object-cover object-center brightness-[0.8]"
                priority={index === 0}
                sizes="100vw"
              />
        </div>
      ))}
      {/* Dark purple/blue background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-aps-navy/98 via-aps-navy/90 to-aps-navy/50 md:bg-gradient-to-r md:from-aps-navy/98 md:via-aps-navy/80 md:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(123,67,151,0.3),transparent_60%)]" />
      <div className="relative mx-auto flex min-h-[80vh] md:min-h-[90vh] max-w-7xl flex-col justify-center px-4 sm:px-6 pb-20 pt-16 md:py-24 lg:px-8">
        <div className="animate-in slide-in-from-left duration-1000 ease-out">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-aps-gold backdrop-blur-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-aps-gold animate-pulse"></span>
            {SCHOOL.legacy}
          </p>
        </div>
        <h1 className="max-w-2xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white animate-in slide-in-from-left duration-1000 ease-out delay-100">
          Nurturing Minds, Building Futures
        </h1>
        <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed animate-in slide-in-from-left duration-1000 ease-out delay-200">
          At {SCHOOL.name}, we are committed to excellence in education with
          dedication, quality, and a legacy of over two decades.
        </p>
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 animate-in slide-in-from-left duration-1000 ease-out delay-300">
          <Link
            href="/admissions"
            className="group relative overflow-hidden rounded-xl bg-aps-gold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-aps-navy transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,184,0,0.6)] text-center inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Apply for Admission
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-aps-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <Link
            href="/about"
            className="group rounded-xl border-2 border-white/40 bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-aps-gold hover:bg-white/20 hover:shadow-[0_0_30px_rgba(245,184,0,0.4)] text-center inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learn More
          </Link>
        </div>
      </div>
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 flex -translate-x-1/2 gap-2 sm:gap-3">
        {IMAGES.heroSlideshow.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 sm:h-2 md:h-3 rounded-full transition-all duration-500 ${
              index === currentIndex ? "w-8 sm:w-10 md:w-12 bg-aps-gold shadow-[0_0_20px_rgba(245,184,0,0.6)]" : "w-1.5 sm:w-2 md:w-3 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="hidden md:flex absolute right-6 bottom-1/2 -translate-y-1/2 flex-col gap-3">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-aps-gold hover:text-aps-navy hover:border-aps-gold transition-all duration-300 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-aps-gold hover:text-aps-navy hover:border-aps-gold transition-all duration-300 flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
