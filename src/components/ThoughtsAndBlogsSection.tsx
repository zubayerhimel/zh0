import { Link } from "react-router";
import { blogs } from "@/data/blogs";

const thoughts = [
  {
    text: "The best code is the code you never have to write. The second best is the code someone else maintains.",
  },
  {
    text: "I don't believe in 10x engineers. I believe in engineers who remove 10x the unnecessary complexity.",
  },
  {
    text: "Your side project doesn't need a microservices architecture. It needs to ship.",
  },
  {
    text: "Reading documentation is a superpower. Most bugs are just unread README files.",
  },
];

const ThoughtsAndBlogsSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Thoughts */}
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Thoughts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {thoughts.map((thought, i) => (
            <blockquote
              key={i}
              className="border-l-2 border-foreground pl-6 py-2"
            >
              <p className="font-display text-lg text-foreground italic leading-relaxed">
                "{thought.text}"
              </p>
            </blockquote>
          ))}
        </div>

        {/* Blogs */}
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Writing
        </h2>

        <div className="space-y-0">
          {blogs.map((blog, i) => (
            <Link
              key={i}
              to={`/blog/${blog.slug}`}
              className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-4 gap-4 group block hover:bg-card transition-colors -mx-6 px-6"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-muted-foreground">{blog.date}</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-display text-2xl text-foreground">
                  {blog.title}
                  <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">↗</span>
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-2 max-w-lg leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ThoughtsAndBlogsSection;
