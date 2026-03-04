const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        console.log(`[Action] Đang chuyển hướng tới URL: ${url}`);
        // 'networkidle' hoặc 'load' thường an toàn hơn 'domcontentloaded' cho các trang nặng
        await this.page.goto(url, { waitUntil: 'load' });
    }

    async clickElement(locator, elementName = 'phần tử') {
        console.log(`[Action] Đang click vào: ${elementName}`);
        // Web-First Assertion: Đợi phần tử sẵn sàng và hiển thị
        await expect(locator).toBeVisible({ timeout: 5000 });
        await locator.click();
    }

    async fillText(locator, text, elementName = 'phần tử') {
        console.log(`[Action] Đang nhập '${text}' vào: ${elementName}`);
        await expect(locator).toBeEditable(); // Đảm bảo ô nhập liệu có thể tương tác
        await locator.fill(text);
    }

    async getText(locator, elementName = 'phần tử') {
        console.log(`[Action] Đang lấy text từ: ${elementName}`);
        await expect(locator).toBeVisible();
        return await locator.innerText();
    }

    // Bổ sung thêm hàm kiểm tra (Verify) - Rất cần cho BasePage
    async verifyElementContainsText(locator, expectedText) {
        console.log(`[Verify] Kiểm tra xem phần tử có chứa text: ${expectedText}`);
        await expect(locator).toContainText(expectedText);
    }

    /**
     * Kiểm tra đoạn text KHỚP HOÀN TOÀN
     */
    async verifyExactText(selector, expectedText, elementName = 'phần tử') {
        console.log(`[Verify] Kiểm tra text của ${elementName} khớp chính xác với: "${expectedText}"`);
        const locator = this.page.locator(selector);
        
        // Playwright sẽ tự động retry cho đến khi text hiển thị đúng hoặc timeout
        await expect(locator, `Lỗi: Text của ${elementName} không khớp với "${expectedText}"`)
            .toHaveText(expectedText);
    }

    /**
     * Kiểm tra đoạn text CHỨA TỪ KHÓA (Rất hữu ích cho thông báo lỗi/thành công động)
     */
    async verifyContainsText(selector, expectedText, elementName = 'phần tử') {
        console.log(`[Verify] Kiểm tra text của ${elementName} chứa từ khóa: "${expectedText}"`);
        const locator = this.page.locator(selector);

        await expect(locator, `Lỗi: Text của ${elementName} không chứa từ khóa "${expectedText}"`)
            .toContainText(expectedText);
    }

    /**
     * Kiểm tra một Element có TỒN TẠI VÀ HIỂN THỊ hay không
     */
    async verifyElementVisible(selector, elementName = 'phần tử') {
        console.log(`[Verify] Đảm bảo ${elementName} đang hiển thị trên màn hình`);
        const locator = this.page.locator(selector);
        
        await expect(locator, `Lỗi: ${elementName} không hiển thị`)
            .toBeVisible();
    }

    /**
     * Xử lý Table: Tìm một hàng (row) có chứa một văn bản cụ thể
     */
    async verifyRecordInTable(tableSelector, uniqueText) {
        console.log(`[Verify] Tìm dòng trong bảng chứa dữ liệu: ${uniqueText}`);
        
        // Trỏ vào bảng, sau đó lọc ra thẻ <tr> chứa text tương ứng
        const rowLocator = this.page.locator(tableSelector).locator('tr', { hasText: uniqueText });
        
        // Đảm bảo dòng đó thực sự hiển thị
        await expect(rowLocator, `Lỗi: Không tìm thấy bản ghi có chứa "${uniqueText}" trong bảng`)
            .toBeVisible();
    }
}

module.exports = { BasePage };