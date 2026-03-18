const { test, expect } = require('@fixtures/baseTest');

test.describe('Dashboard Functionality', () => {

    // Chạy Login trước MỖI test case trong khối describe này
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login('admin_example', '123456');
        // Gọi lại hàm verify có sẵn bên LoginPage để đảm bảo login xong mới đi tiếp
        await loginPage.verifyLoginSuccess('Logged In Successfully.'); 
    });

    test('TC02: Verify User can navigate to "My Info" page via Dashboard Menu', async ({ dashboardPage, page }) => {
        // 1. Kiểm tra Dashboard hiển thị đúng không
        await dashboardPage.verifyDashboardLoaded();

        // 2. Điều hướng tới trang My Info (hoặc tên menu thực tế trên web của bạn)
        await dashboardPage.mapToMenu('My Info');

        // 3. Kiểm tra xem URL có thay đổi đúng sang trang My Info không
        await expect(page, 'LỖI: URL không chuyển sang trang My Info').toHaveURL(/.*viewPersonalDetails/);
        console.log('[Passed] ✅ Đã chuyển hướng thành công sang trang My Info.');
    });

    test('TC03: Verify User can navigate to "PIM" page via Dashboard Menu', async ({ dashboardPage, page }) => {
        await dashboardPage.verifyDashboardLoaded();
        
        // Lại tái sử dụng hàm điều hướng động! Rất nhanh và tiện.
        await dashboardPage.mapToMenu('PIM');
        
        await expect(page, 'LỖI: URL không chuyển sang trang PIM').toHaveURL(/.*viewEmployeeList/);
        console.log('[Passed] ✅ Đã chuyển hướng thành công sang trang PIM.');
    });
});