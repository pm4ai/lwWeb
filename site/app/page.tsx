import Link from "next/link";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Features />
        <Experts />
        <Audience />
        <Scenarios />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- layout primitives ---------- */

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            {title}
          </h2>
          {lead && <p className="mt-5 text-lg leading-relaxed text-muted">{lead}</p>}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

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

/* ---------- sections ---------- */

function Nav() {
  const links = [
    ["How it works", "#how"],
    ["Features", "#features"],
    ["Experts", "#experts"],
    ["Who it's for", "#who"],
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

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-20 md:grid-cols-[1.1fr_1fr] md:pb-32 md:pt-28">
      <div className="flex flex-col justify-center">
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Private beta · Software delivery first
        </p>
        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          Hand off work that takes days.
          <br />
          <span className="text-muted">Get back verified results.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          LongWay is a cloud workspace where people and AI agents push
          long-running goals to completion. You set the outcome and the
          boundaries; experts clarify, plan, dispatch and verify. Close the
          window, and the work keeps going.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="#beta">Request beta access</Button>
          <Button href="#how" variant="ghost">
            See how it works
          </Button>
        </div>
        <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8 text-sm">
          {[
            ["Done", "means independently verified"],
            ["Progress", "comes from saved state, not chat"],
            ["Cost", "visible per goal, phase and task"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="font-medium">{k}</dt>
              <dd className="mt-1 text-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <OverviewMock />
    </section>
  );
}

/* Static mock of the Overview page described in PRD §7.2 */
function OverviewMock() {
  return (
    <div
      aria-hidden="true"
      className="select-none rounded-2xl border border-line bg-white p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-5 flex items-center justify-between text-xs text-muted">
        <span className="font-medium text-foreground">Overview</span>
        <span>Acme Workspace · 6 members</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          ["Active goals", "7", "+2 this week"],
          ["Needs you", "3", "oldest 4h"],
          ["First-pass rate", "86%", "+5 pts / 30d"],
          ["Spend", "$412", "41% of budget"],
        ].map(([k, v, s]) => (
          <div key={k} className="rounded-lg border border-line p-3">
            <p className="text-[11px] text-muted">{k}</p>
            <p className="mt-1 text-lg font-medium tracking-tight">{v}</p>
            <p className="text-[11px] text-muted">{s}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted">
          Needs your decision
        </p>
        <ul className="divide-y divide-line rounded-lg border border-line text-sm">
          {[
            ["Publish release v2.4 to npm", "payments-sdk", "external publish", "4h"],
            ["Delete 12 stale migration files", "billing-api", "destructive op", "2h"],
            ["Goal spend reached 80% of budget", "data-cleanup", "budget", "35m"],
          ].map(([t, p, kind, age]) => (
            <li key={t} className="flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate font-medium">{t}</p>
                <p className="text-xs text-muted">
                  {p} · {kind}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-muted">{age}</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                  Review
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted">
          Task T-14 · Migrate auth to v3
        </p>
        <div className="rounded-lg border border-line p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium">Verification V-27</span>
            <span className="text-accent">pass · 3/3 criteria</span>
          </div>
          <ul className="mt-2 space-y-1 text-muted">
            <li>AC-1 All existing tests pass — evidence: ci-run-8812.log</li>
            <li>AC-2 No v2 imports remain — evidence: grep-report.txt</li>
            <li>AC-3 Login flow works end to end — evidence: e2e-auth.mp4</li>
          </ul>
          <p className="mt-2 border-t border-line pt-2 text-[11px] text-muted">
            Verified in an isolated session by a verifier that did not touch the code.
          </p>
        </div>
      </div>
    </div>
  );
}

function Problems() {
  const items = [
    ["Goals drift", "A wish in natural language has no version, boundary or acceptance criteria."],
    ["State is fragile", "Progress lives in chat context and is lost across windows and days."],
    ["Errors propagate", "One wrong assumption treated as fact poisons every later step."],
    ["“Done” is self-reported", "An agent saying it finished is not the same as the output meeting the bar."],
    ["Recovery is manual", "After a failure you rebuild the environment and guess where to resume."],
    ["Cost is opaque", "You see tokens and scattered logs, not what a project actually spent."],
    ["Autonomy has no edges", "Destructive ops, external publishes and big spends need a human in the loop."],
  ];
  return (
    <Section
      eyebrow="The problem"
      title="Agents can talk for hours. They can't yet be trusted with days."
      lead="You don't want more turns of conversation. You want to hand over a result that takes hours, days or weeks, and come back to something you can rely on. Today's agents fall short in the same seven ways."
    >
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([t, d], i) => (
          <li key={t} className="bg-background p-6">
            <p className="font-mono text-xs text-muted">0{i + 1}</p>
            <h3 className="mt-3 font-medium">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </li>
        ))}
        <li className="flex items-end bg-accent-soft p-6 text-sm leading-relaxed text-accent">
          How do you confidently hand a multi-day job to an agent and still know
          what it will do, where it is, why it claims done, whether it can
          recover, and what it cost?
        </li>
      </ol>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Clarify",
      d: "You describe the outcome in a few sentences. An expert acting as Manager asks what's missing: scope, definition of done, deadline, budget, tool permissions, what needs human approval. The result is a versioned spec you confirm.",
    },
    {
      n: "02",
      t: "Plan",
      d: "The Manager breaks the spec into a task tree with dependencies and writes acceptance criteria for every task. You can edit any of it. Confirm, and you're free to close the window.",
    },
    {
      n: "03",
      t: "Execute",
      d: "The control plane dispatches tasks by dependency and team capacity. Each task runs as a team in an isolated environment: a lead plans the approach, executors do the work, every state change is written down.",
    },
    {
      n: "04",
      t: "Verify",
      d: "A verifier that never touched the output judges it in a separate session, criterion by criterion, with evidence attached. Only a pass unlocks downstream tasks. The Manager then reviews whether the verdict honestly reflects the evidence.",
    },
  ];
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title="Two loops. The outer one owns the goal, the inner one owns each task."
      lead="The outer loop decides what to do, when, and whether it counts as done. The inner loop decides how to actually do it. Neither touches the other's job."
    >
      <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="border-t-2 border-foreground pt-5">
            <p className="font-mono text-xs text-muted">{s.n}</p>
            <h3 className="mt-2 text-xl font-medium">{s.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-12 max-w-2xl text-sm text-muted">
        Results and evidence travel back through the team lead. Verdicts go
        straight to the control plane, so the people doing the work can quote a
        verdict but never rewrite it.
      </p>
    </Section>
  );
}

function Features() {
  const items: [string, string, string?][] = [
    [
      "Independent verification",
      "Whoever changed the output cannot judge it. Verifiers run in a separate session, cover every acceptance criterion, and attach evidence to each verdict. Verdicts carry receipt numbers you can trace back to the exact run.",
    ],
    [
      "Human gates where it matters",
      "Deleting files, publishing externally, exceeding budget, requesting new access: nine gate types stop the work and wait for a person. Approve, reject or discuss. Every decision is recorded with who made it.",
    ],
    [
      "Runs while you're away",
      "Every state change is persisted. Close the laptop; tasks continue, pause only on gates, exceptions or budget risk, and greet you with “Needs your decision” instead of a thousand lines of log.",
    ],
    [
      "Status you can trust",
      "Four states a human can read: needs you, waiting, in progress, finished. They come from saved state and verification evidence, never from what an agent says in chat.",
    ],
    [
      "Snapshots and rollback",
      "Automatic snapshots at phase boundaries and before risky operations. Roll state, environment and project files back together, without rebuilding anything by hand.",
      "Public beta",
    ],
    [
      "Cost you can account for",
      "Actual and projected spend by goal, phase, task and resource type. Set a threshold and the work pauses and opens a gate before the bill surprises you.",
      "Public beta",
    ],
    [
      "A shared workspace",
      "One project chat where members, the Manager, team progress reports and system cards all land in the same stream. Teammates see progress; those with permission approve gates; nothing waits on one person.",
    ],
    [
      "Configurable experts and teams",
      "Start from platform experts or define your own. Compose teams from roles with SOPs. Change a config once and every project using it picks it up.",
    ],
  ];
  return (
    <Section
      id="features"
      eyebrow="Features"
      title="Built so you can stop watching the terminal."
    >
      <ul className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
        {items.map(([t, d, tag]) => (
          <li key={t}>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-medium">{t}</h3>
              {tag && (
                <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted">
                  {tag}
                </span>
              )}
            </div>
            <p className="mt-3 leading-relaxed text-muted">{d}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Experts() {
  return (
    <Section
      id="experts"
      eyebrow="Experts and teams"
      title="You talk to an expert, not an abstract role."
      lead="An expert is one person: an identity statement, a set of skills, external dependencies and run defaults, running on a cloud agent. A team is how experts are organised: roles plus a standard operating procedure."
      className="bg-white"
    >
      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            role: "Lead",
            who: "A domain expert",
            d: "Registers the approach and technical checks, pulls in executors as the SOP requires, and reports results and evidence back.",
          },
          {
            role: "Executor",
            who: "Does the work",
            d: "Receives a clear unit of work, an isolated environment and only the permissions that unit needs. Requests access at runtime through a gate if something is missing.",
          },
          {
            role: "Verifier",
            who: "Never touched the output",
            d: "Reviews the plan before execution and judges the result after, in its own session. Submits verdicts directly to the control plane.",
          },
        ].map((r) => (
          <div key={r.role} className="rounded-2xl border border-line p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">{r.role}</p>
            <h3 className="mt-2 text-lg font-medium">{r.who}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{r.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 grid gap-6 rounded-2xl bg-accent-soft p-8 text-sm leading-relaxed text-accent md:grid-cols-2">
        <p>
          Roles can share the same engine and even the same expert. What’s
          enforced is separation of sessions, duties and permissions: one
          session cannot both write a deliverable and judge whether it’s
          acceptable.
        </p>
        <p>
          Picking an expert or a tool grants nothing by itself. Permissions are
          scoped to the task, and high-risk actions still stop at a gate.
        </p>
      </div>
    </Section>
  );
}

function Audience() {
  const personas = [
    {
      t: "Independent developers and small tech leads",
      d: "You already use Claude Code or Codex and you're tired of babysitting the terminal. You want to describe a migration in a few sentences, confirm the plan, and come back to results plus a short list of decisions.",
    },
    {
      t: "Project leads",
      d: "You don't write code every day. You care about progress, risk and money: which goals are running, what's stuck on approval, how much of the month's budget is gone. You need to delegate approvals and roll back when something goes wrong.",
    },
    {
      t: "Team and expert maintainers",
      d: "You define how work gets done: which skills an engineering expert uses, which systems it depends on, which roles sit on a team and in what order. Change it once; every project follows.",
    },
  ];
  return (
    <Section id="who" eyebrow="Who it's for" title="People responsible for outcomes, not just output.">
      <ul className="grid gap-10 md:grid-cols-3">
        {personas.map((p) => (
          <li key={p.t}>
            <h3 className="text-lg font-medium">{p.t}</h3>
            <p className="mt-3 leading-relaxed text-muted">{p.d}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Scenarios() {
  const rows = [
    ["Software delivery", "New project builds, issue and bug fixes, code migration, test coverage", "Private beta"],
    ["Cross-border e-commerce", "Sourcing, listing, ads, inventory, support, retrospectives", "Planned"],
    ["Insurance services", "Customer enquiries, document collection, underwriting support, renewals", "Planned"],
    ["Research and operations", "Competitive research, content production, data analysis, recurring reports", "Planned"],
  ];
  return (
    <Section
      eyebrow="Scenarios"
      title="One execution kernel. Different experts for different work."
      lead="LongWay isn't an automation tool for one industry. Domain knowledge lives in experts, teams and project files, not in the scheduler, state store or verification machinery. Software delivery ships first; other domains open as their skills and connectors are wired in."
      className="bg-white"
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
            <th scope="col" className="py-3 pr-6 font-medium">Domain</th>
            <th scope="col" className="py-3 pr-6 font-medium">Example tasks</th>
            <th scope="col" className="py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([d, ex, s]) => (
            <tr key={d} className="border-b border-line">
              <th scope="row" className="py-4 pr-6 font-medium">{d}</th>
              <td className="py-4 pr-6 text-muted">{ex}</td>
              <td className="py-4">
                <span
                  className={
                    s === "Private beta"
                      ? "rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
                      : "rounded-full border border-line px-2.5 py-0.5 text-xs text-muted"
                  }
                >
                  {s}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function CTA() {
  return (
    <section id="beta" className="border-t border-line bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 md:flex-row md:items-center md:justify-between md:py-32">
        <div className="max-w-xl">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Give an agent a goal and a boundary. Go to sleep.
          </h2>
          <p className="mt-4 text-lg text-background/70">
            LongWay is in private beta for software delivery teams. Tell us
            what you’d hand off first.
          </p>
        </div>
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
