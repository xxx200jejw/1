const { test, expect } = require('@playwright/test');

const TODO_URL = 'https://demo.playwright.dev/todomvc/';

// TEST 1 – NÄIDIS: kasutaja saab ülesande lisada.
test('kasutaja saab lisada ülesande', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Õpi UI testimist');
  await input.press('Enter');

  await expect(page.getByText('Õpi UI testimist')).toBeVisible();
});

// TEST 2 – ÕPILANE: kasutaja saab ülesande lõpetatuks märkida.
test('kasutaja saab ülesande lõpetatuks märkida', async ({ page }) => {
  await page.goto(TODO_URL);

  // TODO:
  // 1. Lisa ülesanne "Esimene test".
  // 2. Leia ülesande rida getByRole('listitem') ja filter({ hasText: ... }) abil.
  // 3. Leia ülesande rea sees checkbox.
  // 4. Märgi checkbox check() abil.
  // 5. Kontrolli toBeChecked() abil, et checkbox on märgitud.
});

// TEST 3 – ÕPILANE: kasutaja saab ülesande kustutada.
test('kasutaja saab ülesande kustutada', async ({ page }) => {
  await page.goto(TODO_URL);

  // TODO:
  // 1. Lisa ülesanne "Kustutatav ülesanne".
  // 2. Leia ülesande rida.
  // 3. Kasuta task.hover(), et kustutamisnupp nähtavale tuua.
  // 4. Leia rea seest nupp CSS-lokaatoriga 'button.destroy' ja vajuta seda.
  // 5. Kontrolli toHaveCount(0) abil, et ülesannet enam ei ole.
});
