import { formatTime, getNextLevel, getRemainingCooldownTime } from "@/hooks/useCooldown/timeLogic/timeLogic.ts";

describe("getNextLevel", () => {
  it("increments level", () => {
    expect(getNextLevel(0, [60, 300, 3600])).toBe(1);
  });

  it("does not exceed last index", () => {
    expect(getNextLevel(2, [60, 300, 3600])).toBe(2);
  });
});

describe("formatTime", () => {
  it("returns only seconds when under 60", () => {
    expect(formatTime(45)).toEqual({ seconds: 45 });
  });

  it("returns minutes and seconds when 60 or more", () => {
    expect(formatTime(90)).toEqual({ minutes: 1, seconds: 30 });
  });

  it("returns minutes and zero seconds on exact minute", () => {
    expect(formatTime(120)).toEqual({ minutes: 2, seconds: 0 });
  });
});

describe("getRemainingCooldownTime", () => {
  beforeEach(() => localStorage.clear());

  it("returns remaining time when stored time exists", () => {
    const future = Math.floor(Date.now() / 1000) + 100;
    localStorage.setItem("test_key", future.toString());
    const result = getRemainingCooldownTime("test_key", 60);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  it("sets and returns initial value when no stored time", () => {
    const result = getRemainingCooldownTime("test_key", 60);
    expect(result).toBe(60);
    expect(localStorage.getItem("test_key")).not.toBeNull();
  });

  it("returns 0 if stored time is in the past", () => {
    const past = Math.floor(Date.now() / 1000) - 10;
    localStorage.setItem("test_key", past.toString());
    const result = getRemainingCooldownTime("test_key", 60);
    expect(result).toBe(0);
  });
});
