"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import "../globals.css"; // ✅ Ensure global styles apply in admin panel

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // ✅ Get the current route

  // ✅ Hide Sidebar & Navbar on the login page
  const isLoginPage = pathname === "/admin/adminlogin";

  return (
    <html lang="en">
      <body className="dark:bg-[#111423] min-h-screen flex flex-col">
        <div className="flex h-screen bg-gray-100">
          {/* ✅ Only show Sidebar if not on the login page */}
          {!isLoginPage && <Sidebar />}

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* ✅ Only show Navbar if not on the login page */}
            {!isLoginPage && <Navbar />}
            <main className="p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
