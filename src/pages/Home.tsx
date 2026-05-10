import * as React from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useInView, animate, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Proceso from '../components/Proceso';
import { Mail, ArrowDown, Bot, Smartphone, Target, Video, CheckCircle2, ChevronDown, Quote, Instagram, Twitter, Linkedin, Github, Send, Loader2, PartyPopper, Facebook } from 'lucide-react';

const Tiktok = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- Components ---

const Reveal = ({ children, width = "w-full" }: { children: React.ReactNode, width?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <div ref={ref} className={`relative ${width} overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { key?: React.Key, testimonial: any }) => {
  return (
    <div className="w-[350px] p-6 bg-[#16161f] border border-white/5 rounded-2xl flex flex-col gap-4 shrink-0 hover:border-neon-cyan/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neon-cyan/20 border border-neon-cyan/20 flex items-center justify-center font-mono text-neon-cyan font-bold">
          {testimonial.name[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-bold text-sm tracking-tight">{testimonial.name}</span>
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">@{testimonial.handle}</span>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[10px]">⭐</span>
          ))}
        </div>
      </div>
      <p className="font-mono text-xs text-white/60 leading-relaxed">
        "{testimonial.text}"
      </p>
    </div>
  );
};

export const TestimonialsSection = () => {
  const row1 = [
    { name: "Carlos Ruiz", handle: "carlos_biz", text: "Adán me enseñó a crear contenido con IA que en 2 semanas duplicó mi engagement orgánico." },
    { name: "Elena Sanz", handle: "esanz_ia", text: "Nunca pensé que la IA podía automatizar todo mi flujo de ventas. Ahora ahorro 15 horas por semana." },
    { name: "Marcos Polo", handle: "mpolo_creative", text: "La arquitectura de marca personal que diseñamos superó todas mis expectativas de autoridad." },
    { name: "Sara Vega", handle: "sara_growth", text: "Si buscas resultados tangibles y no solo teoría, Adán es la persona indicada. Un cambio radical." },
  ];
  const row2 = [
    { name: "Julián Moss", handle: "jmoss_ai", text: "El taller de producción con IA me permitió crear videos de calidad cinematográfica en minutos." },
    { name: "Lucía Fer", handle: "lfer_content", text: "Implementé los agentes de automatización y mi equipo ahora se enfoca solo en cerrar ventas." },
    { name: "Pablo Ner", handle: "pner_brand", text: "Mi marca personal pasó de invisible a referente en mi sector. Los números hablan por sí solos." },
    { name: "Diana Sol", handle: "dsol_digital", text: "La mejor inversión del año. La IA no es el futuro, es el ahora y Adán sabe cómo dominarla." },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} id="testimonios" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <video key="testimonios-video" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100">
            <source src="https://ik.imagekit.io/x8axvbbz3/secciones%20naranja.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[#0c0c14]/10"></div>
      </div>
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Feedback</span>
        <h2 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tighter uppercase leading-none">
          Lo que dicen los que <br /> <span className="text-white/40">ya dieron el salto</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6 pause-on-hover marquee-mask max-w-[1920px] mx-auto">
        <div className="flex gap-6 animate-marquee-right">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
        <div className="flex gap-6 animate-marquee-left">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const duration = 40;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((char, index) => {
        if (index < (frame / duration) * text.length) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      frame++;
      if (frame > duration) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, text]);

  return <span ref={ref}>{displayText}</span>;
};

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name' && value.toLowerCase() === 'hola') setShowEasterEgg(true);
    else if (name === 'name') setShowEasterEgg(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 2000);
  };

  const socials = [
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/' },
    { icon: Twitter, label: 'X', href: 'https://x.com/' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/' },
    { icon: Tiktok, label: 'TikTok', href: 'https://tiktok.com/' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/' },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} id="contacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <video key="contacto-video" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-100">
            <source src="https://ik.imagekit.io/x8axvbbz3/secciones%20naranja.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[#0c0c14]/10"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex flex-col justify-center">
            <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Contacto</span>
            <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-tight mb-8">
              <ScrambleText text="Hablemos de tu proyecto" />
            </h2>
            <p className="font-mono text-sm text-white/40 leading-relaxed mb-12 max-w-md">
              ¿Listo para desbloquear el potencial de la IA en tu marca? Cuéntame tu visión y diseñaremos la arquitectura necesaria para hacerla realidad.
            </p>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {socials.map((social, idx) => (
                <motion.a 
                  key={idx} 
                  href={social.href} 
                  title={`Visit our ${social.label}`} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex flex-col items-center gap-2 group w-20"
                >
                  <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center group-hover:border-neon-cyan/50 group-hover:text-neon-cyan group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(0,245,196,0.3)] group-hover:bg-neon-cyan/5 transition-all duration-500">
                    <social.icon size={22} />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-white/20 group-hover:text-neon-cyan transition-colors whitespace-nowrap">
                    {social.label.toUpperCase()}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-neon-cyan/2 blur-[100px] -z-10 rounded-full" />
            <form onSubmit={handleSubmit} className="noise-bg border border-white/5 p-8 md:p-12 space-y-10">
              <div className="relative group">
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full py-2 font-mono text-sm terminal-input peer" placeholder=" " />
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-neon-cyan">NOMBRE COMPLETO</label>
                <AnimatePresence>{showEasterEgg && (<motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute right-0 top-2 flex items-center gap-2 font-mono text-[10px] text-neon-cyan"><PartyPopper size={14} /><span>¡HOLA! ¿COMENZAMOS?</span></motion.div>)}</AnimatePresence>
              </div>
              <div className="relative group">
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full py-2 font-mono text-sm terminal-input peer" placeholder=" " />
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-neon-cyan">EMAIL DE CONTACTO</label>
              </div>
              <div className="relative group">
                <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full py-2 font-mono text-sm terminal-input peer appearance-none">
                  <option value="" disabled hidden></option>
                  <option value="automatizacion" className="bg-cyber-dark">Automatización IA</option>
                  <option value="contenido" className="bg-cyber-dark">Contenido Digital</option>
                  <option value="marca" className="bg-cyber-dark">Marca Personal</option>
                  <option value="otros" className="bg-cyber-dark">Otros</option>
                </select>
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-neon-cyan">¿QUÉ NECESITAS?</label>
                <ChevronDown size={14} className="absolute right-0 top-3 text-white/20" />
              </div>
              <div className="relative group">
                <textarea required rows={2} name="message" value={formData.message} onChange={handleInputChange} className="w-full py-2 font-mono text-sm terminal-input peer resize-none" placeholder=" " />
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-neon-cyan">TU MENSAJE</label>
              </div>
              <button disabled={status === 'loading'} className="w-full py-4 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-[0.3em] uppercase relative overflow-hidden group hover:bg-neon-cyan/10 transition-all flex items-center justify-center gap-2">
                {status === 'loading' ? (<Loader2 className="animate-spin" size={16} />) : status === 'success' ? (<motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }}>MENSAJE ENVIADO ✓</motion.span>) : (<>ENVIAR MENSAJE <Send size={14} className="group-hover:translate-x-1 transition-transform" /></>)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (latest) => setDisplayValue(Math.floor(latest)), onComplete: () => setComplete(true) });
      return () => controls.stop();
    }
  }, [isInView, value]);
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter tabular-nums transition-all duration-700 leading-none ${complete ? 'counter-glow text-white' : 'text-white/70'}`} style={{ textShadow: complete ? '0 0 15px rgba(255, 107, 0, 0.4)' : 'none' }}>
        {displayValue.toLocaleString()}<span className="text-neon-cyan text-[0.4em] ml-1 align-baseline">{suffix}</span>
      </span>
    </div>
  );
};

export const ResultsSection = () => {
  const metrics = [
    { value: 19000, suffix: "+", label: "SEGUIDORES ORGÁNICOS" },
    { value: 6600000, suffix: "+", label: "VISTAS UN SOLO VIDEO" },
    { value: 195, suffix: "+", label: "PUBLICACIONES" },
    { value: 3, suffix: "+", label: "AÑOS CREANDO CONTENIDO" },
  ];
  return (
    <section id="resultados" className="relative py-24 md:py-32 bg-[#0c0c14] overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-20 md:gap-12 lg:gap-0 items-start">
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex flex-col items-center text-center px-2 sm:px-4"
            >
              {idx < metrics.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-px -translate-y-1/2 w-px h-16 bg-linear-to-b from-transparent via-white/10 to-transparent" />}
              <div className="flex items-center justify-center"><Counter value={metric.value} suffix={metric.suffix} /></div>
              <span className="mt-4 sm:mt-6 font-mono text-[8px] sm:text-[9px] md:text-xs tracking-[0.2em] text-white/50 uppercase max-w-[150px] sm:max-w-[180px] relative z-10 leading-tight">{metric.label}</span>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }} className="mt-32 flex flex-col items-center text-center max-w-2xl mx-auto">
          <Quote className="text-neon-cyan mb-8 opacity-20" size={40} />
          <p className="font-sans text-2xl md:text-3xl italic font-medium tracking-tight text-white/90 leading-snug">"Los números no mienten. <span className="text-neon-cyan">La IA que uso trabaja mientras duermo.</span>"</p>
          <div className="mt-8 flex items-center gap-4"><div className="w-12 h-px bg-white/10" /><span className="font-mono text-xs tracking-widest text-white/30 uppercase">ADAN_CB90</span><div className="w-12 h-px bg-white/10" /></div>
        </motion.div>
      </div>
      <div className="absolute top-10 -left-10 font-sans text-[20vw] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter leading-none -z-0">DATA</div>
    </section>
  );
};

const ServiceCard = ({ service, index, onClick }: { service: any, index: number, onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseY = useSpring(y, { damping: 20, stiffness: 300 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }} className="perspective-1000 h-full">
      <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative noise-bg border border-white/5 p-10 flex flex-col items-start text-left group transition-all duration-500 overflow-hidden cursor-pointer h-full">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0">
          <div className="absolute -inset-[1px] bg-conic-gradient from-neon-cyan via-cyber-purple/50 to-neon-cyan animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-[1px] bg-[#11111a]" />
        </div>
        <div className="relative z-10 w-full flex flex-col h-full">
          <div className="font-mono text-[9px] text-neon-cyan mb-4 tracking-[0.2em] uppercase opacity-60">{service.category}</div>
          <div className="p-4 rounded-xl mb-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 group-hover:border-neon-cyan/30 transition-colors w-fit"><service.icon size={32} className="text-neon-cyan" /></div>
          <h3 className="font-sans text-2xl font-bold mb-3 tracking-tighter uppercase">{service.title}</h3>
          <p className="font-mono text-xs text-white/50 leading-relaxed mb-8 line-clamp-3">{service.desc}</p>
          <div className="mt-auto pt-6 border-t border-white/5 w-full flex items-center justify-between">
            <span className="font-mono text-neon-cyan text-sm">{service.price}</span>
            <button className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 group-hover:text-neon-cyan transition-colors uppercase">Leer Más <ArrowDown size={14} className="-rotate-90 group-hover:translate-x-1 transition-transform" /></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [selectedService, setSelectedService] = useState<any>(null);
  const categories = ['Todos', 'AI Automation', 'Content Creation', 'Branding'];
  const services = [
    { title: "Automatización con IA", category: "AI Automation", desc: "Optimizamos tus procesos operativos mediante agentes autónomos y flujos de trabajo inteligentes que reducen costos.", fullDesc: "Nuestra solución de automatización no solo implementa herramientas, sino que diseña un ecosistema donde la IA se encarga de las tareas repetitivas. Desde la gestión de leads hasta el análisis predictivo de datos, construimos infraestructuras que escalan sin incrementar tus costos fijos.", price: "Desde $1,200", icon: Bot, bullets: ["Desarrollo de Agentes Personalizados", "Integración de LLMs en flujos internos", "Chatbots de Atención al Cliente Pro", "Data Scraping y Análisis Predictivo"], caseStudy: "Empresa de logística redujo un 40% su tiempo de respuesta tras implementar nuestro agente automatizado de atención." },
    { title: "Contenido Digital Viral", category: "Content Creation", desc: "Estrategias de contenido viral basadas en psicología del consumidor y data, diseñadas para convertir seguidores en clientes.", fullDesc: "Creamos piezas de contenido que no solo obtienen vistas, sino que construyen comunidad. Utilizamos técnicas de 'triggering' psicológico y edición dinámica para asegurar que tu mensaje resuene en el ruido digital actual.", price: "Desde $800", icon: Smartphone, bullets: ["Guiones de Alto Impacto para Reels/TikTok", "Copywriting Persuasivo (Storyselling)", "Planificación de Calendarios Mensuales", "Monitorización de Tendencias en Tiempo Real"], caseStudy: "Marca de suplementos alcanzó los 2M de impresiones en su primer mes de estrategia con nuestro equipo." },
    { title: "Estrategia de Marca Personal", category: "Branding", desc: "Construimos tu autoridad digital. Pasas de ser uno más a convertirte en el referente de tu industria mediante un ecosistema.", fullDesc: "Tu marca personal es tu activo más valioso. Definimos tu voz única y proyectamos tu experiencia de manera cohesiva en todas las plataformas para que las oportunidades lleguen a ti, en lugar de tú buscarlas.", price: "Desde $2,500", icon: Target, bullets: ["Auditoría Completa de Presencia Digital", "Definición de Propuesta de Valor Única", "Diseño de Identidad Visual Disruptiva", "Estrategia de Networking y RRPP Digitales"], caseStudy: "CEO de Fintech cuadruplicó sus solicitudes de asesoría tras 3 meses de reposicionamiento de marca." },
    { title: "Producción Multimedia IA", category: "Content Creation", desc: "Videos e imágenes de calidad cinematográfica generados con las herramientas más avanzadas de IA generativa.", fullDesc: "Olvídate de las producciones costosas de meses. Usamos herramientas de generación de video de última generación para crear contenido comercial de alta gama en una fracción del tiempo tradicional.", price: "Desde $1,500", icon: Video, bullets: ["Generación de Video SORA / Runway Gen-3", "Avatar Digitales Hiperrealistas", "Post-producción Automatizada", "Diseño de Assets con Midjourney 6.1"], caseStudy: "Campaña publicitaria realizada íntegramente con IA con un ahorro del 70% en presupuesto de producción." }
  ];
  const filteredServices = filter === 'Todos' ? services : services.filter(s => s.category === filter);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} id="servicios" className="relative py-32 overflow-hidden bg-cyber-dark">
      <div className="absolute inset-0 z-0"><motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]"><video key="servicios-video" autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover opacity-100"><source src="https://ik.imagekit.io/x8axvbbz3/secciones%20naranja.mp4" type="video/mp4" /></video></motion.div><div className="absolute inset-0 bg-cyber-dark/80 backdrop-blur-3xl"></div></div>
      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-20 text-center"><span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Portafolio</span><h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none mb-12">Servicios <span className="text-white/40">Estratégicos</span></h2><div className="flex flex-wrap justify-center gap-4">{categories.map(cat => (<button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2 font-mono text-[10px] tracking-widest uppercase transition-all border border-white/5 rounded-full ${filter === cat ? 'bg-neon-cyan text-cyber-dark border-neon-cyan shadow-[0_0_20px_rgba(0,245,196,0.2)]' : 'hover:border-neon-cyan/50 text-white/50'}`}>{cat}</button>))}</div></header>
        <motion.div 
          layout 
          className="flex lg:grid lg:grid-cols-4 gap-6 overflow-x-auto pb-8 lg:pb-0 scrollbar-hide snap-x snap-mandatory lg:overflow-visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <div key={service.title} className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center lg:snap-align-none flex-1">
                <ServiceCard service={service} index={idx} onClick={() => setSelectedService(service)} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="noise-bg border border-neon-cyan/20 w-full max-w-4xl p-8 md:p-12 relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"><ArrowDown className="rotate-45" size={24} /></button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="font-mono text-neon-cyan text-[10px] tracking-[0.3em] uppercase mb-6">{selectedService.category}</div>
                  <h3 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">{selectedService.title}</h3>
                  <p className="font-mono text-sm text-white/60 leading-relaxed mb-10">{selectedService.fullDesc}</p>
                  <div className="space-y-4 mb-12">{selectedService.bullets.map((b: string, i: number) => (<div key={i} className="flex items-center gap-3"><CheckCircle2 size={16} className="text-neon-cyan" /><span className="font-mono text-xs text-white/80">{b}</span></div>))}</div>
                  <div className="p-6 bg-white/5 border border-white/5 rounded-xl mb-10"><span className="font-mono text-[9px] text-neon-cyan uppercase block mb-3 opacity-60">Resultados Obtenidos</span><p className="font-mono text-xs italic text-white/70">"{selectedService.caseStudy}"</p></div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="aspect-square w-full rounded-2xl bg-linear-to-br from-neon-cyan/10 to-cyber-purple/10 border border-white/10 flex items-center justify-center mb-12 overflow-hidden relative group"><selectedService.icon size={120} className="text-neon-cyan/20 animate-pulse relative z-10" /><div className="absolute inset-0 bg-radial from-neon-cyan/5 to-transparent opacity-50 transition-opacity" /></div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end"><span className="font-mono text-xs text-white/30 uppercase">Inversión Estimada</span><span className="font-sans text-4xl font-black text-neon-cyan">{selectedService.price}</span></div>
                    <button onClick={() => { setSelectedService(null); navigate('/contacto'); }} className="w-full py-5 bg-neon-cyan text-cyber-dark font-mono text-[10px] tracking-[0.4em] font-bold uppercase transition-transform hover:scale-[1.02] shadow-[0_0_30px_rgba(0,245,196,0.3)]">Solicitar Consultoría</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export const ClientsSection = () => {
  const clients = [{ name: "Brand One", icon: Bot }, { name: "Global Tech", icon: Smartphone }, { name: "Creative Studio", icon: Target }, { name: "Future Vision", icon: Video }, { name: "Nexus AI", icon: Bot }, { name: "Digital Edge", icon: Smartphone }];
  return (
    <section className="py-20 border-b border-white/5 bg-[#0c0c14]/50">
      <div className="container mx-auto px-6 text-center">
        <span className="font-mono text-white/20 text-[9px] tracking-[0.3em] uppercase mb-10 block">Con la confianza de referentes industriales</span>
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          {clients.map((client, i) => (<div key={i} className="flex items-center gap-2 group transition-all hover:scale-110 hover:opacity-100"><client.icon size={20} className="text-white group-hover:text-neon-cyan transition-colors" /><span className="font-mono text-[10px] font-bold tracking-widest text-white group-hover:text-white uppercase">{client.name}</span></div>))}
        </div>
      </div>
    </section>
  );
};

export const GradientMesh = () => (
  <div className="absolute inset-0 -z-20 overflow-hidden bg-[#050508]">
    <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#0c0c14] to-[#050508] transition-colors" />
    <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] left-[20%] h-[600px] w-[600px] bg-radial from-[#7b61ff]/12 to-transparent blur-[120px]" />
    <motion.div animate={{ x: [0, -50, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[30%] right-[20%] h-[600px] w-[600px] bg-radial from-[#7b61ff]/8 to-transparent blur-[120px]" />
  </div>
);

export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];
    let animationFrameId: number;
    class Particle {
      x: number; y: number; vx: number; vy: number; radius: number;
      constructor(w: number, h: number) { this.x = Math.random() * w; this.y = Math.random() * h; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.radius = Math.random() * 2; }
      update(w: number, h: number) { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > w) this.vx *= -1; if (this.y < 0 || this.y > h) this.vy *= -1; }
      draw(ctx: any) { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = '#ff6b00'; ctx.fill(); }
    }
    const init = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; particles = []; const particleCount = Math.floor((canvas.width * canvas.height) / 15000); for (let i = 0; i < particleCount; i++) particles.push(new Particle(canvas.width, canvas.height)); };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.globalAlpha = 0.3;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]; p1.update(canvas.width, canvas.height); p1.draw(ctx);
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]; const dx = p1.x - p2.x; const dy = p1.y - p2.y; const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) { ctx.beginPath(); ctx.strokeStyle = '#ff6b00'; ctx.lineWidth = 0.5; ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    window.addEventListener('resize', init); init(); animate();
    return () => { window.removeEventListener('resize', init); cancelAnimationFrame(animationFrameId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />;
};

export const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.h1 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-none mb-4 uppercase select-none ${isGlitching ? 'glitch-active' : ''}`} 
      data-text={text} 
      id="glitch-title" 
      style={{ textShadow: '2px 0 #00f5c4, -2px 0 #7b61ff' }}
    >
      <span className="relative z-10">{text}</span>
    </motion.h1>
  );
};

export const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => { setDisplayedText(text.slice(0, i)); i++; if (i > text.length) clearInterval(typing); }, 100);
    return () => clearInterval(typing);
  }, [text]);
  return (<div className="min-h-[2rem]"><p className="font-mono text-neon-cyan text-base md:text-lg lg:text-xl tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-80" id="typewriter">{displayedText}<span className="animate-pulse">|</span></p></div>);
};

export const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 }); const springY = useSpring(y, { damping: 15, stiffness: 150 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e; const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.15); y.set((clientY - (top + height / 2)) * 0.15);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={reset} style={{ x: springX, y: springY, boxShadow: '0 0 20px rgba(255, 107, 0, 0.2)' }} className={`relative px-12 py-5 bg-transparent group border-2 border-neon-cyan transition-all duration-300 ${className || ''}`} id="magnetic-btn">
      <span className="relative z-10 text-lg font-bold tracking-widest text-white group-hover:text-black transition-colors duration-300 uppercase">{children}</span>
      <div className="absolute inset-0 bg-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.button>
  );
};

export const ScrollIndicator = () => (
  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"><span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40">SCROLL</span><div className="w-[1px] h-20 bg-linear-to-b from-neon-cyan to-transparent animate-pulse" /></div>
);

// --- Home Page ---

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="bg-cyber-dark">
      {/* Hero Section */}
      <section ref={heroRef} id="inicio" className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-full">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-95 scale-110">
              <source src="https://ik.imagekit.io/x8axvbbz3/0508%20(2).mp4?updatedAt=1778287211210" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-cyber-dark/10"></div>
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-20"><GradientMesh /></div>
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-20"><ParticleBackground /></div>

        <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-28 sm:pt-32 lg:pt-0">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            <GlitchText text="ADAN_CB90" />
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.5 }}
              className="mt-4 mb-8 lg:mb-12"
            >
              <Typewriter text="IA Disruptiva · Marca Personal" />
            </motion.div>
            <div className="flex flex-col items-center lg:items-start gap-8 lg:gap-12 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="w-full sm:w-auto"
              >
                <Link to="/contacto" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto">EMPIEZA AHORA</MagneticButton>
                </Link>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="flex flex-wrap justify-center lg:justify-start items-center gap-4 lg:gap-6 text-white/40">
                <div className="flex items-center gap-2 group cursor-pointer hover:text-neon-cyan transition-colors whitespace-nowrap"><Mail size={16} /><span>contact@adan-cb90.io</span></div>
                <div className="hidden sm:block w-6 h-px bg-white/20" /><div className="font-mono text-[10px] uppercase tracking-widest text-white/20 whitespace-nowrap">EST. 2026</div>
              </motion.div>
            </div>
          </div>
          <div className="hidden lg:block h-full"></div>
        </div>
        <ScrollIndicator />
      </section>

      <Reveal><ServicesSection /></Reveal>
      <ClientsSection />
      <Reveal><ResultsSection /></Reveal>
      <Reveal><Proceso /></Reveal>
      <Reveal><TestimonialsSection /></Reveal>
      <Reveal><ContactSection /></Reveal>
    </div>
  );
}
