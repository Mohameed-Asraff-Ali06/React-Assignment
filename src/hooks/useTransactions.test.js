import { renderHook, waitFor } from "@testing-library/react";
import { useTransactions } from "./useTransactions";
import * as api from "../services/transactionsApi";

jest.spyOn(api, "fetchTransactionsData");

describe("useTransactions", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  it("returns transactions data", async () => {
    api.fetchTransactionsData.mockResolvedValue([{ id: 1 }]);

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual([{ id: 1 }]);
    expect(result.current.error).toBe(null);
  });

  it("handles API error", async () => {
    api.fetchTransactionsData.mockRejectedValue(
      new Error("API failed")
    );

    const { result } = renderHook(() => useTransactions());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("API failed");
    expect(result.current.transactions).toEqual([]);
  });
});