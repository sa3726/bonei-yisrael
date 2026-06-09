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
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div>
          <span className="text-xl font-bold text-blue-900">Bonei Yisrael</span>
          <span className="ml-2 text-lg text-blue-700">בוני ישראל</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#projects" className="text-sm text-gray-600 hover:text-blue-900 hidden sm:block">Projects</a>
          <a href="#team" className="text-sm text-gray-600 hover:text-blue-900 hidden sm:block">Team</a>
          <Link
            href="/login"
            className="rounded-full bg-blue-900 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 transition-colors"
          >
            Member Login
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-8 py-24 text-center bg-gradient-to-b from-blue-950 to-blue-800 text-white">
        <p className="text-sm font-medium uppercase tracking-widest text-blue-300 mb-4">Home · Heritage · Future</p>
        <h1 className="text-4xl sm:text-5xl font-bold max-w-2xl leading-tight mb-6">
          Building the Future.<br />In Our Land. Together.
        </h1>
        <p className="text-lg text-blue-100 max-w-xl mb-4">
          Bonei Yisrael is a Syrian Jewish-led movement dedicated to establishing vibrant, permanent communities in Eretz Yisrael — rooted in Torah, built for generations.
        </p>
        <p className="text-sm text-blue-300 mb-10 italic">
          "בונה ירושלים ה׳ נדחי ישראל יכנס" — Hashem rebuilds Jerusalem; He gathers the dispersed of Israel.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/login"
            className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-blue-950 hover:bg-yellow-300 transition-colors"
          >
            Join the Movement
          </Link>
          <a
            href="#story"
            className="rounded-full border border-white/40 px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Our Story
          </a>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="px-8 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">How It Started</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          During Purim 2023, Saul Ancona and Michael Kraiem were sitting together studying Torah. There was no agenda — no whiteboard, no planning document. Eretz Yisrael surfaced naturally, as it always does when the conversation is serious enough.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          The question that followed was not emotional, and it was not rhetorical: <em>Where is the community actually going?</em> What came next was commitment. A shared decision to build rather than admire.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Bonei Yisrael began in a garage. Not with press releases or ribbon cuttings — but with people who understood that waiting is no longer an option. This is not about inspiration. It is about infrastructure. Turning conviction into a concrete plan.
        </p>
      </section>

      {/* Pillars */}
      <section className="px-8 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-blue-900 mb-12">Our Five Pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl mb-3">{p.icon}</span>
                <h3 className="font-bold text-blue-900 text-lg">{p.title}</h3>
                <p className="text-blue-600 text-sm mb-2">{p.hebrew}</p>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-8 py-20 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Our Projects</h2>
        <p className="text-gray-500 mb-10">On-the-ground developments bringing the vision to life.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(p => (
            <div key={p.name} className="rounded-2xl border border-gray-100 shadow-sm p-8 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{p.flag}</div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-blue-900">{p.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">{p.tag}</span>
              </div>
              <p className="text-sm text-blue-600 mb-4">{p.location}</p>
              <p className="text-gray-600 leading-relaxed text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="px-8 py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Leadership</h2>
          <p className="text-gray-500 mb-10">The people building this movement.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {team.map(m => (
              <div key={m.name} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="font-semibold text-blue-900 text-sm">{m.name}</div>
                <div className="text-xs text-gray-500 mt-1">{m.role}</div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="font-bold text-blue-900 mb-1">Bonot Yisrael — בונות ישראל</h3>
            <p className="text-sm text-gray-600 mb-4">Women's Division — focused on family life, education, culture, and the social fabric that determines whether a community merely exists or actually thrives.</p>
            <div className="flex flex-wrap gap-3">
              {bonot.map(m => (
                <span key={m.name} className="bg-white rounded-full px-4 py-2 text-sm font-medium text-blue-900 border border-blue-100">
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-8 py-16 max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-blue-400 mb-4">Our Commitment</p>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Leshem Shamayim</h2>
        <p className="text-gray-600 leading-relaxed">
          Our work is performed solely <em>leshem shamayim</em> — with pure spiritual intentions and without any financial incentives or personal gain. We are not builders in the financial sense. We hold no stake in development, no profit from success. Our interest is higher. We are sounding the shofar — awakening hearts to return, to see, to believe.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-blue-950 text-white text-center py-16 px-8">
        <p className="text-blue-300 text-sm uppercase tracking-widest mb-3">The question is not whether Israel matters</p>
        <h2 className="text-2xl font-bold mb-4">Was Brooklyn Always the End Goal?</h2>
        <p className="text-blue-200 mb-8 max-w-md mx-auto">Communities that last are the ones that build — deliberately, patiently, and together. Be part of what's being built.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="rounded-full bg-yellow-400 px-8 py-3 font-semibold text-blue-950 hover:bg-yellow-300 transition-colors"
          >
            Join the Movement
          </Link>
          <a href="https://instagram.com/bonei_yisrael" target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-white/40 px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors">
            @bonei_yisrael
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Bonei Yisrael · בוני ישראל · Building the Future. In Our Land. Together.
      </footer>
    </div>
  );
}
