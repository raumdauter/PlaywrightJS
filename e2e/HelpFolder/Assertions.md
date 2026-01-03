# PLAYWRIGHT ASSERTIONS CHEATSHEET (TÀI LIỆU TRA CỨU)

## 1. Cơ chế hoạt động (Cần nhớ)
* **Auto-wait (Tự động chờ):** Assertions sẽ **thử lại liên tục** (retry) cho đến khi điều kiện thỏa mãn hoặc hết 5 giây (timeout mặc định).
* **Luôn dùng `await`:** Vì cơ chế chờ là bất đồng bộ. Nếu thiếu `await`, lệnh sẽ trượt qua luôn và gây lỗi sai (False Positive).

---

## 2. Các nhóm Assertions phổ biến

### A. Kiểm tra Trạng thái hiển thị (Visibility & State)
*Dùng để xác định UI có xuất hiện và tương tác được không.*

| Lệnh (Syntax) | Ý nghĩa | Khi nào dùng? | Ví dụ |
| :--- | :--- | :--- | :--- |
| **`toBeVisible()`** | Phần tử có hiển thị trên màn hình. | Kiểm tra nút, menu, text, ảnh. | `await expect(locator).toBeVisible();` |
| **`toBeHidden()`** | Phần tử bị ẩn hoặc không tồn tại. | Kiểm tra loading spinner tắt, modal đóng. | `await expect(locator).toBeHidden();` |
| **`toBeEnabled()`** | Phần tử sáng, click được. | Kiểm tra nút Submit sau khi điền form. | `await expect(btn).toBeEnabled();` |
| **`toBeDisabled()`** | Phần tử bị mờ (greyed out). | Kiểm tra nút khi chưa thỏa mãn điều kiện. | `await expect(btn).toBeDisabled();` |
| **`toBeChecked()`** | Checkbox/Radio được chọn. | Kiểm tra tính năng "Nhớ mật khẩu". | `await expect(checkbox).toBeChecked();` |

### B. Kiểm tra Nội dung văn bản (Text Content)
*Dùng cho các thẻ chứa chữ như `div`, `span`, `p`, `h1`, `button`...*

| Lệnh (Syntax) | Ý nghĩa | Khi nào dùng? | Ví dụ |
| :--- | :--- | :--- | :--- |
| **`toHaveText('abc')`** | Text khớp **tuyệt đối** (100%). | Check tiêu đề, tên nút cố định. | `await expect(h1).toHaveText('Xin chào');` |
| **`toContainText('abc')`** | Text chỉ cần **chứa** từ khóa. | Check thông báo dài, nội dung động. | `await expect(msg).toContainText('lỗi');` |
| **`toHaveText(['A','B'])`**| Check một **danh sách** text. | Check menu có đúng thứ tự các mục. | `await expect(items).toHaveText(['Home','About']);` |

### C. Kiểm tra Input Form (Values)
*Dành riêng cho thẻ `<input>`, `<textarea>`, `<select>`.*

| Lệnh (Syntax) | Ý nghĩa | Khi nào dùng? | Ví dụ |
| :--- | :--- | :--- | :--- |
| **`toHaveValue('abc')`** | Kiểm tra giá trị trong ô input. | Verify dữ liệu người dùng vừa nhập. | `await expect(input).toHaveValue('admin');` |
| **`toBeEmpty()`** | Kiểm tra ô input đang rỗng. | Verify form sau khi reset/clear. | `await expect(input).toBeEmpty();` |

### D. Kiểm tra Trang & URL (Page Level)
*Kiểm tra cấp độ trang web.*

| Lệnh (Syntax) | Ý nghĩa | Khi nào dùng? | Ví dụ |
| :--- | :--- | :--- | :--- |
| **`toHaveURL('url')`** | URL khớp chính xác. | Sau khi chuyển trang. | `await expect(page).toHaveURL('https://a.com');` |
| **`toHaveURL(/regex/)`** | URL chứa 1 phần (linh hoạt). | Khi URL có ID động. | `await expect(page).toHaveURL(/.*dashboard/);` |
| **`toHaveTitle('abc')`** | Tiêu đề tab trình duyệt. | Kiểm tra trang load đúng title. | `await expect(page).toHaveTitle('Đăng nhập');` |

### E. Kiểm tra Cấu trúc & Thuộc tính (Attributes)
*Kiểm tra kỹ thuật HTML/CSS.*

| Lệnh (Syntax) | Ý nghĩa | Khi nào dùng? | Ví dụ |
| :--- | :--- | :--- | :--- |
| **`toHaveAttribute('k','v')`**| Kiểm tra thuộc tính HTML. | Check link (`href`), ảnh (`src`). | `await expect(link).toHaveAttribute('href', '/home');` |
| **`toHaveClass(/abc/)`** | Kiểm tra Class CSS. | Check trạng thái active/error. | `await expect(btn).toHaveClass(/btn-danger/);` |
| **`toHaveCount(n)`** | Đếm số lượng phần tử. | Đếm dòng trong bảng, item trong list. | `await expect(list).toHaveCount(10);` |

---

## 3. Kỹ thuật Mở rộng (Nâng cao)

### A. Phủ định (Negation - `.not`)
Dùng để kiểm tra điều ngược lại.
```javascript
// Đảm bảo phần tử KHÔNG hiển thị
await expect(locator).not.toBeVisible();

// Đảm bảo text KHÔNG chứa từ 'Error'
await expect(locator).not.toContainText('Error');