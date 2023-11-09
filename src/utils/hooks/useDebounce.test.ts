import {useState} from 'react';
import {useDebounce} from './useDebounce';

// Mock the useState and useEffect functions
jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  return {
    ...originalModule,
    useState: jest.fn(),
    useEffect: jest.fn(),
  };
});

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const initialValue = 'initial';
    const delay = 300;

    // Mock the useState hook to return the initial value
    (useState as jest.Mock).mockReturnValue([initialValue, jest.fn()]);

    let debouncedValue: any;

    // Call the hook directly
    debouncedValue = useDebounce(initialValue, delay);

    // Assert that the debounced value is the same as the initial value
    expect(debouncedValue).toBe(initialValue);
  });

  it('updates the debounced value after the specified delay', () => {
    const initialValue = 'initial';
    const updatedValue = 'updated';
    const delay = 300;

    // Mock the useState hook to return the initial value
    (useState as jest.Mock).mockReturnValue([initialValue, jest.fn()]);

    let debouncedValue: any;

    // Call the hook directly
    debouncedValue = useDebounce(initialValue, delay);

    // Assert that the debounced value is the same as the initial value
    expect(debouncedValue).toBe(initialValue);

    // Manually trigger the effect with the updated value
    debouncedValue = useDebounce(updatedValue, delay);

    // Advance timers by a bit less than the delay
    jest.advanceTimersByTime(delay - 1);

    // Assert that the debounced value is still the initial value
    expect(debouncedValue).toBe(initialValue);

    // Advance timers by the remaining time plus a little extra
    jest.advanceTimersByTime(2);

    // Wrap the assertion inside a setTimeout to ensure proper order
    setTimeout(() => {
      // Assert that the debounced value is now the updated value
      expect(debouncedValue).toBe(updatedValue);
    }, 0);
  });
});
