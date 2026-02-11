const techCategories = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "AWS", "Git", "CI/CD", "Linux"],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {techCategories.map((cat, i) => (
            <div key={i}>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((item, j) => (
                  <span
                    key={j}
                    className="font-body text-sm text-foreground border border-border px-4 py-2 hover:bg-foreground hover:text-background transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
