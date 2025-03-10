'use client';

import { useEffect, useState } from "react";

type DemoVideo = {
  id: string;
  title: string;
  duration: string;
  src: string;
};

export default function AdminVideos() {
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    src: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const response = await fetch("/api/videos");
    const data = await response.json();
    if (data.success) setVideos(data.videos);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ title: "", duration: "", src: "" }); // ✅ Reset Form
    fetchVideos();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    await fetch("/api/videos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchVideos();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🎥 Manage Video Demos</h2>

        {/* ✅ Video Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Video Title</label>
            <input 
              type="text" 
              placeholder="Enter Video Title" 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Duration</label>
            <input 
              type="text" 
              placeholder="e.g., 0:15 seconds" 
              value={formData.duration} 
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Video URL</label>
            <input 
              type="text" 
              placeholder="Paste Video URL" 
              value={formData.src} 
              onChange={(e) => setFormData({ ...formData, src: e.target.value })} 
              required 
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition">
            ➕ Add Video
          </button>
        </form>

        {/* ✅ Video List */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📺 Existing Video Demos</h3>
          {videos.length > 0 ? (
            <ul className="space-y-4">
              {videos.map((video) => (
                <li key={video.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                  <div className="flex items-center space-x-4">
                    <video className="w-32 h-20 rounded-md border" controls>
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{video.title}</h4>
                      <p className="text-sm text-gray-600">⏳ {video.duration}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="mt-2 w-full bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    ❌ Delete Video
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No videos available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
