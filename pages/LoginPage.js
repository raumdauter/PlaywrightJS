const logger = require('../utils/logger'); // Import logger using CommonJS syntax
const { expect } = require('@playwright/test');
const {ultimateBasePage} = require('../utils/ultimateBasePage'); // Import ultimateBasePage using CommonJS syntax'

class LoginPage extends ultimateBasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);  
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
    await this.typeText(this.usernameInput, username, 'Username Input');
    await this.typeText(this.passwordInput, password, 'Password Input');
    await this.clickElement(this.loginButton, 'Login Button');
  }

  // 3. Hàm Xác minh (Verify) dành riêng cho trang này
  async verifyLoginError(expectedErrorText) {
    console.log(`[Verify] Kiểm tra thông báo lỗi có chứa: "${expectedErrorText}"`);     
    // Tận dụng hàm resolve để biến string thành Locator
    const errorLoc = this.resolve(this.errorMessage);       
    // Dùng Web-First Assertion để tự động chờ thông báo lỗi xuất hiện
    await expect(errorLoc, 'Lỗi: Thông báo đăng nhập sai không xuất hiện').toContainText(expectedErrorText);
    }

}

module.exports = { LoginPage };