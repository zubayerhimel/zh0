import { LazyMotion, MotionConfig } from "motion/react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { PageTransition } from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Blogs from "./pages/Blogs";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Markdown rendering (react-markdown + remark-gfm) is only needed on post pages.
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
// Animation features load in a separate chunk; components render their initial state until then.
const loadMotionFeatures = () => import("./lib/motion-features").then((mod) => mod.default);

// Wrapper component to handle page transitions with route awareness
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="app-theme">
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <TooltipProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </MotionConfig>
    </LazyMotion>
  </ThemeProvider>
);

export default App;
