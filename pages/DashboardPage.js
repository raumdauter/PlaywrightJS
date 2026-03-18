const logger = require('../utils/logger'); // Import logger using CommonJS syntax
const { expect } = require('@playwright/test');
const {ultimateBasePage} = require('../utils/ultimateBasePage'); // Import ultimateBasePage using CommonJS syntax'

class DashboardPage extends ultimateBasePage {

    constructor(page) {
        super(page);  
        this.page = page;
    // 1. The navigation icons on header
    this.AcctSettingIcon = page.locator(`//a[@data-original-title='Account Settings']`);
    this.AppsIcon = page.locator(`//a[@class='pc-head-link active dropdown-toggle arrow-none mr-0']`);
    this.CalenderIcon = page.locator("a[href='https://hrm.anhtester.com/erp/system-calendar']");
    this.SystemReportIcon = page.locator("//a[@href='https://hrm.anhtester.com/erp/system-reports']");

    // Logo system
    this.LogoSystem = page.locator('img.logo.logo-lg:visible');
    this.Homebutton = page.getByText('Home', { exact: true });  
    this.TitleHome = page.getByText('Home | HRM | Anh Tester Demo', { exact: true });
    }

    // 2. Hàm kiểm tra Dashboard đã load xong chưa
    async verifyDashboardLoaded() {
        logger.info('[Verify] Đang kiểm tra trang Dashboard tải thành công...');
        await expect(this.page, 'LỖI: Không tìm thấy tiêu đề Dashboard').toHaveTitle('Home | HRM | Anh Tester Demo');
        logger.info('[Passed] ✅ Trang Dashboard đã hiển thị.');
    }

    // 3. Hàm điều hướng đến các menu trên Dashboard
    async mapToMenu(menuName) {
        logger.info(`[Navigation] : Điều hướng đến ${menuName} trên Dashboard`);
        // Dùng text hoặc data-test-id để tìm đúng menu đó và click
        const menuLocator = this.page.locator(`a.nav-link:has-text("${menuName}")`);
        await menuLocator.click();

        // Tùy chọn: Đợi một chút để trang load xong (ví dụ đợi spinner biến mất)
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = { DashboardPage };