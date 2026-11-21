import { Link } from "react-router";
import { blogs } from "@/data/blogs";

const WritingSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">Writing</h2>

        <div className="space-y-0">
          {blogs.map((blog) => (
            <Link
              key={blog.slug}
              to={`/blog/${blog.slug}`}
              className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-4 gap-4 group block hover:bg-card transition-colors -mx-6 px-6"
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
      </div>
    </section>
  );
};

export default WritingSection;
