import Image from "next/image";
import Link from "next/link";

const ACCESS_HREF = "mailto:hello@longway.example?subject=LongWay%20early%20access";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Night />
        <How />
        <Control />
        <Teams />
        <Scenarios />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- primitives ---------- */

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-green"
      : "border border-line text-ink hover:border-ink";
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors ${styles} ${focus}`}
    >
      {children}
    </Link>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-green">
      {children}
    </p>
  );
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <Label>{label}</Label>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
        {title}
      </h2>
    </div>
  );
}

function Illustration({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1536}
      height={1024}
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
      <circle cx="11" cy="17" r="2" className="fill-green" />
    </svg>
  );
}

/* ---------- sections ---------- */

function Nav() {
  const links = [
    ["A night on LongWay", "#night"],
    ["How it works", "#how"],
    ["Safety", "#control"],
    ["Teams", "#teams"],
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className={`flex items-center gap-2 font-display text-[17px] font-semibold tracking-tight ${focus}`}
        >
          <Mark />
          LongWay
        </Link>
        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className={`hover:text-ink ${focus}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Button href={ACCESS_HREF}>Request access</Button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
      <h1 className="text-[clamp(2.75rem,6.6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
        Hand off long work.
        <br />
        <span className="text-green">Wake up to proof.</span>
      </h1>
      <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <p className="text-lg leading-relaxed text-muted">
            Give AI agents work that takes days, not minutes. LongWay plans it,
            keeps it running while you’re away, and doesn’t call anything done
            until a separate checker proves it.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={ACCESS_HREF}>Request early access</Button>
            <Button href="#night" variant="ghost">
              See a night’s work
            </Button>
          </div>
        </div>
      </div>
      <Image
        src="/illustrations/hero-v2.png"
        alt="A person hands a folder to a robot agent; three robots work along a winding road under a moon; at the end the person receives a package sealed with a green checkmark."
        width={2048}
        height={1152}
        priority
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="mt-8 h-auto w-full"
      />
    </section>
  );
}

type Tone = "neutral" | "pass" | "attention";

const LOG: { time: string; tag: string; tone: Tone; text: string }[] = [
  { time: "22:41", tag: "Plan", tone: "neutral", text: "You approved the plan: 9 tasks to move auth to v3." },
  { time: "22:43", tag: "Run", tone: "neutral", text: "Three tasks start in parallel, each in its own environment." },
  { time: "01:12", tag: "Check", tone: "attention", text: "T-4 failed review: 2 of 14 tests still fail. Sent back to the builder." },
  { time: "01:58", tag: "Run", tone: "neutral", text: "T-4 reworked. The same checker runs the suite again." },
  { time: "02:20", tag: "Check", tone: "pass", text: "T-4 passed: 14 of 14 tests, with evidence attached." },
  { time: "04:05", tag: "Gate", tone: "attention", text: "T-7 wants to delete 12 legacy files. Paused for your approval." },
  { time: "06:30", tag: "Run", tone: "neutral", text: "6 of 9 tasks verified. $38 spent of a $120 budget." },
];

const toneStyles: Record<Tone, string> = {
  neutral: "border-line text-muted",
  pass: "border-transparent bg-mint text-green",
  attention: "border-transparent bg-amber-soft text-amber",
};

function Night() {
  return (
    <section id="night" className="mt-20 border-t border-line md:mt-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <SectionHead label="A night on LongWay" title="You sleep. It works." />
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Progress is saved as it happens, not kept in a chat window. When
              you come back, you see what passed, what failed and got fixed, and
              the one thing that needs you.
            </p>
            <Illustration
              src="/illustrations/overnight-run-v2.png"
              alt="A person sleeps under a moonlit window while two robot agents keep working at a desk, filling an inbox tray with cards."
              className="mt-8"
            />
          </div>
        </div>

        <figure className="md:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-36px_rgba(22,24,26,0.28)]">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <p className="font-display text-sm font-semibold">Migrate auth to v3</p>
              <p className="font-mono text-[11px] text-muted">billing-api</p>
            </div>
            <ol className="divide-y divide-line">
              {LOG.map((e) => (
                <li
                  key={e.time}
                  className="grid grid-cols-[3.25rem_1fr] gap-x-4 gap-y-1.5 px-5 py-4 sm:grid-cols-[3.25rem_4.5rem_1fr]"
                >
                  <time className="pt-0.5 font-mono text-xs text-muted">{e.time}</time>
                  <span
                    className={`w-fit rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${toneStyles[e.tone]}`}
                  >
                    {e.tag}
                  </span>
                  <p className="col-start-2 text-[15px] leading-snug sm:col-start-3 sm:row-start-1">
                    {e.text}
                  </p>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper px-5 py-4">
              <p className="flex items-center gap-2.5 text-sm font-medium">
                <span className="animate-waiting h-2 w-2 rounded-full bg-amber" aria-hidden="true" />
                Waiting for you: 1 decision
              </p>
              <span className="rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-paper">
                Review
              </span>
            </div>
          </div>
          <figcaption className="mt-4 font-mono text-[11px] text-muted">
            Example run log. Task names and numbers are illustrative.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    ["Describe", "A few sentences is enough. An agent asks what’s missing: scope, deadline, budget, what counts as done."],
    ["Approve", "It becomes a list of tasks, each with its own pass/fail criteria. Change anything before work starts."],
    ["Leave", "Agents work in isolated environments. Close the laptop; nothing depends on your session staying open."],
    ["Review", "Come back to results, the evidence behind them, and a short list of decisions."],
  ];
  return (
    <section id="how" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead label="How it works" title="Brief it, then leave." />
        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          <Illustration
            src="/illustrations/dual-loop-v2.png"
            alt="A robot agent at a whiteboard explains a task tree to a seated person while three robots at desks below receive the tasks."
          />
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {steps.map(([t, d], i) => (
              <li key={t} className="border-t border-ink pt-4">
                <p className="font-mono text-xs text-muted">{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Control() {
  const pillars = [
    {
      src: "/illustrations/verification-wall-v2.png",
      alt: "Two rooms divided by a wall: a robot builds a product on the left; on the right a different robot with glasses inspects it with a magnifying glass and a checklist.",
      label: "Independent checks",
      title: "No self-grading.",
      body: "A separate checker reviews every task in its own session, against the criteria you approved.",
      points: ["Evidence attached to every verdict", "Every criterion covered, or it doesn’t pass", "Each verdict traceable to the run that produced it"],
    },
    {
      src: "/illustrations/human-gate-v2.png",
      alt: "A robot holding a box marked with a warning triangle waits at a lowered barrier gate while a seated person decides on their phone.",
      label: "Approvals",
      title: "Risky steps wait.",
      body: "Agents can ask. Only people can approve. Everything else keeps moving while one task waits.",
      points: ["Deleting files or data", "Publishing anything outside", "Going over budget or asking for new access"],
    },
  ];
  return (
    <section id="control" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHead label="Safety" title="You set the limits." />
        <div className="mt-16 space-y-24 md:space-y-28">
          {pillars.map((p, i) => (
            <article key={p.label} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <Illustration src={p.src} alt={p.alt} className={i % 2 ? "md:order-2" : ""} />
              <div>
                <Label>{p.label}</Label>
                <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em]">
                  {p.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[15px]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Teams() {
  const roles = [
    ["Lead", "Breaks the task down and runs the team’s playbook."],
    ["Builder", "Does the work, with only the access that task needs."],
    ["Checker", "Never touches the output. Decides if it meets the bar."],
  ];
  return (
    <section id="teams" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionHead label="Teams" title="A team per task." />
          </div>
          <p className="text-lg leading-relaxed text-muted md:col-span-5">
            Start from ready-made experts or define your own skills, tools and
            playbooks. Change a team once and every project using it follows.
          </p>
        </div>
        <Illustration
          src="/illustrations/team-roles-v2.png"
          alt="Three robot agents: a lead in a hard hat pointing at a board, a builder typing at a desk, and a checker with glasses and a magnifying glass behind a glass partition."
          className="mx-auto mt-12 max-w-4xl"
        />
        <ul className="mx-auto mt-4 grid max-w-4xl gap-8 sm:grid-cols-3">
          {roles.map(([t, d]) => (
            <li key={t} className="text-center">
              <h3 className="text-lg font-semibold tracking-tight">{t}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Scenarios() {
  const rows: [string, string, boolean][] = [
    ["Software delivery", "Migrations, bug fixes, test coverage, new builds", true],
    ["E-commerce operations", "Listings, ads, inventory, support", false],
    ["Insurance services", "Intake, document collection, renewals", false],
    ["Research & reporting", "Market research, analysis, recurring reports", false],
  ];
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Label>Where it starts</Label>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] md:text-3xl">
              Software first.
            </h2>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 md:col-span-8">
            {rows.map(([name, ex, live]) => (
              <li key={name} className="bg-paper p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold tracking-tight">{name}</h3>
                  <span
                    className={
                      live
                        ? "rounded-full bg-mint px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-green"
                        : "rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                    }
                  >
                    {live ? "Private beta" : "Later"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{ex}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-12 md:items-end md:py-32">
        <h2 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.035em] md:col-span-8">
          What would you hand off?
        </h2>
        <div className="md:col-span-4">
          <p className="text-lg leading-relaxed text-paper/70">
            We’re onboarding software teams to the private beta. Tell us about
            the job, and we’ll set you up.
          </p>
          <Link
            href={ACCESS_HREF}
            className="mt-7 inline-flex h-12 items-center rounded-full bg-paper px-6 text-sm font-medium text-ink transition-colors hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            Request early access
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-paper/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-paper/15 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 font-display font-semibold text-paper">
          <Mark /> LongWay
        </p>
        <p>© 2026 LongWay. Private beta.</p>
      </div>
    </footer>
  );
}
