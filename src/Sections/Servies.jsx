import React from 'react';
import ChatIcon from '../assets/icon/chat-left.svg';
import fullheart from '../assets/icon/heart-fill.svg';
import text from '../assets/icon/textarea.svg';

const Servies = () => {
  const services = [
    {
      id: 1,
      title: "Grow Your Business",
      icon: ChatIcon,
      content: "We help you identify the best ways to improve your business",
      link: "#"
    },
    {
      id: 2,
      title: "Improve Brand Loyalty",
      icon: fullheart,
      content: "We help you strengthen customer trust and loyalty",
      link: "#"
    },
    {
      id: 3,
      title: "Optimize Business Model",
      icon: text,
      content: "We guide you in improving your business strategies",
      link: "#"
    }
  ];

  return (
    <div className="bg-white py-16 px-6 md:px-20">
      {/* Heading */}
      <div className="text-left mb-10">
        <p className="text-gray-700 font-semibold text-sm md:text-base">WHAT WE DO</p>
        <div className="w-full md:w-[40%]">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-2">
            We Provide the Perfect Solution for Your Business Growth
          </h2>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group rounded-4xl p-6 hover:shadow-lg transition duration-500 flex flex-col items-start border border-gray-100 "
          >
            <div className="bg-[#E0E7FF] p-8 rounded-2xl mb-4 transition">
              <img src={service.icon} alt="grow" className="w-5 h-5 font-bold" />
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
              {service.title}
            </h3>

            {/* Content */}
            <p className="text-gray-600 mb-4 text-sm md:text-base">{service.content}</p>

            {/* Link */}
            {service.link && (
              <a
                href={service.link}
                className="text-gray-700 bg-transparent border border-transparent 
                px-4 py-2 rounded-2xl text-sm md:text-lg 
                transition duration-300
                group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-500"
              >
                Learn More →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servies;
