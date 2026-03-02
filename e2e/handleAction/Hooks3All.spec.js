import { test, expect } from '@playwright/test';

// Khai báo biến ở phạm vi file để các hooks đều dùng được
let page;
let context;

// 1. CHẠY 1 LẦN DUY NHẤT: Thiết lập môi trường chung
test.beforeAll(async ({ browser }) => {
    console.log('>>> 🟢 [beforeAll]: Khởi tạo Browser Context cho toàn bộ file.');
    // Tạo một phiên làm việc (context) dùng chung cho tất cả các test trong file này
    context = await browser.newContext();
});

// 2. CHẠY TRƯỚC MỖI TEST: Chuẩn bị trạng thái sẵn sàng (Login)
test.beforeEach(async () => {
    console.log('>>> 🟡 [beforeEach]: Mở trang và Đăng nhập.');
    page = await context.newPage();
    await page.goto('https://www.demoblaze.com/');
    
    // Thực hiện Login
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('testerdemo123');
    await page.locator('#loginpassword').fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Đợi login xong bằng cách kiểm tra nút Logout hiện ra
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});

// 3. CHẠY SAU MỖI TEST: Dọn dẹp trạng thái
test.afterEach(async () => {
    console.log('>>> 🔵 [afterEach]: Đăng xuất và đóng Tab.');
    const logOutLink = page.getByRole('link', { name: 'Log out' });
    if (await logOutLink.isVisible()) {
        await logOutLink.click();
    }
    await page.close(); // Chỉ đóng tab vừa test, giữ lại trình duyệt
});

// 4. CHẠY 1 LẦN DUY NHẤT KHI XONG HẾT: Giải phóng tài nguyên
test.afterAll(async () => {
    console.log('>>> 🔴 [afterAll]: Đóng Browser Context hoàn toàn.');
    await context.close();
});

// --- CÁC TEST CASE ---

test('Select Product', async () => {
    await page.getByRole('link', { name: 'Phones' }).click();
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await expect(page.locator('.name')).toHaveText('Samsung galaxy s6');
});

test('Add Product to Cart', async () => {
    page.once('dialog', dialog => dialog.accept()); 
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click(); 

    const cartTable = page.locator('#tbodyid tr');
    await expect(cartTable).not.toHaveCount(0);
    await expect(cartTable).toContainText(['Samsung galaxy s6']);
});