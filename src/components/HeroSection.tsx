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
      className="relative min-h-[60vh] overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]"
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
            className="object-cover object-center brightness-[0.85]"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
      
      {/* Light gradient overlays to improve readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-aps-navy/90 via-aps-navy/50 to-transparent md:bg-gradient-to-r md:from-aps-navy/95 md:via-aps-navy/40 md:to-transparent" />
      
      {/* Content container */}
      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-center px-6 sm:px-8 lg:px-12 py-16 md:py-20">
        <div className="space-y-6 md:space-y-8">
          {/* Badge */}
          <div className="animate-in slide-in-from-left duration-700 ease-out">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-aps-gold backdrop-blur-sm border border-white/20">
              <span className="h-2 w-2 rounded-full bg-aps-gold animate-pulse"></span>
              Welcome to {SCHOOL.name}
            </p>
          </div>

          {/* Main heading */}
          <div className="animate-in slide-in-from-left duration-700 ease-out delay-100">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white max-w-2xl">
              Nurturing Minds,{" "}
              <span className="text-aps-gold">Building Futures</span>
            </h1>
          </div>

          {/* Description */}
          <div className="animate-in slide-in-from-left duration-700 ease-out delay-200">
            <p className="max-w-xl text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
              At {SCHOOL.name}, we are committed to excellence in education with dedication, quality, and a legacy of over two decades.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="animate-in slide-in-from-left duration-700 ease-out delay-300 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <Link
              href="/admissions"
              className="group relative overflow-hidden rounded-xl bg-aps-gold px-6 py-3 text-sm sm:text-base font-bold text-aps-navy transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-aps-gold/40 text-center inline-flex items-center justify-center gap-2 w-full sm:w-auto"
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
              className="group rounded-xl border-2 border-white/40 bg-white/10 px-6 py-3 text-sm sm:text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-aps-gold hover:bg-white/20 text-center inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Learn More
            </Link>
          </div>

          {/* Stats row */}
          <div className="animate-in slide-in-from-left duration-700 ease-out delay-400 grid grid-cols-3 gap-3 sm:gap-4 mt-6">
            {[
              { label: "Years Exp", value: "20+" },
              { label: "Students", value: "300+" },
              { label: "Staff", value: "30+" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-aps-gold">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slideshow indicators */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 sm:gap-3">
        {IMAGES.heroSlideshow.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "w-8 sm:w-10 bg-aps-gold shadow-lg shadow-aps-gold/50" 
                : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3">
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
