import { test, expect } from '@playwright/test';

test('page screenshot', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');
    await page.screenshot({ path:'tests/screenshots/' + Date.now() +  'Homepage.png' });
});

test('Full page screenshot', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');
    await page.screenshot({ path:'tests/screenshots/' + Date.now() +  'Fullpage.png', fullPage: true });
});

test.only('Element screenshot', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');
    const electronicsLink = page.getByRole('link', { name: 'Electronics' }).nth(1);
    await electronicsLink.screenshot({ path:'tests/screenshots/' + Date.now() +  'Element.png' })
})