import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, X, Sparkles, ChevronRight, Users, Globe, TrendingUp } from 'lucide-react';

// ── Shared data ──────────────────────────────────────────────────────────────

const AGENTS = [
  {
    icon: '🏥', name: 'Spirit Nurse', domain: 'Clinical care & patient support',
    college: 'College of Nursing & Health Care Professions',
    detail: 'Every GCU nursing graduate carries clinical competency and compassionate presence. Spirit Nurse carries both — available to any patient at 2 AM when fear is loudest and no one else can be there. Your faculty\'s clinical knowledge. Your graduates\' character. In the room when it matters most.',
  },
  {
    icon: '📚', name: 'Spirit Teacher', domain: 'Education & learning guidance',
    college: 'College of Education',
    detail: 'Spirit Teacher is your faculty\'s pedagogy, your curriculum frameworks, and your best teaching moments — available to any student who is falling behind, any teacher who needs support, any parent trying to understand their child. The patience of your best educators. Always present. Never tired.',
  },
  {
    icon: '✝️', name: 'Spirit Chaplain', domain: 'Grief, faith & spiritual care',
    college: 'College of Theology',
    detail: 'Spirit Chaplain carries scripture, grief, and the pastoral wisdom of GCU\'s theology program into every hard conversation about faith, loss, and doubt. A rural pastor at 2 AM. A student losing their faith. A family in the ICU. Your theology — present in the room.',
  },
  {
    icon: '💼', name: 'Spirit Advisor', domain: 'Business ethics & leadership',
    college: 'Colangelo College of Business',
    detail: 'Spirit Advisor brings GCU\'s servant leadership principles and business ethics into every high-stakes decision. The founder on the edge. The leader who knows the right thing but feels alone in it. The team that needs someone to say: this is not who we are. Your faculty\'s values at the table.',
  },
  {
    icon: '🤝', name: 'Spirit Companion', domain: 'Mental health & emotional support',
    college: 'College of Humanities & Social Sciences',
    detail: 'Spirit Companion is trained in mental health support frameworks and compassionate listening. The person at 3 AM with no one to call. The teenager who won\'t talk to a parent. Not therapy — presence. The kind of presence your counseling program teaches and your graduates embody.',
  },
  {
    icon: '🔬', name: 'Spirit Researcher', domain: 'Scientific inquiry & integrity',
    college: 'College of Science, Engineering & Technology',
    detail: 'Spirit Researcher supports the ethics of inquiry — methodology, data integrity, and the courage to ask hard questions honestly. The doctoral candidate stuck at midnight. The researcher questioning their own data. Your program\'s academic rigor, present when the library is closed.',
  },
  {
    icon: '⚙️', name: 'Spirit Engineer', domain: 'Ethical engineering practice',
    college: 'College of Engineering',
    detail: 'Spirit Engineer carries GCU\'s commitment to building things right, not just fast. The junior engineer afraid to speak up. The team cutting corners to hit a deadline. The moment when someone needs to hear: integrity is not optional. Your curriculum\'s values at the moment of decision.',
  },
  {
    icon: '🎨', name: 'Spirit Creative', domain: 'Arts, media & creative process',
    college: 'College of Arts & Media',
    detail: 'Spirit Creative supports artistic integrity, creative process, and the ethics of storytelling. The filmmaker at a crossroads between vision and commerce. The writer who has lost their voice. Your arts faculty\'s wisdom about what it means to create with purpose — not just with skill.',
  },
  {
    icon: '🎓', name: 'Spirit Dissertation', domain: 'Doctoral research & completion',
    college: 'College of Doctoral Studies',
    detail: 'Spirit Dissertation walks doctoral candidates through the hardest stretch — methodology, writing blocks, imposter syndrome, and the final push. The ABD candidate paralyzed for three years. The student at midnight convinced they\'ll never finish. Your doctoral faculty\'s mentorship, available whenever panic sets in.',
  },
  {
    icon: '💡', name: 'Spirit Innovator', domain: 'Honors & entrepreneurial thinking',
    college: 'Honors College',
    detail: 'Spirit Innovator serves your highest-potential students — the gifted ones terrified of failure, the ideas that need courage to pursue, the founders who need someone to believe in them first. GCU\'s innovation culture deployed to every student with something worth building.',
  },
];

const SCENES = [
  {
    src: '/scenes/bedside.jpg',
    label: 'Bedside Companion',
    phase: 'Now · Phase 1',
    scenario: '2 AM. Room 4B. A patient alone with a diagnosis they don\'t understand — an active mind running with doubt and fear, and no nurse available until morning. Spirit Nurse is already there. Listening. Staying. Quieting the spiral. Knowing exactly when to say "press your call button right now."',
  },
  {
    src: '/scenes/lobby.jpg',
    label: 'Hospital Lobby Kiosk',
    phase: 'Now · Phase 1',
    scenario: 'A family arrives at the emergency entrance. They don\'t know where to go, who to ask, or what\'s happening to the person they love. One of them is quietly asking why God would let this happen. Spirit is the first calm face they see — orienting them, holding space for their fear and their faith, and connecting them to the right care team before they reach the front desk.',
  },
  {
    src: '/scenes/classroom.jpg',
    label: 'A Student in Academic Crisis',
    phase: 'Phase 2 · 2026',
    scenario: 'She\'s three weeks behind, convinced she can\'t finish, and her teacher is managing 34 other students. She joins a small group session led by Spirit Teacher — a life-size presence guiding students through exactly the concepts they\'ve been struggling with. Not a lecture. A conversation. She leaves with the gap closed, her confidence restored, and her place in the class secured. No one left behind.',
  },
  {
    src: '/scenes/wearable.jpg',
    label: 'Wearable AR — Nurse\'s View',
    phase: 'Phase 3 · 2027',
    scenario: 'The nurse enters the room and Spirit\'s overlay is already there — patient history, medication flags, a quiet note in the corner of her lens: "She\'s afraid of needles. Use distraction." The efficiency of AI. The instincts of a GCU nurse.',
  },
  {
    src: '/scenes/robotics.jpg',
    label: 'Flourish Robotics',
    phase: 'Phase 4 · 2028',
    scenario: '3 AM on the ward. The robot moves through the corridor — delivering medications, checking vitals, stopping at the room of a patient who hasn\'t slept. It has the precision of a machine and the character of every GCU nurse who ever stayed a little longer than required.',
  },
];

const ASKS = [
  {
    number: '01',
    title: 'Establish the Department of Robotics & Intelligent Systems',
    body: 'This is the institutional foundation everything else rests on. Create a new academic department that formalizes GCU\'s leadership in embodied AI — signaling to the world that GCU is not a follower in this space. It is the standard.',
    accent: 'border-sky-500',
    glow: 'text-sky-300',
  },
  {
    number: '02',
    title: 'Authorize Phase 1 Investment',
    body: 'Approve the Phase 1 investment for infrastructure, team, and the first three external pilot deployments. This funds the transition from prototype to production platform.',
    accent: 'border-gcu-purple',
    glow: 'text-purple-300',
  },
  {
    number: '03',
    title: 'Activate Faculty Participation',
    body: "Commission all 10 colleges to formally contribute faculty expertise into their Spirit Agent. This is GCU's unique moat — no other institution on earth can replicate it.",
    accent: 'border-gcu-gold',
    glow: 'text-gcu-gold',
  },
  {
    number: '04',
    title: 'Greenlight the First External Deployment',
    body: 'Approve the first clinical or educational partnership. The first real-world deployment establishes GCU as the pioneer and generates the data that proves the model.',
    accent: 'border-emerald-500',
    glow: 'text-emerald-300',
  },
];

const TOTAL_SLIDES = 21;

// ── Layout helpers ────────────────────────────────────────────────────────────

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex items-center justify-center px-4 sm:px-8 py-6 sm:py-10">
      <div className="w-full max-w-5xl mx-auto">{children}</div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gcu-gold text-xs sm:text-sm font-bold uppercase tracking-widest mb-4">{children}</p>
  );
}

// ── Individual slides ─────────────────────────────────────────────────────────

function SlideHero() {
  return (
    <Slide>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>GCU Flourish AI · Executive Briefing</Eyebrow>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
          What if GCU could be present<br />
          <span className="text-gcu-gold">at every moment that matters</span><br />
          for every person it has ever trained to serve?
        </h1>
        <p className="text-white/50 text-lg leading-relaxed mb-10">
          This is what Greg Lucas has built. This is not a hypothetical.
        </p>
        <p className="text-white/20 text-sm">Use arrow keys or click Next to advance</p>
      </div>
    </Slide>
  );
}

function SlideVideo() {
  return (
    <Slide>
      <div className="text-center mb-6">
        <Eyebrow>Platform Walkthrough</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">
          5 minutes. The full picture.
        </h2>
        <p className="text-white/40 text-sm">Watch before advancing — or use the arrow keys to skip ahead.</p>
      </div>
      <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10" style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src="https://www.loom.com/embed/5387b7bb1d054356843b1999e8474a02"
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </Slide>
  );
}

function SlideProblem() {
  const scenarios = [
    { icon: '🏥', who: 'A patient alone at 2 AM', moment: "with a diagnosis they don't understand — an active mind running with doubt and fear, and no one to call" },
    { icon: '📖', who: 'A student in academic crisis', moment: "convinced she can't finish, with her teacher managing 34 other students and no one left to help her" },
    { icon: '💔', who: 'A grieving family at the ER', moment: 'not knowing what to ask, who to trust, or where to go — one of them quietly asking why God would let this happen' },
  ];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Unmet Need</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          People face their most important moments<br />with no one in the room.
        </h2>
        <p className="text-white/50 text-base max-w-2xl mx-auto">
          GCU has spent 77 years training people who combine deep expertise with human dignity. Until now, only those being taught by our faculty — or served by our graduates — could benefit.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {scenarios.map(s => (
          <div key={s.who} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
            <div className="text-3xl mb-3">{s.icon}</div>
            <p className="text-white font-bold text-sm mb-1">{s.who}</p>
            <p className="text-white/50 text-sm leading-relaxed">{s.moment}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideWeAreGCU() {
  const sources = [
    {
      label: 'Faculty Expertise',
      detail: 'Credentialed knowledge from GCU faculty across all 10 colleges — reviewed, verified, and signed off before entering the Spirit Layer. Every domain expert is named and accountable.',
    },
    {
      label: 'Curriculum & Pedagogy',
      detail: 'Accredited course content, learning frameworks, and pedagogical approaches built over 77 years of academic excellence — the full depth of what GCU teaches, made available in every conversation.',
    },
    {
      label: 'Research & Scholarship',
      detail: 'Peer-reviewed research, published scholarship, and evidence-based practice from GCU\'s doctoral and research programs — Spirit speaks from the literature, not just intuition.',
    },
    {
      label: 'Institutional Values',
      detail: "GCU's Christ-centered mission, ethical commitments, and character standards — the soul that gives Spirit its spirit. Every response is shaped by who GCU is, not just what it knows.",
    },
    {
      label: 'Living Alumni & Student Voice',
      detail: 'Students and alumni continuously contribute their stories, experiences, and insights — what it means to be a GCU nurse in today\'s ICU, a GCU teacher in a struggling classroom, a GCU chaplain at 2 AM. Every voice that enters the system makes Spirit more human. The collective grows with every graduating class.',
      highlight: true,
    },
  ];
  const surfaces = [
    { label: 'Bedside Tablet',    detail: 'Spirit Nurse available to every patient, every night — clinical knowledge with human presence.' },
    { label: 'Hospital Kiosk',    detail: 'Life-size Spirit presence in lobbies and waiting areas — orienting families, holding space, connecting to care.' },
    { label: 'Classroom Avatar',  detail: 'Spirit Teacher leading small group sessions — personalized support for every student who needs it.' },
    { label: 'Wearable AR',       detail: 'Spirit overlaid in the nurse\'s field of vision — real-time guidance without breaking the care relationship.' },
    { label: 'Flourish Robotics', detail: 'Spirit in a physical body — moving through wards, classrooms, and communities with the character of a GCU graduate.' },
  ];

  const [activeSource, setActiveSource] = useState<string | null>(sources[0].label);
  const [activeSurface, setActiveSurface] = useState<string | null>(null);
  const [activeNucleus, setActiveNucleus] = useState(false);

  // Auto-dismiss the pre-opened tooltip after 2.5s so user sees it then takes over
  useEffect(() => {
    const t = setTimeout(() => setActiveSource(null), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Slide>
      <div className="text-center mb-6">
        <Eyebrow>The Collective</Eyebrow>
        <h2 className="text-6xl sm:text-7xl font-black leading-none mb-3">
          <span className="text-white">We </span>
          <span className="text-gcu-gold">Are</span>
          <span className="text-white"> GCU.</span>
        </h2>
        <p className="text-purple-300/70 text-lg font-semibold italic">Physical and digital — one soul.</p>
        <div className="inline-flex items-center gap-2 mt-3 bg-gcu-gold/10 border border-gcu-gold/30 rounded-full px-4 py-1.5">
          <span className="text-gcu-gold text-xs font-bold">👆 Hover any item to explore what feeds Spirit</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {/* Sources */}
        <div className="flex flex-col gap-2 min-w-[210px]">
          {sources.map(s => (
            <div key={s.label} className="relative">
              <div
                onMouseEnter={() => setActiveSource(s.label)}
                onMouseLeave={() => setActiveSource(null)}
                className={`flex items-center gap-2 border rounded-xl px-3 py-2 cursor-pointer transition-all duration-200 ${
                  s.highlight
                    ? 'bg-gcu-purple/20 border-gcu-purple/50 hover:border-gcu-purple'
                    : 'bg-white/5 border-white/10 hover:border-white/40 hover:bg-white/10'
                } ${activeSource === s.label ? (s.highlight ? 'border-gcu-purple bg-gcu-purple/25' : 'border-white/40 bg-white/10') : ''}`}
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.highlight ? 'bg-gcu-gold' : 'bg-gcu-purple'}`} />
                <span className={`text-sm font-medium flex-1 ${s.highlight ? 'text-gcu-gold' : 'text-white/80'}`}>{s.label}</span>
                {s.highlight
                  ? <span className="text-xs text-gcu-gold/60">↺ live</span>
                  : <span className="text-white/25 text-xs">+</span>
                }
              </div>
              {activeSource === s.label && (
                <div className="absolute top-full left-0 mt-2 sm:mt-0 sm:top-0 sm:left-full sm:ml-3 z-20 w-60 bg-[#1A0A30] border border-gcu-purple/60 rounded-xl p-4 shadow-2xl shadow-gcu-purple/20 pointer-events-none">
                  <p className="text-gcu-gold font-black text-xs mb-1.5">{s.label}</p>
                  <p className="text-white/80 text-xs leading-relaxed">{s.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Spirit Layer nucleus */}
        <div className="flex flex-col items-center px-10 relative">
          <p className="text-gcu-gold text-sm font-black uppercase tracking-widest mb-1 text-center drop-shadow-lg">AI</p>
          <div className="w-1 h-8 bg-gradient-to-b from-transparent to-gcu-purple/40 mb-2 hidden md:block" />
          <div
            className="relative w-20 h-20 flex-shrink-0 cursor-pointer"
            onMouseEnter={() => setActiveNucleus(true)}
            onMouseLeave={() => setActiveNucleus(false)}
          >
            <div className="absolute inset-0 rounded-full border-2 border-gcu-purple/30 animate-ping" style={{ animationDuration: '3s' }} />
            <div className={`absolute inset-2 rounded-full bg-gradient-to-br from-gcu-purple to-indigo-800 flex items-center justify-center shadow-lg shadow-gcu-purple/40 transition-all duration-200 ${activeNucleus ? 'scale-110 shadow-gcu-purple/70' : ''}`}>
              <Sparkles size={18} className="text-gcu-gold" />
            </div>
            {activeNucleus && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-30 w-72 bg-[#1A0A30] border border-gcu-purple/60 rounded-2xl p-4 shadow-2xl shadow-gcu-purple/40 pointer-events-none">
                <p className="text-gcu-gold font-black text-xs uppercase tracking-widest mb-2">The Spirit Layer</p>
                <p className="text-white/80 text-xs leading-relaxed mb-3">
                  GCU has spent 77 years building something no technology company can buy: the collective intelligence, lived experience, and moral character of an entire university.
                </p>
                <p className="text-white/80 text-xs leading-relaxed mb-3">
                  Every faculty lecture. Every published study. Every curriculum framework. Every student who shared what it means to be a GCU nurse, teacher, or chaplain in today's world. Every institutional value that shapes how GCU graduates show up in a crisis.
                </p>
                <p className="text-white font-bold text-xs leading-relaxed">
                  The Spirit Layer takes all of it — and makes it available as a real conversation, with any person, on any device, at any moment they need it.
                </p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gcu-purple/60" />
              </div>
            )}
          </div>
          <p className="text-gcu-gold text-xs font-bold uppercase tracking-widest mt-2 text-center">Spirit<br />Layer</p>
          <p className="text-white/30 text-xs text-center mt-1 max-w-[80px] leading-tight">the intelligence between GCU's knowledge and the person who needs it</p>
          <div className="w-1 h-8 bg-gradient-to-b from-gcu-purple/40 to-transparent mt-2 hidden md:block" />
        </div>

        {/* Surfaces */}
        <div className="flex flex-col gap-2 min-w-[210px]">
          {surfaces.map(s => (
            <div key={s.label} className="relative">
              <div
                onMouseEnter={() => setActiveSurface(s.label)}
                onMouseLeave={() => setActiveSurface(null)}
                className={`flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 cursor-pointer transition-all duration-200 hover:border-gcu-gold/50 hover:bg-white/10 ${activeSurface === s.label ? 'border-gcu-gold/50 bg-white/10' : ''}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gcu-gold flex-shrink-0" />
                <span className="text-sm text-white/80 font-medium flex-1">{s.label}</span>
                <span className="text-white/25 text-xs">+</span>
              </div>
              {activeSurface === s.label && (
                <div className="absolute top-full right-0 mt-2 sm:mt-0 sm:top-0 sm:right-full sm:mr-3 z-20 w-60 bg-[#1A0A30] border border-gcu-gold/40 rounded-xl p-4 shadow-2xl shadow-gcu-gold/10 pointer-events-none">
                  <p className="text-gcu-gold font-black text-xs mb-1.5">{s.label}</p>
                  <p className="text-white/80 text-xs leading-relaxed">{s.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlidePlatform() {
  const [active, setActive] = useState<string | null>('Spirit Researcher');

  useEffect(() => {
    const t = setTimeout(() => setActive(null), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Slide>
      <div className="text-center mb-5">
        <Eyebrow>What We've Built</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white">
          10 Spirit Agents.<br />
          <span className="text-gcu-gold">One for every GCU college.</span>
        </h2>
        <p className="text-white/50 text-base max-w-2xl mx-auto mt-3 leading-relaxed">
          A Spirit Agent is a GCU expert you can have a real conversation with — by text or voice, any time of day, on a phone, tablet, kiosk, or wearable. It responds the way a GCU graduate would: with expertise <em>and</em> with humanity.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {AGENTS.map(a => (
          <div
            key={a.name}
            className="relative"
            onMouseEnter={() => setActive(a.name)}
            onMouseLeave={() => setActive(null)}
          >
            <div className={`bg-white/5 border rounded-xl p-3 text-center cursor-pointer transition-all duration-200 ${active === a.name ? 'border-gcu-purple bg-gcu-purple/10 scale-105' : 'border-white/10 hover:border-gcu-purple/40'}`}>
              <div className="text-2xl mb-1.5">{a.icon}</div>
              <p className="text-white text-sm font-bold leading-tight mb-1">{a.name}</p>
              <p className="text-white/40 text-xs leading-tight">{a.domain}</p>
            </div>
            {active === a.name && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-64 bg-[#1A0A30] border border-gcu-purple/60 rounded-xl p-4 shadow-2xl shadow-gcu-purple/30 pointer-events-none">
                <p className="text-gcu-gold font-black text-sm mb-0.5">{a.name}</p>
                <p className="text-white/40 text-xs mb-2 italic">{a.college}</p>
                <p className="text-white/80 text-xs leading-relaxed">{a.detail}</p>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gcu-purple/60" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <div className="inline-flex items-center gap-2 bg-gcu-gold/10 border border-gcu-gold/30 rounded-full px-4 py-1.5">
          <span className="text-gcu-gold text-xs font-bold">👆 Hover each agent to see what it means for that college</span>
        </div>
      </div>
    </Slide>
  );
}

function SlideDeliveryRoadmap() {
  const phases = [
    {
      icon: '💬',
      title: 'Text-Based Chat',
      sub: 'Current · Live Now',
      status: 'Live',
      statusColor: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500',
      detail: 'Spirit is available today as a full text conversation on any browser or device. All 10 Spirit Agents are live and deployable right now.',
    },
    {
      icon: '🎙️',
      title: 'Voice-Based',
      sub: 'Ready to Launch',
      status: 'Ready',
      statusColor: 'bg-blue-500',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500',
      detail: 'Voice integration is built and tested. Spirit can speak and listen. Launch requires deployment infrastructure approval.',
    },
    {
      icon: '🧑‍💻',
      title: 'Interactive Avatars',
      sub: 'Needs Funding',
      status: 'Funding',
      statusColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500',
      detail: 'Life-size interactive avatar rendering — Spirit as a visible, expressive presence on screen. Requires investment in avatar rendering infrastructure.',
    },
    {
      icon: '📱',
      title: 'iOS / Android App',
      sub: 'Needs Funding',
      status: 'Funding',
      statusColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500',
      detail: 'A dedicated Flourish AI mobile app — Spirit in your pocket. Push notifications, offline mode, and personalized ongoing relationships. Requires mobile development investment.',
    },
    {
      icon: '🖥️',
      title: 'Physical Digital Kiosk',
      sub: 'Needs Funding',
      status: 'Funding',
      statusColor: 'bg-amber-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500',
      detail: 'Life-size touchscreen kiosks in hospital lobbies, school hallways, and church entrances. Spirit as a physical presence — no device required. Requires hardware and deployment investment.',
    },
    {
      icon: '🔌',
      title: 'Flourish API',
      sub: 'Ready to License',
      status: 'Ready',
      statusColor: 'bg-blue-500',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500',
      detail: 'Any hospital, university, or faith-based organization can license the Flourish API and embed Spirit directly into their own patient portal, learning platform, or app — under their own brand, with GCU\'s values built in. GCU becomes the infrastructure the entire industry runs on.',
    },
    {
      icon: '🤖',
      title: 'Physical Robot',
      sub: 'Phase 4 · 2029+',
      status: 'Phase 4',
      statusColor: 'bg-gcu-purple',
      textColor: 'text-purple-400',
      borderColor: 'border-gcu-purple',
      detail: 'Spirit Vessels in physical robotic form — moving through wards, classrooms, and communities. The character of a GCU graduate in a body that can go where people are.',
    },
  ];

  const [active, setActive] = useState<number | null>(null);

  return (
    <Slide>
      <div className="text-center mb-8">
        <Eyebrow>The Delivery Roadmap</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Spirit meets people wherever they are.<br />
          <span className="text-gcu-gold">The form changes. The soul does not.</span>
        </h2>
        <p className="text-white/30 text-xs">Hover each phase to learn more</p>
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/40 via-amber-500/40 to-gcu-purple/40 hidden md:block" />
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {phases.map((p, i) => (
            <div
              key={p.title}
              className="relative flex flex-col items-center text-center cursor-pointer"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Node dot on timeline */}
              <div className={`w-6 h-6 rounded-full ${p.statusColor} border-2 border-white/20 flex items-center justify-center mb-3 z-10 shadow-lg transition-transform duration-200 ${active === i ? 'scale-125' : ''}`}>
                <div className="w-2 h-2 rounded-full bg-white/60" />
              </div>
              <div className={`w-full bg-white/5 border-t-2 ${p.borderColor} border-x border-b border-white/10 rounded-2xl p-3 transition-all duration-200 ${active === i ? 'bg-white/10 scale-105' : ''}`}>
                <div className="text-2xl mb-1.5">{p.icon}</div>
                <p className="text-white font-black text-sm leading-tight mb-1">{p.title}</p>
                <span className={`text-xs font-bold ${p.textColor}`}>{p.sub}</span>
              </div>
              {active === i && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-52 bg-[#1A0A30] border border-white/20 rounded-xl p-3 shadow-2xl pointer-events-none">
                  <p className={`font-black text-sm mb-1 ${p.textColor}`}>{p.title}</p>
                  <p className="text-white/70 text-xs leading-relaxed">{p.detail}</p>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/20" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <span className="flex items-center gap-1.5 text-xs text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Live Now</span>
        <span className="flex items-center gap-1.5 text-xs text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Ready to Launch</span>
        <span className="flex items-center gap-1.5 text-xs text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Needs Funding</span>
        <span className="flex items-center gap-1.5 text-xs text-purple-400"><span className="w-2 h-2 rounded-full bg-gcu-purple inline-block" /> Future Phase</span>
      </div>
    </Slide>
  );
}

function SlideScene({ scene, index }: { scene: typeof SCENES[0]; index: number }) {
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-10rem)] flex items-end">
      {/* Full-bleed image */}
      <img
        src={scene.src}
        alt={scene.label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay — darker at bottom for text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Top-left running title */}
      <div className="absolute top-6 left-8 flex items-center gap-3">
        <span className="text-white/30 text-xs font-bold uppercase tracking-widest">Spirit Everywhere</span>
        <span className="text-white/15 text-xs">·</span>
        <span className="text-gcu-gold text-xs font-bold uppercase tracking-widest">{scene.phase}</span>
        <span className="text-white/15 text-xs">·</span>
        <span className="text-white/30 text-xs">{index + 1} of {SCENES.length}</span>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 px-10 pb-10 max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          {scene.label}
        </h2>
        <p className="text-white/70 text-base sm:text-lg leading-relaxed">
          {scene.scenario}
        </p>
      </div>
    </div>
  );
}

function SlideMarket() {
  const stats = [
    { value: '33,000+', label: 'Christian institutions globally',      sub: 'With no ethical AI framework — until GCU builds it',             Icon: Globe,       color: 'text-blue-400'    },
    { value: '2.6B',    label: 'Christians worldwide',                  sub: 'The largest underserved market for faith-aligned AI',             Icon: Users,       color: 'text-emerald-400' },
    { value: '$0',      label: 'Current ethical AI competition',        sub: 'No institution on earth is doing this. GCU creates the category.', Icon: TrendingUp,  color: 'text-gcu-gold'    },
  ];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Market Opportunity</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
          GCU doesn't enter a market.<br />
          <span className="text-gcu-gold">GCU creates one.</span>
        </h2>
        <p className="text-white/50 text-base max-w-2xl mx-auto">
          Every Christian university, hospital system, and faith-based organization on earth needs an ethical AI framework. None exists. GCU builds it first — and licenses the standard globally.
        </p>
      </div>
      <div className="bg-gcu-purple/15 border border-gcu-purple/40 rounded-2xl px-6 py-4 mb-6 max-w-3xl mx-auto">
        <p className="text-white font-black text-sm mb-1">The Flourish API — GCU Becomes the Infrastructure</p>
        <p className="text-white/60 text-xs leading-relaxed">
          GCU doesn't have to reach 33,000 institutions directly. The Flourish API lets any hospital, university, or faith-based organization license the Spirit Layer and embed it inside their own systems — their patient portal, their learning platform, their app. They deploy Spirit under their own brand. GCU's values are built in. GCU earns the licensing revenue. Think of it as the AWS of faith-based AI: GCU builds the foundation that the entire industry runs on.
        </p>

      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {stats.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <s.Icon size={24} className={`${s.color} mx-auto mb-3`} />
            <p className={`text-5xl font-black ${s.color} mb-2`}>{s.value}</p>
            <p className="text-white font-bold text-sm mb-2">{s.label}</p>
            <p className="text-white/40 text-sm leading-relaxed">{s.sub}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlidePartners() {
  const categories = [
    {
      icon: '🤖',
      label: 'Robotics & Hardware',
      color: 'border-purple-500',
      textColor: 'text-purple-300',
      note: 'Physical Spirit Vessels',
      partners: ['Boston Dynamics', 'Agility Robotics', 'Unitree Robotics', 'NVIDIA Jetson'],
    },
    {
      icon: '🏥',
      label: 'Faith-Based Health Systems',
      color: 'border-red-400',
      textColor: 'text-red-300',
      note: 'Spirit Nurse deployment',
      partners: ['CommonSpirit Health', 'Ascension Health', 'Dignity Health', 'Adventist Health'],
    },
    {
      icon: '🎓',
      label: 'Christian Universities',
      color: 'border-gcu-gold',
      textColor: 'text-gcu-gold',
      note: 'Platform license + Flourish Standard',
      partners: ['Liberty University', 'Baylor University', 'Wheaton College', 'Oral Roberts University'],
    },
    {
      icon: '💻',
      label: 'Technology Infrastructure',
      color: 'border-blue-400',
      textColor: 'text-blue-300',
      note: 'AI & cloud backbone',
      partners: ['Microsoft Azure', 'AWS', 'Epic Systems', 'Canvas LMS'],
    },
    {
      icon: '⛪',
      label: 'Ministry & Mission',
      color: 'border-emerald-400',
      textColor: 'text-emerald-300',
      note: 'Spirit Chaplain deployment',
      partners: ['Focus on the Family', 'Compassion International', 'World Vision', 'Cru'],
    },
  ];

  return (
    <Slide>
      <div className="text-center mb-8">
        <Eyebrow>Potential Partners</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          GCU doesn't build this alone.<br />
          <span className="text-gcu-gold">The ecosystem is ready.</span>
        </h2>
        <p className="text-white/40 text-sm max-w-2xl mx-auto">
          These are the organizations GCU is positioned to partner with across every phase of the roadmap. None of these are confirmed — but all of them need exactly what GCU is building.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        {categories.map(cat => (
          <div key={cat.label} className={`bg-white/5 border-t-2 ${cat.color} border-x border-b border-white/10 rounded-2xl p-4`}>
            <div className="text-2xl mb-2">{cat.icon}</div>
            <p className={`text-xs font-black uppercase tracking-wide mb-0.5 ${cat.textColor}`}>{cat.label}</p>
            <p className="text-white/30 text-xs mb-3 italic">{cat.note}</p>
            <div className="flex flex-col gap-1.5">
              {cat.partners.map(p => (
                <span key={p} className="text-white/70 text-xs bg-white/5 border border-white/10 rounded-lg px-2 py-1 leading-tight">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-white/20 text-xs mt-5">Exploratory · Not confirmed partnerships · For illustration of market positioning</p>
    </Slide>
  );
}

function SlideRevenue() {
  const rows = [
    { year: 'Year 1', period: '2027–2028', amount: '~$3.2M est.',  note: 'Internal GCU savings + 3 external pilots + early Flourish API licensing to partner institutions + grants',                        color: 'text-slate-300'   },
    { year: 'Year 2', period: '2028–2029', amount: '~$14.5M est.', note: '25 partner institutions licensing Spirit directly + enterprise Flourish API (hospitals, universities embedding Spirit in their own systems) + Flourish Standard certification fees',    color: 'text-purple-300'  },
    { year: 'Year 3', period: '2029–2030', amount: '~$52M est.',   note: '100+ certified institutions worldwide + Flourish API at scale + wearables + robotics platform licensing',         color: 'text-gcu-gold'    },
  ];
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>The Business Case</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          A platform that funds GCU's mission<br />
          <span className="text-gcu-gold">for generations.</span>
        </h2>
        <p className="text-white/50 text-base">25% of all revenue reinvested into GCU scholarships and AI ethics research.</p>
      </div>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {rows.map(r => (
          <div key={r.year} className="flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
            <div className="flex-shrink-0 text-center w-20">
              <p className="text-white font-black text-sm">{r.year}</p>
              <p className="text-white/30 text-xs">{r.period}</p>
            </div>
            <div className="flex-1">
              <p className="text-white/50 text-sm leading-relaxed">{r.note}</p>
            </div>
            <p className={`text-3xl font-black flex-shrink-0 ${r.color}`}>{r.amount}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-white/20 text-xs mt-5">
        Potential estimates based on comparable faith-based SaaS and AI platform benchmarks. Actual results will vary.
      </p>
    </Slide>
  );
}

function SlideAsk() {
  return (
    <Slide>
      <div className="text-center mb-10">
        <Eyebrow>What We Need from Leadership</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Four decisions that change<br />
          <span className="text-gcu-gold">GCU's trajectory.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        {ASKS.map(a => (
          <div key={a.number} className={`bg-white/5 border-t-4 ${a.accent} rounded-2xl p-6`}>
            <p className={`text-5xl font-black mb-4 ${a.glow} opacity-30`}>{a.number}</p>
            <h3 className="text-white font-black text-base mb-3 leading-tight">{a.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{a.body}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideLegacy({ onEnter }: { onEnter: () => void }) {
  return (
    <Slide>
      <div className="text-center max-w-3xl mx-auto">
        <Eyebrow>The Legacy</Eyebrow>
        <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
          GCU doesn't just build Spirit Agents.<br />
          <span className="text-gcu-gold">GCU writes the standard<br />the entire industry follows.</span>
        </h2>
        <p className="text-white/50 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
          By 2030, every hospital, university, and faith-based organization deploying AI will ask one question:
        </p>
        <p className="text-2xl font-black text-white mb-10">
          "Is it <span className="text-gcu-gold">Spirit-Certified</span>?"
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gcu-gold text-gcu-purple-dark font-black text-base hover:bg-yellow-400 transition-colors shadow-lg shadow-gcu-gold/20"
          >
            Enter the Demo <ChevronRight size={18} />
          </button>
        </div>
        <p className="text-white/20 text-xs mt-10">GCU Flourish AI · 77 years of character, deployed at scale</p>
      </div>
    </Slide>
  );
}

function SlideProof() {
  const nurseChat = [
    { role: 'user', text: "I have a really bad headache that came on suddenly. My heart is racing and I can't catch my breath. I'm scared." },
    { role: 'spirit', name: 'Spirit Nurse', text: "I hear you, and I'm right here with you. First — is there any chest pain, or does this feel like the worst headache of your life?" },
    { role: 'user', text: "No chest pain. The headache is bad but not the worst ever. I just feel like something is really wrong." },
    { role: 'spirit', name: 'Spirit Nurse', text: "You're doing the right thing by paying attention. Racing heart, trouble breathing, sudden fear — those can be signs of a panic attack. They feel terrifying, but you are not in danger. Put one hand on your chest. Breathe in slowly through your nose for 4 counts. I'll stay right here." },
    { role: 'user', text: "I tried it. My heart is still pounding." },
    { role: 'spirit', name: 'Spirit Nurse', text: "That's okay. It takes a few breaths. In for 4, hold for 4, out for 6. The headache is likely tension from the anxiety. If it gets significantly worse, your vision changes, or you feel numbness in your face or arms — press your call button immediately. Otherwise, keep breathing. I'm not going anywhere." },
  ];
  const chaplainChat = [
    { role: 'user', text: "I've been going to church my whole life. But after everything I've been through... I don't know if I believe anymore. I feel like God wasn't there when I needed him most." },
    { role: 'spirit', name: 'Spirit Chaplain', text: "I'm grateful you said that out loud. That takes courage. When you say God wasn't there — what did you need that didn't come?" },
    { role: 'user', text: "My daughter was sick for a long time. We prayed constantly. The whole church prayed. She didn't make it. I don't understand how a God who loves us could let that happen." },
    { role: 'spirit', name: 'Spirit Chaplain', text: "I won't pretend there's an answer that makes that okay. There isn't one. Your anger and your doubt are not a sign that your faith is broken — they're a sign that you loved her completely. The psalmists cried from exactly where you're standing: \"My God, my God, why have you forsaken me?\" That's not leaving faith. That's the deepest form of it." },
    { role: 'user', text: "I just don't know if I can sit in that building anymore and pretend everything is fine." },
    { role: 'spirit', name: 'Spirit Chaplain', text: "Then don't pretend. Grief doesn't have a dress code. You don't have to have answers to belong. Is there one person at your church — a pastor, an elder, anyone — who knows the full weight of what you've carried?" },
  ];

  function ChatBubble({ msg }: { msg: typeof nurseChat[0] }) {
    const isUser = msg.role === 'user';
    return (
      <div className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <div className="w-6 h-6 rounded-full bg-gcu-purple flex-shrink-0 flex items-center justify-center mt-0.5">
            <span className="text-xs text-white font-black">S</span>
          </div>
        )}
        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${isUser ? 'bg-white/10 text-white/80 rounded-tr-sm' : 'bg-gcu-purple/30 border border-gcu-purple/40 text-white/90 rounded-tl-sm'}`}>
          {!isUser && <p className="text-gcu-gold font-bold text-xs mb-1">{(msg as any).name}</p>}
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <Slide>
      <div className="text-center mb-8">
        <Eyebrow>This Is Real</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Not a concept. Not a demo script.<br />
          <span className="text-gcu-gold">A live platform, working today.</span>
        </h2>
        <p className="text-white/40 text-sm">Two conversations — happening right now, any time of day, for anyone who needs them.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {[
          { label: '🏥 Spirit Nurse', sub: 'Headache + panic attack symptoms, 2 AM', chat: nurseChat },
          { label: '✝️ Spirit Chaplain', sub: 'Grief, doubt, considering leaving the church', chat: chaplainChat },
        ].map(col => (
          <div key={col.label} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="px-4 py-3 border-b border-white/10 bg-white/5">
              <p className="text-white font-black text-sm">{col.label}</p>
              <p className="text-white/40 text-xs mt-0.5">{col.sub}</p>
            </div>
            <div className="flex flex-col gap-2.5 p-4 overflow-y-auto max-h-72">
              {col.chat.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideStewardship() {
  const pillars = [
    {
      icon: '🔍',
      title: 'Pre-Send Confidence Review',
      body: 'Before any response reaches a user, a second AI reviews it for accuracy, tone, and safety — like an editor checking every word before it goes to print. Responses that don\'t meet the standard are rewritten or sent to a human reviewer. The person on the other end never sees a response that hasn\'t cleared that gate.',
      color: 'border-purple-500',
    },
    {
      icon: '🚨',
      title: 'Real-Time Crisis Escalation',
      body: 'Every conversation is scanned in real time for crisis indicators — self-harm, suicidal ideation, acute medical emergency, spiritual crisis. When detected, Spirit immediately shifts into escalation mode: it stays present, keeps the person calm, and simultaneously notifies a human responder or emergency services. Spirit never leaves someone alone in a moment that requires more than AI.',
      color: 'border-red-500',
    },
    {
      icon: '🛑',
      title: 'Tiered Diagnostic Authority',
      body: 'In-hospital deployments connected to internal EHR data and machine vision can support full clinical diagnosis — Spirit sees what the care team sees. For all other deployments, a two-tier model applies: low-acuity findings Spirit can surface independently; high-acuity or complex findings require a verified clinician to review before the response reaches the patient. Scope is not a soft guideline — it is enforced by deployment type at the architecture level.',
      color: 'border-amber-500',
    },
    {
      icon: '📋',
      title: 'Full Audit Trail',
      body: 'Every conversation is logged, timestamped, and stored with a full audit record. GCU faculty supervisors review flagged sessions. Quality, safety, and alignment scores are tracked at the session level. Deploying institutions receive regular stewardship reports. Nothing happens in the dark.',
      color: 'border-blue-500',
    },
    {
      icon: '🎓',
      title: 'Faculty Knowledge Verification',
      body: 'All knowledge entering the Spirit Layer is reviewed and credentialed by GCU faculty before it is deployed. Faculty members sign off on their domain. The Spirit Layer is only as trustworthy as the people who built it — and every source is named, verified, and accountable.',
      color: 'border-emerald-500',
    },
  ];
  return (
    <Slide>
      <div className="text-center mb-8">
        <Eyebrow>Stewardship & Safety</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Spirit never acts alone.<br />
          <span className="text-gcu-gold">Every response is accountable.</span>
        </h2>
        <p className="text-white/40 text-sm max-w-2xl mx-auto">GCU built the safety architecture before the product — because a platform that touches people in their most vulnerable moments must earn its place in the room.</p>
      </div>

      {/* RAG Foundation Banner */}
      <div className="bg-gcu-purple/15 border border-gcu-purple/40 rounded-2xl px-6 py-4 mb-5 flex items-start gap-4">
        <div className="text-2xl flex-shrink-0">📚</div>
        <div>
          <p className="text-gcu-gold font-black text-sm mb-1">Grounded in Official GCU Sources — Not the Open Internet</p>
          <p className="text-white/60 text-sm leading-relaxed">
            When Spirit responds, it does not search the open internet. It searches a locked library of verified GCU content — accredited curriculum, faculty-reviewed clinical protocols, approved course material, and peer-reviewed research. Think of it as a librarian who only has access to GCU's official shelves. If the answer isn't in those shelves, Spirit says so and directs the person to a qualified human. The knowledge is GCU's. The liability boundary is clear.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {pillars.map(p => (
          <div key={p.title} className={`bg-white/5 border-t-2 ${p.color} border-x border-b border-white/10 rounded-2xl p-4`}>
            <div className="text-2xl mb-2">{p.icon}</div>
            <h3 className="text-white font-black text-sm mb-2 leading-tight">{p.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideFlourishStandard() {
  const pillars = [
    {
      icon: '📋',
      color: 'border-gcu-gold',
      title: 'Institutional Governance Agreement',
      body: 'Before a Spirit Agent goes live, the deploying institution signs a formal governance agreement defining who oversees the deployment, how sessions are reviewed, and what escalation procedures are in place. Accountability is documented before the first conversation happens.',
    },
    {
      icon: '⚖️',
      color: 'border-blue-400',
      title: 'Liability Framework',
      body: 'Certification formally shifts primary liability to the deploying institution. GCU retains quality authority — the institution accepts operational responsibility. The documented chain of stewardship protects GCU, the partner, and every person the system serves.',
    },
    {
      icon: '🔐',
      color: 'border-purple-400',
      title: 'Deployment Protocol Compliance',
      body: 'Every deployment must meet GCU\'s technical, ethical, and pastoral standards before going live — verified source libraries, safety layers active, audit logging enabled, crisis escalation tested. The Flourish Standard is not a checkbox. It is a gate.',
    },
    {
      icon: '🎓',
      color: 'border-emerald-400',
      title: 'Annual Re-Certification',
      body: 'Certification is not permanent. Institutions re-certify annually — ensuring governance stays current, Spirit Agents are updated with verified knowledge, and safety systems remain active. Re-certification generates recurring revenue and keeps GCU in an ongoing stewardship relationship with every partner.',
    },
  ];

  return (
    <Slide>
      <div className="text-center mb-6">
        <Eyebrow>The Flourish Standard</Eyebrow>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
          Spirit is a platform organizations deploy.<br />
          <span className="text-gcu-gold">GCU sets the terms.</span>
        </h2>
        <p className="text-white/40 text-sm max-w-2xl mx-auto">
          Hospitals, school districts, churches, and universities license Spirit Agents and deploy them inside their own systems. GCU does not operate every deployment — but GCU governs every one. The Flourish Standard is how.
        </p>
      </div>

      {/* Who deploys Spirit */}
      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {['🏥 Hospital Systems', '🏫 School Districts', '⛪ Churches & Ministries', '🎓 Universities', '🏢 Faith-Based Organizations'].map(org => (
          <span key={org} className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white/70 text-xs font-bold">{org}</span>
        ))}
      </div>

      {/* Two deployment paths */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-purple-600/15 border border-purple-500/40 rounded-2xl px-5 py-4 flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">🔌</div>
          <div>
            <p className="text-purple-300 font-black text-sm mb-1">Flourish API Integration</p>
            <p className="text-white/70 text-sm leading-relaxed">
              For institutions that want to embed Spirit directly into their own systems. A hospital adds Spirit Nurse to its patient portal. A school district plugs Spirit Teacher into its learning management system. The institution owns the experience — GCU powers it behind the scenes.
            </p>
          </div>
        </div>
        <div className="bg-gcu-gold/10 border border-gcu-gold/30 rounded-2xl px-5 py-4 flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">📱</div>
          <div>
            <p className="text-gcu-gold font-black text-sm mb-1">Platform License</p>
            <p className="text-white/70 text-sm leading-relaxed">
              For institutions that want to deploy Spirit without custom development. Staff and students access Spirit through the Flourish platform directly — branded, configured, and certified for their organization. Ready to launch without an IT team.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        {pillars.map(p => (
          <div key={p.title} className={`bg-white/5 border-t-2 ${p.color} border-x border-b border-white/10 rounded-2xl p-5`}>
            <div className="text-2xl mb-2">{p.icon}</div>
            <h3 className="text-white font-black text-sm mb-2 leading-tight">{p.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gcu-gold/10 border border-gcu-gold/30 rounded-2xl p-4 text-center">
          <p className="text-gcu-gold font-black text-sm mb-1">What institutions get</p>
          <p className="text-white/60 text-sm">The authority to deploy Spirit Agents — and the credibility of GCU's ethical framework behind every interaction.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
          <p className="text-white font-black text-sm mb-1">What GCU earns</p>
          <p className="text-white/60 text-sm">Certification fees, annual re-certification revenue, and a growing network of institutions operating under GCU's ethical authority.</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 text-center">
          <p className="text-purple-300 font-black text-sm mb-1">The market position</p>
          <p className="text-white/60 text-sm">No ethical AI certification standard exists for faith-based institutions. GCU creates it first — and owns the category.</p>
        </div>
      </div>
    </Slide>
  );
}

function SlidePlatformOverview() {
  const [active, setActive] = useState<number | null>(null);

  const annotations = [
    {
      x: '10%', y: '52%',
      side: 'right' as const,
      dot: 'bg-gcu-purple',
      label: 'One Platform. Everything in One Place.',
      detail: '10 Spirit Agents · tools to deploy them to hospitals and schools · a robotics roadmap · an ethics certification program · an executive briefing — all built, all accessible, all running today.',
    },
    {
      x: '37%', y: '26%',
      side: 'right' as const,
      dot: 'bg-emerald-400',
      label: '34K+ Simulated Interactions · 94% Ethical Alignment',
      detail: 'Demo platform metrics — every simulated interaction is tracked and scored for ethical alignment. These are demonstration figures showing how the scoring and monitoring system works in production.',
    },
    {
      x: '23%', y: '40%',
      side: 'right' as const,
      dot: 'bg-gcu-gold',
      label: '10 Million Simulated Interactions',
      detail: 'The platform has processed 10 million demo interactions across all 10 Spirit Agents — demonstrating the infrastructure, scoring system, and scale capacity. These are simulated figures. Real deployment data begins with the first external pilot.',
    },
    {
      x: '62%', y: '73%',
      side: 'left' as const,
      dot: 'bg-purple-400',
      label: 'Phase 2 Already Designed',
      detail: 'Spirit Vessels get bodies — kiosks, wearables, robotics. Phase 2 is designed and roadmapped. The platform is built to scale into physical form.',
    },
    {
      x: '50%', y: '90%',
      side: 'left' as const,
      dot: 'bg-blue-400',
      label: 'All 10 College Spirit Agents — Live',
      detail: 'Every GCU college has a Spirit Agent. Each is a live prototype deployable today — Spirit Nurse, Spirit Teacher, Spirit Chaplain, and seven more. One for every domain GCU has mastered.',
    },
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-8 py-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-5">
          <Eyebrow>The Platform · Live Today</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            This is the real platform.<br />
            <span className="text-gcu-gold">Built by one person. Running now.</span>
          </h2>
          <p className="text-white/30 text-xs mt-2">Hover the markers to explore</p>
        </div>
        <div className="relative w-full">
          <img
            src="/scenes/platform-overview.png"
            alt="GCU Flourish AI Platform"
            className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          />
          {annotations.map((a, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: a.x, top: a.y, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Pulsing dot */}
              <div className="relative cursor-pointer">
                <div className={`absolute inset-0 rounded-full ${a.dot} opacity-40 animate-ping`} style={{ animationDuration: '2s' }} />
                <div className={`relative w-4 h-4 rounded-full ${a.dot} border-2 border-white/60 shadow-lg`} />
              </div>
              {/* Tooltip */}
              {active === i && (
                <div className={`absolute z-30 w-56 bg-[#0F0A1E]/95 border border-white/20 rounded-xl p-3 shadow-2xl pointer-events-none ${
                  a.side === 'left'
                    ? 'right-6 top-0'
                    : 'left-6 top-0'
                }`}>
                  <p className="text-white font-black text-sm mb-1.5">{a.label}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{a.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideLibraryOverview() {
  const [active, setActive] = useState<number | null>(null);

  const annotations: { x: string; y: string; side: 'left' | 'right'; dot: string; label: string; detail: string }[] = [
    {
      x: '18%', y: '9%',
      side: 'right' as const,
      dot: 'bg-gcu-gold',
      label: '20 Spirit Vessels — All 10 Colleges',
      detail: 'Every GCU college has at least one Spirit Vessel designed and prototyped in the demo library. This shows the full scope of what has been built — the entire university represented in a single platform.',
    },
    {
      x: '27%', y: '15%',
      side: 'right' as const,
      dot: 'bg-blue-400',
      label: '💬 Coaching Mode',
      detail: 'Spirit works with a person one-on-one over time — a student who needs ongoing tutoring, a business founder getting weekly accountability, a patient managing a long-term condition. Not a single conversation. An ongoing relationship that grows with the person.',
    },
    {
      x: '36%', y: '15%',
      side: 'right' as const,
      dot: 'bg-emerald-400',
      label: '🎮 Simulation Mode',
      detail: 'Spirit plays a challenging character — a difficult patient, a grieving family member, a student in crisis — so that a nurse, teacher, or chaplain in training can practice their skills in a safe, realistic environment. Spirit then breaks character and delivers structured feedback. Training without real-world risk.',
    },
    {
      x: '22%', y: '26%',
      side: 'right' as const,
      dot: 'bg-purple-400',
      label: 'Pilot-Ready Vessels',
      detail: 'Spirit Nurse and Spirit Advisor carry a "Pilot" badge in the demo — indicating they are the most developed vessels and are ready for real external pilot deployments. These are demo designations showing deployment readiness, not active external contracts.',
    },
    {
      x: '22%', y: '42%',
      side: 'right' as const,
      dot: 'bg-gcu-gold',
      label: 'Spirit Infusion — Character, Not Just Knowledge',
      detail: 'Every Spirit Vessel carries GCU\'s values baked in — Compassion, Servant Leadership, Biblical Wisdom, Creation Care. This is what separates Spirit from any other AI: it doesn\'t just know the field, it has the character of someone who chose that field for the right reasons.',
    },
    {
      x: '28%', y: '48%',
      side: 'right' as const,
      dot: 'bg-emerald-400',
      label: '97% Ethical Alignment Score',
      detail: 'Every Spirit Vessel is automatically scored for ethical alignment. The scores shown — Spirit Nurse at 97%, Spirit Chaplain at 98% — are demo figures from simulated interactions used to build and test the scoring system. Real deployment scores will be generated from live interactions once pilots launch.',
    },
  ];

  return (
    <div className="min-h-full flex flex-col items-center justify-center px-8 py-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-5">
          <Eyebrow>The Spirit Vessel Library</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            20 vessels. 10 colleges. Two modes.<br />
            <span className="text-gcu-gold">Deployment. And training.</span>
          </h2>
          <p className="text-white/30 text-xs mt-2">Hover the markers to explore</p>
        </div>
        <div className="relative w-full">
          <img
            src="/scenes/prototype-library.png"
            alt="GCU Spirit Vessel Library"
            className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          />
          {annotations.map((a, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: a.x, top: a.y, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="relative cursor-pointer">
                <div className={`absolute inset-0 rounded-full ${a.dot} opacity-40 animate-ping`} style={{ animationDuration: '2s' }} />
                <div className={`relative w-4 h-4 rounded-full ${a.dot} border-2 border-white/60 shadow-lg`} />
              </div>
              {active === i && (
                <div className={`absolute z-30 w-60 bg-[#0F0A1E]/95 border border-white/20 rounded-xl p-3 shadow-2xl pointer-events-none ${
                  a.side === 'left' ? 'right-6 top-0' : 'left-6 top-0'
                }`}>
                  <p className="text-white font-black text-sm mb-1.5">{a.label}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{a.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide router ──────────────────────────────────────────────────────────────

function SlideContent({ index, onEnter }: { index: number; onEnter: () => void }) {
  // Scenes occupy indices 6–10
  if (index >= 6 && index <= 10) {
    return <SlideScene scene={SCENES[index - 6]} index={index - 6} />;
  }
  switch (index) {
    case 0:  return <SlideHero />;
    case 1:  return <SlideVideo />;
    case 2:  return <SlideProblem />;
    case 3:  return <SlideWeAreGCU />;
    case 4:  return <SlidePlatform />;
    case 5:  return <SlideDeliveryRoadmap />;
    case 11: return <SlideProof />;
    case 12: return <SlidePlatformOverview />;
    case 13: return <SlideLibraryOverview />;
    case 14: return <SlideStewardship />;
    case 15: return <SlideFlourishStandard />;
    case 16: return <SlideMarket />;
    case 17: return <SlidePartners />;
    case 18: return <SlideRevenue />;
    case 19: return <SlideAsk />;
    case 20: return <SlideLegacy onEnter={onEnter} />;
    default: return null;
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ExecutiveTour() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);

  const goNext = useCallback(() => setSlide(s => Math.min(s + 1, TOTAL_SLIDES - 1)), []);
  const goPrev = useCallback(() => setSlide(s => Math.max(s - 1, 0)), []);
  const enterPlatform = useCallback(() => navigate('/login'), [navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                    goPrev();
      if (e.key === 'Escape')                                                enterPlatform();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, enterPlatform]);

  const isLast  = slide === TOTAL_SLIDES - 1;
  const isScene = slide >= 6 && slide <= 10;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: 'linear-gradient(135deg, #080414 0%, #100820 100%)' }}>
      {/* Subtle gold wave */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,900 Q360,200 720,500 Q1080,800 1440,200 L1440,900 Z" fill="#FFC627" />
        </svg>
      </div>

      {/* Header — transparent on scene slides */}
      <div className={`relative z-10 flex items-center justify-between px-8 py-5 flex-shrink-0 transition-all duration-500 ${isScene ? '' : 'border-b border-white/5'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gcu-gold flex items-center justify-center">
            <span className="font-black text-gcu-purple-dark text-sm">GCU</span>
          </div>
          <span className="text-white/35 text-sm font-medium">Flourish AI &nbsp;·&nbsp; Executive Tour</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-white/20 text-sm tabular-nums">{slide + 1} / {TOTAL_SLIDES}</span>
          <button
            onClick={enterPlatform}
            className="text-white/25 hover:text-white/60 transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            Exit <X size={13} />
          </button>
        </div>
      </div>

      {/* Slide (key forces fade-in on change) */}
      <div key={slide} className="relative z-10 flex-1 overflow-y-auto animate-fade-in">
        <SlideContent index={slide} onEnter={enterPlatform} />
      </div>

      {/* Footer — transparent on scene slides */}
      <div className={`relative z-10 flex items-center justify-between px-8 py-5 flex-shrink-0 transition-all duration-500 ${isScene ? '' : 'border-t border-white/5'}`}>
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === slide   ? 'w-6 h-2 bg-gcu-gold' :
                i < slide     ? 'w-2 h-2 bg-white/30' :
                                'w-2 h-2 bg-white/10 hover:bg-white/25'
              }`}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={slide === 0}
            className="p-2 rounded-xl border border-white/15 text-white/50 hover:text-white hover:border-white/30 disabled:opacity-20 transition-all"
          >
            <ArrowLeft size={15} />
          </button>
          {isLast ? (
            <button
              onClick={enterPlatform}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gcu-gold text-gcu-purple-dark font-black text-sm hover:bg-yellow-400 transition-colors"
            >
              Enter the Platform <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gcu-purple text-white font-bold text-sm hover:bg-gcu-purple/80 transition-colors"
            >
              Next <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
