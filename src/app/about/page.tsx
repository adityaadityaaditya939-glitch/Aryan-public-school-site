import Image from "next/image";
import { SCHOOL, IMAGES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <div className="relative mb-12 overflow-hidden rounded-2xl">
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
            <div className="rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-aps-navy">Our Mission</h3>
              <p className="mt-2 text-sm text-gray-600">
                To provide holistic education that develops intellectual curiosity,
                moral integrity, and social responsibility in every student.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6">
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
            className="rounded-xl object-cover shadow-lg"
          />
          <p className="mt-4 text-center text-sm text-gray-500">
            Our dedicated team of educators
          </p>
        </div>
      </div>
    </div>
  );
}
