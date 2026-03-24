import { renderHook, act } from "@testing-library/react";
import useDebounce from "./useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 400));
    expect(result.current).toBe("hello");
  });

  it("should update value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "a" } },
    );
    rerender({ value: "abc" });
    expect(result.current).toBe("a");
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(result.current).toBe("abc");
  });

  it("should not update value before delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "test" } },
    );
    rerender({ value: "updated" });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("test");
  });

  it("should reset timer if value changes quickly", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      { initialProps: { value: "a" } },
    );
    rerender({ value: "ab" });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    rerender({ value: "abc" });
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("a");
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("abc");
  });
});
