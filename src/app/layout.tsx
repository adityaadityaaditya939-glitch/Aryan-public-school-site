import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { SCHOOL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SCHOOL.name} | ${SCHOOL.legacy}`,
  description: `Official website of ${SCHOOL.name}. ${SCHOOL.tagline}. Admissions, announcements, and school portal.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Header />
        <AnnouncementBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
