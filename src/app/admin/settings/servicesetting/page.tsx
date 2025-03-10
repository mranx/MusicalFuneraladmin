'use client';
import { useEffect, useState } from "react";

type Service = {
  id: string;
  iconType: string;
  title: string;
  description: string;
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState({
    iconType: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await fetch("/api/service");
    const data = await response.json();
    if (data.success) setServices(data.services);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/service", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ iconType: "", title: "", description: "" }); // ✅ Reset Form
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    await fetch("/api/service", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchServices();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🛠 Manage Services</h2>

        {/* ✅ Service Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Icon URL</label>
            <input 
              type="text" 
              placeholder="Enter Icon URL" 
              value={formData.iconType} 
              onChange={(e) => setFormData({ ...formData, iconType: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Service Title</label>
            <input 
              type="text" 
              placeholder="Enter Service Title" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <textarea 
              placeholder="Enter Description" 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
            ➕ Add Service
          </button>
        </form>

        {/* ✅ Services List */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Existing Services</h3>
          {services.length > 0 ? (
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center shadow-sm">
                  <div className="flex items-center space-x-4">
                    <img src={service.iconType} alt={service.title} className="w-12 h-12 rounded-md border" />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{service.title}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    ❌ Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No services available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
