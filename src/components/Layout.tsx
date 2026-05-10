import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'INICIO', path: '/' },
    { label: 'SERVICIOS', path: '/servicios' },
    { label: 'RESULTADOS', path: '/resultados' },
    { label: 'BLOG', path: '/blog' },
    { label: 'SOBRE MÍ', path: '/sobre-mi' },
    { label: 'CONTACTO', path: '/contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
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
        <Link 
          to="/" 
          className="font-mono text-xl font-bold tracking-tighter text-neon-cyan z-50"
        >
          ADAN_CB90
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-mono text-xs tracking-widest transition-colors nav-underline relative ${
                location.pathname === link.path ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <Link 
            to="/contacto"
            className="group relative px-6 py-2 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest overflow-hidden nav-button-fill transition-colors"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">TRABAJEMOS</span>
          </Link>
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-cyber-dark z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-mono text-2xl tracking-[0.2em] text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 px-8 py-4 border border-neon-cyan text-neon-cyan font-mono text-lg tracking-widest"
              >
                TRABAJEMOS
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-cyber-dark min-h-screen selection:bg-neon-cyan/30">
      <Navbar />
      {children}
      {/* Footer can go here if needed */}
    </main>
  );
}
