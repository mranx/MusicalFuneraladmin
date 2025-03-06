"use client";

import { useEffect, useState } from "react";

const NavbarSettingsForm = () => {
  const [lightLogo, setLightLogo] = useState<string>("");
  const [darkLogo, setDarkLogo] = useState<string>("");
  const [newLightLogo, setNewLightLogo] = useState<File | null>(null);
  const [newDarkLogo, setNewDarkLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // ✅ Fetch Current Navbar Settings
  useEffect(() => {
    const fetchNavbarSettings = async () => {
      try {
        const response = await fetch("/api/navbar");
        const data = await response.json();
        if (data.success) {
          setLightLogo(data.settings.lightLogo);
          setDarkLogo(data.settings.darkLogo);
        }
      } catch (error) {
        console.error("Error fetching navbar settings:", error);
      }
    };

    fetchNavbarSettings();
  }, []);

  // ✅ Handle File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Upload images if new files are selected
      const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await response.json();
        return data.url;
      };

      const updatedLightLogo = newLightLogo ? await uploadImage(newLightLogo) : lightLogo;
      const updatedDarkLogo = newDarkLogo ? await uploadImage(newDarkLogo) : darkLogo;

      // Send updated logos to the API
      const response = await fetch("/api/navbar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lightLogo: updatedLightLogo, darkLogo: updatedDarkLogo }),
      });

      const data = await response.json();
      if (data.success) {
        setLightLogo(data.settings.lightLogo);
        setDarkLogo(data.settings.darkLogo);
        setNewLightLogo(null);
        setNewDarkLogo(null);
        setMessage("Navbar logos updated successfully!");
      } else {
        throw new Error("Failed to update navbar logos.");
      }
    } catch (error) {
      console.error("Error updating navbar settings:", error);
      setMessage("Error updating navbar settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Navbar Logo Settings</h2>

      {/* ✅ Display messages */}
      {message && <p className="text-center text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Light Logo Upload */}
        <div>
          <label className="block font-semibold mb-1">Light Mode Logo</label>
          {lightLogo && <img src={lightLogo} alt="Light Logo" className="w-32 mb-2 rounded shadow" />}
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setNewLightLogo)} className="block w-full border p-2 rounded" />
        </div>

        {/* Dark Logo Upload */}
        <div>
          <label className="block font-semibold mb-1">Dark Mode Logo</label>
          {darkLogo && <img src={darkLogo} alt="Dark Logo" className="w-32 mb-2 rounded shadow" />}
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setNewDarkLogo)} className="block w-full border p-2 rounded" />
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          {loading ? "Updating..." : "Update Logos"}
        </button>
      </form>
    </div>
  );
};

export default NavbarSettingsForm;
