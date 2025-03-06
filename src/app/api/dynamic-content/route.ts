import { NextRequest, NextResponse } from "next/server";
import { getAllDynamicContent, createDynamicContent, deleteDynamicContent } from "@/prisma/dynamicContentService";

// GET: Fetch all dynamic content
export async function GET() {
  try {
    const contents = await getAllDynamicContent();
    return NextResponse.json({ success: true, contents });
  } catch (error) {
    console.error("GET Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, message: "Error fetching content", error: errorMessage }, { status: 500 });
  }
}

// POST: Add new dynamic content
export async function POST(request: NextRequest) {
  try {
    const { heading, paragraph } = await request.json();
    if (!heading || !paragraph) {
      return NextResponse.json({ success: false, message: "Heading and Paragraph are required" }, { status: 400 });
    }

    const content = await createDynamicContent(heading, paragraph);
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("POST Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, message: "Error saving content", error: errorMessage }, { status: 500 });
  }
}

// DELETE: Remove a dynamic content entry
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    await deleteDynamicContent(id);
    return NextResponse.json({ success: true, message: "Content deleted successfully." });
  } catch (error) {
    console.error("DELETE Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, message: "Error deleting content", error: errorMessage }, { status: 500 });
  }
}