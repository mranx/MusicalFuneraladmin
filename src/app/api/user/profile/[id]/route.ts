import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/database";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Check if user exists before deleting
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User delete error:", error);
    return NextResponse.json({ error: "An error occurred while deleting user" }, { status: 500 });
  }
}
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const body = await request.json();
    const { name, phone, specialRequests } = body;

    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        phone: phone || undefined,
        specialRequests: specialRequests || undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        relation: true,
        specialRequests: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedProfile,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "An error occurred while updating profile" }, { status: 500 });
  }
}