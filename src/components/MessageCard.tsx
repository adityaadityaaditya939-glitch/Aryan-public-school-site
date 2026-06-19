"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";

interface MessageCardProps {
  title: string;
  name: string;
  images: readonly string[];
  preview: string;
}

export default function MessageCard({ title, name, images, preview }: MessageCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      <div className="absolute top-0 left-0 h-20 w-20 bg-gradient-to-br from-aps-gold/20 to-aps-magenta/20 rounded-br-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <h3 className="relative z-10 px-6 md:px-8 pt-6 md:pt-8 text-xs md:text-sm font-bold uppercase tracking-wider text-aps-navy">
        {title}
      </h3>
      <div className="mt-4 grid md:grid-cols-5">
        <div className="flex items-center justify-center bg-gradient-to-br from-aps-navy to-aps-magenta p-6 md:p-8 md:col-span-2">
          <span className="rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:scale-105">
            Read Message →
          </span>
        </div>
        <div className="relative h-64 md:h-80 md:col-span-3 md:h-auto md:min-h-[320px]">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image src={src} alt={`${name} - slide ${index + 1}`} fill className="object-contain object-top bg-gradient-to-br from-gray-50 to-white" sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 px-6 md:px-8 py-4 md:py-6">
        <p className="text-base md:text-lg font-semibold text-aps-navy">{name}</p>
        <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">{preview}</p>
      </div>
    </article>
  );
}
