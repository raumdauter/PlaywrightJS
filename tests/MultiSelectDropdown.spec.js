const {test, expect} = require('@playwright/test');
test('handle dropdowns', async ({page}) => { 

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Select multiple options from multi-select dropdown
    //await page.selectOption('#color', ['Blue', 'Red', 'Yellow'])

    // Assertions
    // 1. Check number of options in multi-select dropdown
    // const options = await page.locator("#color option")
    // await expect(options).toHaveCount(5);

    // 2. Check number of options in dropdown using JS array
    // const allOptions = await page.$$('#color option')
    // console.log("Number of options in multi-select dropdown: " + allOptions.length);
    // await expect(allOptions.length).toBe(5);

    // 3. Check presence of value in the multi-select dropdown
    const options = await page.$$('#color option').textContent()
    await expect(content.includes('Blue')).toBeTruthy();
    console.log("Values in multi-select dropdown: " + content);

    await page.waitForTimeout(2000);

});