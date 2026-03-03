const logger = require('../utils/logger'); // Import logger using CommonJS syntax

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // 1. Định nghĩa các Selectors (Locators)
    // Sử dụng page.locator để các element này có tính chất "Lazy load"
    this.usernameInput = page.locator("//input[@id='iusername']");
    this.passwordInput = page.locator("//input[@id='ipassword']")
    this.loginButton = page.locator('span:has-text("Login")');
    this.errorMessage = page.locator('.toast.toast-error');
  }

  // 2. Các hành động (Actions) trên trang
  async goto(contextMessage = 'Navigating to Login Page') {
    
    // log the navigation step
    logger.info(`[Action]: Navigating to ${contextMessage}`);
    // Điều hướng đến trang web (có thể lấy từ config hoặc biến môi trường)
    await this.page.goto('https://hrm.anhtester.com/');
  }

  async login(username, password, contextMessage = 'login attempt') {
    logger.info(`[Action]: Performing ${contextMessage} with user: "${username}"`);
    // Thực hiện các bước điền form
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    // Hàm bổ trợ để lấy text thông báo lỗi nếu login thất bại
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };