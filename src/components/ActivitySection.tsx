import stats from "virtual:site-stats";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/Section";
import { SOCIAL_LINKS } from "@/data/contact";
import { type ContributionDay, monthLabels, toWeeks } from "@/lib/site-stats";
import { cn } from "@/lib/utils";

const GITHUB_URL = SOCIAL_LINKS.find((link) => link.label === "GitHub")?.url ?? "https://github.com";

// Monochrome scale to match the page: empty days are muted, busier days get closer to the text colour.
const LEVELS = ["bg-muted", "bg-foreground/20", "bg-foreground/40", "bg-foreground/65", "bg-foreground/90"];
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const countLabel = (count: number) => (count ? `${count} contribution${count === 1 ? "" : "s"}` : "No contributions");

type Hovered = { day: ContributionDay; x: number; y: number };
// Keeps the centred tooltip inside the figure when hovering the first or last weeks.
const TOOLTIP_HALF_WIDTH = 124;

const ActivitySection = () => {
  const scroller = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<Hovered | null>(null);

  // On narrow screens the graph scrolls sideways; start at the most recent weeks.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  if (!stats.contributions) return null;
  const { total, days } = stats.contributions;
  const weeks = toWeeks(days);
  const labels = monthLabels(weeks);
  const byDate = new Map(days.map((day) => [day.date, day]));

  const onPointerOver = (event: React.PointerEvent) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>("[data-date]");
    const day = cell?.dataset.date ? byDate.get(cell.dataset.date) : undefined;
    const box = figure.current?.getBoundingClientRect();
    if (!cell || !day || !box) return setHovered(null);
    const rect = cell.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - box.left;
    setHovered({
      day,
      x: Math.min(Math.max(x, TOOLTIP_HALF_WIDTH), box.width - TOOLTIP_HALF_WIDTH),
      y: rect.top - box.top,
    });
  };

  return (
    <Section id="activity">
      <SectionHeading
        title="Activity"
        description={
          <>
            {total.toLocaleString("en-US")} contributions on{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              GitHub
            </a>{" "}
            in the last year.
          </>
        }
      />

      <figure ref={figure} className="relative">
        <div
          ref={scroller}
          onScroll={() => setHovered(null)}
          className="overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0"
        >
          <div
            role="img"
            onPointerOver={onPointerOver}
            onPointerLeave={() => setHovered(null)}
            aria-label={`GitHub contribution graph: ${total} contributions in the last year`}
            className="grid w-max grid-cols-[auto_1fr] gap-x-2 [--cell:12px] lg:[--cell:14px] font-body text-[10px] tabular-nums text-muted-foreground"
          >
            <span />
            <div className="relative h-4">
              {labels.map(({ index, label }) => (
                <span
                  key={`${index}-${label}`}
                  className="absolute top-0"
                  style={{ left: `calc(${index} * (var(--cell) + 3px))` }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-rows-7 gap-[3px]">
              {WEEKDAYS.map((day, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed list of seven rows
                <span key={i} className="h-(--cell) leading-(--cell)">
                  {day}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {weeks.map((week) => (
                <div key={week.find(Boolean)?.date} className="grid grid-rows-7 gap-[3px]">
                  {week.map((day, i) =>
                    day ? (
                      <span
                        key={day.date}
                        data-date={day.date}
                        className={cn(
                          "size-(--cell) rounded-[2px] transition-shadow",
                          LEVELS[Math.min(day.level, 4)],
                          hovered?.day.date === day.date &&
                            "ring-1 ring-foreground ring-offset-1 ring-offset-background",
                        )}
                      />
                    ) : (
                      // biome-ignore lint/suspicious/noArrayIndexKey: padding before the first day
                      <span key={i} className="size-(--cell)" />
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {hovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-sm bg-foreground px-2.5 py-1.5 font-body text-xs text-background shadow-lg"
            style={{ left: hovered.x, top: hovered.y - 8 }}
          >
            <span className="font-medium">{countLabel(hovered.day.count)}</span>
            <span className="opacity-60"> · {formatDate(hovered.day.date)}</span>
          </div>
        )}

        <figcaption className="mt-4 flex items-center justify-end gap-1.5 font-body text-[10px] text-muted-foreground">
          Less
          {LEVELS.map((level) => (
            <span key={level} aria-hidden="true" className={cn("size-3 rounded-[2px]", level)} />
          ))}
          More
        </figcaption>
      </figure>
    </Section>
  );
};

export default ActivitySection;
