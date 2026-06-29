import Image from "next/image";
import { Slideshow } from "@/components/Slideshow";
import { SCHOOL, IMAGES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="relative mb-12 overflow-hidden rounded-3xl">
        <Image
          src={IMAGES.building}
          alt="School building"
          width={1200}
          height={400}
          className="h-64 w-full object-cover md:h-80"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-aps-navy/80 to-transparent p-8">
          <div>
            <p className="text-sm uppercase tracking-wider text-aps-gold">About Us</p>
            <h1 className="font-serif text-4xl font-bold text-white">{SCHOOL.name}</h1>
          </div>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            {SCHOOL.name} has been serving the community of {SCHOOL.location} for over
            20 years. Founded with a vision to provide accessible, quality education,
            the school has grown into a trusted institution known for its dedicated
            faculty and nurturing environment.
          </p>
          <p>
            Our motto — <strong>{SCHOOL.tagline}</strong> — guides everything we do.
            From the classroom to the playground, we strive to instill values of
            discipline, curiosity, and compassion in every student.
          </p>
          <p>
            We offer education from Nursery through Class 10, with a curriculum designed
            to prepare students for academic success and life beyond school. Our modern
            campus, experienced teachers, and active parent community make us a school
            of choice in the region.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-aps-navy">Our Mission</h3>
              <p className="mt-2 text-sm text-gray-600">
                To provide holistic education that develops intellectual curiosity,
                moral integrity, and social responsibility in every student.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-aps-navy">Our Vision</h3>
              <p className="mt-2 text-sm text-gray-600">
                To be a leading educational institution that empowers students to
                become confident, compassionate, and capable citizens.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Image
            src={IMAGES.staffGroup}
            alt="School staff"
            width={400}
            height={500}
            className="rounded-2xl object-cover shadow-lg"
          />
          <p className="mt-4 text-center text-sm text-gray-500">
            Our dedicated team of educators
          </p>
        </div>
      </div>

      <div className="mt-16">
        <div className="relative mb-8 overflow-hidden rounded-3xl">
          <Image
            src={IMAGES.aboutPage2}
            alt="School ground and national event"
            width={1200}
            height={500}
            className="h-80 w-full object-cover md:h-96"
          />
        </div>
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-aps-navy mb-4">Our School Ground</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We organise national events in our school. This is the school ground where various activities, competitions, and national celebrations take place. Our spacious playground provides a perfect venue for fostering sportsmanship, teamwork, and national pride among our students.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <div className="text-center mb-8">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-aps-magenta mb-2">Student Achievements</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-aps-navy">Our Bright Students</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Our students excel not only in academics but also in sports, arts, and various co-curricular activities. They bring laurels to our school through their dedication, hard work, and remarkable achievements. We take pride in nurturing their talents and watching them grow into confident, responsible individuals.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Slideshow images={IMAGES.brightStudentsSlideshow} />
        </div>
      </div>
    </div>
  );
}
