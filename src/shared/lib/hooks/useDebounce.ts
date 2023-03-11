import { useEffect, useState } from 'react';

export const useDebounce = <T = any>(value: T, delay = 500): T =>  {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
}
