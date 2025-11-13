// import React from 'react'
// import ChatIcon from '../assets/icon/chat-left.svg'
// import fullheart from '../assets/icon/heart-fill.svg'
// import text from '../assets/icon/textarea.svg'

// const Servies = () => {
//   const services = [
//     {
//       id: 1,
//       title: "Grow Your Business",
//       icon: ChatIcon,
//       content: "We help you identify the best ways to improve your business",
//       link: "#"
//     },
//     {
//       id: 2,
//       title: "Improve Brand Loyalty",
//       icon: fullheart,
//       content: "We help you strengthen customer trust and loyalty",
//       link: "#"
//     },
//     {
//       id: 3,
//       title: "Optimize Business Model",
//       icon: text,
//       content: "We guide you in improving your business strategies",
//       link: "#"
//     }
//   ];

//   return (
//     <div className="bg-white py-16 px-6 md:px-20">
//       {/* Heading */}
//       <div className="text-left mb-10">
//         <p className="text-gray-700 font-semibold text-sm md:text-base">WHAT WE DO</p>
//         <div className="w-full md:w-[40%]">
//           <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mt-2">
//             We Provide the Perfect Solution for Your Business Growth
//           </h2>
//         </div>
//       </div>

//       {/* Service Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {services.map((service) => (
//           <div
//             key={service.id}
//             className="group rounded-4xl p-6 hover:shadow-lg transition duration-500 flex flex-col items-start border border-gray-100 "
//           >
//             <div className="bg-[#E0E7FF] p-8 rounded-2xl mb-4 transition">
//               <img src={service.icon} alt="grow" className="w-5 h-5 font-bold" />
//             </div>

//             {/* Title */}
//             <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
//               {service.title}
//             </h3>

//             {/* Content */}
//             <p className="text-gray-600 mb-4 text-sm md:text-base">{service.content}</p>

//             {/* Link */}
//             {service.link && (
//               <a
//                 href={service.link}
//                 className="text-gray-700 bg-transparent border border-transparent 
//                   px-4 py-2 rounded-2xl text-sm md:text-lg 
//                   transition duration-300
//                   group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-500"
//               >
//                 Learn More →
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Servies;

import React from 'react'
import ChatIcon from '../assets/icon/chat-left.svg'
import fullheart from '../assets/icon/heart-fill.svg'
import text from '../assets/icon/textarea.svg'
import Squares from '../components/Squares'; // <-- 1. IMPORTED SQUARES

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
    // 2. PARENT CONTAINER: Made relative, added fallback BG, and removed old padding
    <div className="relative overflow-hidden bg-white">
      
      {/* 3. SQUARES BACKGROUND: Added and positioned absolutely to fill container */}
      <div className="absolute inset-0 w-full h-full">
        <Squares
          speed={0.5}
          squareSize={100}
          direction='diagonal'
        //   borderColor='rgba(255, 255, 255, 0.1)' // Faint white borders
        //   hoverFillColor='rgba(255, 255, 0.05)' // Subtle hover
        />
      </div>

      {/* 4. CONTENT WRAPPER: Made relative to stack on top, added padding back */}
      <div className="relative py-16 px-6 md:px-20">
        
        {/* Heading */}
        <div className="text-left mb-10">
          {/* 5. TEXT COLORS: Updated for dark background */}
          <p className="text-gray-700 font-semibold text-sm md:text-base">WHAT WE DO</p>
          <div className="w-full md:w-[40%]">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mt-2">
              We Provide the Perfect Solution for Your Business Growth
            </h2>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              // 6. CARD STYLING: Changed to semi-transparent "glass" effect
              className="group rounded-4xl  shadow-2xl p-6 hover:shadow-lg transition duration-500 flex flex-col items-start 
                         bg-white backdrop-blur-sm border border-white/10"
            >
              {/* 7. ICON BACKGROUND: Updated to match new theme */}
              <div className="bg-indigo-500/20 p-8 rounded-2xl mb-4 transition">
                <img src={service.icon} alt="grow" className="w-5 h-5" />
              </div>

              {/* Title: Text color updated */}
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-black">
                {service.title}
              </h3>

              {/* Content: Text color updated */}
              <p className="text-gray-600 mb-4 text-sm md:text-base">{service.content}</p>

              {/* Link: Text color updated */}
              {service.link && (
                <a
                  href={service.link}
                  className="text-gray-500 bg-transparent border border-transparent 
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
    </div>
  );
};

export default Servies;