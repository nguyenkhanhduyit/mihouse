# QA — Mi House Spa One Page

## Đã xác minh

- Chỉ còn `src/pages/_home.jsx` và route `/` trong `routeManifest.json`. `/admin` được định tuyến riêng.
- HTML React SSR khởi tạo được Header, Navbar, Homepage, AlbumShowcase và Footer; SSR phần `/admin` trả màn hình kết nối.
- Navbar SSR đúng 7 liên kết: 6 hash section và 1 liên hệ; không có dropdown Album hay Tin tức.
- Các liên kết có đường dẫn nội bộ trong HTML SSR chỉ còn `/` và các hash `/#...`; các hình trong dịch vụ không còn liên kết trang chi tiết.
- Footer SSR có 4 nhóm: thương hiệu, liên hệ, danh mục, mạng xã hội; không có nội dung Chính sách.
- Bộ ảnh trong `_home.html`: Nail Hottrend **8 ảnh** và Không gian **12 ảnh**, **20/20 file ảnh có sẵn cục bộ** trong `public/thumbs`.
- **12/12 ảnh bảng giá gốc** và **3/3 video** có file media cục bộ.
- CSS đặt nút giả Play ở `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)` của vùng `.video__media`.
- Kiểm tra cú pháp TypeScript compiler cho **15/15** file JS/JSX/MJS; 8/8 JSX có import React.
- `npm run check` và `npm run check:react` thành công.
- Kiểm thử CMS API cục bộ: health, public content, đăng nhập, đọc/lưu lại overrides của trang chủ, `@navigation`, `@footer` **đều thành công**. Thử nghiệm dùng database và mật khẩu tạm, không thay đổi database bàn giao.

## Chưa xác minh

- Không chạy được kiểm thử trình duyệt Chromium trong phiên này: Chromium từ môi trường bị chặn bằng `ERR_BLOCKED_BY_ADMINISTRATOR` khi mở cả URL nội bộ và trang `data:`.
- Không thực thi được `npm install`/Vite build vì môi trường không phân giải được `registry.npmjs.org`. Tập tin ZIP không chứa `node_modules` hệ Windows trong RAR; cần chạy `npm install` trên máy triển khai.
- Chưa thử kết nối Cloudinary tài khoản thật và chưa chụp so sánh pixel với website online.

## Lệnh kiểm tra sau khi giải nén

```bash
npm install
npm run check
npm run check:react
npm run build
npm run dev
```

Kiểm thử thủ công trên Chrome/Edge: ở 390 px mở menu mobile → bấm Album → kiểm tra hash, click 1 ảnh Nail → chuyển qua ảnh khác → zoom, chọn video → kiểm tra nút Play nằm giữa, kéo ngang album và kiểm tra layout footer.
