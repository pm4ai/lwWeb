import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Pillars />
        <Roles />
        <Scenarios />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- primitives ---------- */

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-accent"
      : "border border-line bg-background text-foreground hover:border-foreground";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

function Illustration({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1536}
      height={1024}
      priority={priority}
      sizes="(min-width: 768px) 50vw, 100vw"
      className={`h-auto w-full ${className}`}
    />
  );
}

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path
        d="M3 17 L11 5 L19 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="17" r="2" className="fill-accent" />
    </svg>
  );
}

/* ---------- sections ---------- */

function Nav() {
  const links = [
    ["How it works", "#how"],
    ["Why LongWay", "#why"],
    ["Teams", "#teams"],
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-background/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link href="/" className="flex items-center gap-2 font-medium tracking-tight">
          <Mark />
          LongWay
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Button href="#beta">Request beta access</Button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Private beta
        </p>
        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          Hand off work that takes days.
          <br />
          <span className="text-muted">Get back verified results.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">
          A cloud workspace where people and AI agents push long-running goals
          to completion, and nothing counts as done until it is independently
          verified.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="#beta">Request beta access</Button>
          <Button href="#how" variant="ghost">
            See how it works
          </Button>
        </div>
      </div>
      <Image
        src="/illustrations/hero-v2.png"
        alt="A person hands a folder to a robot agent; three robots work along a winding road under a moon; at the end the person receives a package sealed with a green checkmark."
        width={2048}
        height={1152}
        priority
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="mt-10 h-auto w-full md:mt-6"
      />
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Clarify", "You say what you want. An expert asks what's missing and writes a spec you confirm."],
    ["Plan", "The spec becomes a task tree with acceptance criteria. Edit it, confirm, and walk away."],
    ["Execute", "Teams run each task in isolated environments. Every state change is saved."],
    ["Verify", "Someone who never touched the work judges it, with evidence. Only a pass unlocks the next task."],
  ];
  return (
    <section id="how" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-32">
        <Illustration
          src="/illustrations/dual-loop-v2.png"
          alt="A robot agent at a whiteboard explains a task tree to a seated person while three robots at desks below receive the tasks."
        />
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Two loops. One owns the goal, the other owns each task.
          </h2>
          <ol className="mt-10 space-y-6">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-5">
                <span className="mt-0.5 font-mono text-xs text-muted">0{i + 1}</span>
                <div>
                  <h3 className="font-medium">{t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const items = [
    {
      src: "/illustrations/verification-wall-v2.png",
      alt: "Two rooms divided by a wall: a robot builds a product on the left; on the right a different robot with glasses inspects it with a magnifying glass and a checklist.",
      eyebrow: "Independent verification",
      title: "Whoever did the work can't grade it.",
      body: "A separate verifier checks every acceptance criterion and attaches evidence. “Done” is a verdict you can trace, not a claim.",
    },
    {
      src: "/illustrations/human-gate-v2.png",
      alt: "A robot holding a box marked with a warning triangle waits at a lowered barrier gate while a seated person decides on their phone.",
      eyebrow: "Human gates",
      title: "Risky actions stop and wait for you.",
      body: "Deleting files, publishing externally, exceeding budget. The work pauses, you approve or reject, and the decision is recorded.",
    },
    {
      src: "/illustrations/overnight-run-v2.png",
      alt: "A person sleeps under a moonlit window while two robot agents keep working at a desk, filling an inbox tray with cards.",
      eyebrow: "Runs while you're away",
      title: "Close the laptop. Come back to decisions, not logs.",
      body: "State is saved on every change. Work continues, pauses only at gates, and greets you with a short list of what needs you.",
    },
  ];
  return (
    <section id="why" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl space-y-24 px-6 py-24 md:space-y-32 md:py-32">
        {items.map((it, i) => (
          <div
            key={it.eyebrow}
            className="grid items-center gap-12 md:grid-cols-2"
          >
            <Illustration
              src={it.src}
              alt={it.alt}
              className={i % 2 === 1 ? "md:order-2" : ""}
            />
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <Eyebrow>{it.eyebrow}</Eyebrow>
              <h2 className="text-3xl font-medium tracking-tight md:text-4xl">{it.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Roles() {
  const roles = [
    ["Lead", "Plans the approach, pulls in executors, reports back."],
    ["Executor", "Does the work with only the permissions the task needs."],
    ["Verifier", "Never touches the output. Judges it in a separate session."],
  ];
  return (
    <section id="teams" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Experts and teams</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Experts with real roles, and a wall between doing and judging.
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-4xl">
          <Illustration
            src="/illustrations/team-roles-v2.png"
            alt="Three robot agents: a lead in a hard hat pointing at a board, an executor typing at a desk, and a verifier with glasses and a magnifying glass behind a glass partition."
          />
        </div>
        <ul className="mx-auto mt-6 grid max-w-4xl gap-8 text-center sm:grid-cols-3">
          {roles.map(([t, d]) => (
            <li key={t}>
              <h3 className="font-medium">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Scenarios() {
  const rows = [
    ["Software delivery", "Private beta"],
    ["Cross-border e-commerce", "Planned"],
    ["Insurance services", "Planned"],
    ["Research & operations", "Planned"],
  ];
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <Eyebrow>Scenarios</Eyebrow>
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
            One engine. Different experts for different work.
          </h2>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {rows.map(([d, s]) => (
            <li
              key={d}
              className="flex items-center justify-between gap-6 rounded-xl border border-line px-4 py-3 text-sm"
            >
              <span className="font-medium">{d}</span>
              <span
                className={
                  s === "Private beta"
                    ? "rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
                    : "rounded-full border border-line px-2.5 py-0.5 text-xs text-muted"
                }
              >
                {s}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="beta" className="border-t border-line bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between md:py-32">
        <h2 className="max-w-xl text-3xl font-medium tracking-tight md:text-4xl">
          Give an agent a goal and a boundary. Go to sleep.
        </h2>
        <Link
          href="mailto:hello@longway.example"
          className="inline-flex h-12 items-center rounded-full bg-background px-6 text-sm font-medium text-foreground hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
        >
          Request beta access
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 text-foreground">
          <Mark /> LongWay Agent Workspace
        </p>
        <p>© 2026 LongWay. Private beta.</p>
      </div>
    </footer>
  );
}
