import { EMAIL_ERROR, EMAIL_LABEL } from "@copy/email.ts";
import { LOGIN, LOGIN_ERROR } from "@copy/login.ts";
import {
  HIDE_PASSWORD,
  PASSWORD_ERROR_LENGTH,
  PASSWORD_LABEL,
  SHOW_PASSWORD,
} from "@copy/password.ts";
import { expect, test } from "@playwright/test";
import { testUser } from "./data/testUser";

test.describe("Authentication - Login", () => {
  test("should navigate between landing and login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: LOGIN }).click();
    await expect(page).toHaveURL("/login");

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should show validation error on email field with invalid email", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel(EMAIL_LABEL).fill("invalid-email");
    await page.getByLabel(PASSWORD_LABEL).click();
    await expect(page.getByText(EMAIL_ERROR)).toBeVisible();
  });

  test("should show validation error on password field with too short password", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel(PASSWORD_LABEL).fill("1234567");
    await page.getByLabel(EMAIL_LABEL).fill(testUser.email);
    await expect(page.getByText(PASSWORD_ERROR_LENGTH)).toBeVisible();
  });

  test("should show password when show button is clicked", async ({ page }) => {
    await page.goto("/login");

    const passwordField = page.getByLabel(PASSWORD_LABEL);
    const showHideButton = page.getByRole("button", {
      name: "Show/hide",
    });

    await passwordField.fill("1234");
    await expect(showHideButton).toHaveText(SHOW_PASSWORD);
    await expect(passwordField).toHaveAttribute("type", "password");

    await showHideButton.click();
    await expect(showHideButton).toHaveText(HIDE_PASSWORD);
    await expect(passwordField).toHaveAttribute("type", "text");
    await expect(passwordField).toHaveValue("1234");

    await showHideButton.click();
    await expect(showHideButton).toHaveText(SHOW_PASSWORD);
    await expect(passwordField).toHaveAttribute("type", "password");
    await expect(passwordField).toHaveValue("1234");
  });

  test("should perform real login with test credentials", async ({ page }) => {
    const { email, password } = testUser;

    if (!email || !password) {
      test.skip(true, "Test credentials missing.");
      return;
    }

    await page.goto("/login");
    await page.getByLabel(EMAIL_LABEL).fill(email);
    await page.getByLabel(PASSWORD_LABEL).fill(password);
    await page.getByRole("button", { name: LOGIN }).click();

    await expect(page).toHaveURL("/onboarding", { timeout: 10000 });
  });

  test("should show error message when login fails", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(EMAIL_LABEL).fill(testUser.email);
    await page.getByLabel(PASSWORD_LABEL).fill("12345678");
    await page.getByRole("button", { name: LOGIN }).click();
    await expect(page.getByText(LOGIN_ERROR)).toBeVisible({
      timeout: 10000,
    });
  });
});
