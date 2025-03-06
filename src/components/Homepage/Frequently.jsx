"use client";

import React, { useEffect, useState } from "react";

const Frequently = () => {
  const [faqs, setFaqs] = useState([]);
  const [openFaqs, setOpenFaqs] = useState([0]);

  // Fetch FAQ Data from API
  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch("/api/faqs");
        const data = await response.json();
        if (data.success) {
          setFaqs(data.faqs);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }
    fetchFAQs();
  }, []);

  // Toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaqs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.id} className="border dark:border-gray-700 rounded-lg">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-4 text-left text-gray-900 dark:text-white"
              >
                <span className="font-medium">{faq.question}</span>
                <span>{openFaqs.includes(index) ? "−" : "+"}</span>
              </button>
              {openFaqs.includes(index) && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frequently;
