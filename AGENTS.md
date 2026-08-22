# KHÓA HỆ THỐNG ASSET HÌNH ẢNH

Từ thời điểm này, hãy coi toàn bộ thư mục `public/assets/` là ASSET STORAGE CỐ ĐỊNH của website.

## QUY TẮC BẮT BUỘC

1. Không được xóa bất kỳ file hình ảnh nào trong:
   `/public/assets/`

2. Không được đổi tên file.

3. Không được di chuyển file sang thư mục khác.

4. Không được thay thế URL hình ảnh hiện tại bằng URL hình ảnh tạm thời.

5. Không được sử dụng blob URL, data URL hoặc URL được tạo tạm thời cho background website.

6. Không được thay đổi đường dẫn asset hiện tại nếu không có yêu cầu rõ ràng.

7. Khi sử dụng hình ảnh từ `public/assets`, luôn dùng absolute path bắt đầu bằng `/assets/`.

Ví dụ:
`/assets/images/background-main.webp`

KHÔNG sử dụng:
`./public/assets/images/background-main.webp`
hoặc:
`../public/assets/images/background-main.webp`

## QUY TẮC KHI THAY ĐỔI GIAO DIỆN

Khi tôi yêu cầu đổi giao diện (Glassmorphism, Fluent UI, Material Design, màu, typography, card, layout, animation, responsive, navigation, component...), CHỈ được thay đổi UI/CSS/component cần thiết.

PHẢI GIỮ NGUYÊN:
* tên file asset
* vị trí asset
* đường dẫn asset
* background image
* logo
* icon
* hình ảnh nội dung
* video
* dữ liệu media

Không được tự ý thay thế hình ảnh bằng placeholder.

## QUY TẮC BACKGROUND

Tất cả background image phải được quản lý tập trung. Không hard-code các URL hình ảnh tạm thời vào nhiều component. Nếu nhiều trang sử dụng cùng một background, hãy tạo Design Token hoặc biến CSS.

## QUY TẮC TRƯỚC KHI SỬA CODE

Trước mỗi lần thay đổi giao diện:
1. Kiểm tra thư mục `/public/assets/`.
2. Kiểm tra tất cả image references hiện tại.
3. Không xóa hoặc thay đổi asset.
4. Chỉ sửa phần UI được yêu cầu.
5. Sau khi sửa, kiểm tra tất cả background image vẫn tải được.
6. Nếu asset bị thiếu, báo lỗi thay vì tự tạo URL thay thế.

## MỤC TIÊU

Asset phải tồn tại độc lập với giao diện. Việc thay đổi theme, layout hoặc component không được làm mất hình ảnh.

**UI có thể thay đổi — Asset không được tự ý thay đổi.**
