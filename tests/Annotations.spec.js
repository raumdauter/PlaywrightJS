import { test, expect } from '@playwright/test';

/**
 * 1. .only - CHỈ CHẠY TEST NÀY
 * Dùng khi debug. Playwright sẽ bỏ qua toàn bộ các test khác trong file.
 */
test.only('Focus test: Chạy duy nhất tôi thôi @debug', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/');
    console.log('Đang debug test này...');
});

/**
 * 2. .skip() - BỎ QUA HOÀN TOÀN
 * Test này sẽ không được thực thi và hiển thị là "Skipped" trong báo cáo.
 */
test('Test bị bỏ qua: Tính năng đang bảo trì', async ({ page }) => {
    test.skip(); 
    // Code dưới đây sẽ không bao giờ chạy
    await page.goto('https://google.com');
});

/**
 * 3. .fail() - ĐÁNH DẤU CHẮC CHẮN LỖI
 * Dùng khi đã biết có Bug. 
 * Nếu test THẤT BẠI -> Playwright coi là PASS (đúng dự đoán).
 * Nếu test THÀNH CÔNG -> Playwright báo LỖI (vì nó không còn fail nữa).
 */
test('Test này đang có Bug #123', async ({ page }) => {
    test.fail(); 
    await page.goto('https://demo.nopcommerce.com/');
    // Giả sử nút này đang bị mất do Bug
    await expect(page.getByRole('button', { name: 'NonExistent' })).toBeVisible();
});

/**
 * 4. .fixme() - CẦN SỬA CHỮA
 * Tương tự skip nhưng dùng để đánh dấu code test này đang lỗi, cần viết lại.
 * Playwright sẽ không chạy test này.
 */
test('Test cần được refactor lại logic', async ({ page }) => {
    test.fixme();
    // Đánh dấu để team biết cần vào sửa code này
});

/**
 * 5. .slow() - TĂNG TIMEOUT GẤP 3
 * Nếu timeout mặc định là 30s, test này sẽ được ưu tiên chạy trong 90s.
 * Dùng cho các luồng nghiệp vụ dài (Thanh toán, Đăng ký nhiều bước).
 */
test('Luồng thanh toán phức tạp @long-run', async ({ page }) => {
    test.slow();
    await page.goto('https://demo.nopcommerce.com/');
    // Các bước thanh toán tốn thời gian...
});

/**
 * 6. ANNOTATION CÓ ĐIỀU KIỆN
 * Bạn có thể bỏ qua test dựa trên trình duyệt hoặc môi trường.
 */
test('Chỉ chạy trên Chrome, bỏ qua Firefox', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Tính năng chưa hỗ trợ Firefox');
    await page.goto('https://demo.nopcommerce.com/');
});