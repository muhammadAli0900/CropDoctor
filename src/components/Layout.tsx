import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Leaf } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream relative overflow-x-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-oat rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute top-1/2 -left-24 w-80 h-80 bg-brand-mist rounded-full blur-[100px] opacity-20 -z-10" />

      <nav className="w-full px-6 md:px-12 py-8 flex justify-between items-center z-50">
        <Link to="/" className="flex flex-col group">
          <span className="text-2xl md:text-3xl font-serif italic font-bold tracking-tight text-brand-deep group-hover:text-brand-sage transition-colors">
            Crop Doctor
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-sage">
            Diagnose. Treat. Grow.
          </span>
        </Link>
        <div className="flex gap-4 md:gap-8 items-center text-sm font-medium">
          <Link to="/" className="hidden md:block hover:text-brand-deep transition-colors text-brand-text/70 hover:text-brand-text">How it works</Link>
          <Link to="/diagnose">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-brand-deep text-white rounded-full text-sm font-semibold hover:bg-brand-text shadow-lg shadow-brand-deep/20 transition-colors"
            >
              {location.pathname === '/diagnose' ? 'Diagnosis Active' : 'Launch Tool'}
            </motion.button>
          </Link>
        </div>
      </nav>

      <main className="flex-1 relative z-10">
        {children}
      </main>

      <footer className="w-full px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center md:items-end border-t border-brand-oat bg-white/40 backdrop-blur-sm gap-4">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-[10px] font-bold text-brand-mist uppercase tracking-widest">Regional Accuracy</p>
          <p className="text-sm font-medium text-brand-deep">Optimized for Arable Lands Worldwide</p>
        </div>
        <div className="text-[10px] text-brand-mist uppercase tracking-widest font-bold text-center">
          Powered by Gemini 1.5 Flash | Built for Google AI Seekho
        </div>
      </footer>
    </div>
  );
}
