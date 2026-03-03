const {test, expect} = require('@playwright/test');

test('handle inputbox', async ({page}) => { 

    await page.goto('https://itera-qa.azurewebsites.net/home/automation');

    // Type text in the inputbox
    await expect(page.locator("//input[@id='name']")).toBeVisible();
    await expect(page.locator("//input[@id='name']")).toBeEmpty();
    await expect(page.locator("//input[@id='name']")).toBeEditable();
    await expect(page.locator("//input[@id='name']")).toBeEnabled();

    await page.locator("//input[@id='name']").fill('TestUser');
    //page.fill("//input[@id='name']", 'TestUser');

    await page.waitForTimeout(2000);  //pausing code
})