import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";

const labels: Record<Status, string> = {
  idle: "Copy for agents",
  copied: "Copied",
  failed: "Couldn't copy",
};

/** Copies a post as Markdown, ready to paste into an AI agent or chat. */
const CopyForAgentsButton = ({ markdown }: { markdown: string }) => {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  };

  const Icon = status === "copied" ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      title="Copy this post as Markdown"
      className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-body text-xs text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span aria-live="polite">{labels[status]}</span>
    </button>
  );
};

export default CopyForAgentsButton;
