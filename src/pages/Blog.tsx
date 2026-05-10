import * as React from 'react';
import Proceso from '../components/Proceso';

export default function Blog() {
  return (
    <div className="pt-20">
       <div className="container mx-auto px-6 py-20 text-center">
         <span className="font-mono text-neon-cyan text-xs tracking-[0.4em] uppercase mb-4 block">Artículos</span>
         <h2 className="font-sans text-5xl md:text-7xl font-extrabold tracking-tighter uppercase mb-12">
           Blog <span className="text-white/40">IA</span>
         </h2>
         <p className="font-mono text-sm text-white/40 max-w-xl mx-auto">
           Próximamente compartiremos las últimas novedades, tutoriales y estrategias sobre el ecosistema de Inteligencia Artificial.
         </p>
       </div>
       <Proceso />
    </div>
  );
}
