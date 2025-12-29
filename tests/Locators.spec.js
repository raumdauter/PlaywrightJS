//const {test, expect} = require('@playwright/test');

import {test, expect} from '@playwright/test';

test('Locators', async ({page}) => {

    await page.goto('https://www.demoblaze.com/');

    // click on Login button - property
    await page.locator('id=login2 ').click();
    //await page.click('');

    await page.locator('id=loginusername').fill('testerdemo123');
    await page.locator('id=loginpassword').fill('123456');

    await page.locator('button:has-text("Log in")').click();

    //verify logout link presence
    const logoutLink = await page.locator(`//a[@id='logout2']`);
    await expect(logoutLink).toBeVisible();

    await page.close();
});