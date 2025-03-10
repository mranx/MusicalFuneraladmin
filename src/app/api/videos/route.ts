import { NextRequest, NextResponse } from "next/server";
import { getDemoVideos, addDemoVideo, deleteDemoVideo } from "@/prisma/videoService";

export async function GET() {
  try {
    const videos = await getDemoVideos();
    return NextResponse.json({ success: true, videos });
  } catch (error:any) {
    console.error("GET /api/videos Error:", error); // Log error for debugging
    return NextResponse.json({ success: false, message: "Error fetching videos", error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, duration, src } = await request.json();
    if (!title || !duration || !src) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const newVideo = await addDemoVideo(title, duration, src);
    return NextResponse.json({ success: true, video: newVideo });
  } catch (error:any) {
    console.error("POST /api/videos Error:", error); // Log error for debugging
    return NextResponse.json({ success: false, message: "Error saving video", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await deleteDemoVideo(id);
    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (error:any) {
    console.error("DELETE /api/videos Error:", error); // Log error for debugging
    return NextResponse.json({ success: false, message: "Error deleting video", error: error.message }, { status: 500 });
  }
}
