import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { useData } from "./DataContext";
import { FileDown, Printer, BarChart3 } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function BaoCao() {
  const { phieuList } = useData();
  const [reportType, setReportType] = useState("tongHopThuChi");
  const [period, setPeriod] = useState("thang");
  const [month, setMonth] = useState("10");
  const [year, setYear] = useState("2025");

  const handleExport = () => {
    toast.success("Đang xuất báo cáo ra file Excel...");
  };

  const handlePrint = () => {
    toast.success("Đang chuẩn bị in báo cáo...");
  };

  // Calculate report data from real phieuList
  const calculateReportData = () => {
    const approvedPhieu = phieuList.filter(p => p.trangThai === "Đã duyệt");
    
    const tongThu = approvedPhieu
      .filter(p => p.loai === "Thu")
      .reduce((sum, p) => sum + parseFloat(p.soTien.replace(/,/g, "")), 0);
    
    const tongChi = approvedPhieu
      .filter(p => p.loai === "Chi")
      .reduce((sum, p) => sum + parseFloat(p.soTien.replace(/,/g, "")), 0);
    
    const chenhLech = tongThu - tongChi;
    const soDuDauKy = 4600000000;
    const soDuCuoiKy = soDuDauKy + chenhLech;

    return {
      tongThu: tongThu.toLocaleString("vi-VN"),
      tongChi: tongChi.toLocaleString("vi-VN"),
      chenhLech: chenhLech.toLocaleString("vi-VN"),
      soDuDauKy: soDuDauKy.toLocaleString("vi-VN"),
      soDuCuoiKy: soDuCuoiKy.toLocaleString("vi-VN"),
    };
  };

  const reportData = calculateReportData();

  // Group by date for detailed report
  const chiTiet = (() => {
    const groupedByDate: { [key: string]: { thu: number; chi: number; soPhieu: number } } = {};
    
    phieuList
      .filter(p => p.trangThai === "Đã duyệt")
      .forEach(p => {
        const date = p.ngayLap;
        if (!groupedByDate[date]) {
          groupedByDate[date] = { thu: 0, chi: 0, soPhieu: 0 };
        }
        groupedByDate[date].soPhieu++;
        const amount = parseFloat(p.soTien.replace(/,/g, ""));
        if (p.loai === "Thu") {
          groupedByDate[date].thu += amount;
        } else {
          groupedByDate[date].chi += amount;
        }
      });

    let runningBalance = 4600000000; // Starting balance
    return Object.entries(groupedByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 10) // Show first 10 days
      .map(([date, data]) => {
        runningBalance += data.thu - data.chi;
        return {
          ngay: new Date(date).toLocaleDateString("vi-VN"),
          soPhieu: data.soPhieu,
          thu: data.thu.toLocaleString("vi-VN"),
          chi: data.chi.toLocaleString("vi-VN"),
          ton: runningBalance.toLocaleString("vi-VN"),
        };
      });
  })();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tùy chọn báo cáo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Loại báo cáo</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tongHopThuChi">Tổng hợp Thu Chi</SelectItem>
                  <SelectItem value="baoCaoQuy">Báo cáo Quỹ</SelectItem>
                  <SelectItem value="soCai">Sổ Cái</SelectItem>
                  <SelectItem value="nhatKyChung">Nhật ký Chung</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Kỳ báo cáo</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ngay">Ngày</SelectItem>
                  <SelectItem value="thang">Tháng</SelectItem>
                  <SelectItem value="quy">Quý</SelectItem>
                  <SelectItem value="nam">Năm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tháng</Label>
              <Input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Năm</Label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleExport} variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Xuất Excel
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              In báo cáo
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng Thu</p>
                <p className="text-2xl text-green-600">{reportData.tongThu} ₫</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng Chi</p>
                <p className="text-2xl text-red-600">{reportData.tongChi} ₫</p>
              </div>
              <BarChart3 className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chênh lệch</p>
                <p className="text-2xl text-blue-600">{reportData.chenhLech} ₫</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Báo cáo Tổng hợp Thu Chi - Tháng {month}/{year}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Số dư đầu kỳ</p>
                <p className="text-lg">{reportData.soDuDauKy} ₫</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số dư cuối kỳ</p>
                <p className="text-lg">{reportData.soDuCuoiKy} ₫</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Ngày</th>
                  <th className="text-center py-3 px-4">Số phiếu</th>
                  <th className="text-right py-3 px-4">Thu (₫)</th>
                  <th className="text-right py-3 px-4">Chi (₫)</th>
                  <th className="text-right py-3 px-4">Tồn quỹ (₫)</th>
                </tr>
              </thead>
              <tbody>
                {chiTiet.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{row.ngay}</td>
                    <td className="py-3 px-4 text-center">{row.soPhieu}</td>
                    <td className="py-3 px-4 text-right text-green-600">{row.thu}</td>
                    <td className="py-3 px-4 text-right text-red-600">{row.chi}</td>
                    <td className="py-3 px-4 text-right">{row.ton}</td>
                  </tr>
                ))}
                <tr className="border-t-2">
                  <td className="py-3 px-4" colSpan={2}><strong>Tổng cộng</strong></td>
                  <td className="py-3 px-4 text-right text-green-600"><strong>{reportData.tongThu}</strong></td>
                  <td className="py-3 px-4 text-right text-red-600"><strong>{reportData.tongChi}</strong></td>
                  <td className="py-3 px-4 text-right"><strong>{reportData.soDuCuoiKy}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}