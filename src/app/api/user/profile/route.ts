import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/database";
import { authOptions } from "@/app/api/utils/authOptions"; // ✅ Correctly import authOptions

export async function GET(request: NextRequest) {
  try {
    // ✅ Fetch session properly
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;

    const userProfile = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        relation: true,
        directorName: true,
        directorCompany: true,
        directorEmail: true,
        deceasedName: true,
        dateOfBirth: true,
        dateOfPassing: true,
        specialRequests: true,
        servicePlan: true,
        servicePrice: true,
        createdAt: true,
      },
    });

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "An error occurred while fetching profile" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // ✅ Fetch session properly
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const body = await request.json();
    const { name, phone, specialRequests } = body;

    const updatedProfile = await prisma.user.update({
      where: { email },
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
