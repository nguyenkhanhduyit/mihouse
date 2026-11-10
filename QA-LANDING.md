# QA — Mi House Spa Landing CMS

## Đã kiểm tra

| Kiểm tra | Kết quả |
|---|---|
| Đối chiếu cấu trúc `_home.html` và nội dung dự án | Đã thực hiện |
| Kiểm tra định tuyến của 33 trang kế thừa | 33 route, không thiếu file JSX |
| Phân tích cú pháp JSX/JavaScript và React import | Không phát hiện lỗi cú pháp trong tập file kiểm tra |
| Màn hình desktop/mobile bằng Chromium, layout tĩnh | 1440, 1280, 768, 390, 320 px; không phát hiện tràn ngang |
| Trang chủ sau thay đổi | 7 section chính, 3 thẻ đào tạo, không có khu vực Tin tức |
| Dải ngang trên mobile | Các track Dịch vụ, Tiêu chí, Bảng giá, TikTok có kích thước cuộn ngang; CSS hỗ trợ scroll-snap, touch |
| Backend CMS cục bộ | API public, 401 khi chưa đăng nhập, đăng nhập và lưu link Liên hệ/Đặt lịch bằng mock credentials |
| Thông số Cloudinary | Cấu hình mẫu tách riêng secret về backend, không nhúng secret vào React |

## Chưa thể chứng nhận trong môi trường kiểm thử

1. **Không chạy được Vite/React 19 từ bộ thư viện chính thức** do môi trường không kết nối được npm registry. Các kiểm tra Chromium trên bố cục dùng bản dựng offline tĩnh, **không tương đương** chạy ứng dụng React thật. Các thao tác menu, lightbox, pinch-zoom, autoplay và cuộn chưa được xác nhận bằng end-to-end trên bản build chính thức.
2. **Không tải đủ media/CSS/JS gốc** từ website mẫu. Các URL trỏ đến `mihousespa.com` vẫn cần được thay bằng media có thể truy cập hoặc ảnh Cloudinary. Không thể xác nhận độ giống 100% về kích thước, màu sắc, ảnh và animation.
3. **Chưa upload thực tới Cloudinary**; các API Cloudinary trước đó chỉ được kiểm tra ở mức mock. Khi cấu hình môi trường thật nên thử upload một ảnh nhỏ, xem ảnh, sau đó xóa thử.

## Kiểm tra tại máy sau khi chạy `npm run dev`

- Mở trang chủ 555 trên máy tính và điện thoại; nhấn đủ từng link navbar, so vị trí sau khi cuộn và màu nền navbar lúc scroll.
- Mở menu mobile, kiểm tra click cả mục thường, album submenu, bên ngoài và nút đóng.
- Vuốt ngang Dịch vụ, Bảng giá, Tiêu chí, Album, TikTok và Đào tạo; không làm trang tràn ngang.
- Click một ảnh ở từng nhóm, thử vuốt chuyển, nút trái/phải, zoom +/−, chụm hai ngón, Escape/đóng popup.
- Đổi link Liên hệ/Đặt lịch và ảnh đào tạo từ `/admin`, nhấn Lưu, tải lại trang chủ để kiểm tra cập nhật.
- Kiểm tra widget liên hệ và nút trở về đầu trang sau khi cuộn.
