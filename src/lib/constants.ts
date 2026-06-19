export const SCHOOL = {
  name: "Aryan Public School",
  tagline: "Commitment · Quality · Dedication",
  legacy: "20+ Years of Excellence",
  location: "VPO Kansakoti, Tehsil Rohru, Distt. Shimla (H.P) 171207, India",
  phone: "01781-240694, +91 98174-74844",
  email: "aryanlalit844@gmail.com",
  admissionEmail: "aryanlalit844@gmail.com",
} as const;

export const IMAGES = {
  logo: "/images/logo.jpg",
  building: "/images/school.jpg",
  heroSlideshow: [
    "/images/hero-sec1.1.jpg",
    "/images/hero-sec2.3.jpg",
    "/images/hero-sec-3.1.jpg",
    "/images/hero-sec-4.1.jpg",
  ],
  chairmanSlideshow: [
    "/images/chairman1.jpg",
    "/images/chairman2.jpg",
    "/images/chairman3.jpg",
  ],
  principalSlideshow: [
    "/images/principle.jpg",
    "/images/Principle2.jpg",
  ],
  staffGroup: "/images/staff.png",
  slideshow: [
    "/images/SportsFootball.jpg",
    "/images/SportsTaekwondo.jpg",
    "/images/Sportsachievements.jpg",
    "/images/Sportsresult2.jpg",
    "/images/Sportsresult3.jpg",
    "/images/acedimics.jpg",
    "/images/acedimics2.jpg",
    "/images/anchoring.jpg",
    "/images/shorya.jpeg",
  ],
} as const;

export const ROLES = ["student", "teacher", "admin"] as const;
export type Role = (typeof ROLES)[number];
