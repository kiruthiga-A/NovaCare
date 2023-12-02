import { useEffect, useState } from "react";

export const useTimer = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const customInterval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(customInterval);
  }, [time]);

  return time;
};
