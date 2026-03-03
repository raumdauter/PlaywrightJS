// File: pages/BasePage.js

class BasePage {
  /**
   * Khởi tạo BasePage
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // Hàm dùng chung để chuyển hướng URL
  async navigateTo(url) {
    console.log(`[Action] Đang chuyển hướng tới URL: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Hàm dùng chung để Click với tính năng tự động ghi log
  async clickElement(locator, elementName = 'phần tử') {
    console.log(`[Action] Đang click vào: ${elementName}`);
    // Đợi phần tử hiển thị trước khi click (Playwright có auto-wait, nhưng viết thế này để chắc chắn hơn trong vài trường hợp)
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.click();
  }

  // Hàm dùng chung để điền Text
  async fillText(locator, text, elementName = 'phần tử') {
    console.log(`[Action] Đang nhập '${text}' vào: ${elementName}`);
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    await locator.fill(text);
  }

  // Hàm dùng chung để lấy Text từ một element
  async getText(locator, elementName = 'phần tử') {
    console.log(`[Action] Đang lấy text từ: ${elementName}`);
    await locator.waitFor({ state: 'visible', timeout: 5000 });
    const text = await locator.innerText();
    return text;
  }
}

module.exports = { BasePage };