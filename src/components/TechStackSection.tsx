import {
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGo,
  SiGooglecloud,
  SiJavascript,
  SiMongodb,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";

const techStack = [
  {
    category: "Languages",
    items: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
      { name: "Go", icon: SiGo },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    category: "Backend & DB",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "Express", icon: SiExpress },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    category: "Infra & Tools",
    items: [
      { name: "Docker", icon: SiDocker },
      { name: "Google Cloud", icon: SiGooglecloud },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
      { name: "Git", icon: SiGit },
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-6 italic">Tech Stack</h2>

            <p className="font-body text-sm text-muted-foreground leading-snug">
              I'm a generalist at heart who can build with anything, but here's the core stack I've spent the most time
              with.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {techStack.map((category) => (
            <div key={category.category} className="space-y-6">
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest pb-4 border-b border-border">
                {category.category}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 group">
                    <item.icon className="text-xl text-muted-foreground group-hover:text-foreground" />
                    <span className="font-body text-sm text-muted-foreground group-hover:text-foreground">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
