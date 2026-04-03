const path = require('path');
const { parseExcelWorkbook, toOptionalString, toBoolean } = require('./utils/excelReader');
const { myAccountSettingExcelSchema } = require('./myAccountSetting.schema');

const excelPath = process.env.MY_ACCOUNT_SETTING_EXCEL || path.join(__dirname, 'myAccountSetting.data.xlsx');

function filterEnabledRows(rows = []) {
  return rows.filter((row) => toBoolean(row.run, true));
}

function buildBasicInfoPayloadFactory(row = {}) {
  const useUniqueSuffix = toBoolean(row.useUniqueSuffix, false);
  const uniqueFields = new Set(['firstName', 'contactNumber']);

  const payloadTemplate = {
    firstName: toOptionalString(row.firstName),
    lastName: toOptionalString(row.lastName),
    contactNumber: toOptionalString(row.contactNumber),
    city: toOptionalString(row.city),
    state: toOptionalString(row.state),
    zipCode: toOptionalString(row.zipCode),
    gender: toOptionalString(row.gender),
    maritalStatus: toOptionalString(row.maritalStatus)
  };

  return (uniqueSuffix = '') => {
    const payload = {};

    for (const [key, value] of Object.entries(payloadTemplate)) {
      if (value === undefined) continue;

      if (useUniqueSuffix && uniqueFields.has(key)) {
        payload[key] = `${value}${uniqueSuffix}`;
        continue;
      }

      payload[key] = value;
    }

    return payload;
  };
}

function buildMyAccountSettingDataFromExcel() {
  const { resolvedPath, sheets } = parseExcelWorkbook(excelPath, myAccountSettingExcelSchema);

  const loginRows = filterEnabledRows(sheets.Login || []);
  if (!loginRows.length) {
    throw new Error(
      `[TestData] Sheet "Login" must have at least 1 enabled row with run=TRUE in file: ${resolvedPath}`
    );
  }

  const loginRow = loginRows[0];

  const navigationCases = filterEnabledRows(sheets.Navigation || []).map((row, index) => ({
    name: toOptionalString(row.name) || `TC-NAV-${index + 1}: Navigate to My Account Settings page`
  }));

  const basicInfoCases = filterEnabledRows(sheets.BasicInfo || []).map((row, index) => ({
    name: toOptionalString(row.name) || `TC-BASIC-${index + 1}: Update basic profile information`,
    payload: buildBasicInfoPayloadFactory(row),
    expectedSuccessText: toOptionalString(row.expectedSuccessText) || 'updated'
  }));

  const contractCases = filterEnabledRows(sheets.Contract || []).map((row, index) => ({
    name: toOptionalString(row.name) || `TC-CONTRACT-${index + 1}: Fill contract salary fields`,
    payload: {
      grossSalary: toOptionalString(row.grossSalary),
      hourlyRate: toOptionalString(row.hourlyRate)
    }
  }));

  return {
    sourceExcelPath: resolvedPath,
    login: {
      username: toOptionalString(loginRow.username) || '',
      password: toOptionalString(loginRow.password) || ''
    },
    navigationCases,
    basicInfoCases,
    contractCases
  };
}

const myAccountSettingData = buildMyAccountSettingDataFromExcel();

module.exports = {
  myAccountSettingData,
  myAccountSettingExcelSchema,
  buildMyAccountSettingDataFromExcel
};
