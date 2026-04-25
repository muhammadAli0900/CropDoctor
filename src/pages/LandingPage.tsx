import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Upload, Search, CheckCircle, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-6 h-6 text-white" />,
    title: "Snap Photo",
    desc: "Take a clear picture of the infected crop.",
    color: "bg-brand-deep"
  },
  {
    icon: <Search className="w-6 h-6 text-white" />,
    title: "AI Analysis",
    desc: "Our neural engine scans for pathology.",
    color: "bg-brand-sage"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    title: "Get Cure",
    desc: "Receive a science-backed treatment plan.",
    color: "bg-brand-mist"
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-[84px] font-serif leading-[0.9] text-brand-deep">
              Heal your <br/><span className="italic">harvest</span> with AI.
            </h1>
            <p className="text-lg text-brand-text/70 max-w-md leading-relaxed">
              Advanced computer vision trained on millions of plant specimens. Instant diagnosis and science-backed treatment plans for your crops.
            </p>
          </div>

          <div className="flex gap-4">
            <Link to="/diagnose">
              <motion.button 
                whileHover={{ x: 5 }}
                className="group flex items-center gap-2 px-8 py-4 bg-brand-deep text-white rounded-full font-bold shadow-xl shadow-brand-deep/20"
              >
                Diagnose Your Crop
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="p-4 bg-white/60 border border-brand-oat rounded-2xl backdrop-blur-md"
              >
                <div className={`w-8 h-8 ${step.color} rounded-lg mb-3 flex items-center justify-center shadow-lg shadow-black/5`}>
                  <span className="text-white text-[10px] font-bold">0{idx + 1}</span>
                </div>
                <p className="text-sm font-bold text-brand-deep">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hero Visual Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative lg:block"
        >
          <div className="bg-white rounded-[40px] shadow-2xl shadow-brand-deep/5 p-8 border border-brand-oat relative z-10 w-full max-w-md mx-auto">
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-mist mb-1">Sample Diagnosis</span>
                <h2 className="text-2xl font-serif font-bold text-brand-deep">Late Blight</h2>
              </div>
              <span className="px-4 py-1 bg-brand-accent/10 text-brand-accent text-xs font-bold rounded-full border border-brand-accent/20">
                Severe Case
              </span>
            </div>

            <div className="aspect-video bg-brand-cream rounded-3xl mb-6 overflow-hidden border border-brand-oat flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/20 to-transparent" />
              <img 
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000" 
                alt="Late Blight Sample"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1 bg-brand-accent rounded-full" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase text-brand-deep mb-1">Immediate Action</h4>
                  <p className="text-sm text-brand-text/70 leading-snug">Apply organic copper-based fungicide to healthy plants.</p>
                </div>
              </div>
              <div className="h-[1px] bg-brand-oat w-full" />
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-deep" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-sage" />
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-mist" />
                </div>
                <span className="text-[10px] font-medium text-brand-sage italic">Verified by Scientists</span>
              </div>
            </div>
          </div>
          {/* Decorative blur */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-sage rounded-full blur-[80px] opacity-40" />
        </motion.div>
      </section>

      {/* How it Works Cards Section */}
      <section className="px-6 md:px-12 py-20 bg-brand-oat/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-sage">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-deep italic">How it works.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-3xl border border-brand-oat shadow-xl shadow-brand-deep/5 space-y-6"
              >
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  {step.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif font-bold text-brand-deep">{step.title}</h3>
                  <p className="text-brand-text/70 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
