import type React from "react";
import { FloatingDock } from "./FloatingDock";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen pb-24">
      {children}
      <FloatingDock />
    </div>
  );
};

export default Layout;
