const { test, expect } = require('@playwright/test');

test('Date Picker', async ({ page }) => { 

    // await page.goto('https://testautomationpractice.blogspot.com/');

    // const date1Input = await page.locator(`//input[@id='datepicker']`);
    // const canlendarTable = await page.locator('#ui-datepicker-div');

    // 1. Pick trực tiếp ngày hiện tại
    // 2. get all data trong bảng calendar >> viết điều kiện rồi pick ngày
    // 3. Click previous/ next button để chuyển tháng/năm >> rồi chọn ngày
    // 4. Xử lý chọn tháng/năm quá khứ/ tương lai >> rồi chọn ngày

    await page.goto("https://testautomationpractice.blogspot.com/");

    const targetYear = "2022";
    const targetMonth = "March";
    const targetDay = "25";

    await page.click('#datepicker');

    // Sử dụng vòng lặp với giới hạn an toàn (max 50 lần click)
    for (let i = 0; i < 50; i++) {
        const currentYear = await page.locator('.ui-datepicker-year').textContent();
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();

        if (currentYear === targetYear && currentMonth === targetMonth) {
            break;
        }

        // Ưu tiên dùng locator rõ ràng cho nút Prev/Next
        if (parseInt(currentYear) > parseInt(targetYear) || (currentYear === targetYear && currentMonth !== targetMonth)) {
            // Click nút Prev và đợi bảng lịch cập nhật (ẩn rồi hiện lại hoặc đổi text)
            await page.locator('a.ui-datepicker-prev').click();
        } else {
            await page.locator('a.ui-datepicker-next').click();
        }
        
        // Thêm một khoảng nghỉ cực ngắn nếu trang web quá chậm 
        // hoặc để Playwright ổn định lại locator
    }

    // Click chọn ngày chính xác
    await page.locator(`.ui-state-default:text-is("${targetDay}")`).click();

    // Assertion để đảm bảo thành công
    await expect(page.locator('#datepicker')).toHaveValue('03/25/2022');
});