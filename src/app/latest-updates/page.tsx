import Link from "next/link";
import Image from "next/image";
import { SCHOOL, IMAGES } from "@/lib/constants";

const dummyUpdates = [
  {
    id: 1,
    title: "Annual Day Function 2026",
    date: "June 15, 2026",
    description: "The school celebrated its Annual Day with great enthusiasm. Students performed various cultural activities.",
    image: IMAGES.heroSlideshow[0],
  },
  {
    id: 2,
    title: "New Computer Lab Inaugurated",
    date: "June 10, 2026",
    description: "A state-of-the-art computer lab has been inaugurated to enhance digital learning for students.",
    image: IMAGES.heroSlideshow[1],
  },
  {
    id: 3,
    title: "Summer Camp Registration Open",
    date: "June 5, 2026",
    description: "Registration for the annual summer camp is now open. Activities include sports, arts, and crafts.",
    image: IMAGES.heroSlideshow[2],
  },
  {
    id: 4,
    title: "Parent-Teacher Meeting",
    date: "May 30, 2026",
    description: "A successful parent-teacher meeting was held to discuss student progress and development.",
    image: IMAGES.heroSlideshow[3],
  },
];

export default function LatestUpdatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-aps-magenta">News & Updates</p>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-aps-navy">Latest Updates</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-gray-600">
          Stay updated with the latest news and announcements from {SCHOOL.name}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {dummyUpdates.map((update) => (
          <article
            key={update.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative h-48 md:h-56 overflow-hidden">
              <Image
                src={update.image}
                alt={update.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aps-navy/70 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full bg-aps-gold px-4 py-2 text-xs font-bold text-aps-navy">
                {update.date}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-aps-navy group-hover:text-aps-magenta transition-colors duration-300">
                {update.title}
              </h2>
              <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                {update.description}
              </p>
              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aps-navy group-hover:text-aps-magenta transition-colors duration-300"
              >
                Read More
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
