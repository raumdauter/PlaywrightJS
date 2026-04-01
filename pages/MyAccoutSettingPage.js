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
    this.ContractSection = page.locator('#user-set-salary-tab');
    this.ContractTab = page.locator('#pills-contract-tab');
    this.contractDatePick = page.locator('#user-set-salary input[placeholder="Contract Date"]');
    this.departmentSelect = page.locator('#select2-department_id-container');
    this.departmentList = page.locator('#select2-department_id-results');
    this.departmentSearchBox = page.locator("//span[@class='select2-search select2-search--dropdown']//input[@role='searchbox']");
    this.designationSelect = page.locator('#select2-designation_id-bs-container');
    this.basicSalaryInput = page.locator('#user-set-salary input[placeholder="Gross Salary"]');
    this.hourlyRateInput = page.locator('#user-set-salary input[placeholder="Hourly Rate"]');
    this.payslipTypeSelect = page.locator('#select2-salay_type-container');
    this.officeShiftSelect = page.locator('#select2-office_shift_id-g9-container');
    this.officeShiftSearchBox = page.getByRole('searchbox');
    this.officeShiftList = page.locator('#select2-office_shift_id-g9-results');
    this.contractEndPick = page.locator('#user-set-salary input[placeholder="Date of Leaving"]');
    this.contractEndDatePicker = page.getByRole('link', { name: '15' });
    this.contractEndButton = page.locator('button').filter({ hasText: 'OK' }).first();
    this.roleDesriptionInput = page.getByText('Enter role description here..', { exact: true });

    // Basic profile tab
    this.firstNameInput = page.locator('#user-set-basicinfo input[name="first_name"]');
    this.lastNameInput = page.locator('#user-set-basicinfo input[name="last_name"]');
    this.contactNumberInput = page.locator('#user-set-basicinfo input[name="contact_number"]');
    this.UpdateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.SuccessUpdatePopUp = page.locator('.toast.toast-success');

    this.genderSelect = page.locator('#user-set-basicinfo select[name="gender"]');
    this.maritalStatusSelect = page.locator('#user-set-basicinfo select[name="marital_status"]');
    this.cityInput = page.locator('#user-set-basicinfo input[name="city"]');
    this.stateInput = page.locator('#user-set-basicinfo input[name="state"]');
    this.zipCodeInput = page.locator('#user-set-basicinfo input[name="zipcode"]');

    this.UsernameInput = page.getByRole('textbox', { name: 'Username' });
    this.EmailInput = page.getByRole('textbox', { name: 'Account Email' });

    this.profilePictureUpload = page.locator('input[type="file"][name="photo"]');

    this.currentPasswordInput = page.locator('input[name="current_password"]');
    this.newPasswordInput = page.locator('input[name="new_password"]');
    this.confirmPasswordInput = page.locator('input[name="confirm_password"]');
    this.savePasswordButton = page.getByRole('button', { name: 'Change Password' });
  }

  async goToMyAccountSettings() {
    logger.info('[Navigation] Going to Account Settings page...');
    await this.clickElement(this.accountSettingsLink, 'Account Settings');
    await expect(this.page).toHaveURL(/.*my-profile/);
  }

  async verifyBasicInfoSectionVisible() {
    await this.openBasicInfoTab();
    await this.verifyVisible(this.firstNameInput, 'First Name Input');
    await this.verifyVisible(this.lastNameInput, 'Last Name Input');
    await this.verifyVisible(this.contactNumberInput, 'Contact Number Input');
    await this.verifyVisible(this.UpdateProfileButton, 'Update Profile Button');
  }

  async fillBasicInformation(data = {}) {
    await this.openBasicInfoTab();

    if (data.firstName !== undefined) {
      await this.typeText(this.firstNameInput, data.firstName, 'First Name Input');
    }

    if (data.lastName !== undefined) {
      await this.typeText(this.lastNameInput, data.lastName, 'Last Name Input');
    }

    if (data.contactNumber !== undefined) {
      await this.typeText(this.contactNumberInput, data.contactNumber, 'Contact Number Input');
    }

    if (data.city !== undefined) {
      await this.typeText(this.cityInput, data.city, 'City Input');
    }

    if (data.state !== undefined) {
      await this.typeText(this.stateInput, data.state, 'State Input');
    }

    if (data.zipCode !== undefined) {
      await this.typeText(this.zipCodeInput, data.zipCode, 'Zip Code Input');
    }

    if (data.gender !== undefined) {
      await this.selectDropdown(this.genderSelect, data.gender, 'Gender Select');
    }

    if (data.maritalStatus !== undefined) {
      await this.selectDropdown(this.maritalStatusSelect, data.maritalStatus, 'Marital Status Select');
    }
  }

  async clickUpdateProfile() {
    await this.clickElement(this.UpdateProfileButton, 'Update Profile Button');
  }

  async verifyUpdateProfileSuccess(expectedSuccessText = 'updated') {
    await expect(this.SuccessUpdatePopUp).toBeVisible();
    await expect(this.SuccessUpdatePopUp).toContainText(expectedSuccessText);
  }

  async updateBasicInformation(data = {}, expectedSuccessText = 'updated') {
    await this.fillBasicInformation(data);
    await this.clickUpdateProfile();
    await this.verifyUpdateProfileSuccess(expectedSuccessText);
  }

  async changePassword(currentPass, newPass) {
    await this.typeText(this.currentPasswordInput, currentPass, 'Current Password Input');
    await this.typeText(this.newPasswordInput, newPass, 'New Password Input');
    await this.typeText(this.confirmPasswordInput, newPass, 'Confirm Password Input');
    await this.clickElement(this.savePasswordButton, 'Change Password Button');
  }

  async goToContractTab() {
    await this.clickElement(this.ContractSection, 'Contract Main Tab');
    await this.clickElement(this.ContractTab, 'Contract Tab');
    await expect(this.contractDatePick).toBeVisible();
  }

  async verifyContractSectionVisible() {
    await this.verifyVisible(this.ContractSection, 'Contract Section');
    await this.verifyVisible(this.contractDatePick, 'Contract Date Input');
    await this.verifyVisible(this.basicSalaryInput, 'Gross Salary Input');
    await this.verifyVisible(this.hourlyRateInput, 'Hourly Rate Input');
  }

  async fillContractSalary(grossSalary, hourlyRate) {
    await this.goToContractTab();

    if (grossSalary !== undefined) {
      await this.typeText(this.basicSalaryInput, grossSalary, 'Gross Salary Input');
    }

    if (hourlyRate !== undefined) {
      await this.typeText(this.hourlyRateInput, hourlyRate, 'Hourly Rate Input');
    }
  }

  async openBasicInfoTab() {
    await this.clickElement(this.basicInfoTab, 'Basic Information Tab');
    await expect(this.basicInfoPane).toHaveClass(/active show/);
  }
}

module.exports = { MyAccountSettingPage };
