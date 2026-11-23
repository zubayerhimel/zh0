import { LayoutTemplate } from "lucide-react";
import {
  SiAngular,
  SiClerk,
  SiConvex,
  SiDocker,
  SiDrupal,
  SiExpo,
  SiExpress,
  SiGit,
  SiIonic,
  SiKotlin,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import { Section, SectionHeading } from "@/components/Section";

const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Vue.js", icon: SiVuedotjs },
      { name: "Angular", icon: SiAngular },
      { name: "TanStack Start", icon: SiTanstack },
      { name: "Vite", icon: SiVite },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    category: "Mobile",
    items: [
      { name: "React Native", icon: SiReact },
      { name: "Expo", icon: SiExpo },
      { name: "Ionic", icon: SiIonic },
      { name: "Kotlin", icon: SiKotlin },
    ],
  },
  {
    category: "Backend & data",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "Express", icon: SiExpress },
      { name: "Convex", icon: SiConvex },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    category: "CMS & tools",
    items: [
      { name: "Drupal", icon: SiDrupal },
      { name: "Adobe AEM", icon: LayoutTemplate },
      { name: "Clerk", icon: SiClerk },
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "Git", icon: SiGit },
    ],
  },
];

const TechStackSection = () => {
  return (
    <Section id="stack">
      <SectionHeading
        title="Tech Stack"
        description="I'm a generalist at heart who can build with anything, but here's the core stack I've spent the most time with."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {techStack.map((category) => (
          <div key={category.category} className="space-y-6">
            <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest pb-4 border-b border-border">
              {category.category}
            </h3>
            <ul className="space-y-4">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-center gap-3 group">
                  <item.icon className="size-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                  <span className="font-body text-sm text-muted-foreground group-hover:text-foreground">
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default TechStackSection;
