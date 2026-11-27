import { Section, SectionHeading } from "@/components/Section";
import { TechChips } from "@/components/TechChips";
import { type Job, jobs, type Role } from "@/data/experience";
import { formatDuration, formatMonth, formatYears } from "@/lib/month-span";

const RoleDates = ({ role, withDuration }: { role: Role; withDuration: boolean }) => (
  <p className="font-body text-xs text-muted-foreground tabular-nums">
    <time dateTime={role.start}>{formatMonth(role.start)}</time>
    {" – "}
    {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
    {withDuration && <span className="text-muted-foreground/70"> ({formatDuration(role.start, role.end)})</span>}
  </p>
);

const RoleDetails = ({ role, inTrack }: { role: Role; inTrack: boolean }) => (
  <>
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
      <h4 className="font-body text-base md:text-lg font-medium text-foreground">{role.title}</h4>
      <RoleDates role={role} withDuration={inTrack} />
    </div>
    <p className="font-body text-xs text-muted-foreground mt-1">{role.terms}</p>
    {role.highlights && (
      <ul className="mt-4 space-y-2 max-w-2xl list-disc pl-4 marker:text-muted-foreground/40 font-body text-sm text-muted-foreground leading-relaxed">
        {role.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )}
  </>
);

const JobRow = ({ job }: { job: Job }) => {
  const first = job.roles[job.roles.length - 1];
  const latest = job.roles[0];
  // A job is ongoing while its newest role has no end date.
  const end = latest.end;
  const hasTrack = job.roles.length > 1;

  return (
    <li className="border-t border-border py-10 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 md:block md:space-y-2">
        <p className="w-full md:w-auto font-display font-light italic text-2xl md:text-3xl text-foreground">
          {formatYears(first.start, end)}
        </p>
        <p className="font-body text-xs text-muted-foreground tabular-nums">{formatDuration(first.start, end)}</p>
        <p className="font-body text-xs text-muted-foreground">{job.location}</p>
      </div>

      <div className="md:col-span-3">
        <h3 className="font-display text-2xl md:text-3xl text-foreground">
          {job.url ? (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group underline-offset-4 hover:underline"
            >
              {job.company}
              <span
                aria-hidden="true"
                className="inline-block ml-3 text-lg text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
            </a>
          ) : (
            job.company
          )}
        </h3>
        {job.summary && (
          <p className="font-body text-sm md:text-base text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            {job.summary}
          </p>
        )}

        {hasTrack ? (
          // Roles at one company read as a promotion path, newest at the top.
          <ol aria-label={`Roles at ${job.company}`} className="mt-8 ml-1">
            {job.roles.map((role) => (
              <li
                key={role.start}
                className="relative pl-6 pb-10 border-l border-border last:pb-0 last:border-transparent"
              >
                {/* Joins the line into the last role's dot. */}
                <span aria-hidden="true" className="absolute -left-px top-0 h-2 w-px bg-border" />
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-2 size-[9px] rounded-full border border-muted-foreground bg-background"
                />
                <RoleDetails role={role} inTrack />
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-6">
            <RoleDetails role={latest} inTrack={false} />
          </div>
        )}

        {job.stack && <TechChips items={job.stack} className="mt-8" />}
      </div>
    </li>
  );
};

const ExperienceSection = () => {
  return (
    <Section id="experience">
      <SectionHeading title="Experience" />

      <ul>
        {jobs.map((job) => (
          <JobRow key={job.company} job={job} />
        ))}
      </ul>
      <div className="border-t border-border" />
    </Section>
  );
};

export default ExperienceSection;
