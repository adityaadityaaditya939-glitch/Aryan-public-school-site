import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "teacher", "admin"]),
});

export const admissionSchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),
  classApplying: z.string().min(1, "Class is required"),
  parentName: z.string().min(2, "Parent name is required"),
  parentPhone: z.string().min(10, "Valid phone number is required"),
  parentEmail: z.string().email("Valid email is required"),
  address: z.string().min(10, "Address is required"),
  previousSchool: z.string().optional(),
  notes: z.string().optional(),
});

export const complaintSchema = z.object({
  submittedBy: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  category: z.enum(["academic", "discipline", "facilities", "transport", "other"]),
  subject: z.string().min(3, "Subject is required"),
  description: z.string().min(20, "Please provide at least 20 characters"),
});

export const announcementSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(3, "Content is required"),
  category: z.enum(["announcement", "holiday", "link"]),
  linkUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean().default(true),
});

export const createUserSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name is required"),
  role: z.enum(["student", "teacher"]),
});

export const statusUpdateSchema = z.object({
  id: z.number().int().positive(),
  status: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type AdmissionInput = z.infer<typeof admissionSchema>;
export type ComplaintInput = z.infer<typeof complaintSchema>;
export type AnnouncementInput = z.infer<typeof announcementSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
