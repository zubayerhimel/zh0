const days = ["Mon", "", "Wed", "", "Fri", "", ""];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Generate mock contribution data
const generateContributions = () => {
  const weeks = 52;
  const daysPerWeek = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const rand = Math.random();
      if (rand < 0.3) week.push(0);
      else if (rand < 0.55) week.push(1);
      else if (rand < 0.75) week.push(2);
      else if (rand < 0.9) week.push(3);
      else week.push(4);
    }
    data.push(week);
  }
  return data;
};

const getColor = (level: number) => {
  switch (level) {
    case 0: return "bg-secondary";
    case 1: return "bg-muted-foreground/20";
    case 2: return "bg-muted-foreground/40";
    case 3: return "bg-muted-foreground/70";
    case 4: return "bg-foreground";
    default: return "bg-secondary";
  }
};

const contributions = generateContributions();

const GitHubSection = () => {
  const totalContributions = contributions.flat().reduce((a, b) => a + b * 47, 0);

  return (
    <section className="py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-display font-light text-foreground mb-16 italic">
          GitHub
        </h2>

        <div className="space-y-4">
          <p className="font-mono text-xs text-muted-foreground">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>

          <div className="overflow-x-auto">
            <div className="inline-flex gap-[3px]">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className={`w-[11px] h-[11px] ${getColor(day)}`}
                      title={`${day} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-[11px] h-[11px] ${getColor(level)}`} />
            ))}
            <span>More</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-border">
            {[
              { label: "Repositories", value: "42+" },
              { label: "Stars Earned", value: "380" },
              { label: "PRs Merged", value: "1,200+" },
              { label: "Streak (days)", value: "127" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display text-4xl text-foreground">{stat.value}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubSection;
