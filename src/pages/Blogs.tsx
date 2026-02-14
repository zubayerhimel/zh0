import { Link } from "react-router-dom";
import { blogs } from "@/data/blogs";
import ISTClock from "@/components/ISTClock";

const Blogs = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <ISTClock />
      <div className="container max-w-5xl mx-auto px-6 py-24">
        <div className="mb-20">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors font-mono text-sm mb-8 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-7xl md:text-8xl font-display font-light text-foreground italic">
            Writing
          </h1>
          <p className="font-body text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed">
            Exploring intersections of technology, design, and human experience.
          </p>
        </div>

        <div className="space-y-0">
          {blogs.map((blog, i) => (
            <Link
              key={i}
              to={`/blog/${blog.slug}`}
              className="border-t border-border py-12 grid grid-cols-1 md:grid-cols-4 gap-8 group block hover:bg-card/50 transition-colors -mx-6 px-6"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">{blog.date}</span>
              </div>
              <div className="md:col-span-3">
                <h2 className="font-display text-3xl md:text-4xl text-foreground group-hover:italic transition-all duration-300">
                  {blog.title}
                  <span className="inline-block ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">↗</span>
                </h2>
                <p className="font-body text-base md:text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
