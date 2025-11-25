# Hệ thống Quản lý Kế toán Chi nhánh Ngân hàng

Ứng dụng web quản lý kế toán cho chi nhánh ngân hàng, bao gồm 4 phân hệ: Kinh doanh, Tiết kiệm, Chăm sóc KH, và Kế toán.

## ✨ Tính năng chính

- 🔐 **Đăng nhập với phân quyền** (Nhân viên kế toán/Quản lý)
- 📝 **Quản lý Phiếu Thu/Chi** (Thêm, sửa, xóa)
- 🔍 **Tra cứu chứng từ** với bộ lọc nâng cao
- ✅ **Duyệt phiếu** - Click vào trạng thái để chuyển đổi
- 🧮 **Hạch toán tự động** - Tự động sinh bút toán Nợ/Có
- 📊 **Báo cáo tổng hợp** thu chi theo thời gian
- 💾 **Lưu trữ dữ liệu** với localStorage (dữ liệu giữ nguyên sau khi refresh)
- ⚠️ **Validation nghiêm ngặt** - Không cho sửa/xóa phiếu đã duyệt

## 🛠️ Công nghệ sử dụng

- **React 18** + TypeScript
- **Tailwind CSS** v4.0 - Styling
- **Lucide React** - Icons
- **Shadcn/ui** - UI Components
- **React Context API** - State management
- **localStorage** - Data persistence

## 🚀 Hướng dẫn chạy local

### Yêu cầu
- Node.js >= 16.x
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/he-thong-ke-toan.git
cd he-thong-ke-toan

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

Mở trình duyệt và truy cập `http://localhost:5173`

## 👤 Tài khoản demo

**Nhân viên kế toán:**
- Username: `nhanvien`
- Password: `123456`

**Quản lý:**
- Username: `quanly`  
- Password: `admin123`

## 📖 Hướng dẫn sử dụng

1. **Đăng nhập** với tài khoản demo
2. **Tạo phiếu mới** ở tab "Phiếu Thu/Chi"
3. **Tra cứu** phiếu đã tạo ở tab "Tra cứu"
4. **Click vào trạng thái** để chuyển "Chờ duyệt" → "Đã duyệt"
5. **Xem báo cáo** ở tab "Báo cáo"

⚠️ **Lưu ý:** Phiếu đã duyệt không thể sửa/xóa (cần chuyển về "Chờ duyệt" trước)

## 📁 Cấu trúc thư mục

```
/
├── App.tsx                      # Component chính
├── components/
│   ├── DataContext.tsx          # Context API + localStorage
│   ├── LoginForm.tsx            # Form đăng nhập
│   ├── Dashboard.tsx            # Trang tổng quan
│   ├── PhieuThuChiForm.tsx      # Form nhập phiếu
│   ├── TraCuuChungTu.tsx        # Tra cứu & quản lý phiếu
│   ├── EditPhieuThuChiDialog.tsx # Dialog sửa phiếu
│   ├── BaoCao.tsx               # Báo cáo tổng hợp
│   └── ui/                      # UI components (shadcn)
└── styles/
    └── globals.css              # Global styles + Tailwind
```

## 🗄️ Cấu trúc dữ liệu

### PhieuThuChi
```typescript
{
  id: number;
  soPhieu: string;           // PT001234, PC001235
  loai: "Thu" | "Chi";
  ngayLap: string;           // YYYY-MM-DD
  soTien: string;            // Formatted với dấu phay
  maKH: string;
  tenKH: string;
  noiDung: string;
  trangThai: "Chờ duyệt" | "Đã duyệt";
  taiKhoanNo: string;        // Tài khoản Nợ
  taiKhoanCo: string;        // Tài khoản Có
}
```

## 🌐 Deploy

### Deploy lên Vercel (Khuyến nghị)

1. Push code lên GitHub
2. Truy cập [vercel.com](https://vercel.com)
3. Import repository từ GitHub
4. Vercel tự động build và deploy
5. Nhận link public: `https://your-app.vercel.app`

### Deploy lên Netlify

1. Push code lên GitHub
2. Truy cập [netlify.com](https://netlify.com)
3. New site from Git → Chọn repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy!

## 📝 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Tác giả

Phát triển bởi [Tên của bạn]

---

⭐ Nếu thấy hữu ích, hãy star repository này!
