'use client'
import { useState, useEffect } from "react";

interface FAQ {
  id?: string;
  question: string;
  answer: string;
}

const FaqForm = () => {
  const [formData, setFormData] = useState<FAQ>({ question: "", answer: "" });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const response = await fetch("/api/faqs");
        const data: { success: boolean; faqs: FAQ[] } = await response.json();
        if (data.success) {
          setFaqs(data.faqs);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }
    fetchFAQs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: { success: boolean; faq: FAQ } = await response.json();
      if (data.success) {
        setMessage("FAQ added successfully!");
        setFaqs([...faqs, data.faq]);
        setFormData({ question: "", answer: "" });
      } else {
        setMessage("Error adding FAQ.");
      }
    } catch (error) {
      console.error("Error submitting FAQ:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage FAQs</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={formData.question}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="answer"
          placeholder="Answer"
          value={formData.answer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Add FAQ
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Existing FAQs</h3>
        <ul className="space-y-2">
          {faqs.map((faq) => (
            <li key={faq.id} className="p-3 border rounded bg-gray-100">
              <p className="font-semibold">{faq.question}</p>
              <p className="text-gray-600">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FaqForm;
