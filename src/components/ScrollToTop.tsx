import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const PAGE_TRANSITION_MS = 300;
const HASH_TARGET_WAIT_MS = 2000;

// Scrolls to the top on route changes, or to the #hash target when one is present.
const ScrollToTop = () => {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    if (!pathChanged && !location.hash) return;

    const targetId = location.hash ? decodeURIComponent(location.hash.slice(1)) : "";
    const deadline = performance.now() + PAGE_TRANSITION_MS + HASH_TARGET_WAIT_MS;
    let frameId = 0;

    // The new page only mounts after the old one finishes its exit animation,
    // so keep looking for the #hash target until it appears.
    const scroll = () => {
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: pathChanged || reduceMotion ? "auto" : "smooth" });
      } else if (targetId && performance.now() < deadline) {
        frameId = requestAnimationFrame(scroll);
      } else {
        window.scrollTo(0, 0);
      }
    };

    const timeoutId = setTimeout(scroll, pathChanged ? PAGE_TRANSITION_MS : 0);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [location]);

  return null;
};

export default ScrollToTop;
