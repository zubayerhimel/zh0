import type React from "react";
import { FloatingDock } from "./FloatingDock";
import SiteHeader from "./SiteHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen pb-24">
      <SiteHeader />
      {children}
      <FloatingDock />
    </div>
  );
};

export default Layout;
