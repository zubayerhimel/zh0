import { Bot, BriefcaseBusiness, Home, Mail, Moon, NotebookText, Search, Sun } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useModKey, useOpenCommandMenu } from "@/hooks/use-command-menu";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export const FloatingDock = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const location = useLocation();
  const openCommandMenu = useOpenCommandMenu();
  const modKey = useModKey();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const onHome = location.pathname === "/";
  const navItems = [
    { name: "Home", icon: Home, href: "/", active: onHome && !location.hash },
    { name: "Work", icon: BriefcaseBusiness, href: "/#experience", active: onHome && location.hash === "#experience" },
    {
      name: "Writing",
      icon: NotebookText,
      href: "/blogs",
      active: location.pathname === "/blogs" || location.pathname.startsWith("/blog/"),
    },
    { name: "Contact", icon: Mail, href: "/#contact", active: onHome && location.hash === "#contact" },
  ];

  return (
    <nav aria-label="Main" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 p-1 rounded-full border border-border/40 bg-background/80 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-border/80">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.name}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  aria-label={item.name}
                  aria-current={item.active ? "page" : undefined}
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
                onClick={openCommandMenu}
                aria-label="Search the site"
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Search className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs font-medium">
              Search <kbd className="ml-1 font-mono text-[10px] text-muted-foreground">{modKey} K</kbd>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noopener"
                aria-label="For agents (llms.txt)"
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <Bot className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs font-medium">
              For agents
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <div className="relative h-4 w-4">
                  <Sun className="absolute h-full w-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-full w-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs font-medium">
              {resolvedTheme === "dark" ? "Light theme" : "Dark theme"}{" "}
              <kbd className="ml-1 font-mono text-[10px] text-muted-foreground">D</kbd>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};
