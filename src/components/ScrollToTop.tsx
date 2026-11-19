import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top on every route change
  useEffect(() => {
    // Delay scroll until after page transition animation completes (300ms)
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
