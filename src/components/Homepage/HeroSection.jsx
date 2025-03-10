'use client'
import React, { useEffect, useState } from 'react';
import CustomVideoPlayer from '@/_mycomponents/video/CustomVideoPlayer';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

const videoList = [
    {
      id: "1",
      title: "Introduction Video",
      src: "/assets/videos/test.mp4",
      thumbnail: "/assets/images/thumbnail.jpg"
    },
    {
      id: "2",
      title: "Product Demo",
      src: "/assets/videos/Sample Video.mp4",
      thumbnail: "/assets/images/thumbnail.jpg"
    },
 ];

const HeroSection = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.success && data.contents.length > 0) {
          setContent({ heading: data.contents[0].heading, paragraph: data.contents[0].paragraph });
        }
      } catch (error) {
        console.error("Error fetching dynamic content", error);
      }
    }
    fetchContent();
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {content ? content.heading : "Loading..."}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            {content ? content.paragraph : "Loading..."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" variant="default">
                Our Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
          <div className="w-full max-w-4xl mt-8">
            <CustomVideoPlayer 
              videoList={videoList}
              initialVideo={videoList[0]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;