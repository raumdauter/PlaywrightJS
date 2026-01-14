const {test, expect} = require('@playwright/test');
test('Auto suggest dropdowns', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await page.locator(`//input[@name='username']`).fill('Admin');
    await page.locator(`//input[@name='password']`).fill('admin123');
    await page.locator(`button[type="submit"]`).click();

    await page.locator("//span[normalize-space()='PIM']").click();
    await page.locator("//body/div[@id='app']/div[@class='oxd-layout orangehrm-upgrade-layout']/div[@class='oxd-layout-container']/div[@class='oxd-layout-context']/div[@class='orangehrm-background-container']/div[@class='oxd-table-filter']/div[@class='oxd-table-filter-area']/form[@class='oxd-form']/div[@class='oxd-form-row']/div[@class='oxd-grid-4 orangehrm-full-width-grid']/div[6]/div[1]/div[2]/div[1]/div[1]").click(); // click on dropdown to open

    //waiting for options
    await page.waitForTimeout(2000);
    const options = page.locator("//div[@role='listbox']//span");

    for (let option of await options.all()) {
        const jobTitle = await option.textContent();
        console.log(jobTitle?.trim());

        if(jobTitle.includes('QA Engineer')) {
            await option.click();
            break;
        }
    }

    
    await page.waitForTimeout(2000);


})
