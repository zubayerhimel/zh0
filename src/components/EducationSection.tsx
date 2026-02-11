const education = [
  {
    degree: "B.Tech in Computer Science",
    institution: "University Name",
    period: "2015 — 2019",
    note: "Graduated with distinction. Spent more time in the lab than the lecture hall.",
  },
  {
    degree: "High School — Science Stream",
    institution: "School Name",
    period: "2013 — 2015",
    note: "Where the love for problem-solving began.",
  },
];

const EducationSection = () => {
  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          Education
        </h2>

        <div className="space-y-0">
          {education.map((edu, i) => (
            <div key={i} className="border-t border-border py-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <span className="font-mono text-xs text-muted-foreground">{edu.period}</span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-display text-2xl text-foreground">{edu.degree}</h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">{edu.institution}</p>
                <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg leading-relaxed">
                  {edu.note}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
