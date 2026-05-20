import { strongPasswordSchema } from "@/schemas/auth/strongPassword/strongPassword.schema.ts";

describe("strongPasswordSchema", () => {
  it("accepts a valid strong password", () => {
    expect(strongPasswordSchema.safeParse("Abcdef1!").success).toBe(true);
  });

  it("rejects passwords shorter than 8 characters", () => {
    const result = strongPasswordSchema.safeParse("Ab1!");
    expect(result.success).toBe(false);
  });

  it("rejects passwords without an uppercase letter", () => {
    const result = strongPasswordSchema.safeParse("abcdef1!");
    expect(result.success).toBe(false);
  });

  it("rejects passwords without a lowercase letter", () => {
    const result = strongPasswordSchema.safeParse("ABCDEF1!");
    expect(result.success).toBe(false);
  });

  it("rejects passwords without a number", () => {
    const result = strongPasswordSchema.safeParse("Abcdefg!");
    expect(result.success).toBe(false);
  });

  it("rejects passwords without a special character", () => {
    const result = strongPasswordSchema.safeParse("Abcdef12");
    expect(result.success).toBe(false);
  });
});
