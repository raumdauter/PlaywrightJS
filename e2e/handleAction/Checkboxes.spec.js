const {test, expect} = require('@playwright/test');
test('handle check boxes', async ({page}) => { 

    await page.goto('https://testautomationpractice.blogspot.com/');

    //single checkbox
    await page.locator("//input[@id='sunday' and @type='checkbox']").check();
    // await page.check("//input[@id='sunday' and @type='checkbox']");
    
    expect(await page.locator("//input[@id='sunday' and @type='checkbox']")).toBeChecked();
    expect(await page.locator("//input[@id='sunday' and @type='checkbox']").isChecked()).toBeTruthy();

    // Validated that checkbox is none checked
    expect(await page.locator("//input[@id='monday' and @type='checkbox']").isChecked()).toBeFalsy(); 

    // Multiple checkboxes
    const checkoxesLocators = ["//input[@id='monday' and @type='checkbox']",
                       "//input[@id='tuesday' and @type='checkbox']",
                       "//input[@id='wednesday' and @type='checkbox']"];

                       // select multiple checkboxes
                       for(const locator of checkoxesLocators) {
                        await page.locator(locator).check();
                       }

                       // unselect multiple checkboxes which are already selected
                       for(const locator of checkoxesLocators) {
                        if (await page.locator(locator).isChecked()) {
                        await page.locator(locator).uncheck();
                       }
                    }

    await page.waitForTimeout(2000);
})