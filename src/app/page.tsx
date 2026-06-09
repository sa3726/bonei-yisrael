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
    desc: "A comprehensive community environment in the heart of Yerushalayim — homes, schools, shuls, and the infrastructure to sustain them. Designed specifically for Syrian Jewish families who want to build the future.",
    tag: "Active Development",
  },
  {
    name: "Bnei Rachel",
    location: "Bethlehem · Next to Kever Rachel",
    flag: "🕊️",
    desc: "The only Jewish presence in Beit Lechem, strengthening connection to this holy site through Torah learning, community programs, and expansion of the yeshiva campus.",
    tag: "Active Development",
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

const bonot = [
  { name: "Sophia Shabot" },
  { name: "Marsha Zakay" },
  { name: "Hannah Elmekias" },
  { name: "Roz Levy" },
];

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#F7F5F3', color: '#2C3E50' }}>

      {/* Nav */}
      <nav style={{ background: '#2C3E50' }} className="flex items-center justify-between px-8 py-4">
        <div>
          <span className="text-xl font-medium text-white tracking-wide">Bonei Yisrael</span>
          <span className="ml-3 text-base" style={{ color: '#C9A84C' }}>בוני ישראל</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#projects" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block">Projects</a>
          <a href="#team" className="text-sm text-white/70 hover:text-white transition-colors hidden sm:block">Team</a>
          <Link href="/signup"
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={{ background: '#C9A84C', color: '#2C3E50' }}>
            Join Us
          </Link>
          <Link href="/login"
            className="rounded-full px-5 py-2 text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-colors">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: '#2C3E50' }} className="flex flex-col items-center justify-center px-8 py-28 text-center text-white">
        <p className="text-xs font-medium uppercase tracking-[0.25em] mb-6" style={{ color: '#C9A84C' }}>
          Home · Heritage · Future
        </p>
        <h1 className="text-4xl sm:text-5xl font-light max-w-2xl leading-tight mb-6 tracking-tight">
          Building the Future.<br />In Our Land. Together.
        </h1>
        <p className="text-base text-white/70 max-w-lg mb-5 leading-relaxed font-light">
          Bonei Yisrael is a Syrian Jewish-led movement dedicated to establishing vibrant, permanent communities in Eretz Yisrael — rooted in Torah, built for generations.
        </p>
        <p className="text-sm mb-12 italic" style={{ color: '#C9A84C' }}>
          "בונה ירושלים ה׳ נדחי ישראל יכנס"
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/signup"
            className="rounded-full px-8 py-3 text-sm font-medium transition-colors"
            style={{ background: '#C9A84C', color: '#2C3E50' }}>
            Join the Movement
          </Link>
          <a href="#story"
            className="rounded-full px-8 py-3 text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-colors">
            Our Story
          </a>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="px-8 py-24 max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>How It Started</p>
        <h2 className="text-2xl font-light mb-8" style={{ color: '#2C3E50' }}>Born in a Garage, Purim 2023</h2>
        <p className="text-gray-600 leading-relaxed mb-4 font-light">
          Saul Ancona and Michael Kraiem were sitting together studying Torah. There was no agenda — no whiteboard, no planning document. Eretz Yisrael surfaced naturally, as it always does when the conversation is serious enough.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4 font-light">
          The question that followed was not emotional, and it was not rhetorical: <em>Where is the community actually going?</em> What came next was commitment — a shared decision to build rather than admire.
        </p>
        <p className="text-gray-600 leading-relaxed font-light">
          This is not about inspiration. It is about infrastructure. Turning conviction into a concrete plan.
        </p>
      </section>

      {/* Pillars */}
      <section style={{ background: '#F8F9FA' }} className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-center mb-3" style={{ color: '#C9A84C' }}>What We Build</p>
          <h2 className="text-2xl font-light text-center mb-12" style={{ color: '#2C3E50' }}>Five Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-3">{p.icon}</span>
                <h3 className="font-medium text-base mb-1" style={{ color: '#2C3E50' }}>{p.title}</h3>
                <p className="text-sm mb-2" style={{ color: '#C9A84C' }}>{p.hebrew}</p>
                <p className="text-gray-400 text-xs">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-8 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>On the Ground</p>
        <h2 className="text-2xl font-light mb-10" style={{ color: '#2C3E50' }}>Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.name} className="rounded-xl bg-white border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{p.flag}</div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-medium" style={{ color: '#2C3E50' }}>{p.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ background: '#34495E' }}>{p.tag}</span>
              </div>
              <p className="text-sm mb-4" style={{ color: '#C9A84C' }}>{p.location}</p>
              <p className="text-gray-500 leading-relaxed text-sm font-light">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" style={{ background: '#F8F9FA' }} className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>The Builders</p>
          <h2 className="text-2xl font-light mb-10" style={{ color: '#2C3E50' }}>Leadership</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {team.map(m => (
              <div key={m.name} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="font-medium text-sm" style={{ color: '#2C3E50' }}>{m.name}</div>
                <div className="text-xs text-gray-400 mt-1">{m.role}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-8 border" style={{ background: '#2C3E50' }}>
            <h3 className="font-medium text-white mb-1">Bonot Yisrael — <span style={{ color: '#C9A84C' }}>בונות ישראל</span></h3>
            <p className="text-sm text-white/60 mb-5 font-light">Women's Division — family life, education, culture, and the social fabric that makes a community thrive.</p>
            <div className="flex flex-wrap gap-3">
              {bonot.map(m => (
                <span key={m.name} className="rounded-full px-4 py-2 text-sm font-medium text-white border border-white/20">
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leshem Shamayim */}
      <section className="px-8 py-20 max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>Our Commitment</p>
        <h2 className="text-2xl font-light mb-6" style={{ color: '#2C3E50' }}>Leshem Shamayim</h2>
        <p className="text-gray-500 leading-relaxed font-light">
          Our work is performed solely <em>leshem shamayim</em> — with pure spiritual intentions and without any financial incentives or personal gain. We are sounding the shofar — awakening hearts to return, to see, to believe.
        </p>
      </section>

      {/* CTA */}
      <section style={{ background: '#2C3E50' }} className="text-white text-center py-20 px-8">
        <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>The Question</p>
        <h2 className="text-3xl font-light mb-5">Was Brooklyn Always the End Goal?</h2>
        <p className="text-white/60 mb-10 max-w-md mx-auto font-light leading-relaxed">
          Communities that last are the ones that build — deliberately, patiently, and together.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/signup"
            className="rounded-full px-8 py-3 text-sm font-medium transition-colors"
            style={{ background: '#C9A84C', color: '#2C3E50' }}>
            Join the Movement
          </Link>
          <a href="https://instagram.com/bonei_yisrael" target="_blank" rel="noopener noreferrer"
            className="rounded-full px-8 py-3 text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-colors">
            @bonei_yisrael
          </a>
        </div>
      </section>

      <footer style={{ background: '#2C3E50', borderTop: '1px solid rgba(255,255,255,0.08)' }} className="text-center py-6 text-xs text-white/30">
        © {new Date().getFullYear()} Bonei Yisrael · בוני ישראל · Building the Future. In Our Land. Together.
      </footer>
    </div>
  );
}
