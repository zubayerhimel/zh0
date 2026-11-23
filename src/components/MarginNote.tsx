import type React from "react";
import { cn } from "@/lib/utils";

type Arrow = "down-left" | "down-right" | "up-left" | "up-right";

const flips: Record<Arrow, string> = {
  "down-right": "",
  "down-left": "-scale-x-100",
  "up-right": "-scale-y-100",
  "up-left": "-scale-100",
};

// A pen stroke from the top left curving down to an arrowhead at the bottom right; flipped for other directions.
const ArrowStroke = ({ arrow }: { arrow: Arrow }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 36 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-9 w-8 shrink-0", flips[arrow])}
  >
    <path d="M4 2C6 16 14 28 30 34" />
    <path d="M24 27 30 34 21 35.5" />
  </svg>
);

/**
 * Handwritten aside with a drawn arrow, like a note in a book's margin. Decorative, so hidden from assistive
 * tech, and only shown on wide screens where there is room for it. Position it with `className`.
 */
export const MarginNote = ({
  children,
  arrow,
  className,
}: {
  children: React.ReactNode;
  arrow: Arrow;
  className?: string;
}) => {
  const up = arrow.startsWith("up");
  const right = arrow.endsWith("right");
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute hidden lg:flex select-none flex-col gap-1 font-hand text-lg leading-[1.1] text-ink",
        up ? "flex-col-reverse" : "flex-col",
        right ? "items-end" : "items-start",
        className,
      )}
    >
      <p className={cn("-rotate-3 whitespace-pre-line", right ? "text-right" : "text-left")}>{children}</p>
      <span className={right ? "mr-1" : "ml-1"}>
        <ArrowStroke arrow={arrow} />
      </span>
    </div>
  );
};
