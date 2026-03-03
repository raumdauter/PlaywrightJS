/*
page.getByAltText() - to locate an element, usually an image, by its text alternative.
page.getByPlaceholder() - to locate an input by placeholder.
page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.

page.getByLabel() to locate a form control by the associated label's text.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/
import {test, expect} from '@playwright/test';

test('Locators', async ({page}) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    const logo = page.getByAltText('company-branding');
    await expect(logo).toBeVisible();

    const username = page.locator('[name="username"]');
    const password = page.getByPlaceholder('Password');
    const oxdButtonElement = page.locator(`button[type="submit"]`);

    await username.fill('Admin');
    await password.fill('admin123');
    await oxdButtonElement.click();

    const dashboardHeader = page.getByRole('heading', {name: 'Dashboard'});
    await expect(dashboardHeader).toBeVisible();

    const name = await page.locator(`//span[@class='oxd-userdropdown-tab']`);
    // Compare the displayed name, đúng nhưng mà opensource nên tụi nó vào sửa tùm lum hết
    //await expect(name).toEqual('mandauha Ulagendran');  
    // Chờ xem tên hiển thị có hiển thị không
    //có cũng đc không cũng không sao, vì ở đây tôi đang lấy text từ web xuống và xem nó có hiển thị hay không thì vì lấy từ web xuống nên chắc chắn nó sẽ hiển thị
    //await expect(page.getByText(name)).toBeVisible();
    await expect(name).toBeVisible();
    console.log('The displaed name is: ' + await name.textContent());

    await page.close();

});