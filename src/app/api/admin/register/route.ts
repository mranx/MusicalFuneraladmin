import { NextRequest, NextResponse } from "next/server";
import { createAdmin, findAdminByEmail } from "@/prisma/adminService";

export async function POST(req: NextRequest) {
    try {
      const { email, password, role } = await req.json();
  
      // Check if admin exists
      const existingAdmin = await findAdminByEmail(email);
      if (existingAdmin) {
        return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
      }
  
      // Create new admin
      const newAdmin = await createAdmin(email, password, role || "admin");
  
      return NextResponse.json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (error) {
      console.error("Error registering admin:", error); // ✅ Log the actual error
      return NextResponse.json({ message: "Error registering admin" }, { status: 500 });
    }
  }
  