const { test, expect } = require('@fixtures/baseTest');
const logger = require('../../utils/logger'); // use CommonJS require for the logger

test.describe('Login Functionality', () => {
  test('TC01: User can login with valid credentials', async ({ loginPage }) => {
    logger.info('-- Starting Test: TC01 - User can login with valid credentials --');
    await loginPage.goto();
    await loginPage.login('admin_example', '123456');
    // Thêm assertion để kiểm tra login thành công, ví dụ: kiểm tra URL hoặc một element đặc trưng sau khi login
    await expect(loginPage.page).toHaveURL('https://hrm.anhtester.com/erp/desk');
  });

  test.only('TC02: User cannot login with invalid credentials', async ({ loginPage }) => {
    logger.info('-- Starting Test: TC02 - User cannot login with invalid credentials --');
    await loginPage.goto();
    await loginPage.login('wrong username', '1234567'); // Mật khẩu sai

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid Login Credentials.'); // Điều chỉnh theo thông báo lỗi thực tế của ứng dụng

    await loginPage.page.waitForTimeout(2000); // Thêm timeout để dễ dàng quan sát kết quả khi chạy test, có thể bỏ sau khi xác nhận test hoạt động đúng
  });

});