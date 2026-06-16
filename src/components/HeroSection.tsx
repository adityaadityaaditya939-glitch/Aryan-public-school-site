import Image from "next/image";
import Link from "next/link";
import { SCHOOL, IMAGES } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <Image
        src={IMAGES.building}
        alt={`${SCHOOL.name} campus`}
        fill
        className="object-cover object-center lg:object-cover"
        priority
        sizes="100vw"
      />
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
            className="rounded bg-aps-gold px-6 py-3 font-semibold text-aps-navy transition hover:bg-yellow-400"
          >
            Apply for Admission
          </Link>
          <Link
            href="/about"
            className="rounded border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
