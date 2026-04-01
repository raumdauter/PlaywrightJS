const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { MyAccountSettingPage } = require('../pages/MyAccoutSettingPage');

exports.test = base.test.extend({
  // Định nghĩa fixture cho LoginPage
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // DashboardPage
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  //MyAccountSettingsPage
  myAccountSettingPage: async ({ page }, use) => {
    await use(new MyAccountSettingPage(page));
  },

  // Ví dụ thêm fixture cho ProductPage (nếu bạn đã tạo)
  // productPage: async ({ page }, use) => {
  //   await use(new ProductPage(page));
  // },
});

exports.expect = base.expect;
