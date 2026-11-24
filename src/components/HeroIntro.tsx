import { ArrowUpRight, Check, Copy } from "lucide-react";
import * as m from "motion/react-m";
import HeroMonogram from "@/components/HeroMonogram";
import { MarginNote } from "@/components/MarginNote";
import { EMAIL } from "@/data/contact";
import { useCopy } from "@/hooks/use-copy";

const HeroIntro = () => {
  const { copied, copy } = useCopy();

  const handleCopyEmail = async () => {
    if (!(await copy(EMAIL))) window.location.href = `mailto:${EMAIL}`;
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle background glow effect for premium feel */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="container max-w-6xl mx-auto px-6 py-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Monogram Column */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5 flex flex-col items-center md:items-end gap-10"
          >
            <div className="relative w-80 max-w-full md:w-full md:max-w-[26rem]">
              <HeroMonogram className="w-full h-auto text-foreground" />
              <MarginNote arrow="up-right" className="-left-6 -bottom-24">
                {"it turns away\nfrom your cursor"}
              </MarginNote>
            </div>

            {/* Status Badge */}
            <m.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              className="bg-background/80 backdrop-blur-md border border-border shadow-xl rounded-full px-4 py-2.5 flex items-center gap-2.5"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 m-auto"></span>
              </div>
              <span className="text-xs font-mono font-medium tracking-tight text-foreground/90">
                Available for work
              </span>
            </m.div>
          </m.div>

          {/* Text Column */}
          <div className="md:col-span-7 space-y-8 md:space-y-10 lg:pl-8">
            <div className="space-y-4">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-8 bg-primary"></span>
                <p className="font-body text-sm text-primary tracking-widest uppercase font-medium">Product engineer</p>
              </m.div>

              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-6xl md:text-7xl lg:text-[7rem] font-display font-medium tracking-tighter text-foreground leading-[0.9] md:leading-none -ml-1"
              >
                Zubayer <br className="hidden md:block" />
                <span className="text-muted-foreground/40 font-light">Alam.</span>
              </m.h1>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative pl-6 md:pl-8"
            >
              {/* Animated left border */}
              <m.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-[2px] bg-linear-to-b from-primary to-primary/50"
              />

              <div className="space-y-5 max-w-2xl">
                <p className="font-body text-md leading-relaxed text-foreground/80">
                  <span className="font-display text-lg text-foreground font-medium italic pr-2">
                    I build fast, accessible web apps.
                  </span>
                  Since 2021 I've shipped CRM and SaaS products for BAT Bangladesh and Unilever, and sites for Jaguar
                  Land Rover and leading pharmaceutical brands.
                </p>
                <p className="font-body text-md text-muted-foreground leading-relaxed">
                  Today I'm a frontend developer at WPP Production and co-founder of Devfik, a small product studio. I
                  lead projects from first sketch to launch, and in my spare time I build small tools like Fling and
                  Bookify.
                </p>
              </div>
            </m.div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/zubayerhimel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 group flex gap-1 items-center"
              >
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-300 transition-all" />
              </a>
              <a
                href="https://linkedin.com/in/zubayerhimel"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 group flex gap-1 items-center"
              >
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-300 transition-all" />
              </a>
              <a
                href="https://twitter.com/zubayerhimel0"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 group flex gap-1 items-center"
              >
                Twitter/X
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform duration-300 transition-all" />
              </a>
              <div className="group flex items-center gap-1 group/email">
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 flex gap-1 items-center"
                >
                  Email
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="opacity-0 pointer-coarse:opacity-100 group-hover/email:opacity-100 focus-visible:opacity-100 group-hover/email:translate-x-0.5 transition-all duration-300 text-muted-foreground hover:text-foreground"
                  title="Copy email address"
                  aria-label={copied ? "Email copied" : "Copy email address"}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
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
