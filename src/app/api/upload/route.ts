import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Define upload directory path
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // ✅ Ensure the directory exists, create if not
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Define the file path
    const filePath = path.join(uploadDir, file.name);

    // Write the file
    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, url: `/uploads/${file.name}` });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, message: "Error uploading file" }, { status: 500 });
  }
}
