import React, { useEffect, useState } from "react";
import Image from "next/image";

const WhoAreWe = () => {
  const [content, setContent] = useState(null);

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
  );
};

export default WhoAreWe;
