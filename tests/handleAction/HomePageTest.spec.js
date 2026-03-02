const {test, expect} = require('@playwright/test')

test('Home Page', async ({page}) => {

    await page.goto('https://www.demoblaze.com/'); 

    const title = await page.title();
    console.log('Title page is: ' + title);

    await expect(page).toHaveTitle('STORE');

    const pageURL = page.url();
    console.log('Page URL is: ' + pageURL);

    await expect(page).toHaveURL('https://www.demoblaze.com/');

    await page.close();

})