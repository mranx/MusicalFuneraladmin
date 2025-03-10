'use client';
import { useEffect, useState } from "react";

type PricingPlan = {
  id: string;
  title: string;
  price: number;
  features: string[];
};

export default function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    features: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const response = await fetch("/api/pricing");
    const data = await response.json();
    if (data.success) setPlans(data.plans);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const featureArray = formData.features.split(",").map((f) => f.trim());
    await fetch("/api/pricing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, price: parseFloat(formData.price), features: featureArray }),
    });
    setFormData({ title: "", price: "", features: "" }); // Reset form
    fetchPlans();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;

    await fetch("/api/pricing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchPlans();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">💰 Manage Pricing Plans</h2>

        {/* ✅ Pricing Plan Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Plan Title</label>
            <input 
              type="text" 
              placeholder="Enter Plan Title" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
            <input 
              type="number" 
              placeholder="Enter Price" 
              value={formData.price} 
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Features (comma-separated)</label>
            <textarea 
              placeholder="Enter features, separated by commas" 
              value={formData.features} 
              onChange={(e) => setFormData({ ...formData, features: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
            ➕ Add Plan
          </button>
        </form>

        {/* ✅ Pricing Plans List */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📦 Existing Plans</h3>
          {plans.length > 0 ? (
            <ul className="space-y-4">
              {plans.map((plan) => (
                <li key={plan.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center shadow-sm">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{plan.title}</h4>
                    <p className="text-sm text-gray-600">💲 {plan.price}</p>
                    <ul className="text-sm text-gray-500 list-disc ml-4 mt-1">
                      {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    ❌ Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No pricing plans available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
