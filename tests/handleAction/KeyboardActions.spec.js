const { test, expect } = require('@playwright/test');

test('Keyboard Actions', async ({ page }) => { 

    await page.goto('https://gotranscript.com/text-compare');

    const textArea1 = page.locator('[name="text1"]');
    const textArea2 = page.locator('[name="text2"]');

    await textArea1.fill('This is first line.');

    // Ctrl + A to select all text
    //await textArea1.press('Control+A');
    await page.keyboard.press('Control+A');
    console.log('Selected text:', await textArea1.inputValue());

    // Ctrl + C to copy selected text
    //await textArea1.press('Control+C');
    await page.keyboard.press('Control+C');

    //Tab key to switch focus back to TextArea1
    await page.keyboard.press('Tab');
    console.log('Focus switched back to TextArea1');

    //Ctrl + V to paste copied text
    //await textArea2.press('Control+V');
    await page.keyboard.press('Control+V');
    console.log('Copied text:', await textArea2.inputValue()); 

    // assertion
    if (await textArea1.inputValue() === await textArea2.inputValue()) {
        console.log('Keyboard actions successful: Texts are identical.');
    } else {
        console.log('Keyboard actions failed: Texts are different.');
    }

    await page.waitForTimeout(2000);

})