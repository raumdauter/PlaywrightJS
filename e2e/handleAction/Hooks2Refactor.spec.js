import { test, expect } from '@playwright/test';

// Khai báo biến page ở phạm vi file để các test và hooks đều dùng được
let page;

test.describe('Shopping Cart Flow', () => {

    // 1. Chạy TRƯỚC mỗi test case: Mở trang và Đăng nhập
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('https://www.demoblaze.com/');
        
        // Login action
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').fill('testerdemo123');
        await page.locator('#loginpassword').fill('123456');
        await page.getByRole('button', { name: 'Log in' }).click();

        // Đợi cho đến khi Login thành công mới chạy tiếp
        await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    });

    // 2. Chạy SAU mỗi test case: Đăng xuất và đóng trang
    test.afterEach(async () => {
        const logOutLink = page.getByRole('link', { name: 'Log out' });
        if (await logOutLink.isVisible()) {
            await logOutLink.click();
        }
        await page.close();
    });

    // --- TEST CASE 1 ---
    test('Select Product', async () => {
        await page.getByRole('link', { name: 'Phones' }).click();
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        
        // Assert: Kiểm tra xem đã vào đúng trang chi tiết sản phẩm chưa
        await expect(page.locator('.name')).toHaveText('Samsung galaxy s6');
    });

    // --- TEST CASE 2 ---
    test('Add Product to Cart', async () => {
        // Thiết lập xử lý Alert TRƯỚC khi thực hiện hành động gây ra Alert
        page.once('dialog', dialog => dialog.accept());

        // Chọn và thêm vào giỏ
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        await page.getByRole('link', { name: 'Add to cart' }).click();

        // Vào giỏ hàng
        await page.getByRole('link', { name: 'Cart', exact: true }).click(); 

        // Validation
        const cartTable = page.locator('#tbodyid tr');
        
        // Web-First Assertion: Tự động đợi cho đến khi có ít nhất 1 dòng
        await expect(cartTable).not.toHaveCount(0);
        await expect(cartTable).toContainText(['Samsung galaxy s6']);
    });
});