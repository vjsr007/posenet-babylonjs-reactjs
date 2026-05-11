import { expect, test } from "@playwright/test";

test("home loads with PoseArena title and start button", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Imita la pose objetivo/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Empezar/i })).toBeVisible();
});
