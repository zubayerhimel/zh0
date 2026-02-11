import { useState } from "react";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Company Name",
    period: "2023 — Present",
    description: "Building scalable distributed systems. Leading a team of engineers to ship features that impact millions.",
  },
  {
    role: "Software Engineer",
    company: "Another Startup",
    period: "2021 — 2023",
    description: "Full-stack development with React and Node.js. Reduced API latency by 40% through aggressive caching strategies.",
  },
  {
    role: "Junior Developer",
    company: "First Job Inc.",
    period: "2019 — 2021",
    description: "Started as an intern, ended as the person who knew where all the bugs were hidden. Built internal tools that actually got used.",
  },
];

const ExperienceItem = ({
  role,
  company,
  period,
  description,
}: {
  role: string;
  company: string;
  period: string;
  description: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 80;
  const shouldTruncate = description.length > limit;

  return (
    <div className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1">
        <span className="font-mono text-xs text-muted-foreground">
          {period}
        </span>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-display text-2xl text-foreground">{role}</h3>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          {company}
        </p>
        <div className="mt-3 max-w-lg">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {isExpanded || !shouldTruncate
              ? description
              : `${description.slice(0, limit)}...`}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs font-mono underline decoration-muted-foreground/50 hover:decoration-foreground text-foreground transition-all focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Experience
        </h2>

        <div className="space-y-0">
          {experiences.map((exp, i) => (
            <ExperienceItem key={i} {...exp} />
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
