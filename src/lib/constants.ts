export const SCHOOL = {
  name: "Aryan Public School",
  tagline: "Commitment · Quality · Dedication",
  legacy: "20+ Years of Excellence",
  location: "Aryan Public School, Kansakoti, India",
  phone: "+91 XXXXX XXXXX",
  email: "info@aryanpublicschool.edu.in",
  admissionEmail: "admissions@aryanpublicschool.edu.in",
} as const;

export const IMAGES = {
  logo: "/images/logo.png",
  building: "/images/building.jpg",
  chairman: "/images/chairman.jpg",
  principal: "/images/principal.jpg",
  staffGroup: "/images/staff-group.jpg",
} as const;

export const ROLES = ["student", "teacher", "admin"] as const;
export type Role = (typeof ROLES)[number];
