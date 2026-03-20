import { fetchTransactionsData } from "./transactionsApi";

global.fetch = jest.fn();

describe("transactionsApi", () => {
  test("fetches transactions successfully", async () => {
    fetch.mockResolvedValueOnce({
      ok: true, // REQUIRED
      json: async () => [{ id: 1, amount: 100 }],
    });

    const data = await fetchTransactionsData();

    expect(fetch).toHaveBeenCalled();
    expect(data).toEqual([{ id: 1, amount: 100 }]);
  });

  test("handles API failure (response not ok)", async () => {
    fetch.mockResolvedValueOnce({
      ok: false, // simulate failure
    });

    await expect(fetchTransactionsData()).rejects.toThrow(
      "Failed to fetch transactions"
    );
  });

  test("handles network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchTransactionsData()).rejects.toThrow("Network error");
  });
});