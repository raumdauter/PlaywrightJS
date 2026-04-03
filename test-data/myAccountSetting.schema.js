const myAccountSettingExcelSchema = {
  Login: {
    requiredColumns: ['run', 'username', 'password']
  },
  Navigation: {
    requiredColumns: ['run', 'name']
  },
  BasicInfo: {
    requiredColumns: [
      'run',
      'name',
      'useUniqueSuffix',
      'firstName',
      'lastName',
      'contactNumber',
      'city',
      'state',
      'zipCode',
      'gender',
      'maritalStatus',
      'expectedSuccessText'
    ]
  },
  Contract: {
    requiredColumns: ['run', 'name', 'grossSalary', 'hourlyRate']
  }
};

module.exports = { myAccountSettingExcelSchema };
