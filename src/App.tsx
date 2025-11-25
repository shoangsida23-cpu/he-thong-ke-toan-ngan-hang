import { useState } from "react";
import { Toaster } from "./components/ui/sonner";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import { PhieuThuChiForm } from "./components/PhieuThuChiForm";
import { TraCuuChungTu } from "./components/TraCuuChungTu";
import { BaoCao } from "./components/BaoCao";
import { DataProvider } from "./components/DataContext";
import { Button } from "./components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Search,
  BarChart3,
  LogOut,
  Menu,
  Building2,
  X,
} from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (username: string, role: string) => {
    setCurrentUser(username);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser("");
    setUserRole("");
    setActiveTab("dashboard");
  };

  if (!isLoggedIn) {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "phieuThuChi", label: "Phiếu Thu/Chi", icon: FileText },
    { id: "traCuu", label: "Tra cứu", icon: Search },
    { id: "baoCao", label: "Báo cáo", icon: BarChart3 },
  ];

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg">Hệ thống Quản lý Chi nhánh</h1>
                  <p className="text-sm text-gray-600">Phân hệ Kế toán</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="text-sm">{currentUser}</p>
                <p className="text-xs text-gray-600">{userRole}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`
              fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] bg-white border-r
              transition-transform duration-300 z-40
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
              w-64
            `}
          >
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            {activeTab === "dashboard" && <Dashboard currentUser={currentUser} />}
            {activeTab === "phieuThuChi" && <PhieuThuChiForm />}
            {activeTab === "traCuu" && <TraCuuChungTu />}
            {activeTab === "baoCao" && <BaoCao />}
          </main>
        </div>

        <Toaster />
      </div>
    </DataProvider>
  );
}