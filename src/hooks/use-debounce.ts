import { useEffect, useState } from "react";

export const useDebounce = <T>(originalValue: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(originalValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(originalValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [originalValue, delay]);

  return debounceValue;
};
