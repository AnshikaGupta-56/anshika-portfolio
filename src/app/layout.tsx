import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import { profile, site } from "@/data/profile";

const title = `${profile.name} — CS Student · AI & Machine Learning`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.seoDescription,
  keywords: profile.keywords,
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description: profile.seoDescription,
    siteName: `${profile.name} — Portfolio`,
    locale: "en_IN",
    firstName: "Anshika",
    lastName: "Gupta",
  },
  twitter: { card: "summary_large_image", title, description: profile.seoDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#06080b", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Computer Science Student",
  email: `mailto:${profile.email}`,
  url: site.url,
  sameAs: [profile.github, profile.linkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Galgotias University" },
    { "@type": "HighSchool", name: "Kendriya Vidyalaya Air Force Station Bareilly" },
  ],
  knowsAbout: ["Python", "Java", "SQL", "Machine Learning", "NLP", "Pandas", "NumPy", "Streamlit", "MySQL"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
