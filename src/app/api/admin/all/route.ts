import { NextRequest, NextResponse } from "next/server";
import { getAllAdmins } from "@/prisma/adminService";

export async function GET() {
  try {
    const admins = await getAllAdmins();
    return NextResponse.json({ success: true, admins });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching admins" }, { status: 500 });
  }
}
