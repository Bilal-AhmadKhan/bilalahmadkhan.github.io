import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, 
  Linkedin, Mail, Smartphone, Shield, Bot, Cpu,
  Award, BookOpen, MapPin, Trophy, Scroll,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  ExternalLink, Terminal, Hash, Circle
} from 'lucide-react';

// --- DATA CONFIGURATION ---

const personalInfo = {
  name: "Bilal Ahmad Khan",
  title: "Full Stack Engineer & Cyber Security Specialist",
  location: "Pakistan",
  email: "mailbilalkhan9@gmail.com",
  linkedin: "https://www.linkedin.com/in/bilalahmad-khan/",
  phone: "0321-5736383"
};

const skills = [
  "Cyber Security Analysis", "Python", "Flutter (Dart)", "React",
  "AI Agents & RAG", "n8n Automation", "Firebase", "AWS + GCP",
  "Ethical Hacking", "Docker"
];

const education = [
  {
    type: "degree",
    degree: "B.S. Computer Science",
    institution: "University", 
    year: "Graduating 2027",
    desc: "CGPA: 3.55/4.00"
  },
  {
    type: "cert",
    degree: "A Levels",
    institution: "Cambridge International",
    year: "2023",
    desc: "Computer Science (A), Physics (B), Mathematics (A)"
  },
  {
    type: "cert",
    degree: "O Levels",
    institution: "Cambridge International",
    year: "2021",
    desc: "8 A*/A grades including CS, Physics, Chemistry, Maths"
  }
];

const achievements = [
  { title: "ACSEC VI Science Fair", award: "Winner - Math Category", icon: "trophy" },
  { title: "Ad-Infinitum", award: "Math Category Winner", icon: "trophy" },
  { title: "Triathlon Science Event", award: "Honorable Mention", icon: "medal" },
  { title: "Firebase 3-Day Hackathon", award: "AI Hackathon Participant", icon: "code" }
];

const projectsData = {
  mobile: [
    {
      title: "Inheritance Calculator",
      tech: "Flutter, Multilingual",
      desc: "Shariah-compliant app automating Islamic inheritance laws with validation and privacy focus.",
      status: "Live"
    },
    {
      title: "Event Management App",
      tech: "Flutter, Firebase, n8n",
      desc: "Centralized event platform. Proof of concept tested in n8n before full mobile deployment.",
      status: "MVP"
    }
  ],
  cyber: [
    {
      title: "Ethical Hacking Lab",
      tech: "Metasploit, NMAP, Wireshark",
      desc: "Comprehensive penetration testing environment covering SQLi, XSS, and OSINT.",
      status: "Completed"
    },
    {
      title: "Secure Digital Ops",
      tech: "Data Privacy, Auth Systems",
      desc: "Led secure tech operations and digital practices for VURSA (NPO).",
      status: "Professional"
    }
  ],
  ai: [
    {
      title: "News Authenticator Agent",
      tech: "AI Agents, Python",
      desc: "Custom AI agent designed to detect misinformation and analyze post authenticity.",
      status: "Research"
    },
    {
      title: "DocBooking Workflow",
      tech: "LLMs, RAG, n8n, VAPI",
      desc: "Fully automated doctor appointment system using RAG-based AI models.",
      status: "Live"
    },
    {
      title: "X-Ray Prediction App",
      tech: "GCP, ML Models, API",
      desc: "Chest X-ray analysis tool deploying backend models on Google Cloud to generate PDF reports.",
      status: "Deployed"
    }
  ]
};

// --- COMPONENT: MAGNETIC STRIP TRIGGER ---
const EdgeTrigger = ({ direction, target, navigate, label, icon: Icon, isHome }) => {
  let containerClass = "fixed z-50 flex items-center justify-center cursor-pointer group";
  let stripClass = "absolute bg-zinc-800 transition-all duration-300 ease-out group-hover:bg-zinc-900";
  let iconClass = "relative z-10 transition-all duration-300 text-zinc-400 group-hover:text-white group-hover:scale-110";
  let labelClass = "absolute text-xs font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-900 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-white px-2 py-1 border border-zinc-200";

  if (direction === 'top') {
    containerClass += " top-0 left-0 w-full h-16"; 
    stripClass += " top-0 w-32 h-1 group-hover:h-12 group-hover:w-48 rounded-b-lg";
    labelClass += " top-14";
  } else if (direction === 'bottom') {
    containerClass += " bottom-0 left-0 w-full h-16";
    stripClass += " bottom-0 w-32 h-1 group-hover:h-12 group-hover:w-48 rounded-t-lg";
    labelClass += " bottom-14";
  } else if (direction === 'left') {
    containerClass += " top-0 left-0 h-full w-16";
    stripClass += " left-0 h-32 w-1 group-hover:w-12 group-hover:h-48 rounded-r-lg";
    labelClass += " left-14 whitespace-nowrap";
  } else if (direction === 'right') {
    containerClass += " top-0 right-0 h-full w-16";
    stripClass += " right-0 h-32 w-1 group-hover:w-12 group-hover:h-48 rounded-l-lg";
    labelClass += " right-14 whitespace-nowrap";
  }

  return (
    <div className={containerClass} onClick={() => navigate(target)}>
      <div className={stripClass}></div>
      <div className={iconClass}>
         <Icon size={20} />
      </div>
      <div className={labelClass}>{label}</div>
    </div>
  );
};

// --- COMPONENT: NAV CONTROL HUB (Draggable) ---
const NavigationRemote = ({ navigate }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Mouse Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    setIsDragging(true);
    hasMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...pos };
  };

  // Touch Handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    hasMoved.current = false;
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    initialPos.current = { ...pos };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMoved.current = true;
      }
      
      setPos({
        x: initialPos.current.x + dx,
        y: initialPos.current.y + dy
      });
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;

      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        hasMoved.current = true;
      }

      setPos({
        x: initialPos.current.x + dx,
        y: initialPos.current.y + dy
      });
    };

    const handleUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  // Click Wrapper
  const handleNavClick = (target) => {
    if (!hasMoved.current) {
      navigate(target);
    }
  };

  return (
    // Fixed wrapper positions the remote in the desired corner initially
    // pointer-events-none ensures the empty space around the remote doesn't block clicks
    <div className="fixed bottom-12 left-0 w-full flex justify-center md:justify-end md:pr-12 pointer-events-none z-50">
      <div 
        className="relative w-40 h-40 rounded-full bg-zinc-100 shadow-xl border border-zinc-200 flex items-center justify-center group select-none pointer-events-auto cursor-grab active:cursor-grabbing touch-none backdrop-blur-sm bg-opacity-90"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Decorative outer ring */}
        <div className="absolute inset-2 rounded-full border border-zinc-300/50"></div>
        
        {/* Cross Lines */}
        <div className="absolute w-full h-[1px] bg-zinc-200"></div>
        <div className="absolute h-full w-[1px] bg-zinc-200"></div>

        {/* Label */}
        <div className="absolute -top-6 text-[10px] font-mono text-zinc-400 tracking-widest uppercase bg-white/50 px-2 rounded">Nav Control</div>

        {/* Buttons - Using onMouseUp to avoid conflict with dragging logic handled by handleNavClick is safer, but onClick works with the hasMoved check */}
        <button 
          onClick={() => handleNavClick('about')}
          className="absolute top-2 w-10 h-10 bg-white rounded-full shadow-sm border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:scale-110 hover:shadow-md z-10 active:scale-95"
          title="About Me (Up)"
        >
          <ChevronUp size={20} />
        </button>
        <button 
          onClick={() => handleNavClick('contact')}
          className="absolute bottom-2 w-10 h-10 bg-white rounded-full shadow-sm border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:scale-110 hover:shadow-md z-10 active:scale-95"
          title="Contact (Down)"
        >
          <ChevronDown size={20} />
        </button>
        <button 
          onClick={() => handleNavClick('cert')}
          className="absolute left-2 w-10 h-10 bg-white rounded-full shadow-sm border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:scale-110 hover:shadow-md z-10 active:scale-95"
          title="Education (Left)"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => handleNavClick('projects')}
          className="absolute right-2 w-10 h-10 bg-white rounded-full shadow-sm border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all hover:scale-110 hover:shadow-md z-10 active:scale-95"
          title="Projects (Right)"
        >
          <ChevronRight size={20} />
        </button>

        {/* Center Hub */}
        <div className="relative z-20 w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center shadow-inner">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [view, setView] = useState('home');
  const [activeProjectTab, setActiveProjectTab] = useState('mobile');

  // Swipe Logic
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEnd.current = null; 
    touchStart.current = e.targetTouches[0].clientX;
    touchStart.currentY = e.targetTouches[0].clientY; 
  };

  const onTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
    touchEnd.currentY = e.targetTouches[0].clientY;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distanceX = touchStart.current - touchEnd.current;
    const distanceY = touchStart.currentY - touchEnd.currentY;
    const isHorizontal = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontal) {
      if (Math.abs(distanceX) < minSwipeDistance) return;
      if (distanceX > 0) { // Swiped Left
        if (view === 'home') setView('projects');
        else if (view === 'cert') setView('home');
      } else { // Swiped Right
        if (view === 'home') setView('cert');
        else if (view === 'projects') setView('home');
      }
    } else {
      if (Math.abs(distanceY) < minSwipeDistance) return;
      if (distanceY > 0) { // Swiped Up
        if (view === 'home') setView('contact');
        else if (view === 'about') setView('home');
      } else { // Swiped Down
        if (view === 'home') setView('about');
        else if (view === 'contact') setView('home');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp': view === 'home' ? setView('about') : view === 'contact' && setView('home'); break;
        case 'ArrowDown': view === 'home' ? setView('contact') : view === 'about' && setView('home'); break;
        case 'ArrowLeft': view === 'home' ? setView('cert') : view === 'projects' && setView('home'); break;
        case 'ArrowRight': view === 'home' ? setView('projects') : view === 'cert' && setView('home'); break;
        case 'Escape': setView('home'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  const getTransform = () => {
    switch (view) {
      case 'home': return 'translate(0, 0)';
      case 'about': return 'translate(0, 100vh)'; 
      case 'contact': return 'translate(0, -100vh)'; 
      case 'cert': return 'translate(100vw, 0)'; 
      case 'projects': return 'translate(-100vw, 0)'; 
      default: return 'translate(0, 0)';
    }
  };

  const navigate = (target) => setView(target);

  // Background Pattern Style (Dot Grid)
  const bgPattern = {
    backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)',
    backgroundSize: '24px 24px',
    maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
  };

  return (
    <div 
      className="fixed inset-0 bg-zinc-50 text-zinc-900 overflow-hidden font-sans selection:bg-zinc-900 selection:text-white"
      onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
    >
      {/* Background Texture - Consistent across all views */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-zinc-950" style={bgPattern}></div>
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply opacity-5" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>

      {/* --- NAVIGATION TRIGGERS --- */}
      {view === 'home' && <EdgeTrigger direction="top" target="about" navigate={navigate} label="About" icon={ChevronUp} />}
      {view === 'contact' && <EdgeTrigger direction="top" target="home" navigate={navigate} label="Home" icon={ChevronUp} />}
      
      {view === 'home' && <EdgeTrigger direction="bottom" target="contact" navigate={navigate} label="Contact" icon={ChevronDown} />}
      {view === 'about' && <EdgeTrigger direction="bottom" target="home" navigate={navigate} label="Home" icon={ChevronDown} />}
      
      {view === 'home' && <EdgeTrigger direction="left" target="cert" navigate={navigate} label="Education" icon={ChevronLeft} />}
      {view === 'projects' && <EdgeTrigger direction="left" target="home" navigate={navigate} label="Home" icon={ChevronLeft} />}
      
      {view === 'home' && <EdgeTrigger direction="right" target="projects" navigate={navigate} label="Work" icon={ChevronRight} />}
      {view === 'cert' && <EdgeTrigger direction="right" target="home" navigate={navigate} label="Home" icon={ChevronRight} />}

      {/* --- MAIN WORLD CONTAINER --- */}
      <div 
        className="absolute inset-0 transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) w-full h-full z-10 will-change-transform"
        style={{ transform: getTransform() }}
      >
        
        {/* CENTER: HOME (Minimalist Core) */}
        <section className="absolute inset-0 w-screen h-screen flex flex-col items-center justify-center p-8">
          <div className="relative z-10 text-center space-y-8 max-w-4xl w-full flex flex-col items-center">
            
            {/* Text Content */}
            <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-xs font-mono text-zinc-500 mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    SYSTEM ONLINE
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900">
                BILAL KHAN
                </h1>
                <p className="text-xl md:text-2xl text-zinc-500 font-light tracking-wide max-w-2xl mx-auto">
                <span className="font-semibold text-zinc-800">Full Stack Engineer</span> <span className="text-zinc-300 px-2">/</span> Cyber Security
                </p>
            </div>

            <div className="flex gap-4 justify-center pt-8">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 px-6 py-3 bg-zinc-900 text-white hover:bg-zinc-700 transition-all text-sm font-medium tracking-wide">
                 <Linkedin size={16}/> <span>LINKEDIN</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="group flex items-center gap-3 px-6 py-3 bg-white border border-zinc-200 hover:border-zinc-900 transition-all text-sm font-medium text-zinc-900 tracking-wide">
                 <Mail size={16}/> <span>EMAIL</span>
              </a>
            </div>

            {/* Remote Control (Self-contained Fixed Position) */}
            <NavigationRemote navigate={navigate} />

          </div>
        </section>

        {/* TOP: ABOUT ME (Clean Split) */}
        <section className="absolute top-[-100vh] left-0 w-screen h-screen bg-white flex items-center justify-center overflow-hidden">
            <div className="w-full h-full overflow-y-auto p-8 pt-24 pb-24 flex items-center justify-center">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-l border-zinc-100 pl-4 md:pl-8">
                    
                    {/* Left Column: Title & Bio */}
                    <div className="md:col-span-5 space-y-8">
                        <div>
                            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">01 / Profile</span>
                            <h2 className="text-4xl font-bold text-zinc-900 mt-2 mb-6">About Me</h2>
                            <div className="w-12 h-1 bg-zinc-900"></div>
                        </div>
                        <p className="text-zinc-600 leading-relaxed text-lg">
                            I specialize in building secure, intelligent systems. From <span className="font-semibold text-zinc-900 border-b border-zinc-300">Flutter</span> mobile apps to <span className="font-semibold text-zinc-900 border-b border-zinc-300">AI Agents</span> that detect misinformation, my work focuses on real-world impact.
                        </p>
                        <p className="text-zinc-600 leading-relaxed">
                             With a strong background in Ethical Hacking and Math, I approach development with a security-first mindset.
                        </p>
                        <div className="flex items-center gap-3 text-sm font-mono text-zinc-500 pt-4">
                            <MapPin size={16} /> {personalInfo.location}
                        </div>
                    </div>

                    {/* Right Column: Skills Grid */}
                    <div className="md:col-span-7 bg-zinc-50 p-8 border border-zinc-100">
                         <div className="flex items-center justify-between mb-6 border-b border-zinc-200 pb-4">
                            <h3 className="font-bold text-zinc-900 flex items-center gap-2"><Terminal size={18}/> Technical Skills</h3>
                            <span className="text-xs font-mono text-zinc-400">STACK_V1.0</span>
                         </div>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {skills.map((skill, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-zinc-700 p-2 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-zinc-200">
                                    <Hash size={12} className="text-zinc-300" /> {skill}
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* BOTTOM: CONTACT (Minimalist Form/Card) */}
        <section className="absolute top-[100vh] left-0 w-screen h-screen bg-zinc-100 flex items-center justify-center">
            <div className="max-w-2xl w-full p-8">
                <div className="bg-white p-12 shadow-sm border border-zinc-200 text-center space-y-8">
                    <div className="inline-flex justify-center items-center w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-full mb-4">
                        <Mail size={24} className="text-zinc-900"/>
                    </div>
                    
                    <div>
                        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">03 / Communication</span>
                        <h2 className="text-3xl font-bold text-zinc-900 mt-2">Let's Collaborate</h2>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex-1 py-4 px-6 border border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors flex items-center justify-center gap-2">
                            <Linkedin size={18} /> LinkedIn
                        </a>
                         <a href={`mailto:${personalInfo.email}`} className="flex-1 py-4 px-6 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                            <Mail size={18} /> Send Email
                        </a>
                    </div>

                    <div className="pt-8 border-t border-zinc-100">
                        <p className="font-mono text-xs text-zinc-400">{personalInfo.phone} • {personalInfo.location}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* LEFT: EDUCATION (Timeline Style) */}
        <section className="absolute top-0 left-[-100vw] w-screen h-screen bg-zinc-50 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full overflow-y-auto p-8 pt-24 pb-24 flex justify-center">
                <div className="max-w-4xl w-full">
                    <div className="mb-12 border-b border-zinc-200 pb-4 flex justify-between items-end">
                         <div>
                            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">02 / History</span>
                            <h2 className="text-3xl font-bold text-zinc-900 mt-2">Education & Honors</h2>
                         </div>
                         <Award className="text-zinc-300" size={32} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Education Column */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2"><BookOpen size={18}/> Academic</h3>
                            <div className="border-l-2 border-zinc-200 pl-6 space-y-10">
                                {education.map((edu, idx) => (
                                    <div key={idx} className="relative group">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 transition-colors"></div>
                                        <span className="font-mono text-xs text-zinc-400 block mb-1">{edu.year}</span>
                                        <h4 className="font-bold text-zinc-900 text-lg leading-tight">{edu.degree}</h4>
                                        <div className="text-zinc-600 text-sm mt-1">{edu.institution}</div>
                                        <p className="text-zinc-500 text-xs mt-2">{edu.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Awards Column */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2"><Trophy size={18}/> Recognition</h3>
                            <div className="grid gap-4">
                                {achievements.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 border border-zinc-200 bg-white hover:border-zinc-900 transition-colors">
                                        <div className="bg-zinc-50 p-2 rounded text-zinc-900">
                                            {item.icon === 'trophy' ? <Trophy size={16}/> : item.icon === 'medal' ? <Award size={16}/> : <Scroll size={16}/>}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 text-sm">{item.title}</h4>
                                            <span className="text-zinc-500 text-xs">{item.award}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* RIGHT: PROJECTS (Technical Cards) */}
        <section className="absolute top-0 left-[100vw] w-screen h-screen bg-zinc-900 text-zinc-50 flex items-center justify-center overflow-hidden">
             {/* Dark Grid Background for this section only */}
             <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="w-full h-full overflow-y-auto p-8 pt-24 pb-24 flex justify-center relative z-10">
                <div className="w-full max-w-6xl">
                    
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-6 gap-6">
                        <div>
                             <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">04 / Portfolio</span>
                             <h2 className="text-3xl font-bold text-white mt-2 flex items-center gap-3">Selected Works <Cpu className="text-zinc-600"/></h2>
                        </div>
                        
                        {/* Tab Switcher */}
                        <div className="flex gap-1 bg-zinc-950 p-1 rounded border border-zinc-800">
                          {[
                            { id: 'mobile', label: 'Mobile', icon: Smartphone },
                            { id: 'cyber', label: 'Security', icon: Shield },
                            { id: 'ai', label: 'AI/ML', icon: Bot },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              onClick={() => setActiveProjectTab(tab.id)}
                              className={`flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase transition-all ${
                                activeProjectTab === tab.id 
                                ? 'bg-zinc-800 text-white shadow-sm' 
                                : 'text-zinc-500 hover:text-zinc-300'
                              }`}
                            >
                              <tab.icon size={14} /> {tab.label}
                            </button>
                          ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projectsData[activeProjectTab].map((project, index) => (
                            <div key={index} className="group bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-600 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                                {/* Hover Effect */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800 group-hover:bg-white transition-colors duration-300"></div>
                                
                                <div className="flex justify-between items-start mb-6">
                                    <div className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-zinc-600 transition-colors">
                                        {project.status}
                                    </div>
                                    <ExternalLink size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">{project.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {project.desc}
                                </p>
                                
                                <div className="pt-4 border-t border-zinc-800">
                                    <span className="text-xs text-zinc-500 font-mono">{project.tech}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}