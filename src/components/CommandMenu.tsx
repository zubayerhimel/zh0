import stats from "virtual:site-stats";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { ArrowUpRight, Bot, Check, Copy, CornerDownLeft, FileText, Hash, Rss, SunMoon } from "lucide-react";
import type React from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiX } from "react-icons/si";
import { useNavigate } from "react-router";
import { blogs } from "@/data/blogs";
import { EMAIL, SOCIAL_LINKS } from "@/data/contact";
import { projects } from "@/data/projects";
import { useModKey } from "@/hooks/use-command-menu";
import { useCopy } from "@/hooks/use-copy";
import { useTheme } from "@/hooks/use-theme";

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Tech stack" },
  ...(stats.contributions ? [{ id: "activity", label: "Activity" }] : []),
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
  "X (Twitter)": SiX,
};

const Item = ({
  icon: Icon,
  children,
  hint,
  keywords,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: string;
  hint?: string;
  keywords?: string[];
  onSelect: () => void;
}) => (
  <Command.Item
    value={`${children} ${hint ?? ""}`}
    keywords={keywords}
    onSelect={onSelect}
    className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 font-body text-sm text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground"
  >
    <Icon className="size-4 shrink-0" />
    <span className="truncate">{children}</span>
    {hint && <span className="ml-auto shrink-0 pl-4 font-mono text-[10px] text-muted-foreground">{hint}</span>}
  </Command.Item>
);

const CommandMenu = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const { copied, copy } = useCopy();
  const modKey = useModKey();

  const run = (action: () => void) => () => {
    onOpenChange(false);
    action();
  };
  const openUrl = (url: string) => run(() => window.open(url, "_blank", "noopener,noreferrer"));
  const goToSection = (id: string) => run(() => navigate(`/#${id}`));

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[12vh] z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]"
        >
          <Dialog.Title className="sr-only">Search the site</Dialog.Title>
          <Command loop className="flex max-h-[min(32rem,76vh)] flex-col">
            <Command.Input
              placeholder="Search projects, posts and pages…"
              className="w-full border-b border-border bg-transparent px-5 py-4 font-display text-xl italic text-foreground outline-none placeholder:text-muted-foreground/60"
            />
            <Command.List className="command-list flex-1 overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-3 py-10 text-center font-mono text-xs text-muted-foreground">
                Nothing matches that.
              </Command.Empty>

              <Command.Group heading="Go to">
                {SECTIONS.map((section) => (
                  <Item key={section.id} icon={Hash} onSelect={goToSection(section.id)}>
                    {section.label}
                  </Item>
                ))}
                <Item icon={FileText} hint="All posts" onSelect={run(() => navigate("/blogs"))}>
                  Writing archive
                </Item>
              </Command.Group>

              <Command.Group heading="Projects">
                {projects.map((project) => {
                  const url = project.url ?? project.source;
                  if (!url) return null;
                  return (
                    <Item
                      key={project.title}
                      icon={ArrowUpRight}
                      hint={project.kind}
                      keywords={project.stack}
                      onSelect={openUrl(url)}
                    >
                      {project.title}
                    </Item>
                  );
                })}
              </Command.Group>

              <Command.Group heading="Writing">
                {blogs.map((blog) => (
                  <Item
                    key={blog.slug}
                    icon={FileText}
                    hint={blog.date}
                    onSelect={run(() => navigate(`/blog/${blog.slug}`))}
                  >
                    {blog.title}
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading="Elsewhere">
                <Item
                  icon={copied ? Check : Copy}
                  hint={EMAIL}
                  keywords={["email", "contact"]}
                  onSelect={() => copy(EMAIL)}
                >
                  {copied ? "Email copied" : "Copy email address"}
                </Item>
                {SOCIAL_LINKS.map((link) => (
                  <Item key={link.label} icon={SOCIAL_ICONS[link.label] ?? ArrowUpRight} onSelect={openUrl(link.url)}>
                    {link.label}
                  </Item>
                ))}
                <Item icon={Rss} onSelect={openUrl("/rss.xml")}>
                  RSS feed
                </Item>
                <Item icon={Bot} hint="For AI agents" onSelect={openUrl("/llms.txt")}>
                  llms.txt
                </Item>
              </Command.Group>

              <Command.Group heading="Settings">
                <Item
                  icon={SunMoon}
                  keywords={["theme", "dark", "light", "mode"]}
                  onSelect={run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
                >
                  {resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                </Item>
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2.5 font-mono text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="size-3" /> to select
              </span>
              <span>
                {modKey} K to toggle <span className="mx-1 opacity-50">·</span> esc to close
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CommandMenu;
