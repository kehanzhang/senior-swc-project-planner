import { useState, useEffect } from "react";

export function AnimatedEllipsis() {
  const [ellipsisCount, setEllipsisCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsisCount((prev) => (prev % 3) + 1);
    }, 333);

    return () => clearInterval(interval);
  }, []);

  return <span className="inline-block">{".".repeat(ellipsisCount)}</span>;
}
