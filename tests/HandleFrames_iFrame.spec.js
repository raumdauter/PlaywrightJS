const {test, expect} = require('@playwright/test');
test('Handle Frames and iFrames', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    //total frames
    const allframes = await page.frames();
    console.log("Total Frames: " + allframes.length);

    // approach 1 - by using name or url
    //const frame1 = await page.frame({name: 'frame1'});
    //const frame1 = await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'});
    //await frame1.fill("[name='mytext1']", 'Frame 1 Text');

    // approach 2 - by using locator
    const inputlocator = page.frameLocator('frame[src="frame_1.html"]').locator(`//input[@name='mytext1']`);
    await inputlocator.fill('Frame 1 Text - Locator Approach');

    await page.waitForTimeout(2000);


})
