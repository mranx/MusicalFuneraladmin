import { NextRequest, NextResponse } from "next/server";
import * as navbarService from "@/prisma/navbarService"; // ✅ Use wildcard import

// ✅ GET: Fetch Navbar Logos
export async function GET() {
  try {
    const settings = await navbarService.getNavbarSettings(); // ✅ Use correct import
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET Navbar Settings Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching navbar settings" }, { status: 500 });
  }
}

// ✅ PUT: Update Navbar Logos
export async function PUT(request: NextRequest) {
    try {
      const { lightLogo, darkLogo } = await request.json();
  
      // ✅ Ensure both values are provided
      if (!lightLogo || !darkLogo) {
        return NextResponse.json({ success: false, message: "Both light and dark logos are required" }, { status: 400 });
      }
  
      // ✅ Update the database
      const updatedSettings = await navbarService.updateNavbarSettings(lightLogo, darkLogo);
      return NextResponse.json({ success: true, settings: updatedSettings });
  
    } catch (error) {
      console.error("PUT Navbar Settings Error:", error);
      return NextResponse.json({ success: false, message: "Error updating navbar settings" }, { status: 500 });
    }
  }