import { nameSchema } from "@/schemas/onboarding/nameSchema/nameSchema.ts";
import {
  NAME_LENGTH_ERROR,
  NAME_REQUIRED_ERROR,
  NAME_VALID_ERROR,
} from "@copy/onboarding/name.ts";

describe("nameSchema", () => {
  it("accepts a valid name", () => {
    expect(nameSchema.safeParse("Abigail").success).toBe(true);
  });

  it("accepts names with spaces", () => {
    expect(nameSchema.safeParse("Abigail Anna").success).toBe(true);
  });

  it("accepts names with hyphens", () => {
    expect(nameSchema.safeParse("Abigail-Anna").success).toBe(true);
  });

  it("accepts names with apostrophes", () => {
    expect(nameSchema.safeParse("O'Connor").success).toBe(true);
  });

  it("accepts names with accented characters", () => {
    expect(nameSchema.safeParse("Jürgen").success).toBe(true);
    expect(nameSchema.safeParse("José").success).toBe(true);
    expect(nameSchema.safeParse("ẞoë").success).toBe(true);
  });

  it("accepts names with multiple Unicode characters", () => {
    expect(nameSchema.safeParse("D'Angelo-Smith").success).toBe(true);
  });

  it("trims leading and trailing whitespace", () => {
    expect(nameSchema.parse("  Abigail  ")).toBe("Abigail");
  });

  it("rejects an empty string", () => {
    const result = nameSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.issues[0].message).toBe(NAME_REQUIRED_ERROR);
  });

  it("rejects a whitespace-only string", () => {
    const result = nameSchema.safeParse("   ");
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.issues[0].message).toBe(NAME_REQUIRED_ERROR);
  });

  it("rejects numbers", () => {
    const result = nameSchema.safeParse("Abigail123");
    expect(result.success).toBe(false);
    if (!result.success)
      expect(result.error.issues[0].message).toBe(NAME_VALID_ERROR);
  });

  it("rejects special characters", () => {
    const invalidNames = [
      "Abigail@",
      "Abigail_",
      "Abigail.",
      "Abigail!",
      "Abigail#",
      "Abigail$",
      "Abigail/",
    ];

    invalidNames.forEach((name) => {
      const result = nameSchema.safeParse(name);

      expect(result.success).toBe(false);

      if (!result.success)
        expect(result.error.issues[0].message).toBe(NAME_VALID_ERROR);
    });
  });

  it("accepts a name with exactly 30 characters", () => {
    const name = "A".repeat(30);
    expect(nameSchema.safeParse(name).success).toBe(true);
  });

  it("rejects a name longer than 30 characters", () => {
    const name = "A".repeat(31);
    const result = nameSchema.safeParse(name);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(NAME_LENGTH_ERROR);
    }
  });
});
