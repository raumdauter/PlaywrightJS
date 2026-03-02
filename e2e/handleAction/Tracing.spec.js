import { test, expect } from '@playwright/test';

test('Tracing Viewer', async ({ page }) => {
    
    await page.goto('https://www.demoblaze.com/');
    
    //Login action
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('testerdemo123');
    await page.locator('#loginpassword').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
});