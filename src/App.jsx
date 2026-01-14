import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Smartphone, 
  Shield, 
  Bot, 
  Cpu,
  Award,
  BookOpen,
  Code,
  ExternalLink,
  User,
  MapPin,
  Trophy,
  Scroll,
  Cloud
} from 'lucide-react';

// --- DATA CONFIGURATION (FROM RESUME) ---

const personalInfo = {
  name: "Bilal Ahmad Khan",
  title: "Full Stack Engineer & Cyber Security Specialist",
  location: "Pakistan",
  email: "mailbilalkhan9@gmail.com",
  linkedin: "linkedin.com/in/bilalahmad-khan/",
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
    institution: "University", // Placeholder as specific uni wasn't clear in resume header, generic used
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

// --- COMPONENT ---

export default function App() {
  // View State: 'home', 'about' (up), 'contact' (down), 'cert' (left), 'projects' (right)
  const [view, setView] = useState('home');
  const [activeProjectTab, setActiveProjectTab] = useState('mobile');

  // Touch State for Swipe
  const touchStart = useRef(null);
  const touchEnd = useRef(null);
  const minSwipeDistance = 50;

  // Handle Swipe Gestures
  const onTouchStart = (e) => {
    touchEnd.current = null; 
    touchStart.current = e.targetTouches[0].clientX;
    // We also track Y for up/down swipes
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
      // Left Swipe (Move Right) or Right Swipe (Move Left)
      if (Math.abs(distanceX) < minSwipeDistance) return;
      if (distanceX > 0) { // Swiped Left -> Go Right
        if (view === 'home') setView('projects');
        else if (view === 'cert') setView('home');
      } else { // Swiped Right -> Go Left
        if (view === 'home') setView('cert');
        else if (view === 'projects') setView('home');
      }
    } else {
      // Up Swipe (Move Down) or Down Swipe (Move Up)
      if (Math.abs(distanceY) < minSwipeDistance) return;
      if (distanceY > 0) { // Swiped Up -> Go Down
        if (view === 'home') setView('contact');
        else if (view === 'about') setView('home');
      } else { // Swiped Down -> Go Up
        if (view === 'home') setView('about');
        else if (view === 'contact') setView('home');
      }
    }
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (view === 'home') setView('about');
          else if (view === 'contact') setView('home');
          break;
        case 'ArrowDown':
          if (view === 'home') setView('contact');
          else if (view === 'about') setView('home');
          break;
        case 'ArrowLeft':
          if (view === 'home') setView('cert');
          else if (view === 'projects') setView('home');
          break;
        case 'ArrowRight':
          if (view === 'home') setView('projects');
          else if (view === 'cert') setView('home');
          break;
        case 'Escape':
          setView('home');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  // Calculate transform for the "World" container
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

  return (
    <div 
      className="fixed inset-0 bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-teal-500 selection:text-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* --- THE WORLD CONTAINER --- */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full h-full z-10 will-change-transform"
        style={{ transform: getTransform() }}
      >
        
        {/* CENTER: HOME (Deep Space Grey) */}
        <section className="absolute inset-0 w-screen h-screen flex flex-col items-center justify-center p-8 bg-[#020617]">
          {/* Star Field Effect */}
          <div className="absolute inset-0 z-0 opacity-40" 
             style={{ 
               backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
          </div>
          <div className="absolute inset-0 z-0 opacity-20" 
             style={{ 
               backgroundImage: 'radial-gradient(white 2px, transparent 2px)',
               backgroundSize: '120px 120px',
               backgroundPosition: '20px 20px'
             }}>
          </div>

          <div className="relative z-10 text-center space-y-6 max-w-3xl">
            <div className="inline-block p-4 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-sm shadow-2xl animate-pulse-slow mb-4">
              <Shield size={48} className="text-teal-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              BILAL <span className="text-teal-500">KHAN</span>
            </h1>
            <p className="text-xl text-slate-400 font-light tracking-wide">
              {personalInfo.title}
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full hover:bg-slate-800 transition-colors cursor-pointer text-sm text-slate-300">
                 <Linkedin size={16}/> LinkedIn
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full hover:bg-slate-800 transition-colors cursor-pointer text-sm text-slate-300">
                 <Mail size={16}/> Contact
              </a>
            </div>
          </div>
          
          {/* Decorative Lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[1px] bg-slate-800/50 -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[200vh] bg-slate-800/50 -z-10"></div>
        </section>

        {/* TOP: ABOUT ME (Pixel Sky) */}
        <section className="absolute top-[-100vh] left-0 w-screen h-screen flex items-center justify-center p-8 md:p-20 overflow-hidden">
          {/* Pixel Sky Background Gradient */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#38bdf8] via-[#818cf8] to-[#020617]"></div>
          
          {/* Pixel Clouds */}
          <div className="absolute top-20 left-20 text-white/20 animate-pulse"><Cloud size={100} /></div>
          <div className="absolute top-40 right-40 text-white/10"><Cloud size={140} /></div>
          <div className="absolute bottom-1/3 left-1/3 text-white/10"><Cloud size={80} /></div>

          <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white mb-2">
                <User size={28} />
                <h2 className="text-4xl font-bold text-white tracking-widest uppercase drop-shadow-md">About Me</h2>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl text-white">
                <p className="leading-relaxed text-lg mb-4">
                  I specialize in building secure, intelligent systems. From <span className="font-bold text-teal-200">Flutter</span> mobile apps to <span className="font-bold text-teal-200">AI Agents</span> that detect misinformation, my work focuses on real-world impact.
                </p>
                <p className="leading-relaxed">
                  With a strong background in Ethical Hacking and Math, I approach development with a security-first mindset, ensuring data privacy and robust architecture in every project.
                </p>
              </div>
              
              <div className="pt-4 flex items-center gap-4 text-sm text-blue-100 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin size={16} /> {personalInfo.location}
                </div>
                <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
                <div>Available for Remote Work</div>
              </div>
            </div>
            
            <div className="bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md">
               <h3 className="text-xl font-bold text-white mb-6 border-b border-white/20 pb-2">Technical Arsenal</h3>
               <div className="flex flex-wrap gap-2">
                 {skills.map((skill, i) => (
                   <span key={i} className="px-3 py-1 bg-black/40 text-teal-300 font-mono text-sm rounded border border-teal-500/30 hover:bg-teal-500/20 transition-colors cursor-default">
                     {skill}
                   </span>
                 ))}
               </div>
            </div>
          </div>
        </section>

        {/* BOTTOM: CONTACT */}
        <section className="absolute top-[100vh] left-0 w-screen h-screen flex items-center justify-center p-8 md:p-20 bg-[#0f172a]">
           <div className="max-w-2xl w-full text-center space-y-10">
            <div className="inline-block p-4 rounded-full bg-slate-800 border border-slate-700 mb-4 shadow-lg shadow-teal-900/20">
              <Mail size={40} className="text-teal-400" />
            </div>
            
            <h2 className="text-4xl font-bold text-white">Let's Collaborate</h2>
            <p className="text-slate-400 text-lg">
              Open to opportunities in App Development, AI Automation, or Cybersecurity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all group">
                <Linkedin size={20} className="text-blue-400" />
                <span>LinkedIn</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all group">
                <Mail size={20} className="text-teal-400 group-hover:text-white" />
                <span>Email Me</span>
              </a>
            </div>
            
            <div className="text-slate-500 text-sm mt-8">
              Based in {personalInfo.location} • {personalInfo.phone}
            </div>
          </div>
        </section>

        {/* LEFT: CERTIFICATION & EDUCATION (Oak Room) */}
        <section className="absolute top-0 left-[-100vw] w-screen h-screen flex items-center justify-center p-8 md:p-20 bg-[#2b1d16] text-[#e7e5e4]">
          {/* Oak Room Texture/Lighting */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4a342a] via-[#2b1d16] to-[#1a110d]"></div>
          
          <div className="relative z-10 max-w-6xl w-full h-[90vh] flex flex-col justify-center">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif font-bold text-[#d6c0a6] drop-shadow-md flex items-center justify-center gap-4">
                <Award className="text-[#eab308]" size={36} /> Hall of Achievements
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
              
              {/* Education Shelf */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 text-[#d6c0a6] border-b border-[#5c4033] pb-2 mb-2">
                  <BookOpen size={24} />
                  <h3 className="text-2xl font-serif">Education & Certs</h3>
                </div>
                {/* Shelf Background */}
                <div className="space-y-6">
                  {education.map((edu, idx) => (
                    <div key={idx} className="relative bg-[#3e2b22] p-6 rounded shadow-xl border-b-4 border-[#1f1510] transform hover:-translate-y-1 transition-transform">
                      {/* Scroll Icon acting as item on shelf */}
                      <div className="absolute -top-3 -right-2 bg-[#f5f5f4] text-[#2b1d16] p-2 rounded-full shadow-lg">
                        <Scroll size={20} />
                      </div>
                      <h4 className="text-[#e7e5e4] font-bold text-lg font-serif">{edu.degree}</h4>
                      <div className="text-[#a8a29e] text-sm italic">{edu.institution}</div>
                      <div className="text-[#d6c0a6] text-xs mt-2 font-mono">{edu.year}</div>
                      <p className="text-[#d1d5db] text-sm mt-2 border-t border-[#5c4033] pt-2">{edu.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trophies Shelf */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 text-[#d6c0a6] border-b border-[#5c4033] pb-2 mb-2">
                  <Trophy size={24} />
                  <h3 className="text-2xl font-serif">Awards & Honors</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="bg-[#3e2b22] p-4 rounded flex flex-col items-center text-center shadow-lg border-b-4 border-[#1f1510] hover:bg-[#4a342a] transition-colors group">
                      <div className="mb-3 text-[#eab308] drop-shadow-md group-hover:scale-110 transition-transform">
                        <Trophy size={32} />
                      </div>
                      <h4 className="font-bold text-[#e7e5e4] text-sm">{item.title}</h4>
                      <span className="text-[#a8a29e] text-xs mt-1">{item.award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: PROJECTS (Tech Lab) */}
        <section className="absolute top-0 left-[100vw] w-screen h-screen flex items-center justify-center p-4 md:p-12 bg-[#0f172a]">
           {/* Grid Background */}
           <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
          </div>

          <div className="w-full max-w-6xl h-[90vh] flex flex-col relative z-10">
            
            {/* Project Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-slate-700/50">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Cpu className="text-teal-500" /> Project Lab
              </h2>
              
              <div className="flex gap-2 mt-4 md:mt-0 bg-slate-900 p-1 rounded-lg border border-slate-700">
                {[
                  { id: 'mobile', label: 'Mobile App', icon: Smartphone },
                  { id: 'cyber', label: 'CyberSec', icon: Shield },
                  { id: 'ai', label: 'AI & ML', icon: Bot },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProjectTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeProjectTab === tab.id 
                      ? 'bg-teal-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 pb-20 custom-scrollbar">
              {projectsData[activeProjectTab].map((project, index) => (
                <div 
                  key={index} 
                  className="bg-slate-900/80 backdrop-blur rounded-xl border border-slate-700 p-6 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`
                      px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                      ${project.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                      ${project.status === 'MVP' ? 'bg-amber-500/10 text-amber-400' : ''}
                      ${project.status === 'Deployed' ? 'bg-blue-500/10 text-blue-400' : ''}
                      ${project.status === 'Research' ? 'bg-purple-500/10 text-purple-400' : ''}
                      ${project.status === 'Completed' ? 'bg-slate-700 text-slate-300' : ''}
                      ${project.status === 'Professional' ? 'bg-cyan-500/10 text-cyan-400' : ''}
                    `}>
                      {project.status}
                    </div>
                    <ExternalLink size={18} className="text-slate-600 hover:text-white cursor-pointer" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm flex-grow mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="pt-4 border-t border-slate-700">
                    <span className="text-xs font-mono text-teal-400 block mb-1">Tech Stack</span>
                    <span className="text-sm text-slate-300">{project.tech}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* --- HUD / NAVIGATION CONTROLS --- */}
      
      {/* Current Section Label */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <h2 className="text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
          Current Sector
        </h2>
        <div className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-md">
           {view === 'home' && <Home size={18} className="text-teal-500"/>}
           {view === 'about' && <User size={18} className="text-teal-500"/>}
           {view === 'cert' && <Award size={18} className="text-teal-500"/>}
           {view === 'projects' && <Cpu size={18} className="text-teal-500"/>}
           {view === 'contact' && <Mail size={18} className="text-teal-500"/>}
           <span>
             {view === 'home' ? 'DEEP SPACE' : view.toUpperCase()}
           </span>
        </div>
      </div>

      {/* Navigation Compass */}
      <div className="fixed bottom-8 right-8 z-50 grid grid-cols-3 gap-2 p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl">
        <div className="col-start-2">
          <button 
            onClick={() => navigate(view === 'contact' ? 'home' : 'about')}
            disabled={view === 'about'}
            className={`p-3 rounded-lg border transition-all ${
              view === 'about' 
                ? 'border-teal-500 bg-teal-500/20 text-teal-400' 
                : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ArrowUp size={20} />
          </button>
        </div>
        <div className="col-start-1 row-start-2">
          <button 
            onClick={() => navigate(view === 'projects' ? 'home' : 'cert')}
            disabled={view === 'cert'}
            className={`p-3 rounded-lg border transition-all ${
              view === 'cert' 
                ? 'border-teal-500 bg-teal-500/20 text-teal-400' 
                : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="col-start-2 row-start-2">
          <button 
            onClick={() => navigate('home')}
            className={`p-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:bg-teal-600 hover:text-white hover:border-teal-500 transition-all ${view === 'home' ? 'bg-slate-700 text-white' : ''}`}
          >
            <div className="w-5 h-5 rounded-full border-2 border-current"></div>
          </button>
        </div>
        <div className="col-start-3 row-start-2">
          <button 
            onClick={() => navigate(view === 'cert' ? 'home' : 'projects')}
            disabled={view === 'projects'}
            className={`p-3 rounded-lg border transition-all ${
              view === 'projects' 
                ? 'border-teal-500 bg-teal-500/20 text-teal-400' 
                : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="col-start-2 row-start-3">
          <button 
            onClick={() => navigate(view === 'about' ? 'home' : 'contact')}
            disabled={view === 'contact'}
            className={`p-3 rounded-lg border transition-all ${
              view === 'contact' 
                ? 'border-teal-500 bg-teal-500/20 text-teal-400' 
                : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
      
      {/* Help Hint */}
      <div className="fixed bottom-8 left-8 text-slate-500 text-xs hidden md:block">
        <p>KEYBOARD ARROWS OR SWIPE TO NAVIGATE</p>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569; 
        }
      `}</style>
    </div>
  );
}