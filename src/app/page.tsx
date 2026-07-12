import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MessageCard from "@/components/MessageCard";
import AnnouncementsList from "@/components/AnnouncementsList";
import { Slideshow } from "@/components/Slideshow";
import AnimatedSection from "@/components/AnimatedSection";
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

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(27,42,107,0.15)] border border-gray-100">
          <div className="grid lg:grid-cols-2">
            <Slideshow images={IMAGES.slideshow} />
            <div className="p-6 md:p-8 lg:p-12">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-magenta mb-2">Why Us</p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-aps-navy">
                Why Choose {SCHOOL.name}?
              </h2>
              <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                With over two decades of commitment to quality education, we nurture
                every child to reach their full potential in a safe and inspiring environment.
              </p>
              <div className="mt-6 md:mt-8 grid grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-aps-navy to-aps-magenta bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs md:text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8" delay={100}>
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-magenta mb-2">Latest Events</p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-aps-navy">
            Events Poster
          </h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
          <Image
            src={IMAGES.latestEventsPoster}
            alt="Latest Events Poster"
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="text-center mt-6">
          <a
            href="https://www.facebook.com/share/v/19S54pMnsr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-600/40"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            View on Facebook
          </a>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 md:py-20" delay={200}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aps-navy/5 to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-aps-navy/10 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-navy mb-4">
                About Us
              </p>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-aps-navy">
                {SCHOOL.name}
              </h2>
              <p className="mx-auto mt-4 md:mt-6 max-w-3xl text-sm md:text-lg text-gray-600 leading-relaxed">
                {SCHOOL.name} has been a beacon of learning
                for over 20 years. Our motto — {SCHOOL.tagline} — reflects our promise to
                every student and parent who walks through our doors.
              </p>
              <Link
                href="/about"
                className="mt-6 md:mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-aps-navy to-aps-magenta px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(27,42,107,0.4)]"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8" delay={300}>
        <div className="text-center mb-8 md:mb-12">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-magenta mb-2">Our Approach</p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-aps-navy">
            Life at Our School
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-lg text-gray-600">
            A balanced approach to education covering academics, values, activities, and community.
          </p>
        </div>
        <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 md:p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 h-24 md:h-32 w-24 md:w-32 bg-gradient-to-br from-aps-gold/20 to-aps-magenta/20 rounded-bl-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aps-navy to-aps-magenta text-white shadow-lg">
                  <span className="text-xl md:text-2xl font-bold">{pillar.title[0]}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-aps-navy">{pillar.title}</h3>
                <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 md:py-20" delay={400}>
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-magenta mb-2">Leadership</p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-aps-navy">
              Leadership Messages
            </h2>
          </div>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            <MessageCard
              title="Message from the Chairman"
              name="Mr. Lalit Thakur, Chairman, Aryan Public School"
              images={IMAGES.chairmanSlideshow}
              preview="It is my privilege to lead an institution that has shaped young minds for over two decades. Our commitment remains steadfast — to provide quality education with dedication."
            />
            <MessageCard
              title="Message from the Principal"
              name="Mrs. Jyoti Rongta, Principal, Aryan Public School"
              images={IMAGES.principalSlideshow}
              preview="At Aryan Public School, we believe every child is unique. Our teachers work tirelessly to create an environment where students learn, grow, and excel with confidence."
            />
            <MessageCard
              title="Message from the Chief Administrator"
              name="Mrs. Shruti Thakur, Chief Administrator, Aryan Public School"
              images={IMAGES.chiefAdministratorSlideshow}
              preview="As Chief Administrator, I ensure the smooth functioning of our school operations and administrative excellence. Together, we strive to create a nurturing and disciplined environment for every student to thrive and achieve their goals."
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8" delay={500}>
        <h2 className="text-center font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-aps-navy mb-8 md:mb-10">
          Important Announcements & Links
        </h2>
        <div className="rounded-3xl border border-gray-100 bg-white shadow-xl p-4 md:p-6">
          <AnnouncementsList />
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 md:py-24" delay={600}>
        <div className="relative overflow-hidden bg-aps-navy">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(156,23,105,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(245,184,0,0.2),transparent_50%)]" />
          <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8 py-12 md:py-16">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
              Ready to Join Us?
            </h2>
            <p className="mx-auto mt-4 md:mt-6 max-w-2xl text-sm md:text-lg text-gray-200">
              Begin your child's journey with {SCHOOL.name}. Apply online or visit our campus.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
              <Link
                href="/admissions"
                className="group relative overflow-hidden rounded-2xl bg-aps-gold px-8 md:px-10 py-4 md:py-5 text-sm md:text-base font-semibold text-aps-navy transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,184,0,0.5)]"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-aps-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
              <Link
                href="/contact"
                className="group rounded-2xl border-2 border-white/30 bg-white/10 px-8 md:px-10 py-4 md:py-5 text-sm md:text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-aps-gold hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
