import { NextRequest, NextResponse } from "next/server";
import { getServices, addService, deleteService } from "@/prisma/Services";

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ success: true, services });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { iconType, title, description } = await request.json();
    if (!iconType || !title || !description) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }
    const newService = await addService(iconType, title, description);
    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await deleteService(id);
    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting service" }, { status: 500 });
  }
}
