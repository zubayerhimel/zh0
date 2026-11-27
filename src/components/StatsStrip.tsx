import stats from "virtual:site-stats";
import { jobs } from "@/data/experience";
import { projects } from "@/data/projects";
import { compactNumber, yearsSince } from "@/lib/site-stats";
import { cn } from "@/lib/utils";

const firstStart = jobs.flatMap((job) => job.roles.map((role) => role.start)).sort()[0];

const items = [
  firstStart && { value: `${yearsSince(firstStart)}+`, label: "years shipping" },
  { value: String(projects.length), label: "products launched" },
  stats.contributions && {
    value: compactNumber(stats.contributions.total),
    label: "GitHub contributions this year",
  },
  stats.npmDownloads !== null && { value: compactNumber(stats.npmDownloads), label: "npm downloads this year" },
].filter((item): item is { value: string; label: string } => Boolean(item));

/** A row of headline numbers between the intro and the work. */
const StatsStrip = () => (
  <section aria-label="In numbers" className="container max-w-5xl mx-auto px-6">
    <dl className="grid grid-cols-2 md:grid-cols-4 border-y border-border">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={cn(
            "flex flex-col-reverse justify-end gap-3 py-8 md:py-10 border-border",
            // Two columns on phones, four from md up; dividers sit between cells only.
            i % 2 === 0 ? "pr-4 md:pl-6 md:first:pl-0" : "pl-6 border-l",
            i >= 2 && "max-md:border-t",
            i > 0 && "md:border-l",
          )}
        >
          <dt className="font-body text-sm text-muted-foreground">{item.label}</dt>
          <dd className="font-display text-5xl md:text-6xl font-light italic text-foreground leading-none">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
);

export default StatsStrip;
