import { Link } from "react-router";

// "Z." monogram: Cormorant Garamond Bold Italic converted to outlines so it never waits on the web font.
// The favicons and app icons in public/ use the same outlines.
export const LogoMark = ({ className }: { className?: string }) => (
  <svg viewBox="0.1 -65.6 64.9 66.4" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M47.40 0.20Q40.30 0.10 32.15 0.05Q24 0 15.90 0L0.60 0Q0.20 0 0.10-0.45Q0-0.90 0.20-1.30L46.90-60Q47.40-60.50 47.35-60.65Q47.30-60.80 46.70-60.80Q40.30-60.80 35.60-60.45Q30.90-60.10 27.35-59.20Q23.80-58.30 21.05-56.70Q18.30-55.10 15.95-52.60Q13.60-50.10 11.20-46.50Q11-46.20 10.50-46.40Q10.20-46.40 10.20-46.60Q10.10-46.70 10.20-46.90L17.50-65.50Q17.70-65.70 18.30-65.60Q18.70-65.40 18.70-65.30Q18.80-65.20 18.70-65.10Q18.20-63.40 19-62.95Q19.80-62.50 23.20-62.50L58.60-62.50Q59.10-62.50 59.20-62Q59.30-61.50 59.10-61.20L12.90-2.70Q12.50-2.20 12.55-2.05Q12.60-1.90 13.10-1.90L23.30-1.90Q30-1.90 34.95-3.15Q39.90-4.40 43.75-7.35Q47.60-10.30 51-15.40Q51.20-15.80 51.80-15.70Q52.10-15.60 52.20-15.40Q52.20-15.30 52.20-15.20L48.30-0.80Q48.30-0.50 48-0.15Q47.70 0.20 47.40 0.20" />
    <path
      transform="translate(51.70 0)"
      d="M7.80 0.80Q5.20 0.80 3.65-0.70Q2.10-2.20 2.10-4.90Q2.10-7.40 3.65-8.85Q5.20-10.30 7.80-10.30Q10.40-10.30 11.85-8.85Q13.30-7.40 13.30-4.90Q13.30 0.80 7.80 0.80"
    />
  </svg>
);

const Logo = () => (
  <Link
    to="/"
    aria-label="Zubayer Alam, home"
    className="text-foreground hover:text-muted-foreground transition-colors"
  >
    <LogoMark className="h-6 w-auto" />
  </Link>
);

export default Logo;
