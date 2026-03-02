const {test, expect} = require('@playwright/test');

test('LocatorsMultiElements', async ({page}) => {

    await page.goto('https://www.demoblaze.com/');

    //locating multiple elements
    /*const links = await page.$$('a');

    for(const link of links){
        const linktext = await link.textContent();
        console.log('Link text is: ' + linktext);
    } */

    //Locate all the products displayed on home page
    await page.waitForSelector("//div[@id='tbodyid']//div/h4/a");

    const products = await page.$$("//div[@id='tbodyid']//div/h4/a")

    for(const product of products){
        const productText = await product.textContent();
        console.log('Product text is: ' + productText);
    }

});