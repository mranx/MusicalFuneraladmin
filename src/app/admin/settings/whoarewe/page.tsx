"use client"

import { useEffect, useState } from "react";

const WhoAreWeForm = () => {
  const [formData, setFormData] = useState({
    heading: "",
    paragraph1: "",
    paragraph2: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/who-are-we");
        const data = await response.json();
        if (data.success && data.content) {
          setFormData(data.content);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    }
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/who-are-we", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Content updated successfully!");
      } else {
        setMessage("Error updating content.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      setMessage("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Edit "Who Are We" Section</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Heading</label>
          <input type="text" name="heading" value={formData.heading} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-gray-700">Paragraph 1</label>
          <textarea name="paragraph1" value={formData.paragraph1} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Paragraph 2</label>
          <textarea name="paragraph2" value={formData.paragraph2} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
          {loading ? "Updating..." : "Update Content"}
        </button>
      </form>
    </div>
  );
};

export default WhoAreWeForm;
