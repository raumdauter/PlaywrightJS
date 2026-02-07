const { test, expect } = require('@playwright/test');

test.skip('Mouse Hover', async ({ page }) => { 

    await page.goto('https://demo.nopcommerce.com/');

    const desktopsMenu = page.getByRole('button', { name: 'Computers' });
    await desktopsMenu.hover();

    await page.waitForTimeout(2000); // Just to visually confirm the hover effect during the test

})

test.skip("Right CLick action", async ({page}) => {

    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
    const rightClickMeText = page.getByText('right click me', { exact: true });

    //right click aciton
    await rightClickMeText.click({ button: 'right' });
    
    await page.waitForTimeout(2000); // Just to visually confirm the right click effect during the test
})

test.skip("Double Click action", async ({page}) => {

    await page.goto('https://testautomationpractice.blogspot.com/')
    const doubleClickMeButton = page.getByRole('button', { name: 'Copy Text' });
    const field1 = page.locator('#field1');
    const field2 = page.locator('#field2');

    //get text Field1 before double click
    const textField1 = await field1.textContent();
    console.log(`Text Field1: ${textField1}`);

    //double click action
    await doubleClickMeButton.dblclick();

    //get text Field2 after double click
    const textField2 = await field2.textContent();
    console.log(`Text Field2: ${textField2}`);

    // validation
    if (textField1 === textField2) {
        console.log('Double Click action successful: Texts are identical.');
    } else {
        console.log('Double Click action failed: Texts are different.');
    }
    
    await page.waitForTimeout(2000); // Just to visually confirm the double click effect during the test
})

test("Drag and Drop action", async ({page}) => {

    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

    const Image3 = page.frameLocator('iframe[src="../../demoSite/practice/droppable/photo-manager.html"]').getByRole('img', { name: 'Planning the ascent' });
    const Image1 = page.frameLocator('iframe[src="../../demoSite/practice/droppable/photo-manager.html"]').getByRole('img', { name: 'The peaks of High Tatras' });
    const trash = page.frameLocator('iframe[src="../../demoSite/practice/droppable/photo-manager.html"]').locator('#trash');

    // Approach 1: Using dragAndDrop method
    await Image1.dragTo(trash, { delay: 500 });

    // Approach 2: Using mouse events
    await Image3.hover();
    await page.mouse.down();
    await trash.hover();
    await page.mouse.up();

    await page.waitForTimeout(2000); // Just to visually confirm the drag and drop effect during the test

})