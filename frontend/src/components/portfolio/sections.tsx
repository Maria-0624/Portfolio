import {
  ArrowUpRight,
  Award,
  Briefcase,
  Code2,
  Download,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { portfolioData } from "@/data/portfolio";
import { ContactForm } from "./contact-form";
import { Reveal } from "./reveal";

const { personal, stats, skills, experience, projects, education, certifications } = portfolioData;

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      {children}
    </section>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="halo pointer-events-none absolute inset-x-0 -top-24 h-[420px]" aria-hidden />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-12 pt-28 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14 lg:pb-20 lg:pt-36">
        <Reveal className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {personal.role}
          </span>
          <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">
            Hi, I&apos;m {personal.name}.{" "}
            <span className="text-gradient-accent">
              I build scalable and user-focused web applications.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {personal.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              View My Work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-medium text-coral-foreground transition-opacity hover:opacity-90"
            >
              Contact Me
            </a>
            <a
              href={personal.cvUrl}
              download="Maria-Ansari-CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" /> {personal.location}
          </p>
        </Reveal>

        <Reveal delay={140} className="flex min-w-0 justify-center lg:justify-end">
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-full bg-accent/50 blur-2xl"
              aria-hidden
            />
            <div className="relative h-44 w-44 overflow-hidden rounded-full border border-border bg-secondary shadow-[var(--shadow-lift)] sm:h-56 sm:w-56 lg:h-64 lg:w-64">
              <img
                src={personal.profileImage}
                alt="Portrait of Maria Ansari, Software Engineer"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 22%", transform: "scale(1.35)" }}
              />
            </div>
            <p className="mt-5 text-center font-display text-sm uppercase tracking-[0.28em] text-muted-foreground">
              {personal.tagline}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading eyebrow="About Me" title="Engineering across the full stack." />
      </Reveal>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Reveal className="min-w-0 space-y-4">
          {personal.about.map((line) => (
            <p key={line} className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              {line}
            </p>
          ))}
        </Reveal>
        <Reveal delay={120} className="min-w-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card-surface card-hover min-w-0 p-4">
                <p className="truncate font-display text-xl font-semibold text-primary sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <Reveal>
        <SectionHeading
          eyebrow="Skills"
          title="Tools I work with."
          description="A focused stack across languages, web development, data and cloud."
        />
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items], index) => (
          <Reveal key={category} delay={index * 70} className="min-w-0">
            <div className="card-surface card-hover h-full min-w-0 p-5">
              <div className="flex min-w-0 items-center gap-2">
                <Code2 className="h-4 w-4 shrink-0 text-coral" />
                <h3 className="truncate text-sm font-semibold uppercase tracking-[0.14em]">{category}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="max-w-full break-words rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground sm:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading eyebrow="Experience" title="Where I've been building." />
      </Reveal>
      <div className="mt-10 space-y-6 lg:relative lg:space-y-10 lg:pl-10">
        <div
          className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-border lg:block"
          aria-hidden
        />
        {experience.map((job, index) => (
          <Reveal key={job.role + job.company} delay={index * 90} className="min-w-0">
            <div className="relative min-w-0">
              <span
                className="absolute -left-10 top-6 hidden h-4 w-4 rounded-full border-2 border-primary bg-background lg:block"
                aria-hidden
              />
              <article className="card-surface card-hover min-w-0 p-5 sm:p-6">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Briefcase className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold sm:text-lg">{job.role}</h3>
                      <p className="truncate text-sm text-primary">{job.company}</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
                    {job.period}
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground sm:text-sm">{job.org}</p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-pretty text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
                      <span className="min-w-0">{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've designed and shipped."
          description="Selected work spanning real-time systems, full-stack products and core Java applications."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={index * 90} className="min-w-0">
            <article className="card-surface card-hover flex h-full min-w-0 flex-col p-5 sm:p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Layers className="h-4 w-4" />
              </span>
              <h3 className="mt-4 text-balance text-lg font-semibold">{project.name}</h3>
              <p className="text-sm text-coral">{project.subtitle}</p>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span className="min-w-0">{feature}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education">
      <Reveal>
        <SectionHeading eyebrow="Education" title="Academic background." />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0 space-y-5">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 90} className="min-w-0">
              <article className="card-surface card-hover min-w-0 p-5 sm:p-6">
                <div className="flex min-w-0 items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-balance text-base font-semibold sm:text-lg">{item.degree}</h3>
                    <p className="mt-1 text-pretty text-sm text-muted-foreground">{item.institution}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                        {item.year}
                      </span>
                      <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-primary">
                        {item.score}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="min-w-0">
          <div className="card-surface h-full min-w-0 p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 shrink-0 text-coral" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em]">
                Certifications & Achievements
              </h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {certifications.map((cert) => (
                <li key={cert} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <span className="min-w-0">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <div className="card-surface halo min-w-0 p-6 text-center sm:p-10 lg:p-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Let&apos;s Connect
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl text-balance text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Let&apos;s build something together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Have an opportunity, project, or just want to connect? I&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" /> Email Me
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={personal.cvUrl}
              download="Maria-Ansari-CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
          <div className="mx-auto mt-10 max-w-xl">
            <ContactForm />
          </div>
          <p className="mt-6 break-words text-sm text-muted-foreground">{personal.email}</p>
        </div>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const socials = [
    { label: "LinkedIn", href: personal.linkedin, Icon: Linkedin },
    { label: "GitHub", href: personal.github, Icon: Github },
  ].filter((s) => s.href.length > 0);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em]">
            {personal.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Software Engineer • Full-Stack Developer
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
        <p className="text-xs text-muted-foreground">
          © 2026 {personal.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
