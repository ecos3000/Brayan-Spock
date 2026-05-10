import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'motion/react';

const pasos = [
  { num: "01", titulo: "DIAGNÓSTICO", desc: "Analizamos tu marca y objetivos en 48 horas", detalle: "Reunión inicial, análisis de tu presencia actual, identificación de oportunidades con IA" },
  { num: "02", titulo: "ESTRATEGIA", desc: "Diseñamos el plan de IA personalizado para ti", detalle: "Selección de herramientas, calendario de contenido, KPIs definidos" },
  { num: "03", titulo: "PRODUCCIÓN", desc: "Creamos el contenido con herramientas de vanguardia", detalle: "Generación con IA, edición, revisión y optimización de cada pieza" },
  { num: "04", titulo: "LANZAMIENTO", desc: "Publicamos, medimos y optimizamos en tiempo real", detalle: "Deploy coordinado, seguimiento de métricas, ajustes inmediatos" },
  { num: "05", titulo: "ESCALA", desc: "Automatizamos lo que funciona, eliminamos lo que no", detalle: "Workflows automatizados, reportes mensuales, crecimiento sostenido" }
];

export default function Proceso() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [activePaso, setActivePaso] = useState<number | null>(null);
  const [hasVisited, setHasVisited] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) setHasVisited(true);
  }, [isInView]);

  // Dash animation for SVG line
  const pathLength = useSpring(useTransform(scrollYProgress, [0.2, 0.5], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      id="proceso-detalle" 
      className="relative py-32 bg-cyber-dark overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <header className="mb-24 text-center">
          <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Workflow</span>
          <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none">
            Proceso <span className="text-white/40">Continuo</span>
          </h2>
        </header>

        {/* Desktop View */}
        <div className="hidden lg:block relative min-h-[400px]">
          {/* SVG Connector Line */}
          <svg className="absolute top-[60px] left-0 w-full h-[2px] z-0 overflow-visible">
            <line 
              x1="5%" 
              y1="50%" 
              x2="95%" 
              y2="50%" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2" 
            />
            <motion.line 
              x1="5%" 
              y1="50%" 
              x2="95%" 
              y2="50%" 
              stroke="#00f5c4" 
              strokeWidth="2" 
              style={{ pathLength }}
              strokeDasharray="1"
            />
          </svg>

          <div className="relative flex justify-between items-start pt-10">
            {pasos.map((paso, idx) => (
              <div 
                key={idx}
                className="relative flex flex-col items-center flex-1"
                onMouseEnter={() => setActivePaso(idx)}
                onMouseLeave={() => setActivePaso(null)}
              >
                {/* Tooltip detail */}
                <AnimatePresence>
                  {activePaso === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-24 w-64 p-5 noise-bg border border-neon-cyan/40 rounded-xl z-30 shadow-[0_0_30px_rgba(0,245,196,0.15)]"
                    >
                      <p className="font-mono text-[11px] text-white/80 leading-relaxed italic">
                        {paso.detalle}
                      </p>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 noise-bg border-r border-b border-neon-cyan/40 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={hasVisited ? { scale: 1 } : { scale: 0 }}
                  transition={{ 
                    delay: idx * 0.2, 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20 
                  }}
                  className={`relative z-10 w-14 h-14 rounded-full border-2 transition-all duration-500 flex items-center justify-center bg-cyber-dark cursor-pointer group
                    ${activePaso === idx ? 'border-neon-cyan shadow-[0_0_25px_#00f5c4]' : 'border-white/10'}`}
                >
                  <span className={`font-mono text-sm font-bold transition-colors duration-300
                    ${activePaso === idx ? 'text-neon-cyan' : 'text-white/40'}`}>
                    {paso.num}
                  </span>
                  
                  {/* Outer ring glow on active */}
                  {activePaso === idx && (
                    <motion.div 
                      layoutId="glow-ring"
                      className="absolute inset-[-10px] border border-neon-cyan/30 rounded-full animate-pulse"
                    />
                  )}
                </motion.div>

                {/* Text Content */}
                <div className="mt-8 text-center px-4">
                  <h4 className={`font-sans text-lg font-bold tracking-tighter uppercase transition-colors duration-300 mb-2
                    ${activePaso === idx ? 'text-neon-cyan' : 'text-white'}`}>
                    {paso.titulo}
                  </h4>
                  <p className="font-mono text-[10px] text-white/40 tracking-wider uppercase leading-tight max-w-[150px] mx-auto">
                    {paso.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col gap-16 relative py-10">
          <div className="absolute top-0 left-6 w-px h-full bg-white/5" />
          
          {pasos.map((paso, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-8 relative"
            >
              <div className="w-12 h-12 rounded-full border border-neon-cyan/30 bg-cyber-dark flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(0,245,196,0.2)]">
                <span className="font-mono text-xs text-neon-cyan font-bold">{paso.num}</span>
              </div>
              
              <div className="flex-1 pt-1">
                <h4 className="font-sans text-xl font-bold text-white uppercase tracking-tighter mb-2">{paso.titulo}</h4>
                <p className="font-mono text-xs text-white/60 mb-4">{paso.desc}</p>
                <div className="p-4 bg-white/5 border border-white/5 rounded-lg">
                  <p className="font-mono text-[10px] text-white/40 italic leading-relaxed">
                    {paso.detalle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-5">
        <div className="w-full h-full grid-bg rotate-12" />
      </div>
    </section>
  );
}
