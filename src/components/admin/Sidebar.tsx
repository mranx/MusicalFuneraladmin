"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Home, Users, Settings, ClipboardList, PlusCircle, UserPlus, FileText } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/adminlogin");
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <nav className="flex flex-col p-2">

        {/* ✅ Dashboard */}
        <Link href="/admin/dashboard" className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded">
          <Home size={18} /> Dashboard
        </Link>

        {/* ✅ Orders */}
        <div>
          <button
            onClick={() => toggleSection("orders")}
            className="flex justify-between items-center w-full p-3 hover:bg-gray-200 rounded"
          >
            <span className="flex items-center gap-2">
              <ClipboardList size={18} /> Orders
            </span>
          </button>
          {openSection === "orders" && (
            <div className="pl-6 flex flex-col gap-2">
              <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded">All Orders</Link>
              <Link href="/admin/orders/add" className="p-2 hover:bg-gray-100 rounded">Add New Order</Link>
            </div>
          )}
        </div>

        {/* ✅ Users */}
        <div>
          <button
            onClick={() => toggleSection("users")}
            className="flex justify-between items-center w-full p-3 hover:bg-gray-200 rounded"
          >
            <span className="flex items-center gap-2">
              <Users size={18} /> Users
            </span>
          </button>
          {openSection === "users" && (
            <div className="pl-6 flex flex-col gap-2">
              <Link href="/admin/users" className="p-2 hover:bg-gray-100 rounded">All Users</Link>
              <Link href="/admin/users/add" className="p-2 hover:bg-gray-100 rounded">Add User</Link>
            </div>
          )}
        </div>

        {/* ✅ Admin Users */}
        <div>
          <button
            onClick={() => toggleSection("adminUsers")}
            className="flex justify-between items-center w-full p-3 hover:bg-gray-200 rounded"
          >
            <span className="flex items-center gap-2">
              <UserPlus size={18} /> Admin Users
            </span>
          </button>
          {openSection === "adminUsers" && (
            <div className="pl-6 flex flex-col gap-2">
              <Link href="/admin/admin-users" className="p-2 hover:bg-gray-100 rounded">All Admins</Link>
              <Link href="/admin/admin-users/add" className="p-2 hover:bg-gray-100 rounded">Add Admin User</Link>
            </div>
          )}
        </div>

        {/* ✅ Settings */}
        <div>
          <button
            onClick={() => toggleSection("settings")}
            className="flex justify-between items-center w-full p-3 hover:bg-gray-200 rounded"
          >
            <span className="flex items-center gap-2">
              <Settings size={18} /> Settings
            </span>
          </button>
          {openSection === "settings" && (
            <div className="pl-6 flex flex-col gap-2">
              <Link href="/admin/settings" className="p-2 hover:bg-gray-100 rounded">HeroSection Setting</Link>
              <Link href="/admin/settings/whoarewe" className="p-2 hover:bg-gray-100 rounded">Who are we Settings</Link>
              <Link href="/admin/settings/faq" className="p-2 hover:bg-gray-100 rounded">FAQ Settings</Link>
              <Link href="/admin/settings/navbarsetting" className="p-2 hover:bg-gray-100 rounded">Nav Logo Setting</Link>
              <Link href="/admin/settings/favicosetting" className="p-2 hover:bg-gray-100 rounded">Favico Setting</Link>
            </div>
          )}
        </div>

        {/* ✅ Logout */}
        <button onClick={handleLogout} className="mt-6 flex items-center gap-2 p-3 hover:bg-red-200 rounded text-red-600">
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
}