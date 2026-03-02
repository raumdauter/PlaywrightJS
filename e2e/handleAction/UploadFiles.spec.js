const { test, expect } = require('@playwright/test');
const { exec } = require('node:child_process');

test('Upload Single File', async ({ page }) => {

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    const buttonUpload = page.locator('#filesToUpload');
    await buttonUpload.click();
    await buttonUpload.setInputFiles('uploadFiles/jkajdolf.txt')

    // VERIFY: Kiểm tra phần tử đầu tiên trong danh sách có đúng tên file không
    const firstFileName = page.locator('#fileList li').first();
    await expect(firstFileName).toHaveText('jkajdolf.txt');
    
    // VERIFY: Đảm bảo nó đang hiển thị trên màn hình
    await expect(firstFileName).toBeVisible();

    await page.waitForTimeout(2000);
 })

 test('Upload Multiple Files', async ({ page }) => {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    const buttonUpload = page.locator('#filesToUpload');    
    await buttonUpload.click();
    await buttonUpload.setInputFiles([
        'uploadFiles/jkajdolf.txt',
        'uploadFiles/jkajdolf - Copy.txt'
    ]);

    // 1. VERIFY: Kiểm tra số lượng file hiển thị trong list có bằng số lượng file đã chọn (2 file)
    const fileListItems = page.locator('#fileList li');
    await expect(fileListItems).toHaveCount(2);

    // 2. VERIFY: Kiểm tra cụ thể tên từng file trong danh sách
    await expect(fileListItems.nth(0)).toHaveText('jkajdolf.txt');
    await expect(fileListItems.nth(1)).toHaveText('jkajdolf - Copy.txt');

    // 3. VERIFY: Kiểm tra dòng thông báo trạng thái (nếu có)
    // Trang này khi chưa upload sẽ ghi "No Files Selected", khi có file nó sẽ thay đổi.
    await expect(page.locator('#fileList')).not.toHaveText('No Files Selected');

    //Remove files after upload (if needed)
    await buttonUpload.setInputFiles([]);
    await page.waitForTimeout(2000);
    await expect(page.locator('#fileList')).toHaveText('No Files Selected');

    await page.waitForTimeout(2000);
})