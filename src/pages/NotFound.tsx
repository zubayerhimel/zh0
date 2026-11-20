import { Link, useLocation } from "react-router";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <main className="bg-background text-foreground min-h-screen flex items-center">
      <div className="container max-w-5xl mx-auto px-6 py-24">
        <p className="font-mono text-xs text-muted-foreground mb-6">404</p>
        <h1 className="font-display text-5xl md:text-7xl font-light italic leading-none">This page doesn't exist.</h1>
        <p className="font-body text-muted-foreground mt-6 max-w-lg leading-relaxed">
          Nothing lives at <code className="font-mono text-sm text-foreground break-all">{pathname}</code>. The link may
          be mistyped, or the page may have moved.
        </p>
        <div className="flex flex-wrap gap-6 mt-10 font-mono text-xs">
          <Link to="/" className="underline underline-offset-4 hover:text-muted-foreground transition-colors">
            Go to the homepage
          </Link>
          <Link
            to="/blogs"
            className="text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            Read my writing
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
