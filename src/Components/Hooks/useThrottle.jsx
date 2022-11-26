import { useRef, useEffect } from "react";

export const useThrottle = (func, delay) => {
  const throttleId = useRef(false);

  useEffect(() => {
    if (!throttleId.current) {
      throttleId.current = true;
      setTimeout(() => {
        throttleId.current = false;
        func();
      }, delay);
    }
  }, [delay, func]);
};
