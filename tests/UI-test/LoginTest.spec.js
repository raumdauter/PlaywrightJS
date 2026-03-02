const { test, expect } = require('@fixtures/baseTest');

test('Login and check dashboard', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.login('admin', 'password');
  await expect(dashboardPage.header).toBeVisible();
});