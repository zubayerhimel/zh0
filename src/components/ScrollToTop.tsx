import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

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
