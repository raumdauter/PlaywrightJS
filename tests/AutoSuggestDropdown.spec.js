const {test, expect} = require('@playwright/test');
test('Auto suggest dropdowns', async ({ page }) => {

    await page.goto('https://redbus.in/');

    await page.locator('#srcinput').fill('Delhi');
    
    // Đợi danh sách gợi ý xuất hiện (dùng role thay vì class ngẫu nhiên để ổn định hơn)
    const suggestionContainer = page.locator('div[role="listbox"]');
    await suggestionContainer.waitFor();

    // Xác định các options bên trong
    // Dựa trên snapshot: các option có role="option" hoặc nằm trong list
    const options = page.locator('div[role="listbox"] >> role=option');

    // --- CÁCH SỬA LỖI Ở ĐÂY ---
    // Sử dụng await options.all() để lấy danh sách mảng
    const allOptions = await options.all();

    for (let option of allOptions) {
        const value = await option.textContent();
        console.log(value?.trim()); // trim() để xóa khoảng trắng thừa
        
        // Ví dụ: Click nếu tìm thấy bến xe mong muốn
        if (value?.includes('Anand Vihar')) {
            await option.click();
            break;
        }
    }
    
    await page.waitForTimeout(2000);
});