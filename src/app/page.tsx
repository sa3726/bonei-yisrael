import Link from "next/link";

const pillars = [
  { icon: "🏘️", title: "Community", hebrew: "קהילה", desc: "Building lasting social bonds" },
  { icon: "📚", title: "Schools", hebrew: "חינוך", desc: "Educational institutions for our children" },
  { icon: "🕍", title: "Shuls", hebrew: "בתי כנסת", desc: "Religious centers for worship" },
  { icon: "🛡️", title: "Safety", hebrew: "ביטחון", desc: "Security and stability for families" },
  { icon: "💼", title: "Opportunity", hebrew: "הזדמנות", desc: "Economic prosperity and growth" },
];

const projects = [
  {
    name: "Matobu",
    location: "Katamonim, Jerusalem",
    flag: "🏙️",
    desc: "A comprehensive community environment in the heart of Yerushalayim — homes, schools, shuls, and the infrastructure to sustain them. Designed for Syrian Jewish families who want to build the future.",
  },
  {
    name: "Bnei Rachel",
    location: "Bethlehem · Next to Kever Rachel",
    flag: "🕊️",
    desc: "The only Jewish presence in Beit Lechem, strengthening connection to this holy site through Torah learning, community programs, and expansion of the yeshiva campus.",
  },
];

const team = [
  { name: "Saul Ancona", role: "Co-Founder" },
  { name: "Michael Kraiem", role: "Co-Founder" },
  { name: "Jack Srour", role: "Matobu Project Lead" },
  { name: "Sammy Saka", role: "Matobu Project" },
  { name: "Isaac Zaccai", role: "Pilot Trip — 2026" },
  { name: "Albert Mizrahi", role: "Creative Direction" },
  { name: "Michael H. Mamiye", role: "Operations" },
  { name: "Erez", role: "On the Ground, Israel" },
  { name: "Zachary (Isaac) Levi", role: "PR & Communications" },
];

const bonot = ["Sophia Shabot", "Marsha Zakay", "Hannah Elmekias", "Roz Levy"];

export default function Home() {
  return (
    <div style={{ background: "var(--by-sand)", color: "var(--by-primary)", fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>

      {/* ── Nav ── */}
      <nav style={{ background: "var(--by-primary)" }} className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "var(--by-subheading)", fontWeight: 300, color: "white", letterSpacing: "-0.01em" }}>Bonei Yisrael</span>
          <span style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.4)" }}>בוני ישראל</span>
        </div>
        <div className="flex items-center gap-6">
          {["#projects", "#team"].map((href, i) => (
            <a key={href} href={href} style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.5)", transition: "var(--by-transition)" }}
              className="hidden sm:block hover:text-white">{["Projects", "Team"][i]}</a>
          ))}
          <Link href="/signup" className="by-btn-primary" style={{ background: "white", color: "var(--by-primary)", fontSize: "var(--by-small)" }}>Join Us</Link>
          <Link href="/login" style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.6)", transition: "var(--by-transition)" }}
            className="hover:text-white">Sign In</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ background: "var(--by-primary)", paddingTop: "7rem", paddingBottom: "7rem" }}
        className="flex flex-col items-center text-center px-8">
        <p className="by-label mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>Home · Heritage · Future</p>
        <h1 className="by-display" style={{ color: "white", maxWidth: "640px", lineHeight: 1.1 }}>
          Building the Future.<br />In Our Land. Together.
        </h1>
        <p className="by-body" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "480px", marginTop: "1.5rem", fontWeight: 300 }}>
          A Syrian Jewish-led movement establishing vibrant, permanent communities in Eretz Yisrael — rooted in Torah, built for generations.
        </p>
        <p style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.3)", marginTop: "1rem", fontStyle: "italic" }}>
          "בונה ירושלים ה׳ נדחי ישראל יכנס"
        </p>
        <div className="flex gap-3 mt-10 flex-wrap justify-center">
          <Link href="/signup" className="by-btn-primary" style={{ background: "white", color: "var(--by-primary)" }}>
            Join the Movement
          </Link>
          <a href="#story" className="by-btn-outline" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>
            Our Story
          </a>
        </div>
      </section>

      {/* ── Story ── */}
      <section id="story" className="flex flex-col items-center text-center px-8" style={{ padding: "6rem 2rem" }}>
        <p className="by-label mb-4">How It Started</p>
        <h2 className="by-hero" style={{ maxWidth: "560px" }}>Born in a Garage, Purim 2023</h2>
        <div style={{ maxWidth: "560px", marginTop: "2rem" }}>
          <p className="by-body" style={{ color: "rgba(44,62,80,0.6)", fontWeight: 300, marginBottom: "1rem" }}>
            Saul Ancona and Michael Kraiem were sitting together studying Torah. There was no agenda — no whiteboard, no planning document. Eretz Yisrael surfaced naturally, as it always does when the conversation is serious enough.
          </p>
          <p className="by-body" style={{ color: "rgba(44,62,80,0.6)", fontWeight: 300, marginBottom: "1rem" }}>
            The question that followed was not emotional, and not rhetorical: <em>Where is the community actually going?</em> What came next was commitment — a shared decision to build rather than admire.
          </p>
          <p className="by-body" style={{ color: "rgba(44,62,80,0.6)", fontWeight: 300 }}>
            This is not about inspiration. It is about infrastructure. Turning conviction into a concrete plan.
          </p>
        </div>
      </section>

      <hr className="by-divider" style={{ margin: 0 }} />

      {/* ── Five Pillars ── */}
      <section style={{ background: "var(--by-gray)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p className="by-label mb-4 text-center">What We Build</p>
          <h2 className="by-hero text-center" style={{ marginBottom: "3rem" }}>Five Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map(p => (
              <div key={p.title} className="by-card flex flex-col items-center text-center p-6">
                <span style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{p.icon}</span>
                <h3 className="by-heading" style={{ fontSize: "var(--by-body)", fontWeight: 500 }}>{p.title}</h3>
                <p style={{ fontSize: "var(--by-small)", color: "var(--by-primary-light)", marginTop: "0.25rem" }}>{p.hebrew}</p>
                <p style={{ fontSize: "var(--by-small)", color: "rgba(44,62,80,0.45)", marginTop: "0.5rem", fontWeight: 300 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p className="by-label mb-4">On the Ground</p>
          <h2 className="by-hero" style={{ marginBottom: "2.5rem" }}>Our Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map(p => (
              <div key={p.name} className="by-card p-8">
                <span style={{ fontSize: "2.25rem", display: "block", marginBottom: "1.25rem" }}>{p.flag}</span>
                <div className="flex items-center gap-3 mb-1">
                  <h3 style={{ fontSize: "var(--by-subheading)", fontWeight: 500 }}>{p.name}</h3>
                  <span style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(44,62,80,0.4)", border: "1px solid rgba(44,62,80,0.15)", borderRadius: "9999px", padding: "0.2rem 0.6rem" }}>
                    Active
                  </span>
                </div>
                <p style={{ fontSize: "var(--by-small)", color: "rgba(44,62,80,0.45)", marginBottom: "1rem" }}>{p.location}</p>
                <p className="by-body" style={{ color: "rgba(44,62,80,0.6)", fontWeight: 300 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="by-divider" style={{ margin: 0 }} />

      {/* ── Team ── */}
      <section id="team" style={{ background: "var(--by-gray)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <p className="by-label mb-4">The Builders</p>
          <h2 className="by-hero" style={{ marginBottom: "2.5rem" }}>Leadership</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {team.map(m => (
              <div key={m.name} className="by-card p-4">
                <p style={{ fontSize: "var(--by-small)", fontWeight: 500 }}>{m.name}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(44,62,80,0.45)", marginTop: "0.2rem", fontWeight: 300 }}>{m.role}</p>
              </div>
            ))}
          </div>

          {/* Bonot Yisrael */}
          <div className="by-card p-8" style={{ background: "var(--by-primary)", border: "none" }}>
            <p className="by-label mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Women's Division</p>
            <h3 style={{ fontSize: "var(--by-subheading)", fontWeight: 400, color: "white", marginBottom: "0.5rem" }}>
              Bonot Yisrael <span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>בונות ישראל</span>
            </h3>
            <p style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.45)", marginBottom: "1.5rem", fontWeight: 300, maxWidth: "480px" }}>
              Focused on family life, education, culture, and the social fabric that determines whether a community merely exists or actually thrives.
            </p>
            <div className="flex flex-wrap gap-2">
              {bonot.map(name => (
                <span key={name} style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "9999px", padding: "0.35rem 1rem", fontWeight: 300 }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leshem Shamayim ── */}
      <section className="flex flex-col items-center text-center px-8" style={{ padding: "6rem 2rem" }}>
        <p className="by-label mb-4">Our Commitment</p>
        <h2 className="by-hero" style={{ marginBottom: "1.5rem" }}>Leshem Shamayim</h2>
        <p className="by-body" style={{ maxWidth: "480px", color: "rgba(44,62,80,0.6)", fontWeight: 300 }}>
          Our work is performed solely <em>leshem shamayim</em> — with pure spiritual intentions and without any financial incentives or personal gain. We are sounding the shofar — awakening hearts to return, to see, to believe.
        </p>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--by-primary)", padding: "7rem 2rem", textAlign: "center" }}>
        <p className="by-label mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>The Question</p>
        <h2 className="by-display" style={{ color: "white", marginBottom: "1.5rem" }}>
          Was Brooklyn Always<br />the End Goal?
        </h2>
        <p className="by-body" style={{ color: "rgba(255,255,255,0.45)", maxWidth: "400px", margin: "0 auto 2.5rem", fontWeight: 300 }}>
          Communities that last are the ones that build — deliberately, patiently, and together.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/signup" className="by-btn-primary" style={{ background: "white", color: "var(--by-primary)" }}>
            Join the Movement
          </Link>
          <a href="https://instagram.com/bonei_yisrael" target="_blank" rel="noopener noreferrer"
            className="by-btn-outline" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}>
            @bonei_yisrael
          </a>
        </div>
      </section>

      <footer style={{ background: "var(--by-primary)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", textAlign: "center" }}>
        <p style={{ fontSize: "var(--by-small)", color: "rgba(255,255,255,0.2)", fontWeight: 300, letterSpacing: "0.02em" }}>
          © {new Date().getFullYear()} Bonei Yisrael · בוני ישראל · Building the Future. In Our Land. Together.
        </p>
      </footer>
    </div>
  );
}
