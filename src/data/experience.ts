export interface Role {
  title: string;
  /** e.g. "Full-time, on-site". */
  terms: string;
  /** "YYYY-MM". */
  start: string;
  /** "YYYY-MM". Omitted while the role is current. */
  end?: string;
  highlights?: string[];
}

export interface Job {
  company: string;
  url?: string;
  location: string;
  summary?: string;
  /** Newest first. */
  roles: Role[];
  stack?: string[];
}

// Newest first, matching LinkedIn.
export const jobs: Job[] = [
  {
    company: "WPP Production",
    location: "Dhaka",
    summary: "Front-end work for global brands in automotive and pharmaceuticals.",
    roles: [
      {
        title: "Frontend Developer",
        terms: "Full-time, on-site",
        start: "2026-02",
        highlights: [
          "Architected and led 3 projects from start to finish, including one with a team of 4.",
          "Built a UI library for internal projects with React, Next.js and Vite.",
          "Built Drupal front ends for leading pharmaceutical companies.",
          "Worked on AEM sites for Jaguar Land Rover and Range Rover.",
          "Built an Ionic and Angular app for a Dubai-based car company.",
          "Built features on top of LLM APIs.",
        ],
      },
    ],
    stack: ["React", "Next.js", "Vite", "Angular", "Ionic", "Drupal", "AEM", "LLM APIs"],
  },
  {
    company: "Devfik",
    url: "https://devfik.com",
    location: "Remote",
    summary: "A design and engineering studio building web, mobile and SaaS products for founders and product teams.",
    roles: [
      {
        title: "Co-founder",
        terms: "Self-employed",
        start: "2024-04",
        highlights: ["Lead projects from requirements gathering through to deployment."],
      },
    ],
    stack: ["Team leadership", "Delivery"],
  },
  {
    company: "Hogarth Dhaka",
    location: "Banani, Dhaka",
    roles: [
      {
        title: "Frontend Developer",
        terms: "Full-time, on-site",
        start: "2025-05",
        end: "2026-02",
        highlights: [
          "Built responsive, reusable interfaces across multiple projects with modern JavaScript frameworks and Drupal’s theming system.",
          "Improved front-end architecture, performance and development workflows.",
          "Worked with designers, back-end developers and stakeholders on accessible, maintainable sites.",
        ],
      },
    ],
    stack: ["Drupal", "JavaScript", "UI libraries"],
  },
  {
    company: "V2 Technologies Ltd",
    location: "Dhaka",
    summary: "CRM and SaaS products for clients including BAT Bangladesh, Unilever and a German startup.",
    roles: [
      {
        title: "Technical Consultant",
        terms: "Contract, hybrid",
        start: "2025-05",
        end: "2025-12",
        highlights: [
          "Restructured project codebases and helped the team clear technical bottlenecks.",
          "Migrated projects from Bitbucket to GitHub with CI/CD pipelines.",
          "Ran sessions on teamwork and project management.",
        ],
      },
      {
        title: "Senior Software Engineer",
        terms: "Full-time",
        start: "2025-01",
        end: "2025-05",
        highlights: [
          "Led the front-end team and reviewed code for junior developers.",
          "Cut CRM page load time by 30%.",
          "Built and shipped an attendance system for BIDA Summit 2025 in three days.",
          "Took a digital asset management portal from scratch to production.",
          "Shaped features with clients and kept the team aligned with business goals.",
        ],
      },
      {
        title: "Software Engineer",
        terms: "Full-time, hybrid",
        start: "2022-07",
        end: "2024-12",
        highlights: [
          "Led the front-end team and built a retail system for BAT.",
          "Restructured the CRM front end and cut build time by 80%.",
          "Led a digital asset management system for a German client.",
          "Added tooling that improved developer and user experience.",
          "Trained junior developers and interns through code review.",
        ],
      },
      {
        title: "Junior Software Engineer",
        terms: "Full-time, hybrid",
        start: "2021-02",
        end: "2022-06",
        highlights: [
          "Maintained a legacy CRM codebase and shipped new features.",
          "Implemented role-based access control.",
          "Designed a GCP-style filter system for consumer segmentation.",
        ],
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Vue.js",
      "TypeScript",
      "React Query",
      "NestJS",
      "Express",
      "Plotly",
      "bKash",
      "SSLCOMMERZ",
      "Paystack",
    ],
  },
];
