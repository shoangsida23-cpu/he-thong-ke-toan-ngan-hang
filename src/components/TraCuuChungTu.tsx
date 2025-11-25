import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { EditPhieuThuChiDialog } from "./EditPhieuThuChiDialog";
import { useData } from "./DataContext";
import { toast } from "sonner@2.0.3";
import { Search, Edit, Trash2, Eye, CheckCircle } from "lucide-react";

export function TraCuuChungTu() {
  const { phieuList, updatePhieu, deletePhieu, updateTrangThai } = useData();
  const [filters, setFilters] = useState({
    soPhieu: "",
    loai: "all",
    tuNgay: "",
    denNgay: "",
    maKH: "",
  });
  const [results, setResults] = useState(phieuList);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  // Update results when phieuList changes
  useEffect(() => {
    applyFilters();
  }, [phieuList]);

  const applyFilters = () => {
    let filtered = [...phieuList];

    if (filters.soPhieu) {
      filtered = filtered.filter(item => 
        item.soPhieu.toLowerCase().includes(filters.soPhieu.toLowerCase())
      );
    }
    if (filters.loai && filters.loai !== "all") {
      filtered = filtered.filter(item => item.loai === filters.loai);
    }
    if (filters.tuNgay) {
      filtered = filtered.filter(item => item.ngayLap >= filters.tuNgay);
    }
    if (filters.denNgay) {
      filtered = filtered.filter(item => item.ngayLap <= filters.denNgay);
    }
    if (filters.maKH) {
      filtered = filtered.filter(item => 
        item.maKH.toLowerCase().includes(filters.maKH.toLowerCase())
      );
    }

    setResults(filtered);
  };

  const handleSearch = () => {
    applyFilters();
    toast.success(`Tìm thấy ${results.length} kết quả`);
  };

  const handleReset = () => {
    setFilters({
      soPhieu: "",
      loai: "all",
      tuNgay: "",
      denNgay: "",
      maKH: "",
    });
    setResults(phieuList);
  };

  const handleEdit = (id: number) => {
    const item = phieuList.find(r => r.id === id);
    if (item?.trangThai === "Đã duyệt") {
      toast.error("Không thể sửa chứng từ đã duyệt/chốt sổ!");
    } else {
      setEditId(id);
    }
  };

  const handleDelete = (id: number) => {
    const item = phieuList.find(r => r.id === id);
    if (item?.trangThai === "Đã duyệt") {
      toast.error("Không thể xóa chứng từ đã duyệt/chốt sổ!");
    } else {
      setDeleteId(id);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deletePhieu(deleteId);
      setResults(results.filter(r => r.id !== deleteId));
      toast.success("Đã xóa chứng từ thành công");
      setDeleteId(null);
    }
  };

  const handleView = (id: number) => {
    toast.info("Xem chi tiết chứng từ #" + id);
  };

  const handleSaveEdit = (updatedData: any) => {
    updatePhieu(updatedData.id, updatedData);
    setResults(results.map(item => 
      item.id === updatedData.id ? updatedData : item
    ));
  };

  const handleToggleTrangThai = (id: number) => {
    const item = phieuList.find(r => r.id === id);
    if (item) {
      const newTrangThai = item.trangThai === "Chờ duyệt" ? "Đã duyệt" : "Chờ duyệt";
      updateTrangThai(id, newTrangThai);
      setResults(results.map(r => 
        r.id === id ? { ...r, trangThai: newTrangThai } : r
      ));
      toast.success(`Đã ${newTrangThai === "Đã duyệt" ? "duyệt" : "hủy duyệt"} chứng từ`);
    }
  };

  const editingPhieu = editId !== null ? phieuList.find(r => r.id === editId) || null : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm chứng từ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="soPhieu">Số phiếu</Label>
              <Input
                id="soPhieu"
                placeholder="PT001234"
                value={filters.soPhieu}
                onChange={(e) => setFilters({ ...filters, soPhieu: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="loai">Loại phiếu</Label>
              <Select
                value={filters.loai}
                onValueChange={(value) => setFilters({ ...filters, loai: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="Thu">Thu</SelectItem>
                  <SelectItem value="Chi">Chi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maKH">Mã khách hàng</Label>
              <Input
                id="maKH"
                placeholder="KH001"
                value={filters.maKH}
                onChange={(e) => setFilters({ ...filters, maKH: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tuNgay">Từ ngày</Label>
              <Input
                id="tuNgay"
                type="date"
                value={filters.tuNgay}
                onChange={(e) => setFilters({ ...filters, tuNgay: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="denNgay">Đến ngày</Label>
              <Input
                id="denNgay"
                type="date"
                value={filters.denNgay}
                onChange={(e) => setFilters({ ...filters, denNgay: e.target.value })}
              />
            </div>

            <div className="flex items-end gap-2">
              <Button onClick={handleSearch} className="flex-1">
                <Search className="w-4 h-4 mr-2" />
                Tìm kiếm
              </Button>
              <Button onClick={handleReset} variant="outline">
                Đặt lại
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kết quả tìm kiếm ({results.length} chứng từ)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Số phiếu</th>
                  <th className="text-left py-3 px-4">Loại</th>
                  <th className="text-left py-3 px-4">Ngày lập</th>
                  <th className="text-left py-3 px-4">Khách hàng</th>
                  <th className="text-right py-3 px-4">Số tiền (₫)</th>
                  <th className="text-left py-3 px-4">Nội dung</th>
                  <th className="text-center py-3 px-4">Trạng thái</th>
                  <th className="text-center py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{item.soPhieu}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        item.loai === "Thu" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {item.loai}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.ngayLap}</td>
                    <td className="py-3 px-4">
                      <div>
                        <div>{item.maKH}</div>
                        <div className="text-sm text-gray-600">{item.tenKH}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">{item.soTien}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{item.noiDung}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleTrangThai(item.id)}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs cursor-pointer hover:opacity-80 transition ${
                          item.trangThai === "Đã duyệt" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                        title="Click để thay đổi trạng thái"
                      >
                        {item.trangThai}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleView(item.id)}
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(item.id)}
                          title="Sửa phiếu"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(item.id)}
                          title="Xóa phiếu"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa chứng từ này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditPhieuThuChiDialog
        open={editId !== null}
        onOpenChange={() => setEditId(null)}
        phieuData={editingPhieu}
        onSave={handleSaveEdit}
      />
    </div>
  );
}