import { useParams, Link } from "react-router-dom";
import { blogs } from "@/data/blogs";
import { ArrowLeft } from "lucide-react";

const CodeBlock = ({ language, code }: { language: string; code: string }) => (
  <div className="my-8 rounded border border-border overflow-hidden">
    <div className="bg-card px-4 py-2 border-b border-border flex items-center gap-2">
      <span className="font-mono text-xs text-muted-foreground">{language}</span>
    </div>
    <pre className="bg-card/50 p-6 overflow-x-auto">
      <code className="font-mono text-sm text-foreground leading-relaxed whitespace-pre">
        {code}
      </code>
    </pre>
  </div>
);

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
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
      <article className="container max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-16"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-muted-foreground">{blog.date}</span>
            <span className="text-muted-foreground">·</span>
            <span className="font-mono text-xs text-muted-foreground">{blog.readTime}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light text-foreground leading-tight">
            {blog.title}
          </h1>
          <p className="font-body text-lg text-muted-foreground mt-6 leading-relaxed max-w-2xl">
            {blog.excerpt}
          </p>
        </header>

        <div className="section-divider mb-16" />

        {/* Content */}
        <div className="space-y-6">
          {blog.content.map((block, i) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p key={i} className="font-body text-base text-foreground/85 leading-[1.8] max-w-2xl">
                    {block.text}
                  </p>
                );
              case "heading":
                return (
                  <h2 key={i} className="font-display text-3xl md:text-4xl font-light text-foreground mt-14 mb-4">
                    {block.text}
                  </h2>
                );
              case "code":
                return <CodeBlock key={i} language={block.language} code={block.code} />;
              case "quote":
                return (
                  <blockquote
                    key={i}
                    className="border-l-2 border-foreground pl-6 py-4 my-10"
                  >
                    <p className="font-display text-xl text-foreground italic leading-relaxed">
                      "{block.text}"
                    </p>
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Suggested Reads */}
        <div className="mt-24">
          <div className="section-divider mb-12" />
          <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-10 italic">
            Suggested Reads
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedBlogs.map((sb) => (
              <Link
                key={sb.slug}
                to={`/blog/${sb.slug}`}
                className="group border border-border p-8 hover:bg-card transition-colors block"
              >
                <span className="font-mono text-xs text-muted-foreground">{sb.date}</span>
                <h4 className="font-display text-xl text-foreground mt-3 group-hover:italic transition-all leading-snug">
                  {sb.title}
                  <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    ↗
                  </span>
                </h4>
                <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
                  {sb.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
