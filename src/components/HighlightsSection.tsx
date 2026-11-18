"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { IMAGES } from "@/lib/constants";

const images = IMAGES.highlightsSlideshow;

export default function HighlightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-magenta mb-2">
          Our Journey
        </p>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-aps-navy">
          Highlights
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-lg text-gray-600">
          Glimpses of the moments, achievements, and milestones that define life at our school.
        </p>
      </div>

      <div
        className="group relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-100 bg-aps-navy shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Highlight ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/80 text-aps-navy shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-aps-gold"
          aria-label="Previous highlight"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/80 text-aps-navy shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-aps-gold"
          aria-label="Next highlight"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide counter */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-aps-gold" : "w-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Go to highlight ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
