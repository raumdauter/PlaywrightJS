// pages/BasePage.js
const { expect } = require('@playwright/test');

class ultimateBasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // ======================================================
    // 🛠️ HÀM CỐT LÕI (CORE HELPERS)
    // ======================================================

    /**
     * Chuẩn hóa đầu vào: Biến String thành Locator, giữ nguyên nếu đã là Locator.
     * @private
     * @param {string | import('@playwright/test').Locator} selectorOrLocator
     * @returns {import('@playwright/test').Locator}
     */
    resolve(selectorOrLocator) {
        return typeof selectorOrLocator === 'string'
            ? this.page.locator(selectorOrLocator)
            : selectorOrLocator;
    }

    /**
     * Xử lý lỗi in log [object Object] khi truyền Locator
     * @private
     * @param {string | import('@playwright/test').Locator} selectorOrLocator 
     * @param {string} [elementName] 
     * @returns {string} Tên để in ra log
     */
    getLogName(selectorOrLocator, elementName) {
        if (elementName) return elementName; // Ưu tiên tên do người dùng tự đặt
        // Nếu không có tên, và nó là chuỗi thì in chuỗi. Nếu là Locator thì in chữ "Locator động"
        return typeof selectorOrLocator === 'string' ? selectorOrLocator : 'Locator động';
    }


    // ======================================================
    // 🚀 HÀM HÀNH ĐỘNG (WEB ACTIONS)
    // ======================================================

    /**
     * Click với Web-First Assertion
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string} [elementName] 
     */
    async clickElement(selector, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Action] Đang click vào → ${logName}`);
        
        const loc = this.resolve(selector);
        
        // Thay thế loc.waitFor() cũ kỹ bằng Web-First Assertion
        await expect(loc, `Lỗi: ${logName} không hiển thị để click!`).toBeVisible();
        await loc.click();
    }

    /**
     * Nhập liệu an toàn (Không cần gọi .clear() thừa thãi)
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string|number} text 
     * @param {string} [elementName] 
     */
    async typeText(selector, text, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Action] Đang nhập '${text}' vào → ${logName}`);
        
        const loc = this.resolve(selector);
        
        // Đảm bảo phần tử không bị disabled hay readonly
        await expect(loc, `Lỗi: ${logName} không cho phép nhập liệu!`).toBeEditable();
        
        // Playwright .fill() tự động clear text cũ, ép kiểu String để tránh lỗi dữ liệu
        await loc.fill(String(text));
    }

    // ======================================================
    // ✅ HÀM KIỂM TRA (ASSERTIONS)
    // ======================================================

    /**
     * Xác minh phần tử đang hiển thị
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string} [elementName] 
     */
    async verifyVisible(selector, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Verify] Kiểm tra hiển thị → ${logName}`);
        
        const loc = this.resolve(selector);
        await expect(loc, `Assertion Lỗi: ${logName} không hiển thị trên màn hình!`).toBeVisible();
    }

    // ======================================================
    // 🖱️ HÀM TƯƠNG TÁC NÂNG CAO (ADVANCED ACTIONS)
    // ======================================================

    /**
     * Chọn một Option trong thẻ <select> (Dropdown)
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string} optionValue Giá trị (value) hoặc Text của option cần chọn
     * @param {string} [elementName] 
     */
    async selectDropdown(selector, optionValue, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Action] Đang chọn '${optionValue}' tại Dropdown → ${logName}`);
        
        const loc = this.resolve(selector);
        
        // Đảm bảo dropdown hiển thị trước khi chọn
        await expect(loc, `Lỗi: Dropdown ${logName} không hiển thị!`).toBeVisible();
        
        // Playwright cực kỳ thông minh, nó tự quét cả thuộc tính 'value' lẫn 'label'
        await loc.selectOption(optionValue);
    }

    /**
     * Di chuột lên một phần tử (Hover) - Rất hữu ích cho các Mega Menu
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string} [elementName] 
     */
    async hoverElement(selector, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Action] Đang di chuột (Hover) lên → ${logName}`);
        
        const loc = this.resolve(selector);
        await expect(loc, `Lỗi: Không thể hover vì ${logName} bị ẩn!`).toBeVisible();
        await loc.hover();
    }

    /**
     * Gõ một phím đặc biệt (VD: 'Enter', 'Tab', 'Escape')
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string} keyName Tên phím theo chuẩn của Playwright
     * @param {string} [elementName] 
     */
    async pressKey(selector, keyName, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Action] Đang nhấn phím '${keyName}' trên → ${logName}`);
        
        const loc = this.resolve(selector);
        await expect(loc).toBeVisible();
        await loc.press(keyName);
    }

    // ======================================================
    // 📊 HÀM TRÍCH XUẤT DỮ LIỆU (DATA EXTRACTION)
    // ======================================================

    /**
     * Lấy toàn bộ Text của MỘT DANH SÁCH các phần tử (VD: Lấy tên tất cả sản phẩm)
     * @param {string | import('@playwright/test').Locator} selector 
     * @param {string} [elementName] 
     * @returns {Promise<string[]>} Trả về một mảng chứa các chuỗi text
     */
    async getAllTexts(selector, elementName) {
        const logName = this.getLogName(selector, elementName);
        console.log(`[Data] Đang lấy danh sách text từ → ${logName}`);
        
        const loc = this.resolve(selector);
        
        // Cảnh báo: Hàm này không vi phạm Strict Mode vì ta CHỦ ĐỘNG lấy nhiều phần tử
        // loc.first() giúp đợi phần tử đầu tiên xuất hiện trước khi cào dữ liệu
        await expect(loc.first(), `Lỗi: Không tìm thấy danh sách ${logName}`).toBeVisible();
        
        return await loc.allInnerTexts(); // Trả về dạng mảng: ['Sp 1', 'Sp 2', 'Sp 3']
    }
}

module.exports = { ultimateBasePage };