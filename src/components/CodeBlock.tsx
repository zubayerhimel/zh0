import { Check, Copy } from "lucide-react";
import { type ComponentProps, isValidElement, type ReactNode, useEffect, useState } from "react";

type Status = "idle" | "copied" | "failed";

const labels: Record<Status, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Couldn't copy",
};

const textOf = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
};

const CopyCodeButton = ({ code }: { code: string }) => {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = setTimeout(() => setStatus("idle"), 2000);
    return () => clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
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
      aria-label="Copy code"
      className="ml-auto inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-1 focus-visible:outline-foreground"
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span aria-live="polite">{labels[status]}</span>
    </button>
  );
};

/** Renders a fenced code block (`<pre><code>`) with a language label and a copy button. */
const CodeBlock = ({ children }: ComponentProps<"pre">) => {
  const code = isValidElement<ComponentProps<"code">>(children) ? children.props : { children };
  const className = code.className || "";
  const language = /language-([\w-]+)/.exec(className)?.[1] ?? "";

  return (
    <div className="my-8 rounded border border-border overflow-hidden">
      <div className="bg-card px-4 py-2 border-b border-border flex items-center gap-2">
        {language && <span className="font-mono text-xs text-muted-foreground">{language}</span>}
        <CopyCodeButton code={textOf(code.children).replace(/\n$/, "")} />
      </div>
      <pre className="bg-card/50 p-6 overflow-x-auto">
        <code className={`font-mono text-sm text-foreground leading-relaxed whitespace-pre ${className}`}>
          {code.children}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
