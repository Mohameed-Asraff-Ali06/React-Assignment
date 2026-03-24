import { renderHook, act } from "@testing-library/react";
import { useFetch } from "./useFetch";
import { handleError } from "../components/common/errorHandler";

// Mock handleError
jest.mock("../components/common/errorHandler", () => ({
  handleError: jest.fn(),
}));

describe("useFetch Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch data successfully", async () => {
    const mockData = [{ id: 1, name: "Test" }];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() =>
      useFetch("/api/test")
    );

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for async update
    await act(async () => {});

    expect(global.fetch).toHaveBeenCalledWith("/api/test", {});
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test("should handle API error (response not ok)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { result } = renderHook(() =>
      useFetch("/api/test", {}, "Custom error")
    );

    await act(async () => {});

    expect(handleError).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Custom error");
  });

  test("should handle fetch failure (network error)", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network error"))
    );

    const { result } = renderHook(() =>
      useFetch("/api/test")
    );

    await act(async () => {});

    expect(handleError).toHaveBeenCalled();
    expect(result.current.error).toBe(
      "Unable to load data. Please try again."
    );
    expect(result.current.data).toEqual([]);
  });

  test("should retry fetching data", async () => {
    const mockData = [{ id: 2 }];

    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Fail"))
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

    const { result } = renderHook(() =>
      useFetch("/api/test")
    );

    // First call fails
    await act(async () => {});
    expect(result.current.error).not.toBe(null);

    // Retry
    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test("should not call fetch if url is empty", async () => {
    global.fetch = jest.fn();

    renderHook(() => useFetch(""));

    await act(async () => {});

    expect(global.fetch).not.toHaveBeenCalled();
  });
});