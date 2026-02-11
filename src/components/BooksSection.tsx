const books = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    note: "The bible for backend engineers. I've dog-eared every chapter.",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    note: "Changed how I think about craft in software.",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    note: "Not a tech book, but it made me question everything.",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    note: "1% better every day. Except on weekends.",
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    note: "Leverage, specific knowledge, and long-term thinking.",
  },
];

const BooksSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Books I Recommend
        </h2>

        <div className="space-y-0">
          {books.map((book, i) => (
            <div key={i} className="border-t border-border py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
              <span className="md:col-span-1 font-display text-2xl text-muted-foreground/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-4">
                <h3 className="font-display text-xl text-foreground italic">{book.title}</h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">{book.author}</p>
              </div>
              <p className="md:col-span-7 font-body text-sm text-muted-foreground leading-relaxed">
                {book.note}
              </p>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
