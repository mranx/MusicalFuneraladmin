'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    relation: '',
    directorName: '',
    directorCompany: '',
    directorEmail: '',
    deceasedName: '',
    dateOfBirth: '',
    dateOfPassing: '',
    specialRequests: '',
    servicePlan: '',
    servicePrice: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/services/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({
          email: '',
          name: '',
          phone: '',
          relation: '',
          directorName: '',
          directorCompany: '',
          directorEmail: '',
          deceasedName: '',
          dateOfBirth: '',
          dateOfPassing: '',
          specialRequests: '',
          servicePlan: '',
          servicePrice: '',
        });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">User Registration</h2>
      {message && (
        <div className={`p-3 text-white ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} rounded mb-4`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="relation" placeholder="Relation" value={formData.relation} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="deceasedName" placeholder="Deceased Name" value={formData.deceasedName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="date" name="dateOfPassing" value={formData.dateOfPassing} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="servicePlan" placeholder="Service Plan" value={formData.servicePlan} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="servicePrice" placeholder="Service Price" value={formData.servicePrice} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="specialRequests" placeholder="Special Requests (Optional)" value={formData.specialRequests} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
          {loading ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}