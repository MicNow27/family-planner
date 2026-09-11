import { formatDate } from "@/utils/strings/date.ts";

describe("formatDate", () => {
  it("returns digits without formatting when there are fewer than 4 digits", () => {
    expect(formatDate("1")).toBe("1");
    expect(formatDate("199")).toBe("199");
  });

  it("adds a hyphen after the year", () => {
    expect(formatDate("1990")).toBe("1990-");
    expect(formatDate("19900")).toBe("1990-0");
  });

  it("adds a hyphen after the month", () => {
    expect(formatDate("199001")).toBe("1990-01-");
    expect(formatDate("1990010")).toBe("1990-01-0");
  });

  it("removes non-digit characters", () => {
    expect(formatDate("1990a0101")).toBe("1990-01-01");
    expect(formatDate("1990/01/01")).toBe("1990-01-01");
  });

  it("limits the value to 8 digits", () => {
    expect(formatDate("199001011234")).toBe("1990-01-01");
  });

  it("returns an empty string for an empty value", () => {
    expect(formatDate("")).toBe("");
  });

  it("returns an empty string when the value contains no digits", () => {
    expect(formatDate("abc")).toBe("");
  });
});
