const path = require('path');
const XLSX = require('xlsx');

const outputPath = path.join(__dirname, '..', 'myAccountSetting.data.xlsx');

const loginRows = [
  {
    run: 'TRUE',
    username: 'admin_example',
    password: '123456'
  }
];

const navigationRows = [
  {
    run: 'TRUE',
    name: 'TC01: User can navigate to My Account Settings page'
  }
];

const basicInfoRows = [
  {
    run: 'TRUE',
    name: 'TC02: User can update basic profile information (happy path)',
    useUniqueSuffix: 'TRUE',
    firstName: 'Auto',
    lastName: 'Tester',
    contactNumber: '09',
    city: 'Bangkok',
    state: 'BKK',
    zipCode: '10200',
    gender: '',
    maritalStatus: '',
    expectedSuccessText: 'updated'
  }
];

const contractRows = [
  {
    run: 'TRUE',
    name: 'TC03: User can open Contract tab and fill salary fields',
    grossSalary: '1000',
    hourlyRate: '10'
  }
];

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(loginRows), 'Login');
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(navigationRows), 'Navigation');
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(basicInfoRows), 'BasicInfo');
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(contractRows), 'Contract');

XLSX.writeFile(workbook, outputPath);

console.log(`[TestData] Generated Excel template: ${outputPath}`);
