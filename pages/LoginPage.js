// File: pages/LoginPage.js
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    // 1. BẮT ELEMENTS (Locators) ở đây
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // 2. ĐỊNH NGHĨA HÀNH ĐỘNG (Actions) ở đây
  async login(user, pass) {
    await this.fillText(this.usernameInput, user, 'Username');
    await this.fillText(this.passwordInput, pass, 'Password');
    await this.clickElement(this.loginButton, 'Login Button');
  }
}
module.exports = { LoginPage };