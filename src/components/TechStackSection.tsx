import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGo,
  SiGooglecloud,
  SiHuggingface,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiRadixui,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

// Fallback for Shadcn UI if no specific icon
const ShadcnIcon = SiRadixui;

const techStack = [
  {
    category: "Languages",
    items: [
      { name: "Go", icon: SiGo },
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C++", icon: SiCplusplus },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: ShadcnIcon },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    category: "Backend & DB",
    items: [
      { name: "FastAPI", icon: SiFastapi },
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
      { name: "Git", icon: SiGit },
    ],
  },
  {
    category: "AI & ML",
    items: [
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "PyTorch", icon: SiPytorch },
      { name: "Pandas", icon: SiPandas },
    ],
  },
];

const TechStackSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which categories to show based on expansion
  // If collapsed, show only the first 3 categories (top row)
  const visibleCategories = isExpanded ? techStack : techStack.slice(0, 3);

  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
              Tech Stack
            </h2>

            <p className="font-body text-md text-foreground leading-snug text-foreground/60">
              I'm a generalist at heart who can build with anything, but here's
              the core stack I've spent the most time with
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors mt-4 md:mt-0"
          >
            {isExpanded ? "Show Less" : "Show More"}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {visibleCategories.map((category, idx) => (
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

        <div className="md:hidden mt-12 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
          >
            {isExpanded ? "Show Less" : "Show More"}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
