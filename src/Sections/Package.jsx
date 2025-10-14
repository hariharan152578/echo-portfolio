// import React from 'react';
// import { CheckCircle } from 'lucide-react'; // Using lucide-react for the checkmark icons

// const Package = () => {
//     // 1. Data array for all three plans, matching the image content
//     const pack = [
//         {
//             id: 1,
//             category: "Basic Plan",
//             content: "What You'll Get",
//             points: [
//                 "Manage 2 social platforms.",
//                 "5 Custom posts.",
//                 "Basic report & email support.",
//             ],
//             price: "2000 CHF/Monthly",
//             buttonText: "Choose",
//         },
//         {
//             id: 2,
//             category: "Standard Plan",
//             content: "What You'll Get",
//             points: [
//                 "Manage up to 4 platforms.",
//                 "10-15 Custom posts.",
//                 "Landing Page & Performance report.",
//             ],
//             price: "4000 CHF/Monthly",
//             buttonText: "Choose",
//         },
//         {
//             id: 3,
//             category: "Premium Plan",
//             content: "What You'll Get",
//             points: [
//                 "Full Social media + Ads.",
//                 "20+ Custom posts.",
//                 "Advanced page & priority reports.",
//             ],
//             price: "7500 CHF/Monthly",
//             buttonText: "Choose",
//         }
//     ];

//     return (
//         <div className=''> {/* Light blue background similar to the image */}
//             <div className='py-16 px-6 md:px-20'>
//                 {/* Header Section */}
//                 <div className='max-w-7xl mx-auto'>
//                     <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">PACKAGES</p>
//                     <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//                         Find The Packages That Fit<br />
//                         Your Needs
//                     </h2>
//                 </div>

//                 {/* Packages Grid Section */}
//                 <div className='max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8'>
//                     {pack.map((plan) => (
//                         <div
//                             key={plan.id}
//                             className='bg-white shadow-xl rounded-xl p-6 flex flex-col'
//                         >
//                             {/* Plan Header */}
//                             <h3 className='text-xl font-bold text-gray-900 mb-1'>{plan.category}</h3>
//                             <p className='text-sm text-gray-600 mb-6'>{plan.content}</p>

//                             {/* Plan Points */}
//                             <div className='flex-grow'>
//                                 {plan.points.map((point, index) => (
//                                     <div key={index} className='flex items-start mb-4'>
//                                         {/* Icon */}
//                                         <CheckCircle className='w-5 h-5 text-gray-600 flex-shrink-0 mt-1' />
//                                         {/* Point Text */}
//                                         <p className='ml-3 text-gray-700 leading-snug'>
//                                             {point}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Separator Line */}
//                             <hr className='my-6 border-gray-200' />

//                             {/* Price */}
//                             <p className='text-xl font-semibold text-green-600 mb-6'>
//                                 {plan.price}
//                             </p>
//                             <div className='flex justify-around'>
//                                 <button
//     className='bg-[#0d1b3f] hover:bg-[#1a305d] text-white font-semibold py-2 px-6
//                rounded-xl transition duration-200 w-[50%]
//                shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_0_0_2px_#000]'
//     onClick={() => console.log(`Chosen: ${plan.category}`)} // Example action
// >
//     {plan.buttonText}
// </button>
//                         </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Package;

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"; // Icon
import axios from "axios";

const Package = () => {
  // State to hold fetched data
  const [pack, setPack] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPack(res.data);
      } catch (error) {
        console.error("❌ Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="">
      <div className="py-16 px-6 md:px-20">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            PACKAGES
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
            Find The Packages That Fit
            <br />
            Your Needs
          </h2>
        </div>

        {/* Packages Grid Section */}
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pack.length > 0 ? (
            pack.map((plan) => (
              <div
                key={plan.id}
                className="bg-white shadow-xl rounded-xl p-6 flex flex-col"
              >
                {/* Plan Header */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {plan.category}
                </h3>
                <p className="text-sm text-gray-600 mb-6">{plan.content}</p>

                {/* Plan Points */}
                <div className="flex-grow">
                  {plan.points &&
                    plan.points.map((point, index) => (
                      <div key={index} className="flex items-start mb-4">
                        <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
                        <p className="ml-3 text-gray-700 leading-snug">
                          {point}
                        </p>
                      </div>
                    ))}
                </div>

                {/* Separator */}
                <hr className="my-6 border-gray-700" />

                {/* Price */}
                <p className="text-xl font-semibold text-green-600 mb-6">
                  {plan.price}
                </p>

                {/* Button */}
                <div className="flex justify-around">
                  <button
                    className="bg-[#0d1b3f] hover:bg-[#1a305d] text-white font-semibold py-2 px-6
                               rounded-xl transition duration-200 w-[50%]
                               shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_0_0_2px_#000]"
                    onClick={() => console.log(`Chosen: ${plan.category}`)}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">
              Loading packages...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Package;
