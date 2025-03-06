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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    if (data.success) {
      alert('Order placed successfully!');
    } else {
      alert('Error placing order.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="orderId" placeholder="Order ID" value={formData.orderId} onChange={handleChange} required />
        <input type="text" name="deceasedName" placeholder="Deceased Name" value={formData.deceasedName} onChange={handleChange} required />
        <input type="text" name="personName" placeholder="Your Name" value={formData.personName} onChange={handleChange} required />
        <input type="text" name="relation" placeholder="Relation" value={formData.relation} onChange={handleChange} required />
        <input type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OrderForm;
