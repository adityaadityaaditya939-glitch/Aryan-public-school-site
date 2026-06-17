import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MessageCard from "@/components/MessageCard";
import AnnouncementsList from "@/components/AnnouncementsList";
import { Slideshow } from "@/components/Slideshow";
import { SCHOOL, IMAGES } from "@/lib/constants";

const stats = [
  { value: "20+", label: "Years of Legacy" },
  { value: "100%", label: "Dedicated Faculty" },
  { value: "500+", label: "Students Enrolled" },
  { value: "15+", label: "Experienced Teachers" },
];

const pillars = [
  { title: "Academics", desc: "Strong foundation in core subjects with modern teaching methods." },
  { title: "Values", desc: "Character building through discipline, respect, and integrity." },
  { title: "Activities", desc: "Sports, arts, and cultural programs for holistic development." },
  { title: "Community", desc: "A supportive environment for students, parents, and staff." },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="grid lg:grid-cols-2">
            <Slideshow images={IMAGES.slideshow} />
            <div className="p-8 lg:p-12">
              <h2 className="font-serif text-3xl font-bold text-aps-navy">
                Why Choose {SCHOOL.name}?
              </h2>
              <p className="mt-4 text-gray-600">
                With over two decades of commitment to quality education, we nurture
                every child to reach their full potential in a safe and inspiring environment.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border-l-4 border-aps-gold pl-4 py-4">
                    <p className="text-2xl font-bold text-aps-navy">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-aps-magenta">About</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-aps-navy md:text-4xl">
              {SCHOOL.name}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-gray-600">
              Located in {SCHOOL.location}, {SCHOOL.name} has been a beacon of learning
              for over 20 years. Our motto — {SCHOOL.tagline} — reflects our promise to
              every student and parent who walks through our doors.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block rounded bg-aps-navy px-6 py-3 text-sm font-semibold text-white hover:bg-aps-magenta"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-center font-serif text-3xl font-bold text-aps-navy">
          Life at Our School
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          A balanced approach to education covering academics, values, activities, and community.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 h-1 w-12 rounded-full bg-aps-magenta" />
              <h3 className="font-semibold text-aps-navy">{pillar.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-aps-navy">
            Leadership Messages
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <MessageCard
              title="Message from the Chairman"
              name="Chairman, Aryan Public School"
              images={IMAGES.chairmanSlideshow}
              preview="It is my privilege to lead an institution that has shaped young minds for over two decades. Our commitment remains steadfast — to provide quality education with dedication."
            />
            <MessageCard
              title="Message from the Principal"
              name="Principal, Aryan Public School"
              images={IMAGES.principalSlideshow}
              preview="At Aryan Public School, we believe every child is unique. Our teachers work tirelessly to create an environment where students learn, grow, and excel with confidence."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-aps-navy">
          Important Announcements & Links
        </h2>
        <div className="mt-8">
          <AnnouncementsList />
        </div>
      </section>

      <section className="bg-aps-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-bold">Ready to Join Us?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Begin your child&apos;s journey with {SCHOOL.name}. Apply online or visit our campus.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/admissions"
              className="rounded-xl bg-aps-gold px-8 py-3 font-semibold text-aps-navy hover:bg-yellow-400"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border-2 border-white px-8 py-3 font-semibold hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
