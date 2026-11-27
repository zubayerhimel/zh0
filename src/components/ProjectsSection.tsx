import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { MarginNote } from "@/components/MarginNote";
import { Section, SectionHeading } from "@/components/Section";
import { TechChips } from "@/components/TechChips";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Projects shown before "Show more". The rest stay in the HTML (hidden) for crawlers and find-in-page. */
const INITIAL_COUNT = 5;

const ProjectsSection = () => {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hiddenCount = projects.length - INITIAL_COUNT;

  return (
    <Section id="projects">
      <SectionHeading
        title="Projects"
        count={projects.length}
        note={
          <MarginNote arrow="down-left" className="left-64 md:left-80 -top-2">
            {"click any one\nto try it"}
          </MarginNote>
        }
      />

      <ul id={listId}>
        {projects.map((project, index) => (
          <li
            key={project.title}
            hidden={!expanded && index >= INITIAL_COUNT}
            className="row-hover border-t border-border py-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8"
          >
            <div className="font-body text-sm text-muted-foreground space-y-1 md:pt-2">
              <p>{project.kind}</p>
              {project.status && <p className="text-foreground">{project.status}</p>}
            </div>

            <div className="md:col-span-3 grid gap-6 lg:grid-cols-[1fr_16rem] lg:gap-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-foreground">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-foreground"
                    >
                      {project.title}
                      <span
                        aria-hidden="true"
                        className="inline-block ml-3 text-lg text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
                <TechChips items={project.stack} className="mt-5" />
                {(project.url || project.source) && (
                  <div className="flex gap-6 mt-5 font-body text-sm">
                    {project.url && (
                      <span className="text-foreground underline underline-offset-4">{new URL(project.url).host}</span>
                    )}
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                      >
                        Source on GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.title} home page`}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-sm lg:max-w-none aspect-[16/10] object-cover object-top rounded-md border border-border bg-card lg:mt-2 dark:brightness-90"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
          className="group flex w-full items-center justify-center gap-2 border-y border-border py-5 font-body text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          {expanded ? "Show fewer" : `Show ${hiddenCount} more`}
          <ChevronDown className={cn("size-3.5 transition-transform", expanded && "rotate-180")} />
        </button>
      ) : (
        <div className="border-t border-border" />
      )}
    </Section>
  );
};

export default ProjectsSection;
