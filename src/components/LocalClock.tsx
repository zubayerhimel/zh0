import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const LocalClock = () => {
  // Empty when prerendering, so the static HTML doesn't carry the build time.
  const [time, setTime] = useState(() => (typeof window === "undefined" ? "" : formatter.format(new Date())));

  useEffect(() => {
    const interval = setInterval(() => setTime(formatter.format(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className="font-mono text-xs tracking-widest text-muted-foreground"
      title="My local time in Dhaka, Bangladesh (GMT+6)"
    >
      <span className="opacity-60">Dhaka</span> <time className="tabular-nums">{time}</time>
    </p>
  );
};

export default LocalClock;
