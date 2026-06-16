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
  chairman: "/images/chairman.png",
  principal: "/images/principle.jpg",
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
  ],
} as const;

export const ROLES = ["student", "teacher", "admin"] as const;
export type Role = (typeof ROLES)[number];
