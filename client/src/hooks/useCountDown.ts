import { useEffect, useState } from "react";

export const useCountDown = (length: number) => {
  const [seconds, setSeconds] = useState<number>(length);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timeOut = setTimeout(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : prevSeconds));
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [seconds]);
  const startCountDown = (value: number) => {
    setSeconds(value);
  };

  return { seconds: seconds, startCountDown: startCountDown };
};
