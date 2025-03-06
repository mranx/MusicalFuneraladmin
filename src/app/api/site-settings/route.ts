import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/database";

// ✅ GET: Fetch Favicon
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json({ success: true, favicon: settings?.faviconUrl || "" });
  } catch (error) {
    console.error("GET Favicon Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching favicon" }, { status: 500 });
  }
}

// ✅ PUT: Update Favicon
export async function PUT(request: NextRequest) {
  try {
    const { faviconUrl } = await request.json();
    if (!faviconUrl) {
      return NextResponse.json({ success: false, message: "Favicon URL is required" }, { status: 400 });
    }

    const updatedSettings = await prisma.siteSettings.upsert({
      where: { id: "site-settings" },
      update: { faviconUrl },
      create: { id: "site-settings", faviconUrl },
    });

    return NextResponse.json({ success: true, favicon: updatedSettings.faviconUrl });
  } catch (error) {
    console.error("PUT Favicon Error:", error);
    return NextResponse.json({ success: false, message: "Error updating favicon" }, { status: 500 });
  }
}
