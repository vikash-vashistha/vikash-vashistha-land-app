import { useRef, useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const debunceId = useRef();
  const [dvalue, setDvalue] = useState(value);

  useEffect(() => {
    debunceId.current = setTimeout(() => {
        setDvalue(value)
      }, delay);
    return clearTimeout(debunceId.current)
  }, [delay, value]);
  return dvalue;
};
