# MI HOUSE SPA — BÁO CÁO ĐỐI CHIẾU MẪU HTML (V3)

**Phạm vi sửa:** Bảng giá dịch vụ, Nail Hottrend, Không gian. Dự án tiếp tục chỉ có landing page `/` và giao diện quản trị `/admin`.

## Nguồn chuẩn

- `original-html/_home.html`: HTML mẫu.
- `public/assets/css/prettier.css`: khung giá (dòng khoảng 947–1040), Album (khoảng 1135–1164).
- `public/assets/js/apps.js`: cấu hình Splide Album tại `NN_FRAMEWORK.Others`.
- `public/assets/splide/` và `public/assets/swiper/`: các bản thư viện đi kèm nguồn mẫu.
- Ảnh Album và bảng giá lấy từ `public/thumbs/...` (bản cục bộ có trong RAR trước đó).

## Đã thay đổi

1. **Bảng giá:** dùng lại đúng Swiper, `loop`, `autoplay: {delay:3000,pauseOnMouseEnter:true,disableOnInteraction:false}`, `speed:1000`, 2 hình từ 577px trở lên, 1 hình dưới 577px; khung trắng/viền vàng và nhãn MENU bên trái trên màn hình rộng. Bỏ `height:100%` cưỡng bức gây khoảng trống dưới ảnh.
2. **Nail Hottrend:** Splide với `type:'loop'`, `drag:'free'`, `focus:'center'`, `perPage:7`, `gap:2`, AutoScroll `speed:2`. Hình đúng thứ tự 8 ảnh từ HTML mẫu.
3. **Không gian:** Splide giống Nail, AutoScroll `speed:-2`, thứ tự đúng 12 ảnh từ HTML mẫu. Chữ Không gian nằm sau dải ảnh.
4. Xóa các CSS `width`, `flex-basis`, `transform:none` có `!important` trong bản trước làm hỏng Splide.
5. Tắt hai cơ chế slider mô phỏng cũ ở `fidelityMotion.js` và `enhancePage.js` để tránh chạy song song với Swiper/Splide.
6. Ảnh mở popup theo nhóm không bị lặp bởi slide clone của Splide. `Xem chi tiết` giá mở popup thay vì mở trang con.

## Kiểm thử thực tế

Cấu trúc React đã được dựng thành HTML bằng `ReactDOMServer` và kiểm thử trong Chromium với CSS thực tế và chính các file thư viện JS gốc. Đã xác nhận:

| Width | Album (ảnh/khung) | Menu giá (ảnh/khung) | AutoScroll | Auto chuyển giá | JS error | Tràn ngang |
|---|---:|---:|---|---|---:|---:|
| 1440px | 7 | 2 | Hoạt động | Hoạt động | 0 | 0 |
| 768px | 4 | 2 | Hoạt động | Hoạt động | 0 | 0 |
| 390px | 3 | 1 | Hoạt động | Hoạt động | 0 | 0 |
| 320px | 2 | 1 | Hoạt động | Hoạt động | 0 | 0 |

Chiều rộng menu trên Chromium: **1040px ở 1440px**, **358px ở 390px**. Chiều rộng mỗi slide Album: **204px ở 1440px**, **~128.66px ở 390px**, đúng với HTML tham chiếu trong cùng phép thử.

- Cú pháp JSX: 8/8 file hợp lệ.
- React SSR: trang chủ và quản trị dựng thành công.
- CSS: không có lỗi parse cấp cao.
- 20/20 ảnh Album có tệp cục bộ.

**Giới hạn:** Kiểm thử Chromium đã dùng HTML do React SSR tạo ra cùng CSS/JS thực tế, không phải phiên chạy Vite đầy đủ có đăng nhập CMS. Môi trường này không tải được gói npm từ registry nên chưa xác nhận `npm run build` với các package chính thức. Độ tương đồng **100% từng pixel** không thể xác nhận hoàn toàn nếu chưa đối chiếu thêm trên phiên Vite/browser thực tế, gồm cả các font của website gốc. Không đóng gói font vào ZIP; có thể sử dụng lại font được cấp phép từ nguồn của bạn.

## Chạy trên máy

```bash
npm install
npm run dev
```

Website: `http://localhost:555` — Quản trị: `http://localhost:555/admin`.
Giữ `.env` cá nhân ở máy; ZIP không có `.env` hoặc secret Cloudinary.
