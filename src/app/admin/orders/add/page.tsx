'use client';

import React, { useState } from 'react';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    deceasedName: '',
    personName: '',
    relation: '',
    serviceDate: '',
    paymentStatus: 'Pending',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert('Order placed successfully!');
      setFormData({ orderId: '', deceasedName: '', personName: '', relation: '', serviceDate: '', paymentStatus: 'Pending', email: '' });
    } else {
      alert('Error placing order.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📜 Place an Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Order ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Order ID</label>
            <input type="text" name="orderId" placeholder="Enter Order ID" value={formData.orderId} onChange={handleChange} required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          {/* Deceased Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Deceased Name</label>
            <input type="text" name="deceasedName" placeholder="Enter Name" value={formData.deceasedName} onChange={handleChange} required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          {/* Person Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Your Name</label>
            <input type="text" name="personName" placeholder="Enter Your Name" value={formData.personName} onChange={handleChange} required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          {/* Relation */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Relation</label>
            <input type="text" name="relation" placeholder="Your Relation to Deceased" value={formData.relation} onChange={handleChange} required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          {/* Service Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Service Date</label>
            <input type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Your Email</label>
            <input type="email" name="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"/>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Payment Status</label>
            <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} required
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
            📩 Submit Order
          </button>

        </form>
      </div>
    </div>
  );
};

export default OrderForm;
