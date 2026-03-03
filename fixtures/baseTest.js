const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
// const { ProductPage } = require('../pages/ProductPage'); // Thêm các page khác ở đây

exports.test = base.test.extend({
  // Định nghĩa fixture cho LoginPage
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Ví dụ thêm fixture cho ProductPage (nếu bạn đã tạo)
  // productPage: async ({ page }, use) => {
  //   await use(new ProductPage(page));
  // },
});

exports.expect = base.expect;