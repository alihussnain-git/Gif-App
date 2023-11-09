import {useEffect, useRef} from 'react';

// Define the type for the callback function
type CallbackFunction = () => void;

/**
 * Custom hook that sets up an interval to call the provided callback function.
 * @param callback The callback function to be executed at each interval.
 * @param delay The delay (in milliseconds) between each interval.
 * @param isActive Whether the interval should be active.
 */
export function useInterval(
  callback: CallbackFunction,
  delay: number,
  isActive: boolean,
): void {
  // Create a ref to hold the callback function
  const savedCallback = useRef<CallbackFunction | null>(null);

  // Set up the interval
  useEffect(() => {
    // Update the ref whenever the callback function changes
    savedCallback.current = callback;

    // Set up the interval and clean it up on unmount
    if (isActive) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }

    // The function to be executed at each interval
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
  }, [delay, isActive, callback]);
}
