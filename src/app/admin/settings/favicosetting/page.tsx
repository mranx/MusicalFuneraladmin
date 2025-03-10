'use client';

import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [favicon, setFavicon] = useState<string>("");
  const [newFavicon, setNewFavicon] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current favicon
    const fetchFavicon = async () => {
      const response = await fetch("/api/site-settings");
      const data = await response.json();
      if (data.success) {
        setFavicon(data.favicon);
      }
    };
    fetchFavicon();
  }, []);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setNewFavicon(event.target.files[0]);
    }
  };

  // Upload favicon
  const handleUpload = async () => {
    if (!newFavicon) return alert("⚠ Please select a favicon file.");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", newFavicon);

    const uploadResponse = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadResponse.json();
    if (!uploadData.success) {
      setLoading(false);
      return alert("❌ Favicon upload failed.");
    }

    // Update favicon URL in database
    const updateResponse = await fetch("/api/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ faviconUrl: uploadData.url }),
    });

    const updateData = await updateResponse.json();
    setLoading(false);
    if (updateData.success) {
      setFavicon(updateData.favicon);
      alert("✅ Favicon updated successfully!");
    } else {
      alert("❌ Error updating favicon.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">⚙️ Site Settings</h1>

        {/* ✅ Display current favicon */}
        {favicon && (
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-700 font-semibold mb-2">Current Favicon:</p>
            <img src={favicon} alt="Favicon" className="w-16 h-16 rounded-md border shadow-md" />
          </div>
        )}

        {/* ✅ Upload New Favicon */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload New Favicon</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "⏳ Uploading..." : "⬆ Upload Favicon"}
        </button>
      </div>
    </div>
  );
}
