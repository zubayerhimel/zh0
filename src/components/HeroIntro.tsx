import portrait from "@/assets/portrait.png";

const HeroIntro = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="w-64 h-80 overflow-hidden grayscale">
              <img
                src={portrait}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-6xl md:text-8xl font-display font-light tracking-tight text-foreground leading-none">
                Zubayer Alam
              </h1>
              <p className="font-mono text-xs text-muted-foreground mt-4 md:mt-8 tracking-wide">
                Senior Software Engineer · Frontend Specialist
              </p>
            </div>

            <div className="border-l-2 border-foreground pl-6 space-y-3 max-w-lg">
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                <span className="font-display text-lg italic">Building exceptional web experiences</span> — I craft
                performant, accessible, and user-centric applications with modern JavaScript frameworks.
                My expertise spans React, Next.js, and Vue.js, with solid backend capabilities to deliver
                full-stack solutions.
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                With years of experience shipping production-grade software, I focus on writing clean,
                maintainable code and creating intuitive interfaces that users love. Passionate about
                developer experience, performance optimization, and staying current with the evolving
                frontend ecosystem.
              </p>
            </div>

            <div className="flex gap-6 pt-2">
              <a href="https://github.com/zubayerhimel" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                GitHub
              </a>
              <a href="https://linkedin.com/in/zubayerhimel" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                LinkedIn
              </a>
              <a href="https://twitter.com/zubayerhimel0" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                Twitter/X
              </a>
              <a href="mailto:zubayerhimel0@gmail.com" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
