import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/utils/auth";

export async function GET(req: NextRequest) {
  try {
    // ✅ Get token from Headers instead of localStorage
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Verify token
    const decoded = verifyToken(token);
    
    return NextResponse.json({ email: decoded.email, role: decoded.role });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}
