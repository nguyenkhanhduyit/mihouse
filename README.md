# Mi House Spa — Landing Page V3 (Source-Fidelity)

**Bản V3 sửa đúng ba khu vực từ `_home.html`:** Bảng giá, Nail Hottrend, Không gian; sử dụng lại Splide + Swiper và tham số hiệu ứng gốc. Đọc `QA-SOURCE-FIDELITY.md` để biết cấu hình, phạm vi đã kiểm thử và giới hạn.

Chạy: `npm install` → `npm run dev` → `http://localhost:555`. Quản trị: `/admin`.

---

# MI HOUSE SPA — Landing Page React + CMS

Website công khai chỉ có **một trang chủ (`/`)**. Hệ thống quản trị riêng ở **`/admin`**. Dự án đã được chỉnh từ file RAR do người dùng cung cấp và đối chiếu trực tiếp `_home.html`.

## Chạy tại máy cá nhân

Yêu cầu **Node.js 20.19+ / 22.12+** và npm.

1. Mở thư mục chứa `package.json`.
2. Sao chép `.env.example` thành `.env` và điền `ADMIN_PASSWORD` cùng `CLOUDINARY_API_SECRET` ở phía backend. Không đưa `.env` lên Git hoặc ZIP.
3. Chạy:

```bash
npm install
npm run dev
```

- Trang chủ: **http://localhost:555/**
- Quản trị: **http://localhost:555/admin**
- API CMS: **http://127.0.0.1:5551/api/health**

`npm run dev` khởi chạy Vite và backend CMS đồng thời. Chạy `npm run dev:frontend` riêng sẽ không có API quản trị. Muốn đổi port tạm thời cần sửa cả cấu hình proxy phù hợp; cấu hình mặc định là 555.

## Trang chủ và điều hướng

- Navbar: Trang chủ, Giới thiệu, Dịch vụ, Bảng giá, Đào tạo, Album ảnh và Liên hệ.
- Sáu mục đầu cuộn đến section tương ứng tại `/#...`; **Liên hệ** dùng liên kết có thể đổi trong `/admin → Cài đặt`.
- **Không còn route trang con**; các URL cũ được đưa về trang chủ/section tương ứng. Không có Tin tức trên navbar, không có menu Album cấp hai, không có Chính sách ở footer.
- Khối Album được dựng lại theo đúng thứ tự trong `_home.html`: `#nail-hottrend` có 8 ảnh; `#khong-gian` có 12 ảnh. Ảnh đã có sẵn trong `public/thumbs`, hỗ trợ cuộn ngang, tự chuyển và lightbox.
- Video TikTok lấy từ `public/upload/file` nếu có trong file RAR. Nút giả Play được căn giữa phần ảnh video.
- Các ảnh bảng giá và video trong popup ưu tiên media nội bộ để không phụ thuộc tên miền nguồn.
- Giữ điều hướng mobile, chuyển ảnh trong popup, zoom, vuốt trái/phải, widget liên hệ và nút trở về đầu trang.

## Quản trị `/admin`

Quản trị văn bản và ảnh trên trang chủ, Navbar, Footer, khối nội dung bổ sung, dịch vụ, bảng giá, ảnh/video và các cài đặt CTA. Trang CMS dùng backend Node, lưu tại `server/data/content.json` và nhận media qua Cloudinary khi có cấu hình đầy đủ. Danh mục chỉnh sửa đã được đánh lại chỉ mục theo HTML của landing page mới.

**Không bao giờ đặt `CLOUDINARY_API_SECRET` trong React/Vite hay trong mã nguồn công khai.** Nếu tài khoản Cloudinary đã từng bị chia sẻ secret, nên xoay vòng secret trong bảng quản trị Cloudinary trước khi dùng production.

## Đối chiếu và kiểm tra

```bash
npm run check
npm run check:react
```

Xem `QA-ONEPAGE.md` để biết các phép kiểm tra đã thực hiện và giới hạn. Mã JSX đã được kiểm tra cú pháp, trang được render bằng React DOM server trong môi trường kiểm tra. Không tuyên bố đã vượt qua build Vite hoặc trình duyệt E2E nếu chưa chạy được.
