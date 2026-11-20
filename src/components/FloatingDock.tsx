import { Home, Moon, NotebookText, Sun } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const FloatingDock = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
      active: location.pathname === "/",
    },
    {
      name: "Blogs",
      icon: NotebookText,
      href: "/blogs",
      active: location.pathname === "/blogs" || location.pathname.startsWith("/blog/"),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-1 rounded-full border border-border/40 bg-background/80 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-border/80">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    "relative p-2 rounded-full transition-all duration-300 group",
                    item.active
                      ? "bg-primary text-primary-foreground scale-110"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full" />
                  )}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs font-medium">
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}

          <div className="w-px h-6 bg-border mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <div className="relative h-4 w-4">
                  <Sun className="absolute h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
                <span className="sr-only">Toggle theme</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs font-medium">
              Toggle Theme
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
