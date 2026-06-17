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
    <article className="overflow-hidden rounded-2xl bg-white shadow-lg">
      <h3 className="px-6 pt-6 text-sm font-bold uppercase tracking-wider text-aps-navy">
        {title}
      </h3>
      <div className="mt-4 grid md:grid-cols-5">
        <div className="flex items-center justify-center bg-aps-navy p-8 md:col-span-2">
          <span className="rounded-xl border-2 border-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
            Read Message →
          </span>
        </div>
        <div className="relative h-80 md:col-span-3 md:h-auto md:min-h-[320px]">
          {images.map((src, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image src={src} alt={`${name} - slide ${index + 1}`} fill className="object-contain object-top bg-gray-50" sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
          ))}
        </div>
      </div>
      <div className="border-t px-6 py-4">
        <p className="font-semibold text-aps-navy">{name}</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{preview}</p>
      </div>
    </article>
  );
}
