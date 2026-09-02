import { FORGOT_PASSWORD } from "@copy/forgotPassword.ts";
import { expect, test } from "@playwright/test";

test.describe("Authentication - Forgot Password", () => {
  test("should navigate to forgot password from login", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("link", { name: FORGOT_PASSWORD }).click();
    await expect(page).toHaveURL("/forgot-password");
    await expect(page.getByRole("heading", { name: FORGOT_PASSWORD })).toBeVisible();
  });
});
