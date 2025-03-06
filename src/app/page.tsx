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

const faqs = [
  {
    question: "What services does your agency provide?",
    answer: "We provide AI-generated funeral music and video services, creating personalized tributes for memorial services across different religious denominations."
  },
  {
    question: "What's your pricing plans?",
    answer: "We offer three main plans: MP3 Original Recording Audio, FMO MP3 Audio, and FMO MP4 Video, each starting at $40.00 with different features and customization options."
  },
  {
    question: "How to book your service offshore?",
    answer: "You can book our services by selecting your preferred plan, filling out the required details, and following our simple three-step process. We provide support throughout the booking process."
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
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSection/>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">We offer services for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                iconType={service.iconType}
              />
            ))}
          </div>
          <div className="text-center mt-16">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Have Queries? Lets Get In Touch</h3>
            <Link href="/contact">
              <Button size="lg" variant="default">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who Are We Section */}
     <WhoAreWe/>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 bg-[#4A77B5] dark:bg-[#3A67A5]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Services pricing plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <Card key={plan.title} className="bg-white dark:bg-gray-700 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      {plan.title}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      starting from
                    </div>
                    <div className="mt-1 flex items-baseline">
                      <span className="text-[#4A77B5] dark:text-[#6B9BE3] text-3xl font-medium">$</span>
                      <span className="text-[#4A77B5] dark:text-[#6B9BE3] text-4xl font-medium">{plan.price}</span>
                      <span className="text-[#4A77B5] dark:text-[#6B9BE3] text-lg">.00</span>
                    </div>
                  </div>

                  <Link href={`/services?plan=${encodeURIComponent(plan.title)}&price=${plan.price}`}>
                    <Button className="w-full bg-[#4A77B5] dark:bg-[#6B9BE3] text-white" size="lg">
                      BOOK NOW
                    </Button>
                  </Link>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Whats included?</h4>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                        <svg className="w-5 h-5 mr-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demos Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Glance to our AI Video Demos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {demoVideos.map((demo) => (
              <div key={demo.title} className="relative aspect-video bg-gray-900 dark:bg-black rounded-lg overflow-hidden">

                  <h3 className="text-white text-xl text-center font-semibold">{demo.title}</h3>
                 {/* <CustomVideoPlayer src={demo.src} thumbnail=''/> */}

              </div>
            ))}
          </div>
        </div>
      </section>

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