import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface PhieuThuChi {
  id: number;
  soPhieu: string;
  loai: "Thu" | "Chi";
  ngayLap: string;
  soTien: string;
  maKH: string;
  tenKH: string;
  noiDung: string;
  trangThai: "Chờ duyệt" | "Đã duyệt";
  taiKhoanNo: string;
  taiKhoanCo: string;
}

interface DataContextType {
  phieuList: PhieuThuChi[];
  addPhieu: (phieu: Omit<PhieuThuChi, "id" | "soPhieu">) => void;
  updatePhieu: (id: number, phieu: Partial<PhieuThuChi>) => void;
  deletePhieu: (id: number) => void;
  updateTrangThai: (id: number, trangThai: "Chờ duyệt" | "Đã duyệt") => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialData: PhieuThuChi[] = [
  { id: 1, soPhieu: "PT001234", loai: "Thu", ngayLap: "2025-10-30", soTien: "150,000,000", maKH: "KH001", tenKH: "Nguyễn Văn A", noiDung: "Thu nợ gốc hợp đồng HD2024001", trangThai: "Đã duyệt", taiKhoanNo: "1111", taiKhoanCo: "5111" },
  { id: 2, soPhieu: "PC001235", loai: "Chi", ngayLap: "2025-10-30", soTien: "50,000,000", maKH: "KH002", tenKH: "Trần Thị B", noiDung: "Rút tiết kiệm STK TK2024567", trangThai: "Đã duyệt", taiKhoanNo: "6421", taiKhoanCo: "1111" },
  { id: 3, soPhieu: "PT001236", loai: "Thu", ngayLap: "2025-10-29", soTien: "200,000,000", maKH: "KH003", tenKH: "Lê Văn C", noiDung: "Giải ngân hợp đồng mới HD2024100", trangThai: "Đã duyệt", taiKhoanNo: "1111", taiKhoanCo: "5111" },
  { id: 4, soPhieu: "PC001237", loai: "Chi", ngayLap: "2025-10-29", soTien: "75,000,000", maKH: "KH004", tenKH: "Phạm Thị D", noiDung: "Rút tiết kiệm đáo hạn", trangThai: "Chờ duyệt", taiKhoanNo: "6421", taiKhoanCo: "1111" },
  { id: 5, soPhieu: "PT001238", loai: "Thu", ngayLap: "2025-10-28", soTien: "120,000,000", maKH: "KH001", tenKH: "Nguyễn Văn A", noiDung: "Thu lãi vay kỳ hạn", trangThai: "Đã duyệt", taiKhoanNo: "1111", taiKhoanCo: "5111" },
  { id: 6, soPhieu: "PC001239", loai: "Chi", ngayLap: "2025-10-28", soTien: "90,000,000", maKH: "KH005", tenKH: "Hoàng Văn E", noiDung: "Chi tiền lãi tiết kiệm", trangThai: "Đã duyệt", taiKhoanNo: "6421", taiKhoanCo: "1111" },
  { id: 7, soPhieu: "PT001240", loai: "Thu", ngayLap: "2025-10-27", soTien: "180,000,000", maKH: "KH006", tenKH: "Vũ Thị F", noiDung: "Thu nợ và lãi định kỳ", trangThai: "Đã duyệt", taiKhoanNo: "1111", taiKhoanCo: "5111" },
  { id: 8, soPhieu: "PT001241", loai: "Thu", ngayLap: "2025-10-26", soTien: "250,000,000", maKH: "KH007", tenKH: "Đặng Văn G", noiDung: "Gửi tiết kiệm kỳ hạn 12 tháng", trangThai: "Chờ duyệt", taiKhoanNo: "1111", taiKhoanCo: "3331" },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [phieuList, setPhieuList] = useState<PhieuThuChi[]>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem("phieuThuChi");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        return initialData;
      }
    }
    return initialData;
  });

  // Save to localStorage whenever phieuList changes
  useEffect(() => {
    localStorage.setItem("phieuThuChi", JSON.stringify(phieuList));
  }, [phieuList]);

  const generateSoPhieu = (loai: "Thu" | "Chi") => {
    const prefix = loai === "Thu" ? "PT" : "PC";
    const existingNumbers = phieuList
      .filter(p => p.soPhieu.startsWith(prefix))
      .map(p => parseInt(p.soPhieu.substring(2)))
      .filter(n => !isNaN(n));
    
    const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 1233;
    return `${prefix}${String(maxNumber + 1).padStart(6, "0")}`;
  };

  const addPhieu = (phieu: Omit<PhieuThuChi, "id" | "soPhieu">) => {
    const maxId = phieuList.length > 0 ? Math.max(...phieuList.map(p => p.id)) : 0;
    const newPhieu: PhieuThuChi = {
      ...phieu,
      id: maxId + 1,
      soPhieu: generateSoPhieu(phieu.loai),
    };
    setPhieuList(prev => [...prev, newPhieu]);
  };

  const updatePhieu = (id: number, updates: Partial<PhieuThuChi>) => {
    setPhieuList(prev =>
      prev.map(phieu => (phieu.id === id ? { ...phieu, ...updates } : phieu))
    );
  };

  const deletePhieu = (id: number) => {
    setPhieuList(prev => prev.filter(phieu => phieu.id !== id));
  };

  const updateTrangThai = (id: number, trangThai: "Chờ duyệt" | "Đã duyệt") => {
    setPhieuList(prev =>
      prev.map(phieu => (phieu.id === id ? { ...phieu, trangThai } : phieu))
    );
  };

  return (
    <DataContext.Provider
      value={{
        phieuList,
        addPhieu,
        updatePhieu,
        deletePhieu,
        updateTrangThai,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
