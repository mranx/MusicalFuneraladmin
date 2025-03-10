'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { services, pricingPlans } from '@/constants';
import ServiceCard from '@/components/services/ServiceCard';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeroSection from '@/components/Homepage/HeroSection'
import WhoAreWe from '@/components/Homepage/WhoAreWe';
import Frequently from '@/components/Homepage/Frequently'
import ServicessPage from '@/components/Homepage/ServicessPage'
import Pricing from '@/components/Homepage/PricingPage';
import VideoSection from '@/components/Homepage/VideoSection'
const howItWorks = [
  {
    step: '01',
    title: 'Choose a audio or video format',
    description: 'Select your preferred format for the memorial service'
  },
  {
    step: '02',
    title: 'Fill out the required details and provide images',
    description: 'Share your photos and select your preferred music'
  },
  {
    step: '03',
    title: 'Get a one-time ready to play video or audio',
    description: 'Receive your personalized memorial tribute'
  }
];



const demoVideos = [
  {
    title: 'Catholic Sample',
    duration: '0:15 seconds',
    src:'/assets/videos/test.mp4'
  },
  {
    title: 'Anglican Sample',
    duration: '0:15 seconds',
    src:'/assets/videos/test.mp4'
  },
  {
    title: 'Uniting Sample',
    duration: '0:15 seconds',
    src:'/assets/videos/test.mp4'
  },
  {
    title: 'Baptist Sample',
    duration: '0:15 seconds',
    src:'/assets/videos/test.mp4'
  }
];

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection/>

      {/* Services Section */}
   <ServicessPage/>
      {/* Who Are We Section */}
     <WhoAreWe/>

      {/* Pricing Section */}
    <Pricing/>
      {/* Video Demos Section */}
     <VideoSection/>
      {/* How it Works Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How it works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#4A77B5] dark:bg-[#3A67A5] text-white flex items-center justify-center mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
     <Frequently/>
    </main>
  );
}