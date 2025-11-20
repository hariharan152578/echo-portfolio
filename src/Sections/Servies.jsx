
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import Squares from '../components/Squares'; // Uncomment if you want the background

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // URL of your backend
//   const API_URL = "http://localhost:5000";

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/services`);
//         setServices(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   return (
//     // PARENT CONTAINER
//     <div className="relative overflow-hidden bg-white">
      
//       {/* Optional: Background Squares */}
//       {/* <div className="absolute inset-0 w-full h-full">
//         <Squares speed={0.5} squareSize={100} direction='diagonal' />
//       </div> */}

//       {/* CONTENT WRAPPER */}
//       <div className="relative py-16 px-6 md:px-20">
        
//         {/* Heading */}
//         <div className="text-left mb-10">
//           <p className="text-gray-700 font-semibold text-sm md:text-base">WHAT WE DO</p>
//           <div className="w-full md:w-[40%]">
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mt-2">
//               We Provide the Perfect Solution for Your Business Growth
//             </h2>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading services...</p>
//         ) : (
//           /* Service Cards Grid */
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {services.map((service) => (
//               <div
//                 key={service.id}
//                 // CARD STYLING
//                 className="group rounded-4xl shadow-2xl p-6 hover:shadow-lg transition duration-500 flex flex-col items-start 
//                            bg-white backdrop-blur-sm border border-white/10"
//               >
//                 {/* ICON BACKGROUND */}
//                 <div className="bg-indigo-500/20 p-8 rounded-2xl mb-4 transition">
//                   {service.icon_url ? (
//                     <img
//                       // 🔹 Concatenate Backend URL + Image Path
//                       src={`${API_URL}${service.icon_url}`}
//                       alt={service.title}
//                       className="w-5 h-5 object-contain"
//                     />
//                   ) : (
//                     // Fallback if no icon is uploaded
//                     <span className="text-indigo-600 text-xl">★</span>
//                   )}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
//                   {service.title}
//                 </h3>

//                 {/* Content */}
//                 <p className="text-gray-600 mb-4 text-sm md:text-base">
//                   {service.content}
//                 </p>

//                 {/* Link / Navigation Button */}
//                 {/* Only show if a link exists in the DB */}
//                 {service.link_url && (
//                   <a
//                     href={service.link_url}
//                     // EXACT BUTTON STYLING FROM YOUR STATIC CODE
//                     className="text-gray-500 bg-transparent border border-transparent 
//                                px-4 py-2 rounded-2xl text-sm md:text-lg 
//                                transition duration-300
//                                group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-500"
//                   >
//                     Learn More →
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Services;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, ArrowRight } from "lucide-react";

// Service Detail Modal Component
const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;
            const handleGetStartedClick = () => {
              const packagesSection = document.getElementById('packages');
              if (packagesSection) {
                packagesSection.scrollIntoView({ behavior: 'smooth' });
              }
            };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-500/20 p-3 rounded-xl">
              {service.icon_url ? (
                <img
                  src={`http://localhost:5000${service.icon_url}`}
                  alt={service.title}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-indigo-600 text-lg">★</span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{service.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition duration-200"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Full Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Overview</h3>
            <p className="text-gray-600 leading-relaxed">
              {service.full_description || service.Details || "No detailed description available."}
            </p>
          </div>

          {/* Features/Highlights */}
          {service.features && service.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight size={16} className="text-indigo-600 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Information */}
          {service.additional_info && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h3>
              <p className="text-gray-600 leading-relaxed">{service.additional_info}</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gray-50 rounded-xl p-4 mt-6">
            <p className="text-gray-700 mb-3">Interested in this service?</p>
            <div className="flex space-x-3">
              <button onClick={handleGetStartedClick} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200">
                Get Started
              </button>
              {/* <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:bg-gray-50 transition duration-200">
                Contact Us
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // URL of your backend
  const API_URL = "http://localhost:5000";

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/services`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle Learn More click
  const handleLearnMore = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    // PARENT CONTAINER
    <div className="relative overflow-hidden bg-white">
      
      {/* Optional: Background Squares */}
      {/* <div className="absolute inset-0 w-full h-full">
        <Squares speed={0.5} squareSize={100} direction='diagonal' />
      </div> */}

      {/* Service Detail Modal */}
      <ServiceDetailModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        service={selectedService} 
      />

      {/* CONTENT WRAPPER */}
      <div className="relative py-16 px-6 md:px-20">
        
        {/* Heading */}
        <div className="text-left mb-10">
          <p className="text-gray-700 font-semibold text-sm md:text-base">WHAT WE DO</p>
          <div className="w-full md:w-[40%]">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mt-2">
              We Provide the Perfect Solution for Your Business Growth
            </h2>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : (
          /* Service Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                // CARD STYLING
                className="group rounded-4xl shadow-2xl p-6 hover:shadow-lg transition duration-500 flex flex-col items-start 
                           bg-white backdrop-blur-sm border border-white/10 hover:transform hover:-translate-y-2"
              >
                {/* ICON BACKGROUND */}
                <div className="bg-indigo-500/20 p-8 rounded-2xl mb-4 transition group-hover:bg-indigo-500/30">
                  {service.icon_url ? (
                    <img
                      // 🔹 Concatenate Backend URL + Image Path
                      src={`${API_URL}${service.icon_url}`}
                      alt={service.title}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    // Fallback if no icon is uploaded
                    <span className="text-indigo-600 text-xl">★</span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                  {service.title}
                </h3>

                {/* Content Preview */}
                <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-3">
                  {service.content}
                </p>

                {/* Link / Navigation Button */}
                <button
                  onClick={() => handleLearnMore(service)}
                  // EXACT BUTTON STYLING FROM YOUR STATIC CODE
                  className="text-gray-500 bg-transparent border border-transparent 
                             px-4 py-2 rounded-2xl text-sm md:text-lg 
                             transition duration-300
                             group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-500
                             hover:transform hover:scale-105"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;