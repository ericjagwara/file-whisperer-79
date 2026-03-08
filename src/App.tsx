import { useState, useEffect, useRef } from "react";
import { ExternalLink, Quote, Menu, X } from "lucide-react";


// Color constants
const C = {
  bg: "#07090e",
  card: "#12151e",
  cardHover: "#181c28",
  accent: "#c8973e",
  accentDim: "#a67c2e",
  teal: "#5a9e94",
  blue: "#5b82b5",
  purple: "#8a7cb8",
  text: "#c8ccd4",
  muted: "#6e7585",
  bright: "#eaedf2",
  border: "#1e222e",
  borderLight: "#2a2f3d",
};

const PAGES = ["Home", "Experience", "Research", "Community", "Open Source", "Blog", "Events"];

// Intersection Observer hook for fade-in animations
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

// FadeIn animation component
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Tag component
interface TagProps {
  children: React.ReactNode;
  color?: string;
}

function Tag({ children, color = C.accent }: TagProps) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
      style={{
        background: `${color}18`,
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {children}
    </span>
  );
}

// External Link component
interface ELProps {
  href: string;
  children: React.ReactNode;
}

function EL({ href, children }: ELProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-sm border-b transition-colors hover:opacity-80"
      style={{ color: C.accent, borderColor: `${C.accent}35` }}
    >
      {children} <ExternalLink className="w-3 h-3" />
    </a>
  );
}

// Internal Link component for cross-page navigation
interface ILProps {
  page: string;
  setPage: (page: string) => void;
  children: React.ReactNode;
}

function IL({ page, setPage, children }: ILProps) {
  return (
    <button
      onClick={() => {
        setPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="inline-flex items-center gap-1 font-semibold text-sm border-b transition-colors hover:opacity-80"
      style={{ color: C.accent, borderColor: `${C.accent}35` }}
    >
      {children}
    </button>
  );
}

// Card component with hover effect
interface CdProps {
  children: React.ReactNode;
  className?: string;
}

function Cd({ children, className = "" }: CdProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-xl p-6 transition-all duration-200 ${className}`}
      style={{
        background: isHovered ? C.cardHover : C.card,
        border: `1px solid ${isHovered ? C.borderLight : C.border}`,
      }}
    >
      {children}
    </div>
  );
}

// Section Header component
interface SHProps {
  title: string;
  sub?: string;
}

function SH({ title, sub }: SHProps) {
  return (
    <FadeIn className="mb-11">
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-normal"
        style={{ fontFamily: "'Instrument Serif',serif", color: C.bright, lineHeight: 1.15 }}
      >
        {title}
      </h2>
      {sub && (
        <p className="text-sm mt-2.5 max-w-xl" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
          {sub}
        </p>
      )}
      <div className="w-12 h-0.5 mt-4 rounded-sm" style={{ background: C.accent, opacity: 0.6 }} />
    </FadeIn>
  );
}

// Background Pattern Component
function BackgroundPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(${C.accent} 1px, transparent 1px),
            linear-gradient(90deg, ${C.accent} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${C.accent}08 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 80%, ${C.teal}05 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 50%, ${C.blue}03 0%, transparent 70%)`,
        }}
      />
      {/* Floating orbs */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background: `radial-gradient(circle, ${C.accent}40 0%, transparent 70%)`,
          top: "10%",
          left: "-10%",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-8"
        style={{
          background: `radial-gradient(circle, ${C.teal}40 0%, transparent 70%)`,
          top: "60%",
          right: "-5%",
          animation: "float 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-8"
        style={{
          background: `radial-gradient(circle, ${C.purple}40 0%, transparent 70%)`,
          bottom: "20%",
          left: "30%",
          animation: "float 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// Navigation Component
interface NavProps {
  page: string;
  setPage: (page: string) => void;
}

function Nav({ page, setPage }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "rgba(7,9,14,0.94)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? `1px solid ${C.border}` : "none",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
        <div
          onClick={() => {
            setPage("Home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cursor-pointer flex items-baseline gap-2 flex-shrink-0"
        >
          <span className="text-2xl font-bold" style={{ fontFamily: "'Instrument Serif',serif", color: C.accent }}>
            EJ
          </span>
          <span className="text-xs tracking-widest font-medium" style={{ color: C.bright, opacity: 0.75, fontFamily: "'Space Mono',monospace" }}>
            JAGWARA
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1 items-center">
          {PAGES.map((p) => (
            <button
              key={p}
              onClick={() => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-200"
              style={{
                background: "transparent",
                border: "1px solid transparent",
                borderBottom: page === p ? `1px solid ${C.accent}` : "1px solid transparent",
                color: page === p ? C.accent : C.muted,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ color: C.muted }}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{ background: isScrolled ? "rgba(7,9,14,0.94)" : "rgba(7,9,14,0.98)" }}
        >
          <div className="flex flex-col gap-1">
            {PAGES.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPage(p);
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-4 py-3 rounded-md text-sm font-medium text-left transition-all duration-200"
                style={{
                  background: "transparent",
                  border: "1px solid transparent",
                  borderBottom: page === p ? `1px solid ${C.accent}` : "1px solid transparent",
                  color: page === p ? C.accent : C.muted,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// About Section (Who is Eric Jagwara?)
function AboutSection() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Intro */}
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl mb-4"
                style={{ fontFamily: "'Instrument Serif',serif", color: C.bright }}
              >
                Who is <span style={{ color: C.accent }}>Eric Jagwara?</span>
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric Jagwara's path into technology began through engineering and hands-on experimentation.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Originally trained in civil engineering, he had developed a strong foundation in technical design and systems thinking. But while providing support at Intellisys, a friend's startup in Uganda, he was introduced to embedded systems engineering and began working on integrating artificial intelligence into IoT systems. What started as simple technical support quickly evolved into a deeper commitment to building intelligent technologies.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                After several years of hands-on work with embedded systems and hardware development, Eric explored various short courses until he eventually chose to go deeper with Bachelor of Science in Artificial Intelligence and Machine Learning at ISBAT University and from which onwards built on to further studies in tech and data. His engineering background continues to shape how he approaches complex problems, combining structural thinking with practical innovation.
              </p>
            </div>
            <FadeIn delay={0.1}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Who_is_Eric_Jagwara.jpg"
                  alt="Eric Jagwara"
                  className="w-full h-auto object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        {/* Three Subsections */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Technology, Research and Trainings */}
          <FadeIn delay={0.15}>
            <Cd className="h-full">
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Technology_and_Research.jpg"
                  alt="Technology, Research and Trainings"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
              >
                Technology, Research and Trainings
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric operates at the forefront of technology, blending embedded systems, IoT, machine learning, cybersecurity, and intelligent software. His work combines technical precision, creativity, and practical insight, producing solutions that are innovative, reliable, and designed to make a real difference.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                He has contributed to cutting-edge research, mentorship programs, and data-driven initiatives, collaborating with global communities to advance AI and intelligent systems. Eric's approach emphasizes interdisciplinary thinking, bringing together engineering, AI, and design to build technology that works, inspires, and scales.
              </p>
            </Cd>
          </FadeIn>

          {/* Startups and Ecosystem */}
          <FadeIn delay={0.25}>
            <Cd className="h-full">
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Startups_and_Ecosystem.jpg"
                  alt="Startups and Ecosystem"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
              >
                Startups and Ecosystem
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric builds ventures and strengthens the environment that allows others to succeed. As founder of <strong>Solid Elf Security</strong> and <strong>Data Research Lab</strong>, among many other ventures, he has tackled diverse technological challenges, from cybersecurity to data-driven research, but his influence extends far beyond his own projects.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Through collaboration with TechBuzz Hub and initiatives like Startup Funding Vehicles, he supports early-stage founders in turning ideas into products, securing funding, and scaling with confidence. He also speaks at high-profile events, inspiring innovators to push the boundaries of what is possible. By combining entrepreneurial experience with ecosystem leadership, Eric shapes Uganda's innovation landscape and helps position African startups to compete and thrive globally.
              </p>
            </Cd>
          </FadeIn>

          {/* Community and Leadership */}
          <FadeIn delay={0.35}>
            <Cd className="h-full">
              <div
                className="rounded-xl overflow-hidden mb-5"
                style={{ border: `1px solid ${C.border}` }}
              >
                <img
                  src="/images/Community_and_Leadership.jpg"
                  alt="Community and Leadership"
                  className="w-full h-44 object-cover"
                />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}
              >
                Community and Leadership
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                Eric is a driving force in Africa's technology ecosystem, building networks, mentoring talent, and creating opportunities that matter. As Zindi's Country Ambassador for Uganda, he connects local data scientists to a community of over 100,000 practitioners, linking them to competitions, mentorship, and real-world AI projects.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                He leads the Young AI Leaders Kampala Hub under the AI for Good initiative, supporting innovators in applying technology for social impact. Beyond these roles, he contributes to Africa's most prominent AI and data science networks, including Deep Learning Indaba, IndabaX Uganda, Data Science Africa, DS-I Africa, the Data Science Network, CoARA, and Tonative, fostering collaboration, ethical innovation, and growth across the continent.
              </p>
            </Cd>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// Hero Section
function HeroSection() {
  const stats = [
    ["5+", "Years", "AI & ML experience"],
    ["10+", "Years", "App Development & Design"],
    ["4+", "Active", "Research Contribution"],
  ];
  const socials = [
    { l: "LinkedIn", h: "https://linkedin.com/in/ericjagwara" },
    { l: "GitHub", h: "https://github.com/ericjagwara" },
    { l: "Zindi", h: "https://zindi.africa/users/Jagwara" },
    { l: "ORCID", h: "https://orcid.org/0009-0003-4935-3667" },
    { l: "Medium", h: "https://medium.com/@ericjagwara_65224" },
    { l: "Credly", h: "https://www.credly.com/users/eric-jagwara" },
  ];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden px-6 pt-28 pb-20">
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex flex-wrap gap-2 mb-6">
            <Tag color={C.purple}>Security</Tag>
            <Tag>AI & Embedded Systems</Tag>
            <Tag color={C.teal}>Visual & Motion Design</Tag>
            <Tag color={C.blue}>Community & Research</Tag>
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2"
            style={{ fontFamily: "'Instrument Serif',serif", lineHeight: 1.05, color: C.bright }}
          >
            Jagwara Eric <span style={{ color: C.accent }}>Ofuono</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.18}>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mb-9 leading-relaxed"
            style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}
          >
            Multidisciplinary Researcher, AI and Embedded Systems engineer, Visual and motion designer and community builder who enjoys building technology with people and for people by combining code, design, and local context. Beyond tech, I love creating in many forms, from visual design to paintings and crafts.
          </p>
        </FadeIn>
        <FadeIn delay={0.24}>
          <div className="flex flex-wrap gap-2.5 mb-12">
            {socials.map((sl, i) => (
              <a
                key={i}
                href={sl.h}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80"
                style={{ border: `1px solid ${C.border}`, color: C.text, background: "rgba(255,255,255,.02)" }}
              >
                {sl.l}
              </a>
            ))}
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {stats.map(([n, l, s], i) => (
            <FadeIn key={i} delay={0.28 + i * 0.05}>
              <Cd className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ fontFamily: "'Instrument Serif',serif", color: C.accent }}
                >
                  {n}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {l}
                </div>
                <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                  {s}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection({ setPage }: { setPage: (page: string) => void }) {
  const testimonials = [
    {
      q: "Eric was not just a contributor but a driving force in realising our company's vision for AI and IoT. His unique ability to operate at the intersection of hardware and software was a particular strength. I recommend him without the slightest reservation for any advanced professional or technical opportunity.",
      n: "Paul Soddo",
      t: "Founder",
      o: "IntelliSys Uganda",
      l: "https://www.linkedin.com/in/soddo-paul/",
    },
    {
      q: "Eric served as a Zindi Community Ambassador before rising to become Uganda's Country Ambassador, a role that reflects the trust and impact he has built within the community. He has participated in over 80 competitions and has ranked among the top worldwide, holding first place on Uganda's leaderboard for three years. I confidently recommend Eric as a talented data scientist and community leader.",
      n: "Paul Kennedy",
      t: "Chief of Staff",
      o: "Zindi Africa",
      l: "https://zindi.africa",
    },
    {
      q: "I've collaborated with Eric on numerous projects, particularly in AI-related endeavors. His adept management skills consistently elevate our project outcomes, showcasing his ability to effectively coordinate teams and resources.",
      n: "Soddo Paul",
      t: "Founder, IntelliSys Uganda",
      o: "IntelliSys Uganda",
    },
    {
      q: "Throughout our time together, I've often marveled at how Eric Jagwara adeptly balances the dynamic world of technology with the traditional realm of civil engineering. Eric's ability to integrate these two fields sets him apart and undoubtedly contributes to his success in both domains. He is indeed a valuable addition to any team.",
      n: "Peter Kakobya",
      t: "Civil/Structural Engineer & iOS Developer",
      o: "LinkedIn",
    },
    {
      q: "Throughout our professional and personal relationship, I've had the privilege of witnessing Eric's expertise in various technical domains. I've been particularly impressed by his proficiency not only in data analysis but also in robotics, IoTs, and web development. Eric's seamless navigation across these diverse areas highlights his versatility and mastery in the evolving tech landscape.",
      n: "Jonathan Kewaza",
      t: "Civil/Structural Engineer",
      o: "Hamit Structures Ltd",
      l: "https://www.linkedin.com/in/jonathan-kewaza/",
    },
    {
      q: "Eric has consistently demonstrated a high level of technical expertise, problem-solving abilities, and a commitment to excellence in repairs and maintenance while at Ndejje. His knowledge of tech repairs and maintenance is exceptional, and he has played a key role in the university. I highly recommend him for any related positions.",
      n: "Gora Watson Simon",
      t: "Project Engineer & National Technical Lead",
      o: "WASH | Infrastructure | GIS | DRR",
      l: "https://www.linkedin.com/in/gora-watson-simon/",
    },
  ];

  return (
    <section className="py-16 px-6" style={{ background: `${C.card}80` }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-9">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "'Instrument Serif',serif", color: C.bright }}
          >
            What People Say
          </h2>
          <div className="w-12 h-0.5 mt-3.5 rounded-sm" style={{ background: C.accent, opacity: 0.6 }} />
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <Cd className="h-full relative flex flex-col">
                <Quote
                  className="absolute top-4 left-4 w-10 h-10 opacity-15"
                  style={{ color: C.accent }}
                />
                <p
                  className="text-xs leading-relaxed mt-12 mb-auto italic"
                  style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}
                >
                  {t.q}
                </p>
                <div className="border-t pt-3.5 mt-4" style={{ borderColor: C.border }}>
                  <div className="font-bold text-sm" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                    {t.l ? (
                      <a href={t.l} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: C.bright }}>
                        {t.n}
                      </a>
                    ) : (
                      t.n
                    )}
                  </div>
                  <div className="text-xs mt-1" style={{ color: C.accent, fontFamily: "'Inter',sans-serif" }}>
                    {t.t} · {t.o}
                  </div>
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div className="mt-7 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              More on <EL href="https://linkedin.com/in/ericjagwara">LinkedIn</EL> · Explore my <IL page="Experience" setPage={setPage}>Experience</IL> · View my <IL page="Research" setPage={setPage}>Research</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Experience Page
interface ExperiencePageProps {
  setPage: (page: string) => void;
}

function ExperiencePage({ setPage }: ExperiencePageProps) {
  const jobs = [
    {
      title: "Qualitative Analyst & Transcriber",
      type: "Volunteer",
      org: "Cashin Project, Roskilde Universitet",
      link: "https://ruc.dk/en",
      period: "Jun 2025 – Nov 2025",
      items: ["Transcription and translation from local languages", "Structured codebooks in MAXQDA", "Data cleaning and academic report drafting"],
    },
    {
      title: "Technology Transfer & Research Assistant",
      type: "Part Time",
      org: "Techbuzz Hub, Kampala",
      link: "https://techbuzzhub.org",
      period: "Aug 2023 – Jun 2025",
      items: ["AI/data analytics training for startups", "IoT and automation prototyping", "Grant proposals and mentorship"],
    },
    {
      title: "AI Engineer",
      type: "Contract",
      org: "Athari, New York, USA",
      link: null,
      period: "May 2024 – Jan 2025",
      items: ["ML prototypes for social impact", "Predictive models and data pipelines", "Ethical AI and model monitoring"],
    },
    {
      title: "Machine Learning Trainer",
      type: "Part Time",
      org: "Tufuna Technologies Cyber Camp",
      link: null,
      period: "Aug 2023 – Feb 2025",
      items: ["ML and data analytics curriculum", "Taught Python, R, SQL, Tableau, Power BI", "Mentored real-world ML projects"],
    },
    {
      title: "AIoT Developer",
      type: "Apprentice",
      org: "IntelliSys Uganda Ltd",
      link: "https://www.intellisysug.com",
      period: "Jun 2021 – Dec 2024",
      items: ["AI-guided assistive technology devices", "Agricultural IoT sensor systems", "Arduino & Raspberry Pi prototyping", "UI/UX with Figma, Adobe XD, Sketch"],
    },
  ];

  const freelance = [
    {
      title: "Web Designer & Developer",
      period: "2016 – Present",
      desc: "Building custom websites and web applications primarily with WordPress, JavaScript, Python, and Ruby. Delivering responsive, accessible, and performant digital experiences for organisations across East Africa and beyond.",
      sites: [
        { n: "NiaCare", u: "https://www.niacare.org" },
        { n: "Cosy Structures", u: "https://cosystructures.com" },
        { n: "Al-Umm", u: "https://al-umm.org" },
        { n: "CATREG", u: "https://catreug.org" },
        { n: "Talent for Wealth", u: "https://talentforwealth.com" },
        { n: "Fencherr", u: "https://fencherr.com" },
      ],
      tags: ["WordPress", "JavaScript", "Python", "Ruby", "PHP"],
    },
    {
      title: "Graphics Design, UI/UX & Animation",
      period: "2016 – Present",
      desc: "Visual design, branding, interface prototyping, architectural visualisation, and motion graphics for clients across multiple industries.",
      sites: null,
      tags: ["Adobe Creative Suite", "Figma", "3ds Max", "Harmony", "Revit", "Modo", "CAD"],
    },
    {
      title: "Research & Innovation Consultant",
      period: "2022 – Present",
      desc: "Independent consulting across data science, artificial intelligence, and civil engineering domains. Research design, data analysis, technical writing, and feasibility studies for academic and industry clients. Civil engineering consultancy including structural design, architectural planning, and project documentation.",
      sites: null,
      tags: ["Data Science", "AI Research", "Civil Engineering", "Structural Design", "Technical Writing", "Feasibility Studies"],
    },
    {
      title: "Cybersecurity Engineer",
      period: "2018 – Present",
      desc: "Freelance cybersecurity services including penetration testing, security auditing, compliance consulting (GDPR, ISO 27001), incident response, and malware removal for small-to-medium organisations.",
      sites: null,
      tags: ["Penetration Testing", "Security Auditing", "GDPR", "ISO 27001", "Incident Response", "Malware Removal"],
    },
  ];

  const edu = [
    ["MPH Epidemiology & Biostatistics", "ISBAT University", "Enrolled"],
    ["BSc AI & ML (2nd Class Upper)", "ISBAT University", "2025"],
    ["BEng. Civil Engineering", "Ndejje University", ""],
  ];

  const skills = [
    ["Programming", "Python, R, C, SQL, JS, PHP, Ruby"],
    ["Data Science", "STATA, NVIVO, MAXQDA, Tableau, Power BI"],
    ["IoT", "Arduino, Raspberry Pi, AIoT"],
    ["Design", "Figma, Adobe Suite, 3ds Max, Revit, Modo"],
    ["Security", "Pen Testing, GDPR, ISO 27001"],
    ["Civil Eng", "Structural Design, CAD, Project Mgmt"],
  ];

  const certs = ["IBM AI Fundamentals", "IBM Applied Data Science", "Microsoft Responsible AI Coach", "DSN AI & ML", "Zaka AI Boot Camp", "Data.org Climate & Health"];

  const compTabs: Record<string, { n: string; r: number; f: number; s?: boolean }[]> = {
    "Top 10": [
      { n: "Grocery Store Forecasting (Azubian)", r: 1, f: 1, s: true },
      { n: "Yassir ETA Prediction (Azubian)", r: 2, f: 4, s: true },
      { n: "Movie Review Sentiment Classification", r: 2, f: 3, s: true },
      { n: "AI Challenge – Beginner", r: 4, f: 16, s: true },
      { n: "AI Challenge – Advanced", r: 5, f: 9, s: true },
      { n: "IndabaX-Togo Fraud Detection", r: 6, f: 9, s: true },
      { n: "Income Prediction (Azubian)", r: 8, f: 13, s: true },
      { n: "Customer Churn (Azubian)", r: 8, f: 10, s: true },
      { n: "Microsoft x DSN Expresso Churn", r: 8, f: 56, s: true },
    ],
    NLP: [
      { n: "Caribbean Voices AI Hackathon", r: 16, f: 28 },
      { n: "GeoAI Location Mention Recognition", r: 18, f: 28 },
      { n: "Swahili News Classification", r: 27, f: 113 },
      { n: "Tanzania ASR Challenge", r: 29, f: 34 },
      { n: "Lelapa LLM Compression", r: 43, f: 118 },
    ],
    CV: [
      { n: "Air Pollution Susceptibility (Milan)", r: 14, f: 35 },
      { n: "Bill Classification (Tunisia)", r: 15, f: 36 },
      { n: "License Plate Recognition", r: 16, f: 90 },
      { n: "Landslide Susceptibility (Alps)", r: 17, f: 20 },
    ],
    Forecast: [
      { n: "Olympic 2024 Medal Prediction", r: 16, f: 30 },
      { n: "Forest Cover", r: 16, f: 16 },
      { n: "QoS Prediction", r: 23, f: 129 },
    ],
    Geo: [
      { n: "Soil Params Hyperspectral", r: 25, f: 62 },
      { n: "SA COVID-19 Vulnerability", r: 41, f: 83 },
      { n: "Agricultural Plastic Cover", r: 54, f: 78 },
    ],
  };

  const [compTab, setCompTab] = useState("Top 10");

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SH title="Experience & Education" sub="Employment, freelance, education, and competitive machine learning" />

        <div className="grid lg:grid-cols-2 gap-9">
          {/* Employment */}
          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-5"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Employment
            </h3>
            {jobs.map((j, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="relative pl-6 mb-7" style={{ borderLeft: `2px solid ${C.border}` }}>
                  <div
                    className="absolute -left-1.5 top-1.5 w-2 h-2 rounded-full"
                    style={{ background: C.accent }}
                  />
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <h4 className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                      {j.title}
                    </h4>
                    <Tag color={C.teal}>{j.type}</Tag>
                  </div>
                  <div className="text-sm" style={{ fontFamily: "'Inter',sans-serif" }}>
                    {j.link ? (
                      <a href={j.link} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: C.accent }}>
                        {j.org}
                      </a>
                    ) : (
                      <span style={{ color: C.accent }}>{j.org}</span>
                    )}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                    {j.period}
                  </div>
                  <ul className="mt-2 pl-4 text-xs leading-relaxed list-disc" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                    {j.items.map((it, k) => (
                      <li key={k} className="mb-0.5">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Education & Skills */}
          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-5"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Education
            </h3>
            {edu.map(([d, s, y], i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <Cd className="mb-3.5">
                  <div className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                    {d}
                  </div>
                  <div className="text-xs mt-1" style={{ color: C.accent }}>
                    {s}
                  </div>
                  {y && (
                    <div className="text-xs mt-0.5" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                      {y}
                    </div>
                  )}
                </Cd>
              </FadeIn>
            ))}

            <h3
              className="text-xs uppercase tracking-widest mt-8 mb-4"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Skills
            </h3>
            <FadeIn>
              <Cd>
                {skills.map(([k, v], i) => (
                  <div
                    key={i}
                    className="py-2 flex gap-2.5 text-xs"
                    style={{
                      borderBottom: i < skills.length - 1 ? `1px solid ${C.border}` : "none",
                      fontFamily: "'Inter',sans-serif",
                    }}
                  >
                    <span className="font-semibold min-w-24" style={{ color: C.accent }}>
                      {k}
                    </span>
                    <span style={{ color: C.text }}>{v}</span>
                  </div>
                ))}
              </Cd>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {certs.map((c, i) => (
                  <Tag key={i} color={C.blue}>
                    {c}
                  </Tag>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Freelance */}
        <h3
          className="text-xs uppercase tracking-widest mt-14 mb-5"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Freelance Work
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {freelance.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <Cd className="h-full">
                <h4 className="text-base font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {f.title}
                </h4>
                <div className="text-xs mb-2.5" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                  {f.period}
                </div>
                <p className="text-sm leading-relaxed mb-3.5" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {f.desc}
                </p>
                {f.sites && (
                  <div className="mb-3.5">
                    <div className="text-xs font-semibold mb-1.5" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                      Sample Projects:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {f.sites.map((s, k) => (
                        <a
                          key={k}
                          href={s.u}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-2.5 py-1 rounded-full hover:opacity-80 transition-opacity"
                          style={{
                            color: C.accent,
                            border: `1px solid ${C.accent}30`,
                            fontFamily: "'Inter',sans-serif",
                          }}
                        >
                          {s.n}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {f.tags.map((t, k) => (
                    <Tag key={k} color={C.blue}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>

        {/* Competitions */}
        <h3
          className="text-xs uppercase tracking-widest mt-14 mb-5"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Competitive Machine Learning
        </h3>
        <FadeIn>
          <div className="flex flex-wrap gap-1 mb-5">
            {Object.keys(compTabs).map((t) => (
              <button
                key={t}
                onClick={() => setCompTab(t)}
                className="px-4 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
                style={{
                  background: compTab === t ? C.accent : C.card,
                  color: compTab === t ? C.bg : C.muted,
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Cd className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs" style={{ fontFamily: "'Inter',sans-serif", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th className="text-left py-3 px-4 font-semibold" style={{ color: C.muted }}>
                      Competition
                    </th>
                    <th className="text-center py-3 px-3 font-semibold" style={{ color: C.muted }}>
                      Rank
                    </th>
                    <th className="text-center py-3 px-3 font-semibold" style={{ color: C.muted }}>
                      Field
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compTabs[compTab].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td className="py-2 px-4" style={{ color: C.text }}>
                        {row.s ? "⭐ " : ""}
                        {row.n}
                      </td>
                      <td
                        className={`text-center py-2 px-3 ${row.r <= 10 ? "font-semibold" : ""}`}
                        style={{ color: row.r <= 10 ? C.accent : C.text }}
                      >
                        #{row.r}
                      </td>
                      <td className="text-center py-2 px-3" style={{ color: C.muted }}>
                        {row.f}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Cd>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="text-center py-3.5 mt-3.5">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Full record → <EL href="https://zindi.africa/users/Jagwara/competitions/portfolio">zindi.africa/users/Jagwara</EL> · View my <IL page="Community" setPage={setPage}>Community</IL> work
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Research Page
interface ResearchPageProps {
  setPage: (page: string) => void;
}

function ResearchPage({ setPage }: ResearchPageProps) {
  const areas = [
    {
      title: "Assistive Technology & Accessibility",
      desc: "Exploring how embedded AI and sensor systems can enhance daily life for people with disabilities, focusing on affordable solutions in resource-constrained settings.",
      tags: ["Accessibility", "Embedded AI", "HCI"],
    },
    {
      title: "Agricultural Intelligence & IoT",
      desc: "Investigating the application of machine learning and IoT sensor networks to improve agricultural productivity, crop health monitoring, and food security across Africa.",
      tags: ["AIoT", "Agriculture", "Sensor Networks"],
    },
    {
      title: "Health AI & Medical Imaging",
      desc: "Contributing to the intersection of AI and healthcare through mentorship, review work, and research into deep learning methods for diagnostics and clinical decision support.",
      tags: ["Medical Imaging", "Health AI", "Clinical ML"],
    },
    {
      title: "Natural Language Processing",
      desc: "Working on NLP tasks relevant to African languages, including speech recognition, text classification, and efficient approaches for low-resource language contexts.",
      tags: ["NLP", "Low-Resource Languages", "ASR"],
    },
    {
      title: "Climate, Environment & Geospatial AI",
      desc: "Applying geospatial analysis, remote sensing, and machine learning to environmental monitoring, climate adaptation, and sustainable development challenges.",
      tags: ["Climate AI", "GeoAI", "Remote Sensing"],
    },
    {
      title: "Public Health & Epidemiology",
      desc: "Integrating data science and biostatistical methods into public health research, surveillance systems, and population-level health analytics.",
      tags: ["Epidemiology", "Biostatistics", "Public Health"],
    },
  ];

  const reviews = [
    { title: "CHI 2026: AI Across Cultures Workshop", role: "Paper Reviewer", venue: "Portugal", link: "https://chi2026.acm.org" },
    { title: "MICCAI 2025", role: "Conference Mentor", venue: "Daejeon, South Korea", link: "https://conferences.miccai.org/2025/en/MENTORS.html" },
    { title: "MENA ML Winter School 2024–2026", role: "Application Reviewer", venue: "KAUST, Saudi Arabia" },
    { title: "DSAWH Fellowship 2025", role: "Proposal Reviewer", venue: "Women's Health AI" },
    { title: "Meta Llama Impact Hackathon", role: "Application Reviewer", venue: "2024" },
    { title: "UNIDO Breakout Session", role: "Facilitator & Speaker", venue: "Riyadh, 2025" },
  ];

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SH title="Research & Publications" sub="Bridging AI research with real-world African contexts" />

        <FadeIn>
          <Cd className="mb-8 flex flex-wrap gap-4 items-center">
            <div
              className="w-13 h-13 rounded-lg flex items-center justify-center text-xl font-extrabold text-white flex-shrink-0"
              style={{ background: C.teal, fontFamily: "'Inter',sans-serif" }}
            >
              iD
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                ORCID · <strong>Jagwara Eric Ofuono</strong>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                0009-0003-4935-3667
              </div>
            </div>
            <EL href="https://orcid.org/0009-0003-4935-3667">View on ORCID</EL>
          </Cd>
        </FadeIn>

        <h3
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Research Areas
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-11">
          {areas.map((a, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <Cd className="h-full">
                <h4 className="text-sm font-bold mb-1.5" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {a.title}
                </h4>
                <p className="text-xs leading-relaxed mb-3" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {a.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {a.tags.map((t, k) => (
                    <Tag key={k} color={C.teal}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>

        <h3
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
        >
          Review & Conference Activity
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {reviews.map((c, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <Cd>
                <div className="text-sm font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {c.title}
                </div>
                <Tag color={C.purple}>{c.role}</Tag>
                <div className="text-xs mt-1.5" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                  {c.venue}
                </div>
                {c.link && (
                  <div className="mt-1.5">
                    <EL href={c.link}>View</EL>
                  </div>
                )}
              </Cd>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Explore my <IL page="Experience" setPage={setPage}>Experience</IL> · View my <IL page="Open Source" setPage={setPage}>Open Source</IL> projects
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Community Page
interface CommunityPageProps {
  setPage: (page: string) => void;
}

function CommunityPage({ setPage }: CommunityPageProps) {
  const roles = [
    { org: "Zindi Africa", role: "Country Ambassador, Uganda", period: "Oct 2024 – Present", link: "https://zindi.africa", desc: "Growing Uganda's data science community. Previously Community Ambassador (Aug 2023)." },
    { org: "UN AI for Good, Young AI Leaders", role: "Hub Leader, Kampala", period: "2024 – Present", link: "https://aiforgood.itu.int/young-ai-leaders-community/", desc: "Leading Kampala hub fostering AI talent and awareness." },
    { org: "Deep Learning Indaba", role: "Mentor", period: "2024 – Present", link: "https://deeplearningindaba.com", desc: "Mentoring teams on ethical AI-driven community projects." },
    { org: "IndabaX Uganda", role: "Community Engagement Chair", period: "2025", link: "https://indabaxug.github.io", desc: "Chairing community engagement for Uganda's Indaba chapter." },
    { org: "Data Science Africa", role: "Member", period: "2022+", link: "https://www.datascienceafrica.org", desc: "Training in data science and ML across the continent." },
    { org: "DS-I Africa (NIH)", role: "Member", period: "2024+", desc: "Data Science for Health Discovery & Innovation in Africa." },
    { org: "CoARA-ERIP", role: "Member", period: "2024+", desc: "Ethics & Research Integrity Policy." },
    { org: "Tonative", role: "Member", period: "2025+", desc: "Language technology and NLP initiatives." },
    { org: "Data Science Network", role: "Member", period: "2022+", desc: "AI/ML certification and community workshops." },
  ];

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SH title="Community & Leadership" sub="Building AI capacity across Africa" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {roles.map((r, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <Cd className="h-full">
                <h4 className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                  {r.link ? (
                    <a href={r.link} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: C.bright }}>
                      {r.org}
                    </a>
                  ) : (
                    r.org
                  )}
                </h4>
                <div className="mt-1">
                  <Tag color={C.teal}>{r.role}</Tag>
                </div>
                <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                  {r.period}
                </div>
                <p className="text-xs leading-relaxed mt-2" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {r.desc}
                </p>
              </Cd>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Read more on my <IL page="Blog" setPage={setPage}>Blog</IL> · Check upcoming <IL page="Events" setPage={setPage}>Events</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Open Source Page
interface OpenSourcePageProps {
  setPage: (page: string) => void;
}

function OpenSourcePage({ setPage }: OpenSourcePageProps) {
  const repos = [
    { title: "SVG-Ninja", desc: "WordPress plugin for secure SVG uploads with automatic metadata cleaning and zero frontend footprint.", tags: ["WordPress", "PHP", "SVG", "Security"], pub: true },
    { title: "Classic-Notice-Blocker", desc: "Classic Notice Blocker gives you full control over the admin notices cluttering your WordPress dashboard.", tags: ["WordPress", "PHP", "Admin UI"], pub: true },
    { title: "CanaryDrop CLI", desc: "A lightweight cybersecurity terminal tool for creating and managing canary tokens, tripwires that alert you when attackers access them.", tags: ["Python", "Cybersecurity", "CLI"] },
    { title: "Various Datasets", desc: "Curated datasets for ML competitions and research, spanning agriculture, health, NLP, and geospatial domains.", tags: ["Data", "ML", "Open Data"] },
    { title: "Zindi Competition Solutions", desc: "Notebooks and pipelines from 80+ competitions spanning fraud detection, NLP, CV, time series, and geospatial tasks.", tags: ["Python", "LightGBM", "XGBoost"] },
    { title: "AIoT Prototypes", desc: "Firmware and control code for AI-guided agricultural rovers, assistive devices, and sensor data pipelines.", tags: ["Arduino", "Raspberry Pi", "C"] },
    { title: "ML Training Materials", desc: "Course content covering Python, R, SQL, and core ML algorithms.", tags: ["Education", "Jupyter"] },
    { title: "Responsible AI Resources", desc: "Workshop materials for Microsoft Responsible AI coaching across Uganda, Kenya, and Nigeria.", tags: ["Ethics", "Governance"] },
  ];

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SH title="Open Source & Projects" sub="Plugins, tools, datasets, and community resources" />

        <FadeIn>
          <Cd className="mb-7 flex flex-wrap gap-4 items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "#1a1e2a" }}
            >
              ⌨
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-base font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                GitHub · <strong>Eric Jagwara</strong>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                Plugins, ML solutions, AIoT prototypes
              </div>
            </div>
            <EL href="https://github.com/ericjagwara">View Profile</EL>
          </Cd>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {repos.map((p, i) => (
            <FadeIn key={i} delay={i * 0.03}>
              <Cd className="h-full">
                <div className="flex gap-2 items-center mb-1.5">
                  <h4 className="text-sm font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                    {p.title}
                  </h4>
                  {p.pub && <Tag color={C.teal}>Public</Tag>}
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.tags.map((t, k) => (
                    <Tag key={k} color={C.blue}>
                      {t}
                    </Tag>
                  ))}
                </div>
              </Cd>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              View my <IL page="Research" setPage={setPage}>Research</IL> · Explore my <IL page="Experience" setPage={setPage}>Experience</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Blog Page
interface BlogPageProps {
  setPage: (page: string) => void;
}

function BlogPage({ setPage }: BlogPageProps) {
  const [posts, setPosts] = useState<{ title: string; link: string; pubDate: string; description?: string; content?: string; thumbnail?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const mediumUser = "@ericjagwara_65224";
    const rssUrl = `https://medium.com/feed/${mediumUser}`;

    // Try rss2json first, fall back to allorigins proxy if it fails
    const tryRss2json = () =>
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.status === "ok" && data.items?.length) {
            setPosts(data.items.slice(0, 10));
            setLoading(false);
            return true;
          }
          return false;
        })
        .catch(() => false);

    const tryAllOrigins = () =>
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`)
        .then((r) => r.json())
        .then((data) => {
          const parser = new DOMParser();
          const xml = parser.parseFromString(data.contents, "text/xml");
          const items = Array.from(xml.querySelectorAll("item")).slice(0, 10);
          if (!items.length) return false;
          const parsed = items.map((item) => ({
            title: item.querySelector("title")?.textContent || "",
            link: item.querySelector("link")?.textContent || "",
            pubDate: item.querySelector("pubDate")?.textContent || "",
            description: item.querySelector("description")?.textContent || "",
            thumbnail: item.querySelector("thumbnail")?.getAttribute("url") ||
              item.querySelector("enclosure")?.getAttribute("url") || undefined,
          }));
          setPosts(parsed);
          setLoading(false);
          return true;
        })
        .catch(() => false);

    tryRss2json().then((ok) => {
      if (!ok) {
        tryAllOrigins().then((ok2) => {
          if (!ok2) {
            setErr(true);
            setLoading(false);
          }
        });
      }
    });
  }, []);

  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";
    return text.substring(0, 220) + (text.length > 220 ? "..." : "");
  };

  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SH title="Blog" sub="Thoughts on AI, technology, design, and the human experience" />

        <FadeIn>
          <Cd className="mb-7 flex flex-wrap gap-4 items-center">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ background: "#1a1e2a", fontFamily: "serif" }}
            >
              M
            </div>
            <div className="flex-1 min-w-48">
              <div className="text-base font-bold" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                Medium — <strong>@ericjagwara</strong>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                Personal essays and technical writing
              </div>
            </div>
            <EL href="https://medium.com/@ericjagwara_65224">View Profile</EL>
          </Cd>
        </FadeIn>

        {loading && (
          <div className="text-center py-10" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
            <div className="text-sm">Loading posts from Medium...</div>
          </div>
        )}

        {err && !loading && (
          <FadeIn>
            <Cd className="text-center py-8">
              <p className="text-sm mb-3" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
                Could not load the feed right now.
              </p>
              <EL href="https://medium.com/@ericjagwara_65224">Read directly on Medium</EL>
            </Cd>
          </FadeIn>
        )}

        {!loading && !err && posts.length > 0 && (
          <div className="flex flex-col gap-4">
            {posts.map((p, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <Cd className="flex flex-wrap gap-5">
                  {p.thumbnail && (
                    <div
                      className="w-40 h-28 rounded-lg overflow-hidden flex-shrink-0"
                      style={{ background: C.border }}
                    >
                      <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-48">
                    <h4 className="text-base font-bold mb-1" style={{ color: C.bright, fontFamily: "'Inter',sans-serif" }}>
                      {p.title}
                    </h4>
                    <div className="text-xs mb-2" style={{ color: C.muted, fontFamily: "'Space Mono',monospace" }}>
                      {new Date(p.pubDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <p className="text-sm leading-relaxed mb-2.5" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
                      {stripHtml(p.description || p.content || "")}
                    </p>
                    <EL href={p.link}>Read on Medium</EL>
                  </div>
                </Cd>
              </FadeIn>
            ))}
          </div>
        )}

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Check upcoming <IL page="Events" setPage={setPage}>Events</IL> · View my <IL page="Community" setPage={setPage}>Community</IL> work
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Events Page
interface EventsPageProps {
  setPage: (page: string) => void;
}

function EventsPage({ setPage }: EventsPageProps) {
  return (
    <section className="min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SH title="Events" sub="Upcoming and past events — talks, workshops, and community gatherings" />
        <FadeIn>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${C.border}`, background: "#fff" }}
          >
            <iframe
              src="https://lu.ma/embed/calendar/cal-TIYVNRzD7u9v1ta/events?lt=light"
              width="100%"
              height="650"
              style={{ border: "none", display: "block", background: "#fff" }}
              allowFullScreen
              aria-hidden={false}
              tabIndex={0}
              allow="payment"
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Powered by <EL href="https://lu.ma">Luma</EL> · <EL href="https://lu.ma/cal-TIYVNRzD7u9v1ta">View full calendar</EL>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <p className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
              Read my <IL page="Blog" setPage={setPage}>Blog</IL> · View my <IL page="Research" setPage={setPage}>Research</IL>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Footer Component
interface FooterProps {
  setPage: (page: string) => void;
}

function Footer({ setPage }: FooterProps) {
  const contacts = [
    { i: "✉", l: "ericjagwara@gmail.com", h: "mailto:ericjagwara@gmail.com" },
    { i: "📱", l: "+256 700 768 295", h: "tel:+256700768295" },
  ];

  const profiles = [
    { l: "LinkedIn", h: "https://linkedin.com/in/ericjagwara" },
    { l: "GitHub", h: "https://github.com/ericjagwara" },
    { l: "X (Twitter)", h: "https://x.com/ericjagwara" },
    { l: "Zindi", h: "https://zindi.africa/users/Jagwara" },
    { l: "ORCID", h: "https://orcid.org/0009-0003-4935-3667" },
    { l: "Medium", h: "https://medium.com/@ericjagwara_65224" },
    { l: "TikTok", h: "https://www.tiktok.com/@ericjagwara" },
    { l: "Facebook", h: "https://www.facebook.com/eric.jagwara/" },
    { l: "Credly", h: "https://www.credly.com/users/eric-jagwara" },
    { l: "AI for Good", h: "https://aiforgood.itu.int/speaker/eric-ofuono-jagwara/" },
  ];

  const openTo = [
    "Research Collaborations",
    "Speaking Engagements",
    "AI Consulting",
    "Web Development",
    "UI/UX Design",
    "Cybersecurity Audits",
    "Mentorship",
    "Workshop Facilitation",
  ];

  const quickLinks = [
    { l: "Experience", p: "Experience" },
    { l: "Research", p: "Research" },
    { l: "Community", p: "Community" },
    { l: "Open Source", p: "Open Source" },
    { l: "Blog", p: "Blog" },
    { l: "Events", p: "Events" },
  ];

  return (
    <footer className="py-14 px-6" style={{ borderTop: `1px solid ${C.border}`, background: C.card }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-9 mb-9">
          {/* Column 1: Name & contact */}
          <div>
            <div className="text-xl mb-3" style={{ fontFamily: "'Instrument Serif',serif", color: C.accent }}>
              Jagwara Eric Ofuono
            </div>
            <div className="text-sm mb-4" style={{ color: C.text, fontFamily: "'Inter',sans-serif" }}>
              Kampala, Uganda
            </div>
            {contacts.map((c, i) => (
              <a
                key={i}
                href={c.h}
                className="flex items-center gap-2 text-xs mb-2 hover:opacity-80 transition-opacity"
                style={{ color: C.text, fontFamily: "'Inter',sans-serif", textDecoration: "none" }}
              >
                <span>{c.i}</span>
                <span>{c.l}</span>
              </a>
            ))}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Quick Links
            </div>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(q.p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs px-3 py-1 rounded-full hover:opacity-80 transition-opacity text-left"
                  style={{ color: C.text, border: `1px solid ${C.border}`, fontFamily: "'Inter',sans-serif" }}
                >
                  {q.l}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Profiles */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Profiles
            </div>
            <div className="flex flex-wrap gap-2">
              {profiles.map((p, i) => (
                <a
                  key={i}
                  href={p.h}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1 rounded-full hover:opacity-80 transition-opacity"
                  style={{ color: C.text, border: `1px solid ${C.border}`, fontFamily: "'Inter',sans-serif", textDecoration: "none" }}
                >
                  {p.l}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Open to */}
          <div>
            <div
              className="text-xs uppercase tracking-wider mb-3"
              style={{ color: C.accent, fontFamily: "'Space Mono',monospace" }}
            >
              Open To
            </div>
            <div className="flex flex-wrap gap-1.5">
              {openTo.map((s, i) => (
                <Tag key={i} color={C.teal}>
                  {s}
                </Tag>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-5 text-center" style={{ borderColor: C.border }}>
          <span className="text-xs" style={{ color: C.muted, fontFamily: "'Inter',sans-serif" }}>
            © {new Date().getFullYear()} Jagwara Eric Ofuono · Kampala, Uganda
          </span>
        </div>
      </div>
    </footer>
  );
}

// Home Page
interface HomePageProps {
  setPage: (page: string) => void;
}

function HomePage({ setPage }: HomePageProps) {
  return (
    <div className="relative z-10">
      <HeroSection />
      <AboutSection />
      <TestimonialsSection setPage={setPage} />
    </div>
  );
}

// Main App Component
function App() {
  const [page, setPage] = useState("Home");

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Add floating animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const pages: Record<string, React.ComponentType<{ setPage: (page: string) => void }>> = {
    Home: HomePage,
    Experience: ExperiencePage,
    Research: ResearchPage,
    Community: CommunityPage,
    "Open Source": OpenSourcePage,
    Blog: BlogPage,
    Events: EventsPage,
  };

  const PageComponent = pages[page] || HomePage;

  return (
    <div className="min-h-screen relative" style={{ background: C.bg, color: C.text }}>
      <BackgroundPattern />
      <Nav page={page} setPage={setPage} />
      <PageComponent setPage={setPage} />
      <div className="relative z-10">
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}

export default App;
