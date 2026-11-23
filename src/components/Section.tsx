import type React from "react";
import { cn } from "@/lib/utils";

/** Home page section: shared width and vertical rhythm. */
export const Section = ({ id, className, children, ...props }: React.ComponentProps<"section"> & { id: string }) => (
  <section id={id} className={cn("py-20 md:py-24 scroll-mt-4", className)} {...props}>
    <div className="container max-w-5xl mx-auto px-6">{children}</div>
  </section>
);

export const SectionHeading = ({
  title,
  count,
  description,
  note,
}: {
  title: string;
  /** Shown as a small "(n)" after the title. */
  count?: number;
  description?: React.ReactNode;
  note?: React.ReactNode;
}) => (
  <div className="relative mb-12 md:mb-16">
    <h2 className="text-5xl md:text-6xl font-display font-light italic text-foreground">
      {title}
      {count !== undefined && (
        <sup className="ml-2 font-mono text-xs not-italic tracking-normal text-muted-foreground">({count})</sup>
      )}
    </h2>
    {description && (
      <p className="mt-6 max-w-2xl font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
    )}
    {note}
  </div>
);
