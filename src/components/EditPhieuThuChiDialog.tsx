import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PhieuThuChi } from "./DataContext";
import { toast } from "sonner@2.0.3";
import { Save, X, FileCheck } from "lucide-react";

interface EditPhieuThuChiDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phieuData: PhieuThuChi | null;
  onSave: (updatedData: PhieuThuChi) => void;
}

export function EditPhieuThuChiDialog({
  open,
  onOpenChange,
  phieuData,
  onSave,
}: EditPhieuThuChiDialogProps) {
  const [formData, setFormData] = useState({
    soPhieu: "",
    loaiPhieu: "",
    ngayLap: "",
    soTien: "",
    maKhachHang: "",
    tenKhachHang: "",
    noiDung: "",
    taiKhoanNo: "",
    taiKhoanCo: "",
  });

  useEffect(() => {
    if (phieuData) {
      setFormData({
        soPhieu: phieuData.soPhieu,
        loaiPhieu: phieuData.loai.toLowerCase(),
        ngayLap: phieuData.ngayLap,
        soTien: phieuData.soTien.replace(/,/g, ""),
        maKhachHang: phieuData.maKH,
        tenKhachHang: phieuData.tenKH,
        noiDung: phieuData.noiDung,
        taiKhoanNo: phieuData.taiKhoanNo || "1111",
        taiKhoanCo: phieuData.taiKhoanCo || "5111",
      });
    }
  }, [phieuData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.loaiPhieu || !formData.soTien || !formData.noiDung) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    if (phieuData) {
      const updatedPhieu: PhieuThuChi = {
        ...phieuData,
        loai: formData.loaiPhieu === "thu" ? "Thu" : "Chi",
        ngayLap: formData.ngayLap,
        soTien: parseInt(formData.soTien).toLocaleString("vi-VN"),
        maKH: formData.maKhachHang,
        tenKH: formData.tenKhachHang,
        noiDung: formData.noiDung,
        taiKhoanNo: formData.taiKhoanNo,
        taiKhoanCo: formData.taiKhoanCo,
      };

      onSave(updatedPhieu);
      toast.success("Cập nhật phiếu thành công! Bút toán đã được điều chỉnh.");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sửa Phiếu Thu/Chi</DialogTitle>
          <DialogDescription>
            Chỉnh sửa thông tin chứng từ. Bút toán kế toán sẽ tự động được cập nhật.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-soPhieu">
                Số phiếu <span className="text-gray-400">(không thể thay đổi)</span>
              </Label>
              <Input
                id="edit-soPhieu"
                value={formData.soPhieu}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-loaiPhieu">
                Loại phiếu <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.loaiPhieu}
                onValueChange={(value) =>
                  setFormData({ ...formData, loaiPhieu: value })
                }
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
              <Label htmlFor="edit-ngayLap">
                Ngày lập <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-ngayLap"
                type="date"
                value={formData.ngayLap}
                onChange={(e) =>
                  setFormData({ ...formData, ngayLap: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-soTien">
                Số tiền (VND) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-soTien"
                type="text"
                placeholder="0"
                value={formData.soTien}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setFormData({ ...formData, soTien: value });
                }}
              />
              {formData.soTien && (
                <p className="text-sm text-gray-600">
                  {parseInt(formData.soTien).toLocaleString("vi-VN")} ₫
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-maKhachHang">Mã khách hàng</Label>
              <Input
                id="edit-maKhachHang"
                placeholder="KH001"
                value={formData.maKhachHang}
                onChange={(e) =>
                  setFormData({ ...formData, maKhachHang: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tenKhachHang">Tên khách hàng</Label>
              <Input
                id="edit-tenKhachHang"
                placeholder="Nguyễn Văn A"
                value={formData.tenKhachHang}
                onChange={(e) =>
                  setFormData({ ...formData, tenKhachHang: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-noiDung">
              Nội dung <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="edit-noiDung"
              placeholder="Mô tả chi tiết nội dung thu/chi..."
              value={formData.noiDung}
              onChange={(e) =>
                setFormData({ ...formData, noiDung: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="mb-4 text-gray-700">Thông tin hạch toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-taiKhoanNo">Tài khoản Nợ</Label>
                <Select
                  value={formData.taiKhoanNo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, taiKhoanNo: value })
                  }
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
                <Label htmlFor="edit-taiKhoanCo">Tài khoản Có</Label>
                <Select
                  value={formData.taiKhoanCo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, taiKhoanCo: value })
                  }
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

          {formData.soTien && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileCheck className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-sm">
                    <strong>Bút toán cập nhật:</strong> Nợ TK{" "}
                    {formData.taiKhoanNo || "..."} / Có TK{" "}
                    {formData.taiKhoanCo || "..."} - Số tiền:{" "}
                    {parseInt(formData.soTien).toLocaleString("vi-VN")} ₫
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}