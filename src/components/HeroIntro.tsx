import portrait from "@/assets/portrait.png";
import { motion } from "motion/react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useState } from "react";

const HeroIntro = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("zubayerhimel0@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle background glow effect for premium feel */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 py-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

          {/* Portrait Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-4 flex justify-center md:justify-end relative group perspective-1000"
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary/20 hover:-translate-y-2">
              <img
                src={portrait}
                alt="Zubayer Alam Portrait"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="absolute -bottom-5 right-10 md:-bottom-6 md:-right-6 bg-background/80 backdrop-blur-md border border-border shadow-xl rounded-full px-4 py-2.5 flex items-center gap-2.5 z-20"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 m-auto"></span>
              </div>
              <span className="text-xs font-mono font-medium tracking-tight text-foreground/90">Available for work</span>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <div className="md:col-span-8 space-y-8 md:space-y-10 lg:pl-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-primary"></span>
                <p className="font-body text-sm text-primary tracking-widest uppercase font-medium">
                  Senior Software Engineer
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl md:text-7xl lg:text-[7rem] font-display font-medium tracking-tighter text-foreground leading-[0.9] -ml-1"
              >
                Zubayer <br className="hidden md:block" />
                <span className="text-muted-foreground/40 font-light">Alam.</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative pl-6 md:pl-8"
            >
              {/* Animated left border */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-[2px] bg-gradient-to-b from-primary to-primary/50"
              />

              <div className="space-y-5 max-w-2xl">
                <p className="font-body text-md leading-relaxed text-foreground/80">
                  <span className="font-display text-lg text-foreground font-medium italic pr-2">Building exceptional web experiences.</span>
                  I craft performant, accessible, and user-centric applications with modern JavaScript frameworks.
                  My expertise spans React, Next.js, and Vue.js, with solid backend capabilities to deliver full-stack solutions.
                </p>
                <p className="font-body text-md text-muted-foreground leading-relaxed">
                  With years of experience shipping production-grade software, I focus on writing clean,
                  maintainable code and creating intuitive interfaces that users love. Passionate about
                  developer experience, performance optimization, and staying current with the evolving
                  frontend ecosystem.
                </p>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/zubayerhimel" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 group flex gap-1 items-center">
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-300 transition-all" />
              </a>
              <a href="https://linkedin.com/in/zubayerhimel" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 group flex gap-1 items-center">
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-300 transition-all" />
              </a>
              <a href="https://twitter.com/zubayerhimel0" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 group flex gap-1 items-center">
                Twitter/X
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-300 transition-all" />
              </a>
              <div className="group flex items-center gap-1 group/email">
                <a href="mailto:zubayerhimel0@gmail.com" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 flex gap-1 items-center">
                  Email
                </a>
                <button onClick={handleCopyEmail} className="opacity-0 group-hover/email:opacity-100 group-hover/email:translate-x-0.5 transition-transform duration-300 transition-all text-muted-foreground hover:text-foreground transition-opacity" title="Copy email address" aria-label="Copy email address">
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
