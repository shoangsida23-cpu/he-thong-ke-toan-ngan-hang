import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useData } from "./DataContext";
import { toast } from "sonner@2.0.3";
import { Save, X, FileCheck } from "lucide-react";

export function PhieuThuChiForm() {
  const { addPhieu } = useData();
  const [formData, setFormData] = useState({
    soPhieu: "",
    loaiPhieu: "",
    ngayLap: new Date().toISOString().split('T')[0],
    soTien: "",
    maKhachHang: "",
    tenKhachHang: "",
    noiDung: "",
    taiKhoanNo: "",
    taiKhoanCo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.loaiPhieu || !formData.soTien || !formData.noiDung) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Save to context
    addPhieu({
      loai: formData.loaiPhieu === "thu" ? "Thu" : "Chi",
      ngayLap: formData.ngayLap,
      soTien: parseInt(formData.soTien).toLocaleString("vi-VN"),
      maKH: formData.maKhachHang,
      tenKH: formData.tenKhachHang,
      noiDung: formData.noiDung,
      trangThai: "Chờ duyệt",
      taiKhoanNo: formData.taiKhoanNo || "1111",
      taiKhoanCo: formData.taiKhoanCo || "5111",
    });

    toast.success("Lưu phiếu thành công! Bút toán đã được hạch toán tự động.");
    
    // Reset form
    setFormData({
      soPhieu: "",
      loaiPhieu: "",
      ngayLap: new Date().toISOString().split('T')[0],
      soTien: "",
      maKhachHang: "",
      tenKhachHang: "",
      noiDung: "",
      taiKhoanNo: "",
      taiKhoanCo: "",
    });
  };

  const handleReset = () => {
    setFormData({
      soPhieu: "",
      loaiPhieu: "",
      ngayLap: new Date().toISOString().split('T')[0],
      soTien: "",
      maKhachHang: "",
      tenKhachHang: "",
      noiDung: "",
      taiKhoanNo: "",
      taiKhoanCo: "",
    });
  };

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Nhập mới Phiếu Thu/Chi</CardTitle>
          <CardDescription>
            Điền thông tin chứng từ. Hệ thống sẽ tự động tạo bút toán kế toán khi lưu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="soPhieu">
                  Số phiếu <span className="text-gray-400">(tự động)</span>
                </Label>
                <Input
                  id="soPhieu"
                  placeholder="PT/PC + số thứ tự"
                  value={formData.soPhieu}
                  onChange={(e) => setFormData({ ...formData, soPhieu: e.target.value })}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loaiPhieu">
                  Loại phiếu <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.loaiPhieu}
                  onValueChange={(value) => setFormData({ ...formData, loaiPhieu: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại phiếu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thu">Phiếu Thu</SelectItem>
                    <SelectItem value="chi">Phiếu Chi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ngayLap">
                  Ngày lập <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ngayLap"
                  type="date"
                  value={formData.ngayLap}
                  onChange={(e) => setFormData({ ...formData, ngayLap: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soTien">
                  Số tiền (VND) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="soTien"
                  type="text"
                  placeholder="0"
                  value={formData.soTien}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({ ...formData, soTien: value });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maKhachHang">Mã khách hàng</Label>
                <Input
                  id="maKhachHang"
                  placeholder="KH001"
                  value={formData.maKhachHang}
                  onChange={(e) => setFormData({ ...formData, maKhachHang: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenKhachHang">Tên khách hàng</Label>
                <Input
                  id="tenKhachHang"
                  placeholder="Nguyễn Văn A"
                  value={formData.tenKhachHang}
                  onChange={(e) => setFormData({ ...formData, tenKhachHang: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="noiDung">
                Nội dung <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="noiDung"
                placeholder="Mô tả chi tiết nội dung thu/chi..."
                value={formData.noiDung}
                onChange={(e) => setFormData({ ...formData, noiDung: e.target.value })}
                rows={3}
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-4 text-gray-700">Thông tin hạch toán</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taiKhoanNo">Tài khoản Nợ</Label>
                  <Select
                    value={formData.taiKhoanNo}
                    onValueChange={(value) => setFormData({ ...formData, taiKhoanNo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn TK Nợ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1111">1111 - Tiền mặt</SelectItem>
                      <SelectItem value="1121">1121 - Tiền gửi ngân hàng</SelectItem>
                      <SelectItem value="1311">1311 - Phải thu khách hàng</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taiKhoanCo">Tài khoản Có</Label>
                  <Select
                    value={formData.taiKhoanCo}
                    onValueChange={(value) => setFormData({ ...formData, taiKhoanCo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn TK Có" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5111">5111 - Doanh thu</SelectItem>
                      <SelectItem value="3331">3331 - Phải trả khách hàng</SelectItem>
                      <SelectItem value="6421">6421 - Chi phí hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Lưu và Duyệt
              </Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Box */}
      {formData.soTien && (
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm">
                  <strong>Bút toán tự động:</strong> Nợ TK {formData.taiKhoanNo || "..."} / Có TK {formData.taiKhoanCo || "..."} 
                  {formData.soTien && ` - Số tiền: ${parseInt(formData.soTien).toLocaleString('vi-VN')} ₫`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}