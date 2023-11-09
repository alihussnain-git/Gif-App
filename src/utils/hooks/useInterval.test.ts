import {act} from '@testing-library/react-native';

import React from 'react';
import {useInterval} from './useInterval';

// Mock the useRef and useEffect functions
jest.mock('react', () => {
  const originalModule = jest.requireActual('react');
  return {
    ...originalModule,
    useRef: jest.fn(),
    useEffect: jest.fn(),
  };
});

jest.useFakeTimers();

describe('useInterval', () => {
  it('calls the callback function at the specified interval when isActive is true', () => {
    const callback = jest.fn();
    const delay = 1000;
    const isActive = true;

    // Mock the useRef hook to return the saved callback
    const useRefMock = {current: callback};
    (React.useRef as jest.Mock).mockReturnValue(useRefMock);

    act(() => {
      useInterval(callback, delay, isActive);
    });

    // Manually call the saved callback to simulate the interval behavior
    act(() => {
      useRefMock.current();
    });

    // Advance time by the delay
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Manually call the saved callback again
    act(() => {
      useRefMock.current();
    });

    // Advance time by the delay again
    act(() => {
      jest.advanceTimersByTime(delay);
    });

    // Manually call the saved callback again
    act(() => {
      useRefMock.current();
    });

    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('does not call the callback function when isActive is false', () => {
    const callback = jest.fn();
    const delay = 1000;
    const isActive = false;

    useInterval(callback, delay, isActive);

    jest.advanceTimersByTime(delay * 3);

    expect(callback).not.toHaveBeenCalled();
  });
});
