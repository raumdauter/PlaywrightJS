# My Account Settings - Excel Test Data Format

File path mac dinh: `test-data/myAccountSetting.data.xlsx`

Neu muon dung file khac:

```powershell
$env:MY_ACCOUNT_SETTING_EXCEL="E:\duong-dan\my-data.xlsx"
npx playwright test tests/UI-test/MyAccountSettingTest.spec.js
```

## Sheet `Login`

| run | username | password |
| --- | --- | --- |
| TRUE | admin_example | 123456 |

## Sheet `Navigation`

| run | name |
| --- | --- |
| TRUE | TC01: User can navigate to My Account Settings page |

## Sheet `BasicInfo`

| run | name | useUniqueSuffix | firstName | lastName | contactNumber | city | state | zipCode | gender | maritalStatus | expectedSuccessText |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TRUE | TC02: ... | TRUE | Auto | Tester | 09 | Bangkok | BKK | 10200 |  |  | updated |

Ghi chu:
- `run`: TRUE/FALSE de bat/tat test case.
- `useUniqueSuffix=TRUE`: he thong tu dong noi suffix vao `firstName` va `contactNumber`.
- O de trong se duoc bo qua (khong fill vao form).

## Sheet `Contract`

| run | name | grossSalary | hourlyRate |
| --- | --- | --- | --- |
| TRUE | TC03: User can open Contract tab and fill salary fields | 1000 | 10 |

## Validate schema (fail-fast)

He thong se validate schema truoc khi chay test.

Bat buoc dung dung ten sheet:
- `Login`
- `Navigation`
- `BasicInfo`
- `Contract`

Neu thieu sheet hoac thieu cot bat buoc, test se fail ngay voi loi dang:
- `[TestData] Invalid Excel schema ...`
- Chi tiet sheet/cot bi thieu se duoc liet ke ro rang.
