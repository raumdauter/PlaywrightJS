const {test, expect} = require('@playwright/test');
test('handle dropdowns', async ({page}) => { 

    await page.goto('https://testautomationpractice.blogspot.com/');

    // Multiple select dropdown
    // await page.locator("#country").selectOption({label:'India'});  // label/ visible text
    // await page.locator("#country").selectOption('India');     // visible text
    // await page.locator("#country").selectOption({value:'uk'});  // by using value
    // await page.locator("#country").selectOption({index:1});     // by using index
    // await page.locator("#country", 'India'); // by text

    // Assertions
    // 1. Check number of ooptions in dropdown - Approach 1
    // const options = await page.locator("#country option")
    // await expect(options).toHaveCount(10);

    // 2. Check number of options in dropdown - Approach 2
    const options2 = await page.$$("#country option");
    //console.log("Number of options in dropdown: " + options2.length);
    await expect(options2.length).toBe(10);

    // 3. Check presence of value in the dropdown - Approach 1
    // const content = await page.locator("#country").textContent();
    // await expect(content.includes('India')).toBeTruthy();   // chưa keyword là true
    // console.log("Print the values in dropdown: " + content);

    // 4. Check presence of value in the dropdown - Approach 2 ussing loop
    const dropdownValues = await page.$$("#country option");
    let status = false;
    for(const ddlValue of dropdownValues) {
        console.log(await ddlValue.textContent());
        let value = await ddlValue.textContent();
        if (value.includes('China')) {
            status = true;
            console.log("Value is present in dropdown: " + value);
            break;
        }
    }
    expect(status).toBeTruthy();

    await page.waitForTimeout(2000);

})