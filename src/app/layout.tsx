import type { Metadata } from "next";
import Script from "next/script";
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

const siteUrl = "https://aryan-public-school-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SCHOOL.name} | ${SCHOOL.legacy} | Best School in Shimla`,
    template: `%s | ${SCHOOL.name}`,
  },
  description: `${SCHOOL.name} - ${SCHOOL.legacy} of excellence in education. ${SCHOOL.tagline}. Apply for admission now! Located in VPO Kansakoti, Tehsil Rohru, Distt. Shimla (H.P).`,
  keywords: [
    SCHOOL.name,
    "Aryan Public School",
    "best school in Shimla",
    "school in Rohru",
    "admission open",
    "apply for admission",
    "Kansakoti school",
    "Shimla schools",
    "Himachal Pradesh schools",
  ],
  authors: [{ name: SCHOOL.name }],
  creator: SCHOOL.name,
  publisher: SCHOOL.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: SCHOOL.name,
    title: `${SCHOOL.name} | ${SCHOOL.legacy}`,
    description: `${SCHOOL.name} - ${SCHOOL.legacy} of excellence in education. ${SCHOOL.tagline}. Apply for admission now!`,
    images: [
      {
        url: "/images/school.jpg",
        width: 1200,
        height: 630,
        alt: `${SCHOOL.name} Building`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SCHOOL.name} | ${SCHOOL.legacy}`,
    description: `${SCHOOL.name} - ${SCHOOL.legacy} of excellence in education. ${SCHOOL.tagline}. Apply for admission now!`,
    images: ["/images/school.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "_mINsBOz03I9W-IoCzGh5Piq6msBGp-lsqYeKHl5QgA",
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "School",
    name: SCHOOL.name,
    description: `${SCHOOL.name} - ${SCHOOL.legacy} of excellence in education. ${SCHOOL.tagline}.`,
    url: siteUrl,
    logo: `${siteUrl}/images/logo.jpg`,
    image: `${siteUrl}/images/school.jpg`,
    telephone: SCHOOL.phone,
    email: SCHOOL.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "VPO Kansakoti, Tehsil Rohru",
      addressLocality: "Shimla",
      addressRegion: "Himachal Pradesh",
      postalCode: "171207",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.1048,
      longitude: 77.1734,
    },
    sameAs: [],
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header />
        <AnnouncementBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
