import { fetchTransactionsData } from "./transactionsApi";

global.fetch = jest.fn();

const ERROR_MESSAGE =
  "sorry, something went wrong we couldn't load the transactions data.";

describe("fetchTransactionsData", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    console.error.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data when API succeeds", async () => {
    const mockData = [{ id: 1 }];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await fetchTransactionsData();

    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith("/transactionsData.json");
  });

  it("throws error when response is not ok", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Server Error",
    });

    await expect(fetchTransactionsData()).rejects.toThrow(ERROR_MESSAGE);
  });

  it("throws error for invalid data format", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({}), // invalid format
    });

    await expect(fetchTransactionsData()).rejects.toThrow(ERROR_MESSAGE);
  });

  it("handles fetch failure", async () => {
    fetch.mockRejectedValue(new Error("Network error"));

    await expect(fetchTransactionsData()).rejects.toThrow(ERROR_MESSAGE);
  });
});