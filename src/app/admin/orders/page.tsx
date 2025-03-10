"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; newId: string; paymentStatus: string } | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // ✅ Fetch Orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order"); 
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          throw new Error("Failed to fetch orders.");
        }
      } catch (err) {
        setError("Error fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Handle Editing Order
  const handleEditOrder = (order: any) => {
    setSelectedOrder({
      id: order.id,
      newId: order.orderId,
      paymentStatus: order.paymentStatus,
    });
    setOpenDropdown(null);
  };

  // ✅ Handle Updating Order
  const handleSubmitOrder = async () => {
    if (!selectedOrder) return;

    try {
      const response = await fetch(`/api/order`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder.id,
          orderId: selectedOrder.newId,
          paymentStatus: selectedOrder.paymentStatus,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrder.id
              ? { ...order, orderId: selectedOrder.newId, paymentStatus: selectedOrder.paymentStatus }
              : order
          )
        );
        setSelectedOrder(null);
        alert("Order updated successfully!");
      } else {
        throw new Error("Failed to update order.");
      }
    } catch (err) {
      alert("Error updating order.");
    }
  };

  // ✅ Handle Deleting an Order
  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(`/api/order`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        setOrders(orders.filter((order) => order.id !== id));
        alert("Order deleted successfully!");
      } else {
        throw new Error("Failed to delete order.");
      }
    } catch (err) {
      alert("Error deleting order.");
    }
  };

  // ✅ Toggle Dropdown
  const toggleDropdown = (orderId: string) => {
    setOpenDropdown(openDropdown === orderId ? null : orderId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border border-gray-300 bg-white rounded-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 text-left border">Order ID</th>
                <th className="p-4 text-left border">Deceased Name</th>
                <th className="p-4 text-left border">Person Name</th>
                <th className="p-4 text-left border">Relation</th>
                <th className="p-4 text-left border">Email</th>
                <th className="p-4 text-left border">Service Date</th>
                <th className="p-4 text-left border">Payment Status</th>
                <th className="p-4 text-center border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-t bg-gray-50 hover:bg-gray-100 transition">
                    <td className="p-4 border">{order.orderId}</td>
                    <td className="p-4 border">{order.deceasedName}</td>
                    <td className="p-4 border">{order.personName}</td>
                    <td className="p-4 border">{order.relation}</td>
                    <td className="p-4 border">{order.email}</td>
                    <td className="p-4 border">{new Date(order.serviceDate).toLocaleDateString()}</td>
                    <td className="p-4 border font-semibold">{order.paymentStatus}</td>
                    <td className="p-4 border relative text-center">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700" onClick={() => toggleDropdown(order.id)}>
                        Actions ▼
                      </button>

                      {openDropdown === order.id && (
                        <div className="absolute mt-2 right-0 bg-white border shadow-md rounded-md w-40 z-10">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800"
                          >
                            Edit Order
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                          >
                            Delete Order
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center text-gray-600">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Edit Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Order</h2>
            <label className="block text-sm font-semibold mb-2 text-gray-700">New Order ID</label>
            <input
              type="text"
              value={selectedOrder.newId}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, newId: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block text-sm font-semibold mb-2 text-gray-700">Payment Status</label>
            <select
              value={selectedOrder.paymentStatus}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value })}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setSelectedOrder(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                Cancel
              </button>
              <button onClick={handleSubmitOrder} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
