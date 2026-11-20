import { useEffect, useState } from "react";

const ISTClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(ist);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 font-mono text-xs tracking-widest text-muted-foreground">
      <span className="opacity-50">BST</span> <span>{time}</span>
    </div>
  );
};

export default ISTClock;
