const FooterSection = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-display text-2xl text-foreground italic">Let's build something together.</p>
            <a
              href="mailto:zubayerhimel0@gmail.com"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 mt-2 inline-block"
            >
              zubayerhimel0@gmail.com
            </a>
          </div>

          <div className="flex gap-6">
            <a
              href={`https://github.com/zubayerhimel`}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Github
            </a>
            <a
              href={`https://linkedin.com/in/zubayerhimel`}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`https://twitter.com/zubayerhimel0`}
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter/X
            </a>
          </div>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground/50 mt-12">
          © {year} — Crafted with obsessive attention to detail
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
