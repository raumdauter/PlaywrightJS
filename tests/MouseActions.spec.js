const { test, expect } = require('@playwright/test');

test('Mouse Hover', async ({ page }) => { 

    await page.goto('https://demo.nopcommerce.com/');

    const desktopsMenu = page.getByRole('button', { name: 'Computers' });
    await desktopsMenu.hover();

    await page.waitForTimeout(2000); // Just to visually confirm the hover effect during the test

})