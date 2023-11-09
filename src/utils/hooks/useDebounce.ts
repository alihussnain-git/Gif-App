import {useState, useEffect} from 'react';

/**
 * Custom hook that returns a debounced value of the input.
 * @template T The type of the input value.
 * @param {T} value The input value to be debounced.
 * @param {number} delay The delay (in milliseconds) for the debounce.
 * @returns {T} The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer when the effect is re-run or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run the effect when value or delay changes

  return debouncedValue;
}
