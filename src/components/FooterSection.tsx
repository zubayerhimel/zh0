const FooterSection = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="font-display text-2xl text-foreground italic">
              Let's build something together.
            </p>
            <a
              href="mailto:hello@example.com"
              className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 mt-2 inline-block"
            >
              hello@example.com
            </a>
          </div>

          <div className="flex gap-6">
            {["GitHub", "LinkedIn", "Twitter/X"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
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
