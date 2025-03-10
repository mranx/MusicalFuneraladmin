'use client'
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

type Service = {
  id: string;
  iconType: string;
  title: string;
  description: string;
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]); // ✅ Define correct type

  useEffect(() => {
    fetch("/api/service")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.services);
      });
  }, []);

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">We offer services for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              iconType={service.iconType}
            />
          ))}
        </div>
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Have Queries? Let's Get In Touch</h3>
          <a href="/contact">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">Contact</button>
          </a>
        </div>
      </div>
    </section>
  );
}
