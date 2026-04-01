const { test, expect } = require('@fixtures/baseTest');

test.describe('My Account Settings', () => {
  test.beforeEach(async ({ browserName, loginPage, myAccountSettingPage }) => {
    test.skip(browserName !== 'chromium', 'HRM demo login is unstable on Firefox/Webkit in parallel runs.');
    await loginPage.goto();
    await loginPage.login('admin_example', '123456');
    await loginPage.page.waitForURL(/.*\/erp\//);
    await myAccountSettingPage.goToMyAccountSettings();
  });

  test('TC01: User can navigate to My Account Settings page', async ({ myAccountSettingPage }) => {
    await expect(myAccountSettingPage.page).toHaveURL(/.*my-profile/);
    await myAccountSettingPage.verifyBasicInfoSectionVisible();
  });

  test('TC02: User can update basic profile information', async ({ myAccountSettingPage }) => {
    const uniqueSuffix = Date.now().toString().slice(-5);

    await myAccountSettingPage.updateBasicInformation({
      firstName: `Auto${uniqueSuffix}`,
      lastName: 'Tester',
      contactNumber: `09${uniqueSuffix}`,
      city: 'Bangkok',
      state: 'BKK',
      zipCode: '10200'
    });
  });

  test('TC03: User can open Contract tab and see salary fields', async ({ myAccountSettingPage }) => {
    await myAccountSettingPage.goToContractTab();
    await myAccountSettingPage.verifyContractSectionVisible();
    await myAccountSettingPage.fillContractSalary('1000', '10');
  });
});
