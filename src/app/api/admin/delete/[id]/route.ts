import { NextRequest, NextResponse } from "next/server";
import { deleteAdminById } from "@/prisma/adminService";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteAdminById(params.id);
    return NextResponse.json({ success: true, message: "Admin deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting admin" }, { status: 500 });
  }
}
