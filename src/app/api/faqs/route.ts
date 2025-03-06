import { NextRequest, NextResponse } from "next/server";
import { getFAQs, addFAQ } from "@/prisma/faqService";

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json({ success: true, faqs });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching FAQs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, answer } = await request.json();
    if (!question || !answer) {
      return NextResponse.json({ success: false, message: "Both question and answer are required" }, { status: 400 });
    }

    const newFAQ = await addFAQ(question, answer);
    return NextResponse.json({ success: true, faq: newFAQ });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ success: false, message: "Error saving FAQ" }, { status: 500 });
  }
}
