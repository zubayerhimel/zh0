import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const PAGE_TRANSITION_MS = 300;

// Scrolls to the top on route changes, or to the #hash target when one is present.
const ScrollToTop = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    if (!pathChanged && !location.hash) return;

    // Wait for the page transition to swap content before scrolling.
    const timeoutId = setTimeout(
      () => {
        const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
        if (target) {
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          target.scrollIntoView({ behavior: pathChanged || reduceMotion ? "auto" : "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      },
      pathChanged ? PAGE_TRANSITION_MS : 0,
    );

    return () => clearTimeout(timeoutId);
  }, [location]);

  return null;
};

export default ScrollToTop;
