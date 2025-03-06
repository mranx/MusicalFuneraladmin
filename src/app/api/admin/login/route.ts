import { NextRequest, NextResponse } from "next/server";
import { findAdminByEmail } from "@/prisma/adminService";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const admin = await findAdminByEmail(email);

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const token = jwt.sign(
        { adminId: admin.id, email: admin.email, role: admin.role }, // Include email
        process.env.JWT_SECRET!,
        { expiresIn: "30d" }
      );
      
    
    return NextResponse.json({ message: "Login successful", admin: { email, role: admin.role, token  }});
  } catch (error) {
    return NextResponse.json({ message: "Error logging in" }, { status: 500 });
  }
}
