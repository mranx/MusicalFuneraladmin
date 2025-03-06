
import { NextRequest, NextResponse } from "next/server";
import {  updateOrderStatus, deleteOrder } from "@/prisma/orderService";




export async function PUT(request: NextRequest) {
    try {
      const { id, status } = await request.json();
      if (!id || !status) {
        return NextResponse.json({ success: false, message: "Order ID and status are required" }, { status: 400 });
      }
  
      const updatedOrder = await updateOrderStatus(id, status);
      return NextResponse.json({ success: true, order: updatedOrder });
    } catch (error) {
      console.error("PUT Error:", error);
      return NextResponse.json({ success: false, message: "Error updating order status" }, { status: 500 });
    }
  }
  
  export async function DELETE(request: NextRequest) {
    try {
      const { id } = await request.json();
      if (!id) {
        return NextResponse.json({ success: false, message: "Order ID is required" }, { status: 400 });
      }
  
      await deleteOrder(id);
      return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      console.error("DELETE Error:", error);
      return NextResponse.json({ success: false, message: "Error deleting order" }, { status: 500 });
    }
  }
  