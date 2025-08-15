import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

describe("useDebounce Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("debounces string value updates correctly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    // Update the value
    rerender({ value: "updated", delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Value should still be the old one
    expect(result.current).toBe("initial");

    // Fast-forward time to complete the delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Now the value should be updated
    expect(result.current).toBe("updated");
  });

  it("cancels previous timeout when value changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    // Update the value multiple times rapidly
    rerender({ value: "first", delay: 500 });
    rerender({ value: "second", delay: 500 });
    rerender({ value: "final", delay: 500 });

    // Fast-forward time by less than delay
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Value should still be initial
    expect(result.current).toBe("initial");

    // Complete the delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Should only get the final value, not intermediate ones
    expect(result.current).toBe("final");
  });

  it("works with different data types", () => {
    // Test with number
    const { result: numberResult, rerender: numberRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 300 },
      }
    );

    expect(numberResult.current).toBe(0);

    numberRerender({ value: 42, delay: 300 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(numberResult.current).toBe(42);

    // Test with object
    const initialObject = { name: "John", age: 30 };
    const updatedObject = { name: "Jane", age: 25 };

    const { result: objectResult, rerender: objectRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: initialObject, delay: 300 },
      }
    );

    expect(objectResult.current).toEqual(initialObject);

    objectRerender({ value: updatedObject, delay: 300 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(objectResult.current).toEqual(updatedObject);

    // Test with array
    const { result: arrayResult, rerender: arrayRerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: [1, 2, 3], delay: 300 },
      }
    );

    expect(arrayResult.current).toEqual([1, 2, 3]);

    arrayRerender({ value: [4, 5, 6], delay: 300 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(arrayResult.current).toEqual([4, 5, 6]);
  });

  it("handles delay changes correctly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    expect(result.current).toBe("initial");

    // Update value and delay simultaneously
    rerender({ value: "updated", delay: 200 });

    // Fast-forward by the new shorter delay
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Should update with the new delay timing
    expect(result.current).toBe("updated");

    // Test with longer delay
    rerender({ value: "final", delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should not update yet with longer delay
    expect(result.current).toBe("updated");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now should update after full delay
    expect(result.current).toBe("final");
  });
});
