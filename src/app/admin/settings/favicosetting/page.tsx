"use client";

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
    if (!newFavicon) return alert("Please select a favicon file.");

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
      return alert("Favicon upload failed.");
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
      alert("Favicon updated successfully!");
    } else {
      alert("Error updating favicon.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>

      {/* Display current favicon */}
      {favicon && (
        <div className="mb-4">
          <p>Current Favicon:</p>
          <img src={favicon} alt="Favicon" className="w-16 h-16 rounded-md border" />
        </div>
      )}

      {/* Upload new favicon */}
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        {loading ? "Uploading..." : "Upload Favicon"}
      </button>
    </div>
  );
}
