import { useEffect, useRef } from "react";

const useInterval = (
  callback: () => void,
  delay?: number | null,
  state?: Array<any>
): void => {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    savedCallback.current?.();
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current?.(), delay || 0);
      return () => clearInterval(interval);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, (state || []).toString()]);
};

export default useInterval;
