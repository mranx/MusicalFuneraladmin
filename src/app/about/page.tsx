'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

interface WhoAreWeContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  imageUrl: string;
}

export default function AboutPage() {
   const [content, setContent] = useState<WhoAreWeContent | null>(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("/api/who-are-we");
          const data = await response.json();
          if (data.success) {
            setContent(data.content);
          }
        } catch (error) {
          console.error("Error fetching 'Who Are We' content:", error);
        }
      }
      fetchData();
    }, []);
  
    if (!content) return <p>Loading...</p>;
  
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-background">
      {/* Who Are We Section */}
       <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
           <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div>
     <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                   {content.heading}
                 </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{content.paragraph1}</p>
                 <p className="text-gray-600 dark:text-gray-300">{content.paragraph2}</p>
               </div>
               <div className="relative aspect-[4/3] w-full">
                 <Image
                   src={content.imageUrl}
                   alt="Who Are We"
                   fill
                   className="object-cover rounded-lg"
                   priority
                 />
               </div>
             </div>
           </div>
         </section>

      {/* Our Values Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Respect",
                description: "We approach every service with the highest level of respect and dignity, honoring different religious and cultural traditions."
              },
              {
                title: "Compassion",
                description: "We understand the emotional nature of our work and provide caring, empathetic support throughout the process."
              },
              {
                title: "Excellence",
                description: "We strive for excellence in every aspect of our service, from music production to customer support."
              }
            ].map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you create a meaningful musical tribute for your loved one.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="default">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
