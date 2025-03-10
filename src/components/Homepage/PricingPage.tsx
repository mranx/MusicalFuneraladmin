'use client'

import { useEffect, useState } from "react";
import Link from "next/link";

type PricingPlan = {
  id: string;
  title: string;
  price: number;
  features: string[];
};

export default function Pricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPlans(data.plans);
      });
  }, []);

  return (
    <section id="pricing" className="w-full py-12 md:py-24 bg-[#4A77B5] dark:bg-[#3A67A5]">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Services Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Starting from</div>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-[#4A77B5] text-3xl font-medium">$</span>
                    <span className="text-[#4A77B5] text-4xl font-medium">{plan.price}</span>
                    <span className="text-[#4A77B5] text-lg">.00</span>
                  </div>
                </div>
                <Link href={`/services?plan=${encodeURIComponent(plan.title)}&price=${plan.price}`}>
                  <button className="w-full bg-[#4A77B5] text-white py-2 rounded-md">BOOK NOW</button>
                </Link>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">What's Included?</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="text-gray-600 dark:text-gray-300">✅ {feature}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
