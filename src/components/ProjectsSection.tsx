const projects = [
  {
    title: "Project Alpha",
    description: "A real-time collaborative editor built with CRDTs. Because Google Docs needed competition from a solo developer.",
    tech: ["React", "TypeScript", "WebSockets", "Yjs"],
    link: "#",
  },
  {
    title: "CLI Tool",
    description: "A developer CLI that automates the boring parts of project setup. 200+ stars on GitHub, mostly from my alt accounts.",
    tech: ["Go", "Cobra", "SQLite"],
    link: "#",
  },
  {
    title: "Data Pipeline",
    description: "An ETL pipeline processing 10M+ events daily. It runs so smoothly that I sometimes forget it exists.",
    tech: ["Python", "Apache Kafka", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Design System",
    description: "A component library used across 3 products internally. Documentation that people actually read.",
    tech: ["React", "Storybook", "Tailwind"],
    link: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              className="bg-background p-8 group hover:bg-card transition-colors block"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-2xl text-foreground group-hover:italic transition-all">
                  {project.title}
                </h3>
                <span className="font-display text-lg text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, j) => (
                  <span key={j} className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t}{j < project.tech.length - 1 ? " ·" : ""}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
