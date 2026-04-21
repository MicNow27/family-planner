import { passwordConfirmationSchema } from "@/schemas/auth/passwordConfirmation/passwordConfirmation.schema.ts";

describe("passwordConfirmationSchema", () => {
  it("accepts matching passwords", () => {
    const result = passwordConfirmationSchema.safeParse({
      password: "Abcdef1!",
      confirmPassword: "Abcdef1!",
    });

    expect(result.success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = passwordConfirmationSchema.safeParse({
      password: "Abcdef1!",
      confirmPassword: "Abcdef1@",
    });

    expect(result.success).toBe(false);
  });

  it("places the mismatch error on confirmPassword", () => {
    const result = passwordConfirmationSchema.safeParse({
      password: "Abcdef1!",
      confirmPassword: "Different1!",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain("confirmPassword");
    }
  });

  it("rejects a weak password", () => {
    const result = passwordConfirmationSchema.safeParse({
      password: "weak",
      confirmPassword: "weak",
    });

    expect(result.success).toBe(false);
  });
});
