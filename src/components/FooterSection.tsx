import { Check, Copy } from "lucide-react";
import { MarginNote } from "@/components/MarginNote";
import { EMAIL, SOCIAL_LINKS } from "@/data/contact";
import { useCopy } from "@/hooks/use-copy";

const FOOTER_LINKS = [...SOCIAL_LINKS, { label: "RSS", url: "/rss.xml" }, { label: "llms.txt", url: "/llms.txt" }];

const FooterSection = () => {
  const year = new Date().getFullYear();
  const { copied, copy } = useCopy();

  return (
    <footer id="contact" className="border-t border-border scroll-mt-4">
      <div className="container max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-10">
        <h2 className="font-display text-5xl md:text-7xl font-light italic leading-[1.05] text-foreground">
          Let's build something <span className="text-muted-foreground/50">together.</span>
        </h2>
        <p className="mt-6 max-w-md font-body text-sm text-muted-foreground leading-relaxed">
          Open to new projects and roles. Email is the best way to reach me.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${EMAIL}`}
            className="font-display text-2xl md:text-4xl text-foreground underline decoration-border decoration-1 underline-offset-8 transition-colors hover:decoration-foreground"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={() => copy(EMAIL)}
            aria-label={copied ? "Email copied" : "Copy email address"}
            title="Copy email address"
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
          </button>
          <MarginNote arrow="up-left" className="left-[27rem] top-4">
            {"say hello!"}
          </MarginNote>
        </div>

        <div className="mt-20 md:mt-28 flex flex-col-reverse gap-6 border-t border-border pt-6 font-body text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Zubayer Alam <span className="mx-2 opacity-50">·</span> Dhaka, Bangladesh
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
