import { useState } from "react";

const experiences = [
  {
    role: "Senior Software Engineer",
    company: "Hogarth Worldwide",
    period: "May 2025 — Present",
    description: "Working as a frontend developer across multiple projects, building responsive and reusable user interfaces using modern JavaScript frameworks and Drupal’s theming system. Contributed to improving frontend architecture, performance, and development workflows. Collaborated closely with designers, backend developers, and stakeholders to deliver accessible, maintainable, and scalable web experiences.",
  },
  {
    role: "Software Engineer",
    company: "V2 Technologies Ltd.",
    period: "Feb 2021 — April 2025",
    description:
      "Experienced frontend and full-stack developer with strong expertise in modern JavaScript frameworks including Next.js, React.js, and Vue.js, with a focus on building scalable, high-performance web applications.\n\nProven experience integrating RESTful APIs for dynamic data rendering and developing enterprise-grade CRM and SaaS solutions for clients such as BATB and Unilever. Implemented custom role-based access control (RBAC), secure authentication and authorization workflows using JWT, and middleware for validation and security.\n\nActively optimized application performance through lazy loading, asynchronous data fetching, and the use of React Query. Led and managed a SaaS product for a German client, including frontend architecture, team coordination, and delivery. Experienced in data visualization using Plotly, payment gateway integrations (bKash, SSLCOMMERZ, Paystack), and backend development with Express.js, NestJS, and Convex to ensure reliable, responsive APIs.",
  },
  {
    role: "Software Engineer",
    company: "Team Tigers - Startup",
    period: "2019 — 2021",
    description: "Full-stack development with React and Node.js. Reduced API latency by 40% through aggressive caching strategies.",
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
          <p className="font-body text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
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
