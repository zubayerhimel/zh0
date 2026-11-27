import { useEffect, useRef } from "react";
import { DOT_OFFSET, DOT_PATH, Z_PATH } from "@/components/Logo";

/** How far the letter is extruded, in glyph units (the Z is about 65 wide). */
const DEPTH = 16;
/** Copies stacked between the front and back faces; enough that the walls read as solid at any angle. */
const LAYERS = 36;
const RESTING_ANGLE = 30;

// The top right corner of the Z, where the extrusion angle is measured.
const CORNER = { x: 59.2, y: -62 };
const ARC_RADIUS = 11;

const geometry = (angle: number) => {
  const rad = (angle * Math.PI) / 180;
  const ex = DEPTH * Math.cos(rad);
  const ey = -DEPTH * Math.sin(rad);
  const arcEnd = { x: CORNER.x + ARC_RADIUS * Math.cos(rad), y: CORNER.y - ARC_RADIUS * Math.sin(rad) };
  const mid = rad / 2;
  return {
    ex,
    ey,
    leg: { x: CORNER.x + ex * 1.5, y: CORNER.y + ey * 1.5 },
    arc: `M${CORNER.x + ARC_RADIUS} ${CORNER.y}A${ARC_RADIUS} ${ARC_RADIUS} 0 ${angle > 180 ? 1 : 0} 0 ${arcEnd.x.toFixed(2)} ${arcEnd.y.toFixed(2)}`,
    label: {
      x: CORNER.x + (ARC_RADIUS + 5) * Math.cos(mid),
      y: CORNER.y - (ARC_RADIUS + 5) * Math.sin(mid),
      text: `${Math.round(angle) % 360}°`,
    },
  };
};

const layers = Array.from({ length: LAYERS - 1 }, (_, i) => (LAYERS - 1 - i) / LAYERS);

/**
 * The "Z." from the logo, extruded and drawn like a type construction sheet. On devices with a mouse the
 * extrusion turns away from the cursor, and the angle annotation follows.
 */
const HeroMonogram = ({ className }: { className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const legRef = useRef<SVGLineElement>(null);
  const arcRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<SVGTextElement>(null);
  const initial = geometry(RESTING_ANGLE);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    let current = RESTING_ANGLE;
    let target = RESTING_ANGLE;
    let frame = 0;

    const draw = (angle: number) => {
      const g = geometry(angle);
      svg.style.setProperty("--ex", g.ex.toFixed(3));
      svg.style.setProperty("--ey", g.ey.toFixed(3));
      legRef.current?.setAttribute("x2", g.leg.x.toFixed(2));
      legRef.current?.setAttribute("y2", g.leg.y.toFixed(2));
      arcRef.current?.setAttribute("d", g.arc);
      const label = labelRef.current;
      if (label) {
        label.setAttribute("x", g.label.x.toFixed(2));
        label.setAttribute("y", g.label.y.toFixed(2));
        label.textContent = g.label.text;
      }
    };

    const tick = () => {
      // Ease along the shorter way round the circle.
      const delta = ((target - current + 540) % 360) - 180;
      current = (current + delta * 0.12 + 360) % 360;
      draw(current);
      frame = Math.abs(delta) > 0.05 ? requestAnimationFrame(tick) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      const dx = box.left + box.width / 2 - event.clientX;
      const dy = event.clientY - (box.top + box.height / 2);
      if (Math.hypot(dx, dy) < 8) return;
      target = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const shift = (t: number) => ({
    transform: `translate(calc(var(--ex) * ${t}px), calc(var(--ey) * ${t}px))`,
  });

  return (
    <svg
      ref={svgRef}
      viewBox="-22 -74 98 80"
      overflow="visible"
      aria-hidden="true"
      className={className}
      style={{ "--ex": initial.ex.toFixed(3), "--ey": initial.ey.toFixed(3) } as React.CSSProperties}
    >
      <defs>
        {/* vector-effect isn't inherited through <use>, so it lives on the source paths to keep strokes hairline. */}
        <g id="hero-monogram-glyph">
          <path d={Z_PATH} vectorEffect="non-scaling-stroke" />
          <path transform={`translate(${DOT_OFFSET} 0)`} d={DOT_PATH} vectorEffect="non-scaling-stroke" />
        </g>
        <pattern
          id="hero-monogram-hatch"
          patternUnits="userSpaceOnUse"
          width="1.6"
          height="1.6"
          patternTransform="rotate(45)"
        >
          <rect width="1.6" height="1.6" className="fill-background" />
          <line x1="0" y1="0" x2="0" y2="1.6" className="stroke-foreground/45" strokeWidth="0.3" />
        </pattern>
        <mask id="hero-monogram-walls" maskUnits="userSpaceOnUse" x="-40" y="-110" width="160" height="150">
          {layers.map((t) => (
            <use key={t} href="#hero-monogram-glyph" style={shift(t)} fill="white" />
          ))}
        </mask>
      </defs>

      {/* Type guides, running off to the left edge of the page. */}
      <g className="stroke-muted-foreground/35" strokeWidth="1" strokeDasharray="3 4">
        <line x1="-400" y1="0" x2="90" y2="0" vectorEffect="non-scaling-stroke" />
        <line x1="-400" y1="-62.5" x2="90" y2="-62.5" vectorEffect="non-scaling-stroke" />
      </g>
      <g className="fill-muted-foreground font-display italic" fontSize="3.8">
        <text x="-3" y="-1.6" textAnchor="end">
          baseline
        </text>
        <text x="-3" y="-64.1" textAnchor="end">
          cap height
        </text>
      </g>

      {/* Back face: only its outer edge survives once the walls in front cover the rest. */}
      <use
        href="#hero-monogram-glyph"
        style={shift(1)}
        className="fill-background stroke-foreground/70"
        strokeWidth="1"
      />
      {/* Walls: the hatch is painted once through the stacked layers, so it doesn't moiré against itself. */}
      <rect
        x="-40"
        y="-110"
        width="160"
        height="150"
        fill="url(#hero-monogram-hatch)"
        mask="url(#hero-monogram-walls)"
      />
      <use
        href="#hero-monogram-glyph"
        className="fill-background stroke-foreground"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />

      {/* Centre mark on the full stop. */}
      <g className="stroke-muted-foreground/70" strokeWidth="1">
        <line x1={DOT_OFFSET + 7.7} y1="-8.5" x2={DOT_OFFSET + 7.7} y2="-1" vectorEffect="non-scaling-stroke" />
        <line x1={DOT_OFFSET + 3.95} y1="-4.75" x2={DOT_OFFSET + 11.45} y2="-4.75" vectorEffect="non-scaling-stroke" />
      </g>

      {/* Extrusion angle, measured from the horizontal at the Z's top right corner. */}
      <g className="stroke-muted-foreground" strokeWidth="1" fill="none">
        <line
          x1={CORNER.x}
          y1={CORNER.y}
          x2={CORNER.x + ARC_RADIUS + 6}
          y2={CORNER.y}
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
        />
        <line
          ref={legRef}
          x1={CORNER.x}
          y1={CORNER.y}
          x2={initial.leg.x}
          y2={initial.leg.y}
          strokeDasharray="2 3"
          vectorEffect="non-scaling-stroke"
        />
        <path ref={arcRef} d={initial.arc} vectorEffect="non-scaling-stroke" />
      </g>
      <text
        ref={labelRef}
        x={initial.label.x}
        y={initial.label.y}
        className="fill-muted-foreground font-display italic"
        fontSize="3.8"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {initial.label.text}
      </text>
    </svg>
  );
};

export default HeroMonogram;
