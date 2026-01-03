import { test, expect } from '@playwright/test';

test ('AssertionTests', async ({page}) => {

    //open app url 
    await page.goto('https://demo.nopcommerce.com/register');

    // 1. expect(page).toHaveURL('url');
    await expect(page).toHaveURL('https://demo.nopcommerce.com/register');

    // 2. expect(page).toHaveTitle('title');
    await expect(page).toHaveTitle('nopCommerce demo store. Register');

    // 3. expect(locator).toBeVisible();
    const logo = page.locator('img[alt="nopCommerce demo store"]');
    await expect(logo).toBeVisible();

    // 4. expect(locator).toBeEnabled()   Control is enable
    const searchButton = page.locator('.button-1.search-box-button');
    await expect(searchButton).toBeEnabled();


    // 5. expect(locator).toBeChecked()      Radio/ Checkbox is checked
    const mailRadio = page.locator('#gender-male');
    await mailRadio.check();
    await expect(mailRadio).toBeChecked();

    const newsletterCheckbox = page.getByText('Male', { exact: true });
    //await newsletterCheckbox.click();
    await expect(newsletterCheckbox).toBeChecked();

    // 6. expect(locator).tohaeAttribute()      Elenment attribute value
    const RegiserButton = await page.locator('#register-button');
    await expect(RegiserButton).toHaveAttribute('type', 'submit');

    // 7. expect(locator).toHaveText()       Element text
    const heading = page.locator('div.page-title h1');
    await expect(heading).toHaveText('Register');

    // 8. expect(locator).toContainText()     Element text partial
    const newsLetter = page.locator(`label:has-text("Newsletter")`);
    await expect(newsLetter).toContainText('Newsletter');

    // 9. expect(locator).toHaveValue()     Input field value
    const firstName = page.locator('#FirstName');
    await firstName.fill('John');
    await expect(firstName).toHaveValue('John');

    // 10. expect(locator).toHaveCount()    List of elements has given length
    const allRadioButtons = page.locator('input[type="radio"]');
    await expect(allRadioButtons).toHaveCount(2);

    await page.close();
});