import { Link } from "react-router";
import { Section, SectionHeading } from "@/components/Section";
import { blogs } from "@/data/blogs";

const WritingSection = () => {
  return (
    <Section id="writing">
      <SectionHeading title="Writing" count={blogs.length} />

      <div className="space-y-0">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blog/${blog.slug}`}
            className="row-hover border-t border-border py-8 grid grid-cols-1 md:grid-cols-4 gap-4 group"
          >
            <div className="md:col-span-1">
              <span className="font-mono text-xs text-muted-foreground">{blog.date}</span>
            </div>
            <div className="md:col-span-3">
              <h3 className="font-display text-2xl text-foreground">
                {blog.title}
                <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  ↗
                </span>
              </h3>
              <p className="font-body text-sm text-muted-foreground mt-2 max-w-lg leading-relaxed">{blog.excerpt}</p>
            </div>
          </Link>
        ))}
        <div className="border-t border-border" />
      </div>
    </Section>
  );
};

export default WritingSection;
