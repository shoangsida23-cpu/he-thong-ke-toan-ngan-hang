import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useData } from "./DataContext";
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, FileText } from "lucide-react";

interface DashboardProps {
  currentUser: string;
}

export function Dashboard({ currentUser }: DashboardProps) {
  const { phieuList } = useData();

  // Calculate stats from real data
  const calculateStats = () => {
    const tongThu = phieuList
      .filter(p => p.loai === "Thu" && p.trangThai === "Đã duyệt")
      .reduce((sum, p) => sum + parseFloat(p.soTien.replace(/,/g, "")), 0);
    
    const tongChi = phieuList
      .filter(p => p.loai === "Chi" && p.trangThai === "Đã duyệt")
      .reduce((sum, p) => sum + parseFloat(p.soTien.replace(/,/g, "")), 0);
    
    const soDu = 5200000000 + tongThu - tongChi; // Starting balance + thu - chi
    
    const chuaDuyet = phieuList.filter(p => p.trangThai === "Chờ duyệt").length;

    return {
      tongThu: tongThu.toLocaleString("vi-VN"),
      tongChi: tongChi.toLocaleString("vi-VN"),
      soDu: soDu.toLocaleString("vi-VN"),
      chuaDuyet,
    };
  };

  const statsData = calculateStats();

  const stats = [
    {
      title: "Tổng Thu trong tháng",
      value: `${statsData.tongThu} ₫`,
      change: "+12.5%",
      icon: ArrowUpCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Tổng Chi trong tháng",
      value: `${statsData.tongChi} ₫`,
      change: "+8.2%",
      icon: ArrowDownCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Số dư quỹ",
      value: `${statsData.soDu} ₫`,
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Chứng từ chưa duyệt",
      value: `${statsData.chuaDuyet}`,
      change: "Cần xử lý",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Get recent transactions (last 5, sorted by date)
  const recentTransactions = [...phieuList]
    .sort((a, b) => new Date(b.ngayLap).getTime() - new Date(a.ngayLap).getTime())
    .slice(0, 5)
    .map(p => ({
      soPhieu: p.soPhieu,
      loai: p.loai,
      ngay: p.ngayLap,
      soTien: p.soTien,
      noiDung: p.noiDung,
      trangThai: p.trangThai,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h2>Xin chào, {currentUser}</h2>
        <p className="text-gray-600">Tổng quan hoạt động kế toán tháng 10/2025</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Giao dịch gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Số phiếu</th>
                  <th className="text-left py-3 px-4">Loại</th>
                  <th className="text-left py-3 px-4">Ngày lập</th>
                  <th className="text-right py-3 px-4">Số tiền (₫)</th>
                  <th className="text-left py-3 px-4">Nội dung</th>
                  <th className="text-center py-3 px-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((trans, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{trans.soPhieu}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        trans.loai === "Thu" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {trans.loai}
                      </span>
                    </td>
                    <td className="py-3 px-4">{trans.ngay}</td>
                    <td className="py-3 px-4 text-right">{trans.soTien}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{trans.noiDung}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        trans.trangThai === "Đã duyệt" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {trans.trangThai}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}