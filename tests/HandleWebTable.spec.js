const { test, expect } = require('@playwright/test');

test('Handle WebTable and Pagination Fix', async ({ page }) => {

    // Bước 1: Điều hướng đến trang web
    await page.goto('https://testautomationpractice.blogspot.com/');

    // 1. Capture table và đợi nó hiển thị rõ ràng
    // Lưu ý: ID đúng thường là #productTable (chữ T viết hoa)
    const table = page.locator('#productTable');
    await expect(table).toBeVisible({ timeout: 10000 });

    // 2. Kiểm tra số cột và hàng bằng Web First Assertions (Tự động retry)
    const columns = table.locator('thead th');
    const rows = table.locator('tbody tr');

    await expect(columns).toHaveCount(4); // ID, Name, Price, Select
    await expect(rows).toHaveCount(5);   // 5 hàng dữ liệu mỗi trang

    // Sử dụng await khi gọi .count() để tránh lỗi [object Promise]
    console.log(`Table có: ${await columns.count()} cột và ${await rows.count()} hàng.`);

    // 3. Chọn checkbox cho một sản phẩm cụ thể (Sử dụng tên thực tế: Smartphone)
    // Thay vì 'Product 4' không tồn tại, ta dùng 'Smartphone' có trong snapshot
    const matchedRow = rows.filter({
        has: page.locator('td'),
        hasText: 'Smartphone' 
    });
    await matchedRow.locator('input[type="checkbox"]').check();

    // 4. Chọn nhiều sản phẩm bằng hàm Reusable (Sử dụng tên thực tế)
    await selectProduct(rows, page, 'Laptop');
    await selectProduct(rows, page, 'Tablet');

    // 5. Đọc dữ liệu từ tất cả các trang (Handling Pagination)
    console.log('--- Đang trích xuất dữ liệu từ tất cả các trang ---');
    const paginationLinks = page.locator('.pagination li a');
    const totalPages = await paginationLinks.count();

    for (let p = 0; p < totalPages; p++) {
        if (p > 0) {
            // Click chuyển trang
            await paginationLinks.nth(p).click();
            // Đợi một chút để DOM cập nhật dữ liệu mới
            await page.waitForTimeout(1000); 
        }

        console.log(`Dữ liệu tại trang ${p + 1}:`);
        await printPageData(rows);
    }
    
    await page.waitForTimeout(2000);
});

/** * Hàm phụ trợ: Chọn checkbox theo tên sản phẩm
 */
async function selectProduct(rows, page, name) {
    const row = rows.filter({
        has: page.locator('td'),
        hasText: name
    });
    // Đảm bảo locator trỏ chính xác vào checkbox trong hàng
    await row.locator('input[type="checkbox"]').check();
}

/** * Hàm phụ trợ: In dữ liệu của trang hiện tại
 */
async function printPageData(rows) {
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const tds = row.locator('td');
        const rowData = await tds.allTextContents();
        // Cắt bỏ phần tử cuối cùng (cột checkbox trống) để in dữ liệu sạch
        console.log(rowData.slice(0, -1).join(' | '));
    }
}