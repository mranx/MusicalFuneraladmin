import prisma from "@/lib/database";

// Get all orders
export const getOrders = async () => {
  return await prisma.order.findMany();
};

// Get order by ID
export const getOrderById = async (id: string) => {
  return await prisma.order.findUnique({
    where: { id },
  });
};

// Create a new order
export const createOrder = async (orderData: any) => {
  return await prisma.order.create({
    data: orderData,
  });
};

// Update order status
export const updateOrderStatus = async (id: string, orderId: string, paymentStatus: string) => {
    return await prisma.order.update({
      where: { id },
      data: { orderId, paymentStatus }, // ✅ Ensures both fields are updated
    });
  };
  
// Delete order
export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: { id },
  });
};
