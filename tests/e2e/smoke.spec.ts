import { expect, test } from "@playwright/test";

test("lobby muestra los 3 juegos", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Elige un juego/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Pose Match/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Estatua/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Yoga Flow/i })).toBeVisible();
});

test("entrar a Pose Match muestra el menú del juego", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Pose Match/i }).click();
  await expect(page.getByRole("heading", { name: /Imita la pose objetivo/i })).toBeVisible();
});
