import { test, expect } from '@playwright/test';

test.skip ('Alert', async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Enabling alert hardling
    // Dialog window handling
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('I am an alert box!');
        await dialog.accept(); 
    })

    await page.locator('#alertBtn').click();
    await page.waitForTimeout(3000);
})

    test ('Confirm Alert', async ({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Enabling Confirm alert hardling
    // Dialog window handling
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept(); 
    })

    await page.locator('#confirmBtn').click();
    await expect(page.locator(`#demo`)).toHaveText('You pressed OK!');

    await page.waitForTimeout(3000);
})

    test ('Prompt Alert', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Enabling Prompt alert hardling
    // Dialog window handling
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        await dialog.accept('Harry Potter');
    })

    await page.locator('#promptBtn').click();
    await expect(page.locator("//p[@id='demo']")).toHaveText('Hello Harry Potter! How are you today?');
    await page.waitForTimeout(3000);        

})