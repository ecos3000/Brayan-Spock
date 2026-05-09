/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useInView, animate, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Mail, ArrowDown, Bot, Smartphone, Target, Video, CheckCircle2, ChevronDown, Quote, Instagram, Twitter, Linkedin, Github, Send, Loader2, PartyPopper } from 'lucide-react';

// --- Components ---

/**
 * TimelineStep Component for individual steps
 */
const TimelineStep = ({ step, index }: { key?: React.Key, step: any, index: number }) => {
  return (
    <div className="relative flex flex-col items-center flex-1 group">
      {/* Tooltip Card (Hidden by default, shown on hover/active) */}
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        whileHover={{ opacity: 1, y: -10, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute bottom-20 w-48 p-4 noise-bg border border-neon-cyan/20 rounded-lg pointer-events-none z-20 hidden lg:block"
      >
        <div className="font-mono text-[10px] text-neon-cyan mb-2 tracking-widest uppercase">{step.subtitle}</div>
        <p className="font-mono text-[11px] text-white/60 leading-relaxed">
          {step.description}
        </p>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 noise-bg border-r border-b border-neon-cyan/20 rotate-45" />
      </motion.div>

      {/* Circle Indicator */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
        className="relative z-10 w-12 h-12 rounded-full border-2 border-white/10 noise-bg flex items-center justify-center font-sans font-bold group-hover:border-neon-cyan group-hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all duration-300 pointer-events-auto cursor-help"
      >
        <span className="group-hover:text-neon-cyan transition-colors">{index + 1}</span>
      </motion.div>

      {/* Label (Desktop: Bottom) */}
      <div className="mt-6 text-center">
        <h4 className="font-sans text-sm md:text-md font-bold tracking-tighter uppercase group-hover:text-neon-cyan transition-colors">
          {step.title}
        </h4>
      </div>
    </div>
  );
};

/**
 * How I Work Section with Timeline
 */
const TimelineSection = () => {
  const steps = [
    { 
      title: "Diagnóstico", 
      subtitle: "48H AUDIT", 
      description: "Analizamos tu presencia digital, competencia y cuellos de botella mediante auditoría manual y herramientas de IA." 
    },
    { 
      title: "Estrategia", 
      subtitle: "CUSTOM BLUEPRINT", 
      description: "Diseñamos un plan de contenido y automatización a medida, alineado con tus objetivos de escala reales." 
    },
    { 
      title: "Producción", 
      subtitle: "AI WORKFLOW", 
      description: "Ejecutamos con tecnología de vanguardia para crear piezas de alto impacto en una fracción del tiempo tradicional." 
    },
    { 
      title: "Lanzamiento", 
      subtitle: "OPTIMIZATION", 
      description: "Publicamos bajo una estrategia de distribución omnicanal, midiendo retención y CTR para ajustar el enfoque." 
    },
    { 
      title: "Escala", 
      subtitle: "AUTOMATION", 
      description: "Sistematizamos lo que funciona para que tu marca crezca de forma orgánica y recurrente sin sacrificar tu tiempo." 
    },
  ];

  return (
    <section id="blog" className="relative py-32 bg-cyber-dark overflow-hidden border-b border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">El Método</span>
          <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none">
            Cómo <span className="text-white/40">Trabajo</span>
          </h2>
        </header>

        {/* Timeline Container (Desktop) */}
        <div className="hidden lg:block relative py-20 px-10">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2" />
          
          {/* Animated Connecting Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 w-full h-[2px] bg-linear-to-r from-neon-cyan via-cyber-purple to-neon-cyan -translate-y-1/2 origin-left z-0"
          />

          <div className="relative flex justify-between gap-4">
            {steps.map((step, idx) => (
              <TimelineStep key={idx} step={step} index={idx} />
            ))}
          </div>
        </div>

        {/* Timeline Container (Mobile) */}
        <div className="lg:hidden flex flex-col gap-12 relative px-4">
          {/* Vertical Track Line */}
          <div className="absolute top-0 left-8 w-px h-full bg-white/5" />
          
          {/* Animated Vertical Line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-8 w-[2px] h-full bg-linear-to-b from-neon-cyan via-cyber-purple to-neon-cyan origin-top z-0"
          />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-8 relative z-10"
            >
              <div className="w-8 h-8 rounded-full noise-bg border border-white/20 flex items-center justify-center font-mono text-xs shrink-0 bg-cyber-dark">
                {idx + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-sans text-xl font-bold uppercase tracking-tighter text-white mb-2">{step.title}</h4>
                <div className="font-mono text-[10px] text-neon-cyan mb-3 tracking-widest uppercase">{step.subtitle}</div>
                <p className="font-mono text-xs text-white/40 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Testimonial Card Component
 */
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

/**
 * Testimonials Section with Marquee
 */
const TestimonialsSection = () => {
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} id="testimonios" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <video 
            key="testimonios-video"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-100"
          >
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
        {/* Row 1: Left to Right */}
        <div className="flex gap-6 animate-marquee-right">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>

        {/* Row 2: Right to Left */}
        <div className="flex gap-6 animate-marquee-left">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * Scramble Text Component
 */
const ScrambleText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let frame = 0;
    const duration = 40;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < (frame / duration) * text.length) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
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

/**
 * Contact Section Component
 */
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'name' && value.toLowerCase() === 'hola') {
      setShowEasterEgg(true);
    } else if (name === 'name') {
      setShowEasterEgg(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 2000);
  };

  const socials = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} id="contacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <video 
            key="contacto-video"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-100"
          >
            <source src="https://ik.imagekit.io/x8axvbbz3/secciones%20naranja.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[#0c0c14]/10"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Info */}
          <div className="flex flex-col justify-center">
            <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Contacto</span>
            <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-tight mb-8">
              <ScrambleText text="Hablemos de tu proyecto" />
            </h2>
            
            <p className="font-mono text-sm text-white/40 leading-relaxed mb-12 max-w-md">
              ¿Listo para desbloquear el potencial de la IA en tu marca? Cuéntame tu visión y diseñaremos la arquitectura necesaria para hacerla realidad.
            </p>

            <div className="space-y-6">
              {socials.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  className="flex items-center gap-4 group w-fit"
                >
                  <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-neon-cyan/50 group-hover:text-neon-cyan group-hover:scale-110 transition-all duration-300">
                    <social.icon size={18} />
                  </div>
                  <span className="font-mono text-xs tracking-widest text-white/30 group-hover:text-white transition-colors">
                    {social.label.toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            {/* Background particles for form (simplified with CSS) */}
            <div className="absolute inset-0 bg-neon-cyan/2 blur-[100px] -z-10 rounded-full" />
            
            <form onSubmit={handleSubmit} className="noise-bg border border-white/5 p-8 md:p-12 space-y-10">
              <div className="relative group">
                <input 
                  required
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full py-2 font-mono text-sm terminal-input peer" 
                  placeholder=" " 
                />
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-active:-top-4 peer-[:not(:placeholder-shown)]:-top-4 peer-focus:text-neon-cyan">
                  NOMBRE COMPLETO
                </label>
                
                <AnimatePresence>
                  {showEasterEgg && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-0 top-2 flex items-center gap-2 font-mono text-[10px] text-neon-cyan"
                    >
                      <PartyPopper size={14} />
                      <span>¡HOLA! ¿COMENZAMOS?</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative group">
                <input 
                  required
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full py-2 font-mono text-sm terminal-input peer" 
                  placeholder=" " 
                />
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-active:-top-4 peer-[:not(:placeholder-shown)]:-top-4 peer-focus:text-neon-cyan">
                  EMAIL DE CONTACTO
                </label>
              </div>

              <div className="relative group">
                <select 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full py-2 font-mono text-sm terminal-input peer appearance-none"
                >
                  <option value="" disabled hidden></option>
                  <option value="automatizacion" className="bg-cyber-dark">Automatización IA</option>
                  <option value="contenido" className="bg-cyber-dark">Contenido Digital</option>
                  <option value="marca" className="bg-cyber-dark">Marca Personal</option>
                  <option value="otros" className="bg-cyber-dark">Otros</option>
                </select>
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-active:-top-4 peer-[:not(:placeholder-shown)]:-top-4 peer-focus:text-neon-cyan">
                  ¿QUÉ NECESITAS?
                </label>
                <ChevronDown size={14} className="absolute right-0 top-3 text-white/20" />
              </div>

              <div className="relative group">
                <textarea 
                  required
                  rows={2}
                  name="message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full py-2 font-mono text-sm terminal-input peer resize-none" 
                  placeholder=" " 
                />
                <label className="absolute left-0 top-2 font-mono text-[10px] tracking-widest text-white/30 uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-active:-top-4 peer-[:not(:placeholder-shown)]:-top-4 peer-focus:text-neon-cyan">
                  TU MENSAJE
                </label>
              </div>

              <button 
                disabled={status === 'loading'}
                className="w-full py-4 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-[0.3em] uppercase relative overflow-hidden group hover:bg-neon-cyan/10 transition-all flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : status === 'success' ? (
                  <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }}>MENSAJE ENVIADO ✓</motion.span>
                ) : (
                  <>ENVIAR MENSAJE <Send size={14} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Animated Counter Component
 */
const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        onComplete: () => setComplete(true),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span 
        className={`font-sans text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter tabular-nums transition-all duration-700 ${
          complete ? 'counter-glow text-white' : 'text-white/80'
        }`}
      >
        {displayValue.toLocaleString()}
        <span className="text-neon-cyan">{suffix}</span>
      </span>
    </div>
  );
};

/**
 * Results/Metrics Section
 */
const ResultsSection = () => {
  const metrics = [
    { value: 19000, suffix: "+", label: "SEGUIDORES ORGÁNICOS" },
    { value: 6600000, suffix: "+", label: "VISTAS UN SOLO VIDEO" },
    { value: 195, suffix: "+", label: "PUBLICACIONES" },
    { value: 3, suffix: "+", label: "AÑOS CREANDO CONTENIDO" },
  ];

  return (
    <section id="resultados" className="relative py-32 bg-[#0c0c14] grid-bg overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 items-start">
          {metrics.map((metric, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center">
              {/* Vertical Separator */}
              {idx < metrics.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-px -translate-y-1/2 w-px h-32 bg-linear-to-b from-transparent via-white/10 to-transparent" />
              )}
              
              <Counter value={metric.value} suffix={metric.suffix} />
              <span className="mt-4 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-32 flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <Quote className="text-neon-cyan mb-8 opacity-20" size={40} />
          <p className="font-sans text-2xl md:text-3xl italic font-medium tracking-tight text-white/90 leading-snug">
            "Los números no mienten. <span className="text-neon-cyan">La IA que uso trabaja mientras duermo.</span>"
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-px bg-white/10" />
            <span className="font-mono text-xs tracking-widest text-white/30 uppercase">ADAN_CB90</span>
            <div className="w-12 h-px bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Decorative background text */}
      <div className="absolute -bottom-10 right-0 font-sans text-[25vw] font-black text-white/[0.01] pointer-events-none select-none uppercase tracking-tighter leading-none -z-0">
        Results
      </div>
    </section>
  );
};

/**
 * Service Card Component with 3D Tilt and Expand logic
 */
interface ServiceProps {
  key?: React.Key;
  service: {
    icon: any;
    title: string;
    desc: string;
    price: string;
    bullets: string[];
    color: string;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { damping: 20, stiffness: 300 });
  const mouseY = useSpring(y, { damping: 20, stiffness: 300 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    x.set(clientX / width - 0.5);
    y.set(clientY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative noise-bg border border-white/5 p-8 flex flex-col items-start text-left group transition-all duration-500 overflow-hidden ${
          isExpanded ? 'h-auto' : 'h-[420px]'
        }`}
      >
        {/* Animated Border Gradient (visible on hover) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0">
          <div className="absolute -inset-[1px] bg-conic-gradient from-neon-cyan via-cyber-purple/50 to-neon-cyan animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-[1px] bg-[#11111a]" />
        </div>

        <div className="relative z-10 w-full flex flex-col h-full">
          {/* Icon */}
          <div className={`p-4 rounded-xl mb-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 group-hover:border-neon-cyan/30 transition-colors`}>
            <service.icon size={32} className="text-neon-cyan" />
          </div>

          {/* Title & Desc */}
          <h3 className="font-sans text-2xl font-bold mb-3 tracking-tighter uppercase">{service.title}</h3>
          <p className="font-mono text-xs text-white/50 leading-relaxed mb-6">
            {service.desc}
          </p>

          <div className="mt-auto pt-6 border-t border-white/5 w-full flex items-center justify-between">
            <span className="font-mono text-neon-cyan text-sm">{service.price}</span>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40 hover:text-white transition-colors uppercase group/btn"
            >
              {isExpanded ? 'Ver Menos' : 'Ver Más'}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown size={14} />
              </motion.div>
            </button>
          </div>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden w-full"
              >
                <div className="pt-8 space-y-4">
                  {service.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-neon-cyan mt-0.5 shrink-0" />
                      <span className="font-mono text-[11px] text-white/70">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Services Section Component
 */
const ServicesSection = () => {
  const services = [
    {
      title: "Automatización con IA",
      desc: "Optimizamos tus procesos operativos mediante agentes autónomos y flujos de trabajo inteligentes que reducen costos y errores humanos.",
      price: "Desde $1,200",
      icon: Bot,
      color: "#ff6b00",
      bullets: [
        "Desarrollo de Agentes Personalizados",
        "Integración de LLMs en flujos internos",
        "Chatbots de Atención al Cliente Pro",
        "Data Scraping y Análisis Predictivo"
      ]
    },
    {
      title: "Contenido Digital que Vende",
      desc: "Estrategias de contenido viral basadas en psicología del consumidor y data, diseñadas para convertir seguidores en clientes fieles.",
      price: "Desde $800",
      icon: Smartphone,
      color: "#7b61ff",
      bullets: [
        "Guiones de Alto Impacto para Reels/TikTok",
        "Copywriting Persuasivo (Storyselling)",
        "Planificación de Calendarios Mensuales",
        "Monitorización de Tendencias en Tiempo Real"
      ]
    },
    {
      title: "Estrategia de Marca Personal",
      desc: "Construimos tu autoridad digital. Pasas de ser uno más a convertirte en el referente de tu industria mediante un ecosistema sólido.",
      price: "Desde $2,500",
      icon: Target,
      color: "#ff6b00",
      bullets: [
        "Auditoría Completa de Presencia Digital",
        "Definición de Propuesta de Valor Única",
        "Diseño de Identidad Visual Disruptiva",
        "Estrategia de Networking y RRPP Digitales"
      ]
    },
    {
      title: "Producción con IA",
      desc: "Videos e imágenes de calidad cinematográfica generados con las herramientas más avanzadas de IA generativa para reducir tiempos.",
      price: "Desde $1,500",
      icon: Video,
      color: "#7b61ff",
      bullets: [
        "Generación de Video SORA / Runway Gen-3",
        "Avatar Digitales Hiperrealistas",
        "Post-producción Automatizada",
        "Diseño de Assets con Midjourney 6.1"
      ]
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={sectionRef} id="servicios" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <video 
            key="servicios-video"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-100"
          >
            <source src="https://ik.imagekit.io/x8axvbbz3/secciones%20naranja.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="absolute inset-0 bg-[#0c0c14]/10"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Capacidades</span>
            <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none">
              Arquitectura de <br /> <span className="text-white/40">Soluciones IA</span>
            </h2>
          </div>
          <div className="md:w-1/3">
            <p className="font-mono text-xs text-white/40 leading-relaxed">
              No implementamos tecnología por moda. Diseñamos sistemas que generan ROIs tangibles fusionando creatividad humana y potencia de silicio.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} index={idx} />
          ))}
        </div>
      </div>

      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 font-sans text-[20vw] font-black text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter leading-none -z-0">
        Services
      </div>
    </section>
  );
};

/**
 * Navbar Component
 */
const GradientMesh = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden bg-[#050508]">
      {/* Base Layer */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#0c0c14] to-[#050508] transition-colors" />
      
      {/* Spotlight circles */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[20%] h-[600px] w-[600px] bg-radial from-[#7b61ff]/12 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] right-[20%] h-[600px] w-[600px] bg-radial from-[#7b61ff]/8 to-transparent blur-[120px]"
      />
    </div>
  );
};

/**
 * Constellation Particle Background
 */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6b00';
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.3;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(canvas.width, canvas.height);
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = '#ff6b00';
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10 pointer-events-none" />;
};

/**
 * Glitch Text Component
 */
const GlitchText = ({ text }: { text: string }) => {
  return (
    <h1 
      className="relative font-sans text-5xl md:text-7xl lg:text-[140px] font-black tracking-tighter leading-none mb-4 uppercase select-none glitch-active"
      data-text={text}
      id="glitch-title"
      style={{ textShadow: '2px 0 #ff6b00, -2px 0 #ff00c1' }}
    >
      <span className="relative z-10">{text}</span>
    </h1>
  );
};

/**
 * Typewriter Subtitle
 */
const Typewriter = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, 100);
    return () => clearInterval(typing);
  }, [text]);

  return (
    <div className="mb-12 h-8">
      <p className="font-mono text-neon-cyan text-lg md:text-xl tracking-[0.3em] uppercase opacity-80" id="typewriter">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

/**
 * Magnetic Button
 */
const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distX = clientX - centerX;
    const distY = clientY - centerY;
    
    x.set(distX * 0.15);
    y.set(distY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, boxShadow: '0 0 20px rgba(255, 107, 0, 0.2)' }}
      className={`relative px-12 py-5 bg-transparent group border-2 border-neon-cyan transition-all duration-300 ${className || ''}`}
      id="magnetic-btn"
    >
      <span className="relative z-10 text-lg font-bold tracking-widest text-white group-hover:text-black transition-colors duration-300 uppercase">
        {children}
      </span>
      <div className="absolute inset-0 bg-neon-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.button>
  );
};

/**
 * Scroll Indicator
 */
const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
      <span className="font-mono text-[10px] tracking-[0.5em] uppercase opacity-40">SCROLL</span>
      <div className="w-[1px] h-20 bg-linear-to-b from-neon-cyan to-transparent animate-pulse" />
    </div>
  );
};

/**
 * Navbar Component
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const navLinks = [
    { label: 'INICIO', id: 'inicio', path: '#inicio' },
    { label: 'SERVICIOS', id: 'servicios', path: '/servicios.html' },
    { label: 'RESULTADOS', id: 'resultados', path: '/resultados.html' },
    { label: 'BLOG', id: 'blog', path: '/blog.html' },
    { label: 'SOBRE MÍ', id: 'sobre-mi', path: '/sobre-mi.html' },
    { label: 'CONTACTO', id: 'contacto', path: '#contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      
      // Basic active section detection
      const sections = navLinks
        .filter(link => link.path.startsWith('#'))
        .map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/5 py-4' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#inicio" 
          className="font-mono text-xl font-bold tracking-tighter text-neon-cyan z-50"
          onClick={() => setActiveSection('inicio')}
        >
          ADAN_CB90
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.path}
              onClick={() => {
                if (link.path.startsWith('#')) {
                  setActiveSection(link.id);
                }
              }}
              className={`font-mono text-xs tracking-widest transition-colors nav-underline relative ${
                activeSection === link.id ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && link.path.startsWith('#') && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <a 
            href="#contacto"
            className="group relative px-6 py-2 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest overflow-hidden nav-button-fill transition-colors"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">TRABAJEMOS</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden relative z-50 w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div 
            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-white origin-center" 
          />
          <motion.div 
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-full h-0.5 bg-white" 
          />
          <motion.div 
            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-full h-0.5 bg-white origin-center" 
          />
        </button>

        {/* Mobile menu overlay */}
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-cyber-dark z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.path}
              onClick={() => {
                if (link.path.startsWith('#')) {
                  setActiveSection(link.id);
                }
                setIsMenuOpen(false);
              }}
              className="font-mono text-2xl tracking-[0.2em] text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contacto"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 px-8 py-4 border border-neon-cyan text-neon-cyan font-mono text-lg tracking-widest"
          >
            TRABAJEMOS
          </a>
        </motion.div>
      </div>
    </nav>
  );
};

// --- Main App ---

export default function App() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="bg-cyber-dark min-h-screen selection:bg-neon-cyan/30">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} id="inicio" className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-95 scale-110"
            >
              <source src="https://ik.imagekit.io/x8axvbbz3/0508%20(2).mp4?updatedAt=1778287211210" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-cyber-dark/10"></div>
        </div>
        
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-20">
          <GradientMesh />
        </div>
        
        <div className="absolute inset-0 z-[2] pointer-events-none opacity-20">
          <ParticleBackground />
        </div>

        {/* Hero Content - Shifted to side to avoid covering center */}
        <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 pointer-events-none pt-20 lg:pt-0">
          <div className="flex flex-col items-start text-left pointer-events-auto max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlitchText text="ADAN_CB90" />
            </motion.div>
            
            <div className="mt-4 mb-12">
              <div data-scramble className="opacity-0 h-0 overflow-hidden">IA Disruptiva · Marca Personal</div>
              <Typewriter text="IA Disruptiva · Marca Personal" />
            </div>
            
            <div className="flex flex-col items-start gap-12">
              <MagneticButton className="magnetic">EMPIEZA AHORA</MagneticButton>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-6 text-white/40"
              >
                <div className="flex items-center gap-2 group cursor-pointer hover:text-neon-cyan">
                  <Mail size={16} />
                  <span className="font-mono text-xs">contact@adan-cb90.io</span>
                </div>
                <div className="w-6 h-px bg-white/20" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                  EST. 2026
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Right side left empty to show video subject in center/right */}
          <div className="hidden lg:block h-full"></div>
        </div>

        <ScrollIndicator />
        
        {/* Corner UI Elements */}
        <div className="absolute top-10 left-10 hidden xl:block reveal">
          <div className="flex items-center gap-4 text-white/20">
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center font-mono text-[10px]">90</div>
            <div className="h-px w-20 bg-white/10" />
            <div className="font-mono text-[10px] tracking-widest">PROTOCOL_ACTIVE</div>
          </div>
        </div>
        
        <div className="absolute top-10 right-10 hidden xl:block reveal">
          <div className="font-mono text-[10px] text-white/20 text-right leading-relaxed" data-scramble>
            LATENCY: 12ms<br />
            NEURO_SYNC: 98.4%<br />
            CORE: STABLE
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="reveal">
        <ServicesSection />
      </div>
      
      {/* Results Section */}
      <div className="reveal">
        <ResultsSection />
      </div>

      {/* How I Work Section */}
      <div className="reveal">
        <TimelineSection />
      </div>

      {/* Testimonials Marquee */}
      <div className="reveal">
        <TestimonialsSection />
      </div>

      {/* Contact Section */}
      <div className="reveal">
        <ContactSection />
      </div>
    </main>
  );
}
