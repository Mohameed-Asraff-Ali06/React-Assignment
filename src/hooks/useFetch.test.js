import { renderHook, act } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("fetches data successfully", async () => {
    const mockFn = jest.fn().mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useFetch(mockFn));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.data).toEqual([{ id: 1 }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("handles error properly", async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error("Failed"));

    const { result } = renderHook(() => useFetch(mockFn));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Failed");
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("retries fetch successfully", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error("Fail"))
      .mockResolvedValueOnce([{ id: 2 }]);

    const { result } = renderHook(() => useFetch(mockFn));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Fail");

    await act(async () => {
      await result.current.retry();
    });

    expect(result.current.data).toEqual([{ id: 2 }]);
    expect(result.current.error).toBe(null);
  });
});