import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/database";

export async function GET(request: NextRequest) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        relation: true,
        deceasedName: true,
        dateOfBirth: true,
        dateOfPassing: true,
        servicePlan: true,
        servicePrice: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while fetching users" },
      { status: 500 }
    );
  }
}
