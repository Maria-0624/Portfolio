import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "../components/portfolio/navbar";
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  Hero,
  Projects,
  Skills,
} from "../components/portfolio/sections";
import { portfolioData } from "@/data/portfolio";

const SITE_URL = "https://flexi-port-creator.lovable.app";
const OG_IMAGE = `${SITE_URL}${portfolioData.personal.profileImage}`;
const DESCRIPTION =
  "Maria Ansari is a Software Engineer in Mumbai building scalable full-stack apps with Java, MERN, PostgreSQL, AWS and REST APIs. See projects, experience and CV.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maria Ansari | Software Engineer & Full-Stack Developer" },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Maria Ansari, software engineer, full-stack developer, MERN, Java, React, Node.js, PostgreSQL, AWS, Mumbai",
      },
      { property: "og:title", content: "Maria Ansari | Software Engineer & Full-Stack Developer" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Maria Ansari | Software Engineer" },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: portfolioData.personal.name,
          jobTitle: portfolioData.personal.role,
          email: `mailto:${portfolioData.personal.email}`,
          url: SITE_URL,
          image: OG_IMAGE,
          address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
          sameAs: [portfolioData.personal.linkedin, portfolioData.personal.github],
          knowsAbout: ["Java", "React.js", "Node.js", "PostgreSQL", "AWS", "REST APIs"],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "M. H. Saboo Siddik College of Engineering",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
