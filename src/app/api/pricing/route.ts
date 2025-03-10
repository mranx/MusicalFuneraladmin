import { NextRequest, NextResponse } from "next/server";
import { getPricingPlans, addPricingPlan, deletePricingPlan } from "@/prisma/PricingService";

export async function GET() {
  try {
    const plans = await getPricingPlans();
    return NextResponse.json({ success: true, plans });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error fetching pricing plans" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, price, features } = await request.json();
    if (!title || !price || !features || !Array.isArray(features)) {
      return NextResponse.json({ success: false, message: "Invalid input" }, { status: 400 });
    }
    const newPlan = await addPricingPlan(title, price, features);
    return NextResponse.json({ success: true, plan: newPlan });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving pricing plan" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    await deletePricingPlan(id);
    return NextResponse.json({ success: true, message: "Pricing plan deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error deleting pricing plan" }, { status: 500 });
  }
}
