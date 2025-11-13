// import React from 'react'
// import greens from "../assets/img/Greens.png"
// import travel from "../assets/img/Travel.png"
// import MRM from "../assets/img/MRMPG.png"
// import travelling from "../assets/img/Travelling.png"

// const Projects = () => {
//   return (
//     <div className='bg-[#fff] mt-16 py-16 px-6 md:px-20'>
      
//       {/* Header Section */}
//       <div className="text-left mb-12">
//         <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
//           Our Portfolio
//         </p>
//         <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//           We provide the Perfect Solution <br /> 
//           to your business growth
//         </h2>
//       </div>

//       {/* Project Grid */}
//       <div className="grid md:grid-cols-2 gap-16">
        
//         {/* Left Column */}
//         <div className="flex flex-col gap-14">
//           {/* Greens Technology */}
//           <div>
//             <img src={greens} alt="Greens Technology" className="w-full " />
//             <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
//               Greens Technology
//             </h3>
//             <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
//               This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.
//             </p>
//           </div>

//           {/* Travel Suggestion App */}
//           <div>
//             <img src={travel} alt="Travel Suggestion App" className="w-full " />
//             <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
//               Travel Suggestion App
//             </h3>
//             <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
//               This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.
//             </p>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="flex flex-col justify-between gap-14">
//           {/* MRM PG Accommodation */}
//           <div>
//             <img src={MRM} alt="MRM PG Accommodation" className="w-full " />
//             <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
//               MRM PG Accommodation
//             </h3>
//             <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
//               This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.
//             </p>
//           </div>

//           {/* Travelling Website */}
//           <div>
//             <img src={travelling} alt="Travelling Website" className="w-full " />
//             <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
//               Travelling Website
//             </h3>
//             <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
//               This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Projects;



// import React from 'react'
// import greens from "../assets/img/Greens.png"
// import travel from "../assets/img/Travel.png"
// import MRM from "../assets/img/MRMPG.png"
// import travelling from "../assets/img/Travelling.png"

// // --- Data Array ---
// // It's cleaner to store project data in an array and map over it.
// const projectsData = [
//   {
//     title: "Greens Technology",
//     description: "This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.",
//     image: greens,
//     alt: "Greens Technology"
//   },
//   {
//     title: "MRM PG Accommodation",
//     description: "This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.",
//     image: MRM,
//     alt: "MRM PG Accommodation"
//   },
//   {
//     title: "Travel Suggestion App",
//     description: "This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.",
//     image: travel,
//     alt: "Travel Suggestion App"
//   },
//   {
//     title: "Travelling Website",
//     description: "This is a website for a client who want to achieve their goals and meet their users' needs while also increasing their reach. Across all platforms. This is a website rebrand.",
//     image: travelling,
//     alt: "Travelling Website"
//   }
// ];

// // --- Enhanced Component ---
// const Projects = () => {
//   return (
//     // Use a light, modern background color
//     <div className='bg-slate-50 py-24'>
      
//       {/* Centered Content Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* Header Section */}
//         <div className="text-left mb-16">
//           <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
//             Our Portfolio
//           </p>
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 leading-snug">
//             We provide the Perfect Solution <br /> 
//             to your business growth
//           </h2>
//         </div>

//         {/* Project Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
//           {/* Map over the projectsData array */}
//           {projectsData.map((project, index) => (
//             <div 
//               key={index} 
//               className="bg-white rounded-lg shadow-lg overflow-hidden 
//                          transform transition-all duration-300 
//                          hover:shadow-2xl hover:-translate-y-2"
//             >
//               {/* Image with uniform aspect ratio */}
//               <img 
//                 src={project.image} 
//                 alt={project.alt} 
//                 className="w-full aspect-video object-fill" 
//               />
              
//               {/* Card Content */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {project.title}
//                 </h3>
//                 <p className="text-gray-600 mt-3 text-base leading-relaxed">
//                   {project.description}
//                 </p>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Projects;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Adjust port if your backend runs on a different one
  const API_URL = "http://localhost:5000"; 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        setProjectsData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-24">Loading...</div>;

  return (
    <div className='bg-slate-50 py-24'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-left mb-16">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            Our Portfolio
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 leading-snug">
            We provide the Perfect Solution <br /> 
            to your business growth
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden 
                         transform transition-all duration-300 
                         hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              {/* Image Section */}
              {project.image_url ? (
                <img 
                  src={`${API_URL}${project.image_url}`} 
                  alt={project.alt_text || project.title} 
                  className="w-full aspect-video object-fill" 
                />
              ) : (
                <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
              )}
              
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-3 text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* --- LIVE URL BUTTON --- */}
                {/* Only render if live_url exists in the database */}
                {project.live_url && (
                  <div className="mt-auto pt-4">
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Visit Live Site 
                      {/* Small Arrow Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;