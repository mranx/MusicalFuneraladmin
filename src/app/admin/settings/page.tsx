'use client';

import { useEffect, useState } from 'react';

export default function AdminContentForm() {
  const [formData, setFormData] = useState({ heading: '', paragraph: '' });
  const [contentId, setContentId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/dynamic-content');
        const data = await response.json();
        if (data.success && data.contents.length > 0) {
          setFormData({ heading: data.contents[0].heading, paragraph: data.contents[0].paragraph });
          setContentId(data.contents[0].id);
        }
      } catch (error) {
        console.error("Error fetching content", error);
      }
    }
    fetchContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await fetch('/api/dynamic-content', {
        method: contentId ? 'POST' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Content updated successfully');
        setContentId(data.content.id);
      } else {
        setMessage('Failed to update content');
      }
    } catch (error) {
      setMessage('Error updating content');
    }
  };

  const handleDelete = async () => {
    if (!contentId) return;
    try {
      const response = await fetch('/api/dynamic-content', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: contentId }),
      });
      const data = await response.json();
      if (data.success) {
        setFormData({ heading: '', paragraph: '' });
        setContentId(null);
        setMessage('Content deleted successfully');
      } else {
        setMessage('Failed to delete content');
      }
    } catch (error) {
      setMessage('Error deleting content');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Manage Hero Section Content</h2>
      {message && <p className="text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="heading" placeholder="Heading" value={formData.heading} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="paragraph" placeholder="Paragraph" value={formData.paragraph} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save Changes</button>
      </form>
      {contentId && (
        <button onClick={handleDelete} className="w-full bg-red-500 text-white p-2 mt-4 rounded">Delete Content</button>
      )}
    </div>
  );
}
