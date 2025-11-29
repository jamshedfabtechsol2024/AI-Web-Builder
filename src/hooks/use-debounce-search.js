import { useState, useRef, useCallback, useEffect } from "react";

export function useDebounceSearch(
  initialValue = "",
  delay = 300,
  immediate = false
) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback(
    (val) => {
      setValue(val);
      setLoading(true);
      cancel();
      if (immediate) {
        setDebouncedValue(val);
        setLoading(false);
      } else {
        timer.current = setTimeout(() => {
          setDebouncedValue(val);
          setLoading(false);
        }, delay);
      }
    },
    [delay, immediate, cancel]
  );

  useEffect(() => cancel, [cancel]);

  return {
    value,
    debouncedValue,
    loading,
    setValue: handleChange,
    cancel,
  };
}
