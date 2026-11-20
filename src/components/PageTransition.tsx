import { AnimatePresence, type Transition } from "motion/react";
import * as m from "motion/react-m";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

const pageTransition: Transition = {
  type: "tween",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3,
};

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const isFirstMount = useRef(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: enable animations once the route first changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setShouldAnimate(true);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={shouldAnimate ? "initial" : undefined}
        animate="animate"
        exit={shouldAnimate ? "exit" : undefined}
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
