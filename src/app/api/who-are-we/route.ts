import { NextRequest, NextResponse } from "next/server";
import { getWhoAreWeContent, updateWhoAreWeContent } from "@/prisma/whoAreWeService";

export async function GET() {
  try {
    const content = await getWhoAreWeContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching content" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { heading, paragraph1, paragraph2, imageUrl } = await request.json();
    if (!heading || !paragraph1 || !paragraph2 || !imageUrl) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const updatedContent = await updateWhoAreWeContent(heading, paragraph1, paragraph2, imageUrl);
    return NextResponse.json({ success: true, content: updatedContent });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, message: "Error updating content" }, { status: 500 });
  }
}
