import { cn } from "@/lib/utils";

/** The tools a project or job was built with, set as small outlined tags so they read apart from prose. */
export const TechChips = ({ items, className }: { items: string[]; className?: string }) => (
  <ul aria-label="Built with" className={cn("flex flex-wrap gap-1.5", className)}>
    {items.map((tech) => (
      <li
        key={tech}
        className="rounded-full border border-border bg-card px-2.5 py-0.5 font-body text-xs leading-5 text-foreground/75"
      >
        {tech}
      </li>
    ))}
  </ul>
);
