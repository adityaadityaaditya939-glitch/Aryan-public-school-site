import Link from "next/link";
import Image from "next/image";
import { SCHOOL, IMAGES } from "@/lib/constants";

const dummyEvents = [
  {
    id: 1,
    title: "Sports Day 2026",
    date: "July 10, 2026",
    time: "9:00 AM - 3:00 PM",
    location: "School Grounds",
    description: "Annual sports day with various competitions and activities for all students.",
    image: IMAGES.slideshow[4],
  },
  {
    id: 2,
    title: "Science Exhibition",
    date: "July 25, 2026",
    time: "10:00 AM - 5:00 PM",
    location: "Science Lab",
    description: "Students will showcase their science projects and innovations.",
    image: IMAGES.slideshow[7],
  },
  {
    id: 3,
    title: "Cultural Fest",
    date: "August 15, 2026",
    time: "11:00 AM - 6:00 PM",
    location: "School Auditorium",
    description: "Celebrate Independence Day with cultural performances by students.",
    image: IMAGES.slideshow[2],
  },
  {
    id: 4,
    title: "Annual Picnic",
    date: "September 5, 2026",
    time: "7:00 AM - 5:00 PM",
    location: "Adventure Park",
    description: "Fun-filled picnic for all students with games and activities.",
    image: IMAGES.slideshow[1],
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-aps-magenta">Events</p>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-aps-navy">Upcoming Events</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-gray-600">
          Join us for exciting events and activities at {SCHOOL.name}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {dummyEvents.map((event) => (
          <article
            key={event.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
          >
            <div className="relative h-48 md:h-56 overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aps-navy/70 to-transparent" />
              <div className="absolute top-4 left-4 rounded-full bg-aps-gold px-4 py-2 text-xs font-bold text-aps-navy">
                {event.date}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-aps-navy group-hover:text-aps-magenta transition-colors duration-300">
                {event.title}
              </h2>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-aps-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-aps-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </p>
              </div>
              <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                {event.description}
              </p>
              <Link
                href="#"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-aps-navy group-hover:text-aps-magenta transition-colors duration-300"
              >
                Learn More
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
