import { expect, test } from "@playwright/test";
import { testUser } from "./data/testUser";

test.describe("Authentication - Login", () => {
  test("should navigate between landing and login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("/login");

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should show validation error on email field with invalid email", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("invalid-email");
    await page.getByLabel("Password").click();
    await expect(
      page.getByText("Please enter a valid email address"),
    ).toBeVisible();
  });

  test("should show validation error on password field with too short password", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByLabel("Password").fill("1234567");
    await page.getByLabel("Email").fill(testUser.email);
    await expect(
      page.getByText("Password must be at least 8 characters"),
    ).toBeVisible();
  });

  test("should show password when show button is clicked", async ({ page }) => {
    await page.goto("/login");

    const passwordField = page.getByLabel("Password");
    const showHideButton = page.getByRole("button", {
      name: "Show/hide",
    });

    await passwordField.fill("1234");
    await expect(showHideButton).toHaveText("Show");
    await expect(passwordField).toHaveAttribute("type", "password");

    await showHideButton.click();
    await expect(showHideButton).toHaveText("Hide");
    await expect(passwordField).toHaveAttribute("type", "text");
    await expect(passwordField).toHaveValue("1234");

    await showHideButton.click();
    await expect(showHideButton).toHaveText("Show");
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
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("/my-family", { timeout: 10000 });
  });

  test("should show error message when login fails", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill(testUser.email);
    await page.getByLabel("Password").fill("12345678");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Email or password is incorrect")).toBeVisible({
      timeout: 10000,
    });
  });
});
