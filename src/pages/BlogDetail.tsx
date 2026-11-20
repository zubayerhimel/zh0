import { ArrowLeft, ExternalLink } from "lucide-react";
import { type ComponentProps, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router";
import remarkGfm from "remark-gfm";
import Seo from "@/components/Seo";
import { blogs } from "@/data/blogs";

// Custom renderer for code blocks
const CodeBlock = ({ className, children }: ComponentProps<"code">) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  return (
    <div className="my-8 rounded border border-border overflow-hidden">
      {language && (
        <div className="bg-card px-4 py-2 border-b border-border flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{language}</span>
        </div>
      )}
      <pre className="bg-card/50 p-6 overflow-x-auto">
        <code className={`font-mono text-sm text-foreground leading-relaxed whitespace-pre ${className}`}>
          {children}
        </code>
      </pre>
    </div>
  );
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top when navigating between posts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!blog) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <Seo title="Post not found" path={`/blog/${slug}`} description="This post doesn't exist." noindex />
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Post not found</h1>
          <Link to="/" className="font-mono text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  const suggestedBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 2);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo
        title={blog.title}
        description={blog.excerpt}
        path={`/blog/${blog.slug}`}
        type="article"
        publishedTime={blog.publishedAt || undefined}
      />
      <article className="container max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-16"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Writing
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-muted-foreground">{blog.date}</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-xs text-muted-foreground">{blog.readTime}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-foreground leading-tight md:leading-none">
            {blog.title}
          </h1>
          <p className="font-body text-body text-muted-foreground mt-6 leading-relaxed max-w-2xl">{blog.excerpt}</p>
        </header>

        <div className="section-divider mb-16" />

        {/* Content */}
        <div className="font-body text-base text-foreground/85 dark:text-foreground/65 leading-[1.8]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mt-14 mb-4" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mt-14 mb-4" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="font-display text-xl md:text-2xl font-light text-foreground mt-10 mb-3" {...props} />
              ),
              p: ({ node, ...props }) =>
                node?.children.some((child) => child.type === "element" && child.tagName === "img") ? (
                  <div className="mb-6 last:mb-0" {...props} />
                ) : (
                  <p className="mb-6 last:mb-0" {...props} />
                ),
              a: ({ node, ...props }) => {
                const isExternal = props.href?.startsWith("http");
                if (isExternal) {
                  return (
                    <a
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline underline-offset-4 inline-flex items-center gap-1"
                    >
                      {props.children}
                      <ExternalLink className="w-3 h-3 inline-block" />
                    </a>
                  );
                }
                return (
                  <Link to={props.href || "#"} className="text-primary hover:underline underline-offset-4">
                    {props.children}
                  </Link>
                );
              },
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="pl-2" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-2 border-foreground pl-6 py-4 my-10 italic text-xl text-foreground"
                  {...props}
                />
              ),
              code: CodeBlock,
              img: ({ node, ...props }) => (
                <figure className="my-10">
                  <img className="w-full rounded-lg border border-border" {...props} alt={props.alt} />
                  {props.alt && (
                    <figcaption className="text-center font-mono text-xs text-muted-foreground mt-3">
                      {props.alt}
                    </figcaption>
                  )}
                </figure>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Suggested Reads */}
        <div className="mt-24">
          <div className="section-divider mb-12" />
          <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-10 italic">Suggested Reads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {suggestedBlogs.map((sb) => (
              <Link key={sb.slug} to={`/blog/${sb.slug}`} className="group flex flex-col h-full">
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="font-mono text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {sb.date}
                    </span>
                  </div>
                  <h4 className="font-display text-lg md:text-xl font-light text-foreground leading-snug md:leading-7 mb-3 group-hover:text-primary transition-colors">
                    {sb.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{sb.excerpt}</p>
                </div>
                <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-medium">
                  Read More
                  <span className="inline-block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
