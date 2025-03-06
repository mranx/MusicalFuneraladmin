import { NextRequest, NextResponse } from "next/server";
import { getOrders, createOrder, updateOrderStatus, deleteOrder } from "@/prisma/orderService";
import { sendOrderNotification } from "@/lib/email";

export async function GET() {
  try {
    const orders = await getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ success: false, message: "Error fetching orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    try {
      const orderData = await request.json();
      
      // Validate email
      if (!orderData.email) {
        return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
      }
  
      // ✅ Fix: Convert serviceDate string to Date object
      if (!orderData.serviceDate) {
        return NextResponse.json({ success: false, message: "Service date is required" }, { status: 400 });
      }
      orderData.serviceDate = new Date(orderData.serviceDate);
  
      // ✅ Create Order
      const newOrder = await createOrder(orderData);
      
      // ✅ Send Email Notification
      await sendOrderNotification(orderData.email, newOrder);
  
      return NextResponse.json({ success: true, order: newOrder });
    } catch (error) {
      console.error("POST Error:", error);
      return NextResponse.json({ success: false, message: "Error placing order" }, { status: 500 });
    }
  }
  export async function PUT(request: NextRequest) {
    try {
      const { id, orderId, paymentStatus } = await request.json(); // ✅ Corrected variable names
      if (!id || !orderId || !paymentStatus) {
        return NextResponse.json({ success: false, message: "Order ID, New Order ID, and Payment Status are required" }, { status: 400 });
      }
  
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: { orderId, paymentStatus }, // ✅ Now updating both Order ID and Payment Status
      });
  
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
  
      await prisma.order.delete({
        where: { id },
      });
  
      return NextResponse.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      console.error("DELETE Error:", error);
      return NextResponse.json({ success: false, message: "Error deleting order" }, { status: 500 });
    }
  }
  
