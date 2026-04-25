import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, X, Loader2, CheckCircle2, ShieldAlert, Info, ChevronDown, Share2, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

interface DiagnosisResult {
  disease: string;
  cause: string;
  severity: "Mild" | "Moderate" | "Severe";
  treatment: string[];
  prevention: string[];
  urdu_summary: string;
}

export default function DiagnosePage() {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [urduOpen, setUrduOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setImage(base64);
      setMimeType(file.type);
      setResult(null);
      setError(null);
      setCheckedSteps([]);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDiagnose = async () => {
    if (!image || !mimeType) return;

    setLoading(true);
    setError(null);
    
    try {
      const base64Data = image.split(",")[1];
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Data, mimeType }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to analyze image");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("Diagnosis Error:", err);
      setError(err.message || "An unexpected error occurred during diagnosis.");
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleShare = () => {
    if (!result) return;
    const text = `Crop Diagnosis: ${result.disease}\nSeverity: ${result.severity}\nCause: ${result.cause}\n\nTreatment:\n${result.treatment.join("\n")}`;
    navigator.clipboard.writeText(text);
    alert("Results copied to clipboard!");
  };

  const reset = () => {
    setImage(null);
    setMimeType(null);
    setResult(null);
    setError(null);
    setCheckedSteps([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-deep">Diagnostic Tool</h1>
        <p className="text-brand-text/70 max-w-lg mx-auto">Upload a high-resolution photo of the affected plant area for precision analysis.</p>
      </motion.div>

      <div className="space-y-8">
        {/* Upload Section */}
        {!result && (
          <motion.div 
            layout
            className="space-y-6"
          >
            {!image ? (
              <div 
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={cn(
                  "border-4 border-dashed border-brand-oat rounded-[40px] p-12 md:p-24 transition-all duration-300 group hover:border-brand-sage hover:bg-brand-sage/5 flex flex-col items-center justify-center gap-6 cursor-pointer",
                  loading && "opacity-50 pointer-events-none"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  accept="image/*"
                />
                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-brand-sage" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-lg font-bold text-brand-deep">Drag & drop your photo</p>
                  <p className="text-sm text-brand-text/50">or click to browse local files</p>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group w-full"
              >
                <div className="bg-white rounded-[40px] p-4 shadow-2xl shadow-brand-deep/5 border border-brand-oat overflow-hidden">
                  <div className="aspect-square md:aspect-video rounded-[32px] overflow-hidden bg-brand-cream">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  {!loading && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setImage(null); }}
                      className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-md rounded-full text-brand-accent hover:bg-brand-accent hover:text-white transition-all shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {image && !loading && (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDiagnose}
                className="w-full py-5 bg-brand-deep text-white rounded-full font-bold text-lg shadow-xl shadow-brand-deep/20 flex items-center justify-center gap-3"
              >
                Diagnose Now
              </motion.button>
            )}
            
            {loading && (
              <div className="flex flex-col items-center gap-6 py-12">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-brand-oat border-t-brand-sage rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-brand-mist animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-xl font-serif italic text-brand-deep">AI is analyzing your crop...</p>
                  <p className="text-sm text-brand-text/50 font-medium tracking-widest uppercase">Consulting 450+ plant varieties</p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[40px] shadow-2xl shadow-brand-deep/5 border border-brand-oat overflow-hidden">
                {/* Header */}
                <div className="bg-brand-cream/50 p-8 md:p-12 border-b border-brand-oat">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-brand-sage">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Diagnostic Match Found</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-deep">{result.disease}</h2>
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }} 
                      transition={{ duration: 2, repeat: Infinity }}
                      className={cn(
                        "px-6 py-2 rounded-full font-bold text-sm border shadow-sm self-start",
                        result.severity === "Mild" && "bg-green-50 text-green-700 border-green-200",
                        result.severity === "Moderate" && "bg-orange-50 text-orange-700 border-orange-200",
                        result.severity === "Severe" && "bg-brand-accent/5 text-brand-accent border-brand-accent/20"
                      )}
                    >
                      {result.severity} Complexity
                    </motion.div>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                  {/* Cause Card */}
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-brand-oat rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                      <ShieldAlert className="w-6 h-6 text-brand-deep" />
                    </div>
                    <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-brand-mist">Root Cause</h3>
                    <p className="text-lg text-brand-deep/80 leading-relaxed italic">"{result.cause}"</p>
                    </div>
                  </div>

                  {/* Treatment Checklist */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-serif font-bold text-brand-deep italic">Treatment Protocol</h3>
                      <span className="text-xs font-bold text-brand-sage">{checkedSteps.length}/{result.treatment.length} Steps Complete</span>
                    </div>
                    <div className="grid gap-4">
                      {result.treatment.map((step, idx) => (
                        <div 
                          key={idx}
                          onClick={() => toggleStep(idx)}
                          className={cn(
                            "group flex items-center gap-4 p-5 rounded-3xl border border-brand-oat transition-all cursor-pointer select-none",
                            checkedSteps.includes(idx) ? "bg-brand-sage/5 border-brand-sage/20" : "hover:border-brand-sage hover:bg-brand-cream/50"
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                            checkedSteps.includes(idx) ? "bg-brand-sage border-brand-sage" : "border-brand-oat bg-white"
                          )}>
                            {checkedSteps.includes(idx) && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <p className={cn(
                            "text-brand-text/80 font-medium transition-all",
                            checkedSteps.includes(idx) && "line-through text-brand-text/40 italic"
                          )}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prevention Tips */}
                  <div className="p-8 bg-brand-cream/30 rounded-[32px] border border-brand-oat space-y-6">
                    <div className="flex items-center gap-3">
                      <Info className="w-5 h-5 text-brand-sage" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-brand-sage">Prevention & Maintenance</h3>
                    </div>
                    <ul className="grid gap-3">
                      {result.prevention.map((tip, idx) => (
                        <li key={idx} className="flex gap-4 text-sm text-brand-text/70 leading-relaxed font-medium">
                          <span className="text-brand-sage">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Urdu Translation */}
                  <div className="border border-brand-oat rounded-3xl overflow-hidden">
                    <button 
                      onClick={() => setUrduOpen(!urduOpen)}
                      className="w-full p-6 flex items-center justify-between bg-white hover:bg-brand-cream/50 transition-colors"
                    >
                      <span className="font-bold text-brand-deep font-sans">اردو میں تفصیل (Urdu Translation)</span>
                      <ChevronDown className={cn("w-5 h-5 text-brand-mist transition-transform", urduOpen && "rotate-180")} />
                    </button>
                    <motion.div 
                      initial={false}
                      animate={{ height: urduOpen ? "auto" : 0 }}
                      className="overflow-hidden bg-brand-cream/20"
                    >
                      <div className="p-8 text-right font-medium text-brand-text/90 leading-loose text-xl bg-white/50 backdrop-blur-sm" dir="rtl">
                        {result.urdu_summary}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-8 md:p-12 bg-brand-oat/20 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={reset}
                    className="flex-1 py-4 px-8 bg-brand-deep text-white rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-text transition-colors shadow-lg shadow-brand-deep/10"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Diagnose Another Crop
                  </button>
                  <button 
                    onClick={handleShare}
                    className="py-4 px-8 bg-white text-brand-deep border border-brand-deep rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-deep hover:text-white transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Result
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="p-6 bg-brand-accent/5 border border-brand-accent/20 rounded-3xl flex items-center gap-4 text-brand-accent font-bold"
          >
            <ShieldAlert className="w-6 h-6" />
            <p>{error}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
