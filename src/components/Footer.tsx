import Link from "next/link";
import Image from "next/image";
import { SCHOOL, IMAGES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-auto bg-aps-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 lg:px-8">
        <div>
          <Image
            src={IMAGES.logo}
            alt={`${SCHOOL.name} logo`}
            width={64}
            height={64}
            className="mb-4 h-16 w-16 object-contain brightness-110"
          />
          <p className="font-serif text-lg font-bold">{SCHOOL.name}</p>
          <p className="mt-2 text-sm text-gray-300">{SCHOOL.tagline}</p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold uppercase tracking-wide">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>{SCHOOL.location}</li>
            <li>{SCHOOL.phone}</li>
            <li>{SCHOOL.email}</li>
            <li>Admissions: {SCHOOL.admissionEmail}</li>
            <li>
              <a
                href="https://www.facebook.com/www.aryanpublicschool.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-aps-gold"
              >
                Facebook Page
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-gray-300 hover:text-aps-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/admissions" className="text-gray-300 hover:text-aps-gold">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/complaints" className="text-gray-300 hover:text-aps-gold">
                Feedback & Complaints
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-300 hover:text-aps-gold">
                Student / Teacher / Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <span>© {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</span>
          <span>
            Powered by{" "}
            <a
              href="https://tech-explorer-nine.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-aps-gold hover:underline"
            >
              Tech Explorer
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
