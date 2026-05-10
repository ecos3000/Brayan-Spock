import * as React from 'react';
import { motion } from 'motion/react';

export default function SobreMi() {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6">
      <header className="mb-20">
        <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Biografía</span>
        <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase leading-none">
          Sobre <span className="text-white/40">Mí</span>
        </h2>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-neon-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="aspect-[4/5] bg-linear-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden relative">
            {/* Placeholder for professional photo */}
            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xl uppercase tracking-widest">
              Adan CB90 Photo
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <h3 className="font-sans text-3xl font-bold uppercase tracking-tighter">Pionero en la unión de Creatividad e IA</h3>
          <p className="font-mono text-sm text-white/60 leading-relaxed">
            Con más de 3 años de experiencia en la creación de contenido digital y la implementación de flujos de trabajo automatizados, he ayudado a cientos de marcas a escalar su presencia digital sin sacrificar su recurso más valioso: el tiempo.
          </p>
          <p className="font-mono text-sm text-white/60 leading-relaxed">
            Mi enfoque no es solo técnico, sino estratégico. Combino la psicología del consumidor con las últimas herramientas de IA generativa para crear ecosistemas que no solo se ven bien, sino que venden.
          </p>
          
          <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
            <div>
              <span className="font-mono text-neon-cyan text-[10px] uppercase tracking-widest block mb-2">Visión</span>
              <p className="font-mono text-xs text-white/40">Democratizar el acceso a la tecnología de vanguardia para creadores y empresas.</p>
            </div>
            <div>
              <span className="font-mono text-neon-cyan text-[10px] uppercase tracking-widest block mb-2">Misión</span>
              <p className="font-mono text-xs text-white/40">Optimizar cada segundo del proceso creativo mediante inteligencia artificial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
