const {test, expect} = require('@playwright/test');

test('handle radio buttons', async ({page}) => { 

    await page.goto('https://itera-qa.azurewebsites.net/home/automation');

    // Radio buttons
    await page.locator("//input[@value='option2']").check();
    // await page.check("//input[@value='option2']");
    await expect(page.locator("//input[@value='option2']")).toBeChecked();
    await expect(page.locator("//input[@value='option2']").isChecked()).toBeTruthy();

    //await page.locator("//input[@value='option1']");
    //await expect(page.locator("//input[@value='option1']")).toBeChecked();
    await expect(page.locator("//input[@value='option1']").isChecked()).toBeTruthy();

    await page.waitForTimeout(2000);  //pausing code
})