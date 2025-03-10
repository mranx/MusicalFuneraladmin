'use client'
import { useEffect, useState } from "react";

type DemoVideo = {
  id?: string;
  title: string;
  duration: string;
  src: string;
};

// Default demo videos (fallback)
const demoVideos: DemoVideo[] = [
  {
    title: "Catholic Sample",
    duration: "0:15 seconds",
    src: "/assets/videos/test.mp4",
  },
  {
    title: "Anglican Sample",
    duration: "0:15 seconds",
    src: "/assets/videos/test.mp4",
  },
  {
    title: "Uniting Sample",
    duration: "0:15 seconds",
    src: "/assets/videos/test.mp4",
  },
  {
    title: "Baptist Sample",
    duration: "0:15 seconds",
    src: "/assets/videos/test.mp4",
  },
];

export default function VideoDemos() {
  const [videos, setVideos] = useState<DemoVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        const data = await response.json();

        if (data.success && data.videos.length > 0) {
          setVideos(data.videos);
        } else {
          setVideos(demoVideos); // Use fallback if no videos from API
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos(demoVideos); // Use fallback in case of an error
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Glance at Our AI Video Demos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <div key={video.id || index} className="relative aspect-video bg-gray-900 dark:bg-black rounded-lg overflow-hidden">
              <h3 className="text-white text-xl text-center font-semibold">{video.title}</h3>
              <video controls className="w-full h-full">
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
