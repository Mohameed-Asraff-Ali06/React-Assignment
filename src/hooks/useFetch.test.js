import { renderHook, act } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  // ✅ Success case
  test("fetches data successfully", async () => {
    const mockFetch = jest.fn().mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useFetch(mockFetch));

    // wait for useEffect execution
    await act(async () => {});

    expect(mockFetch).toHaveBeenCalled();
    expect(result.current.data).toEqual([{ id: 1 }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  // ✅ Error case
  test("handles fetch error", async () => {
    const mockFetch = jest
      .fn()
      .mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useFetch(mockFetch));

    await act(async () => {});

    expect(result.current.error).toBe("API error");
    expect(result.current.loading).toBe(false);
  });

  // ✅ Retry function
  test("retry calls fetch again", async () => {
    const mockFetch = jest.fn().mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useFetch(mockFetch));

    await act(async () => {});

    // call retry
    await act(async () => {
      result.current.retry();
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  // ✅ Loading state
  test("sets loading correctly", async () => {
    let resolveFn;
    const mockFetch = jest.fn(
      () =>
        new Promise((resolve) => {
          resolveFn = resolve;
        })
    );

    const { result } = renderHook(() => useFetch(mockFetch));

    // initially loading = true
    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveFn([]);
    });

    expect(result.current.loading).toBe(false);
  });
});