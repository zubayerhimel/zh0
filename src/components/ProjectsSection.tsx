import { projects } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-4">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">Projects</h2>

        <ul>
          {projects.map((project) => (
            <li
              key={project.title}
              className="relative border-t border-border py-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 -mx-6 px-6 transition-colors has-[a:hover]:bg-card/50"
            >
              <div className="font-mono text-xs text-muted-foreground space-y-1 md:pt-2">
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
                  <ul
                    aria-label="Stack"
                    className="flex flex-wrap gap-x-4 gap-y-1 mt-5 font-mono text-xs text-muted-foreground"
                  >
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  {(project.url || project.source) && (
                    <div className="flex gap-6 mt-5 font-mono text-xs">
                      {project.url && (
                        <span className="text-foreground underline underline-offset-4">
                          {new URL(project.url).host}
                        </span>
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
        <div className="border-t border-border -mx-6" />
      </div>
    </section>
  );
};

export default ProjectsSection;
