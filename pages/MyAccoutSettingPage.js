const logger = require('../utils/logger');
const { expect } = require('@playwright/test');
const { ultimateBasePage } = require('../utils/ultimateBasePage');

class MyAccountSettingPage extends ultimateBasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // Header navigation
    this.profileDropdownTrigger = page.locator("//a[@aria-expanded='true']");
    this.myAccoutProfile = page.getByRole('link', { name: 'My Account' });
    this.accountSettingsLink = page.locator("//a[@data-original-title='Account Settings']");
    this.basicInfoTab = page.locator('#user-set-basicinfo-tab');
    this.basicInfoPane = page.locator('#user-set-basicinfo');

    // Contract tab
    this.contractSection = page.locator('#user-set-salary-tab');
    this.contractTab = page.locator('#pills-contract-tab');
    this.contractDatePick = page.locator('#user-set-salary input[placeholder="Contract Date"]');
    this.basicSalaryInput = page.locator('#user-set-salary input[placeholder="Gross Salary"]');
    this.hourlyRateInput = page.locator('#user-set-salary input[placeholder="Hourly Rate"]');

    // Basic profile tab
    this.firstNameInput = page.locator('#user-set-basicinfo input[name="first_name"]');
    this.lastNameInput = page.locator('#user-set-basicinfo input[name="last_name"]');
    this.contactNumberInput = page.locator('#user-set-basicinfo input[name="contact_number"]');
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.successUpdatePopUp = page.locator('.toast.toast-success');
    this.genderSelect = page.locator('#user-set-basicinfo select[name="gender"]');
    this.maritalStatusSelect = page.locator('#user-set-basicinfo select[name="marital_status"]');
    this.cityInput = page.locator('#user-set-basicinfo input[name="city"]');
    this.stateInput = page.locator('#user-set-basicinfo input[name="state"]');
    this.zipCodeInput = page.locator('#user-set-basicinfo input[name="zipcode"]');
  }

  async goToMyAccountSettings() {
    logger.info('[Navigation] Going to Account Settings page...');
    await this.clickElement(this.accountSettingsLink, 'Account Settings');
    await this.verifyAtMyProfilePage();
  }

  async verifyAtMyProfilePage() {
    await expect(this.page).toHaveURL(/.*my-profile/);
  }

  async verifyBasicInfoSectionVisible() {
    await this.openBasicInfoTab();
    await this.verifyVisible(this.firstNameInput, 'First Name Input');
    await this.verifyVisible(this.lastNameInput, 'Last Name Input');
    await this.verifyVisible(this.contactNumberInput, 'Contact Number Input');
    await this.verifyVisible(this.updateProfileButton, 'Update Profile Button');
  }

  async fillBasicInformation(data = {}) {
    const sanitizedData = this.sanitizePayload(data);

    await this.openBasicInfoTab();

    if (sanitizedData.firstName !== undefined) await this.typeText(this.firstNameInput, sanitizedData.firstName, 'First Name Input');
    if (sanitizedData.lastName !== undefined) await this.typeText(this.lastNameInput, sanitizedData.lastName, 'Last Name Input');
    if (sanitizedData.contactNumber !== undefined) await this.typeText(this.contactNumberInput, sanitizedData.contactNumber, 'Contact Number Input');
    if (sanitizedData.city !== undefined) await this.typeText(this.cityInput, sanitizedData.city, 'City Input');
    if (sanitizedData.state !== undefined) await this.typeText(this.stateInput, sanitizedData.state, 'State Input');
    if (sanitizedData.zipCode !== undefined) await this.typeText(this.zipCodeInput, sanitizedData.zipCode, 'Zip Code Input');
    if (sanitizedData.gender !== undefined) await this.selectDropdown(this.genderSelect, sanitizedData.gender, 'Gender Select');
    if (sanitizedData.maritalStatus !== undefined) await this.selectDropdown(this.maritalStatusSelect, sanitizedData.maritalStatus, 'Marital Status Select');
  }

  async clickUpdateProfile() {
    await this.clickElement(this.updateProfileButton, 'Update Profile Button');
  }

  async verifyUpdateProfileSuccess(expectedSuccessText = 'updated') {
    await expect(this.successUpdatePopUp).toBeVisible();
    await expect(this.successUpdatePopUp).toContainText(expectedSuccessText);
  }

  async updateBasicInformation(data = {}, expectedSuccessText = 'updated') {
    await this.fillBasicInformation(data);
    await this.clickUpdateProfile();
    await this.verifyUpdateProfileSuccess(expectedSuccessText);
  }

  async goToContractTab() {
    await this.clickElement(this.contractSection, 'Contract Main Tab');
    await this.clickElement(this.contractTab, 'Contract Tab');
    await expect(this.contractDatePick).toBeVisible();
  }

  async verifyContractSectionVisible() {
    await this.verifyVisible(this.contractSection, 'Contract Section');
    await this.verifyVisible(this.contractDatePick, 'Contract Date Input');
    await this.verifyVisible(this.basicSalaryInput, 'Gross Salary Input');
    await this.verifyVisible(this.hourlyRateInput, 'Hourly Rate Input');
  }

  async fillContractSalary(grossSalary, hourlyRate) {
    const normalizedGrossSalary = this.normalizeOptionalValue(grossSalary);
    const normalizedHourlyRate = this.normalizeOptionalValue(hourlyRate);

    await this.goToContractTab();

    if (normalizedGrossSalary !== undefined) await this.typeText(this.basicSalaryInput, normalizedGrossSalary, 'Gross Salary Input');
    if (normalizedHourlyRate !== undefined) await this.typeText(this.hourlyRateInput, normalizedHourlyRate, 'Hourly Rate Input');
  }

  async updateContractInformation({ grossSalary, hourlyRate } = {}) {
    await this.fillContractSalary(grossSalary, hourlyRate);
  }

  async openBasicInfoTab() {
    await this.clickElement(this.basicInfoTab, 'Basic Information Tab');
    await expect(this.basicInfoPane).toHaveClass(/active show/);
  }

  normalizeOptionalValue(value) {
    if (value === undefined || value === null) return undefined;
    const normalized = String(value).trim();
    return normalized === '' ? undefined : normalized;
  }

  sanitizePayload(data = {}) {
    const sanitized = {};

    for (const [key, value] of Object.entries(data)) {
      const normalized = this.normalizeOptionalValue(value);
      if (normalized !== undefined) {
        sanitized[key] = normalized;
      }
    }

    return sanitized;
  }
}

module.exports = { MyAccountSettingPage };
