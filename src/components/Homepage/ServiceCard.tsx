'use client'

interface ServiceCardProps {
    title: string;
    description: string;
    iconType: string;
  }
  
  export default function ServiceCard({ title, description, iconType }: ServiceCardProps) {
    return (
      <div className="w-[288px] h-[424px] border border-gray-300 rounded-[12px] p-[32px] flex flex-col justify-between items-center shadow-lg">
        {/* Inner Content */}
        <div className="w-[224px] h-[294.4px] flex flex-col items-center gap-[20px]">
          <img src={iconType} alt={title} className="w-16 h-16" />
          <h3 className="text-xl font-bold text-center">{title}</h3>
          <p className="text-center text-gray-600">{description}</p>
        </div>
  
        {/* Book Now Button */}
        <a href="/services">
          <button className="w-32 h-12 border-2 border-blue-500 text-blue-500 bg-white rounded-full hover:bg-blue-500 hover:text-white transition duration-300">
            Book Now
          </button>
        </a>
      </div>
    );
  }
  