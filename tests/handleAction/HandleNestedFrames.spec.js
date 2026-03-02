const { test, expect } = require('@playwright/test');

test('Handle Nested Frames Fix', async ({ page }) => {
    await page.goto('https://ui.vision/demo/webtest/frames/');

    // SỬA 1: Dùng CSS Selector để tìm Frame (dựa vào src)
    // frameLocator không cần await và phải nhận vào chuỗi selector
    const iFrame3 = page.frameLocator("frame[src='frame_3.html']");

    // SỬA 2: Dùng CSS Selector chuẩn cho input (bỏ @)
    //await iFrame3.locator("input[name='mytext3']").fill('Hello from nested frame');

    //Nested frame
    // 1. Xác định frame con (nằm bên trong iFrame3)
    // Trong trang này, frame con là một thẻ <iframe> chứa Google Form
    const childFrame = iFrame3.frameLocator('iframe');

    // 2. Tương tác với Radio Button/Checkbox
    // Lưu ý: Google Form thường ẩn thẻ <input> thật, nên ta click vào phần tử hiển thị (div)
    // Chọn radio button đầu tiên (Ví dụ: "I am a human")
    await childFrame.locator('.AB7Lab').first().click(); 

    // Hoặc nếu bạn muốn chọn theo text cụ thể:
    // await childFrame.locator('div[role="radio"]', { hasText: 'I am a human' }).click();

   
    await page.waitForTimeout(2000);
});