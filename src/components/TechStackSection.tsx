import {
  SiDocker,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGo,
  SiGooglecloud,
  SiJavascript,
  SiMongodb,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiRadixui,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs
} from "react-icons/si";

// Fallback for Shadcn UI if no specific icon
const ShadcnIcon = SiRadixui;

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
      { name: "Shadcn UI", icon: ShadcnIcon },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    category: "Backend & DB",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
      { name: "FireBase", icon: SiFirebase },
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
            <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
              Tech Stack
            </h2>

            <p className="font-body text-sm text-muted-foreground leading-snug">
              I'm a generalist at heart who can build with anything, but here's
              the core stack I've spent the most time with
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {techStack.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest pb-4 border-b border-border">
                {category.category}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group">
                    <item.icon className="text-xl text-muted-foreground group-hover:text-foreground" />
                    <span className="font-body text-sm text-foreground/50 group-hover:text-foreground">
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
