"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:bg-red-200 p-2 rounded">
        <LogOut size={18} /> Logout
      </button>
    </header>
  );
}
