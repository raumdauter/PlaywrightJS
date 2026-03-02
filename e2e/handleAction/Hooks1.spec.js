import {test, expect} from '@playwright/test';

let page;

test.beforeEach(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('https://www.demoblaze.com/');
    
    //Login action
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('testerdemo123');
    await page.locator('#loginpassword').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();

    //Validation
    const welcomeTesterdemo123Link = page.getByRole('link', { name: 'Welcome testerdemo123' });
    await expect(welcomeTesterdemo123Link).toBeVisible();
    const logOutLink = page.getByRole('link', { name: 'Log out' });
    await expect(logOutLink).toBeVisible();

    await page.waitForTimeout(2000);
})

test.afterEach(async() => {
    const logOutLink = page.getByRole('link', { name: 'Log out' });
    await logOutLink.click();
})

test('Select Product', async () => {

    //Select Product Category - Phones
    await page.getByRole('link', { name: 'Phones' }).click();
    await page.waitForTimeout(2000);

    //Select Product - Samsung galaxy s6
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await page.waitForTimeout(2000);
})

test('Add Prodcut to Cart', async () => {

    //Select Product
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    //Add to cart
    await page.getByRole('link', { name: 'Add to cart' }).click();

    //Handle Alert popup
    page.on('dialog', dialog => dialog.accept());   

    //Go to Cart page
    await page.getByRole('link', { name: 'Cart', exact: true }).click(); 

    //Validation - Check if the product is added to cart
    const cartTable = page.locator('#tbodyid tr');
    // await expect(cartTable).toHaveCount(1);
    // await expect(cartTable.nth(0)).toContainText('Samsung galaxy s6');

    // Playwright sẽ đợi cho đến khi bảng có ít nhất 1 dòng (hoặc timeout 5s)
    await expect(cartTable).not.toHaveCount(0);

    // Kiểm tra xem trong danh sách các dòng, có dòng nào chứa Samsung galaxy s6 không
    // Playwright sẽ tự động quét qua các phần tử nếu bạn dùng locator chung
    await expect(cartTable).toContainText(['Samsung galaxy s6']);

    await page.waitForTimeout(2000);
})
