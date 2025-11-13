// // import React, { useState, useEffect } from 'react'
// // import axios from 'axios'
// // import CircularGallery from '../components/CircularGallery' // Import the OGL component

// // const Testimonials = () => {
// //   const [testimonials, setTestimonials] = useState([]);

// //   useEffect(() => {
// //     const fetchTestimonials = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/testimonials');
// //         setTestimonials(response.data);
// //       } catch (error) {
// //         console.error('Error fetching testimonials:', error);
// //       }
// //     };
// //     fetchTestimonials();
// //   }, []);

// //   // Format testimonials for CircularGallery
// //   const testimonialItems = testimonials.map(item => ({
// //     image: item.avatar_url ? `http://localhost:5000${item.avatar_url}` : `https://picsum.photos/seed/${item.id}/800/600`,
// //     text: item.customer_name,
// //     customer_name: item.customer_name,
// //     customer_designation: item.customer_designation,
// //     testimonial_text: item.testimonial_text
// //   }));

// //   return (
// //     <div className='bg-white py-16 relative'>
// //       <div className="text-left mb-12 px-4 md:px-10">
// //         <div>
// //           <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
// //           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
// //             See What Our Customer <br /> 
// //             Say About Us
// //           </h2>
// //         </div>
// //       </div>

// //       {/* Circular Gallery for Testimonials */}
// //       <div className="w-full h-96 md:h-128 relative">
// //         {testimonials.length > 0 ? (
// //           <CircularGallery 
// //             items={testimonialItems} 
// //             bend={3} 
// //             textColor="#ffffff" 
// //             borderRadius={0.05} 
// //             scrollEase={0.02}
// //           />
// //         ) : (
// //           <div className="flex items-center justify-center h-full">
// //             <p className="text-gray-600">Loading testimonials...</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Testimonials;

// import React, { useState, useEffect, useRef } from 'react' // 1. Import useRef
// import axios from 'axios'
// import CircularGallery from '../components/CircularGallery'
// import { ChevronLeft, ChevronRight } from 'lucide-react' // 2. Added icons

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const galleryRef = useRef(null); // 3. Create a ref for the gallery

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/testimonials');
//         setTestimonials(response.data);
//       } catch (error) {
//         console.error('Error fetching testimonials:', error);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   const testimonialItems = testimonials.map(item => ({
//     image: item.avatar_url ? `http://localhost:5000${item.avatar_url}` : `https://picsum.photos/seed/${item.id}/800/600`,
//     text: item.customer_name,
//     customer_name: item.customer_name,
//     customer_designation: item.customer_designation,
//     testimonial_text: item.testimonial_text
//   }));

//   // 4. Handler functions for the buttons
//   const handleMoveLeft = () => {
//     galleryRef.current?.moveLeft();
//   };

//   const handleMoveRight = () => {
//     galleryRef.current?.moveRight();
//   };

//   return (
//     <div className='bg-white py-16 relative'>
//       {/* 5. Updated header to include buttons */}
//       <div className="flex justify-between items-end mb-12 px-6 md:px-20">
//         <div>
//           <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//             See What Our Customer <br /> 
//             Say About Us
//           </h2>
//         </div>
//         {/* 6. Navigation Buttons */}
//         <div className="flex space-x-3">
//           <button
//             onClick={handleMoveLeft}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
//             aria-label="Previous Testimonial"
//           >
//             <ChevronLeft size={40} />
//           </button>
//           <button
//             onClick={handleMoveRight}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
//             aria-label="Next Testimonial"
//           >
//             <ChevronRight size={40} />
//           </button>
//         </div>
//       </div>

//       {/* Circular Gallery for Testimonials */}
//       <div className="w-full h-[600px] relative">
//         {testimonials.length > 0 ? (
//           <CircularGallery 
//             ref={galleryRef} // 7. Pass the ref to the component
//             items={testimonialItems} 
//             bend={0} 
//             textColor="#ffffff" 
//             borderRadius={0.05} 
//             scrollEase={0.02}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-600">Loading testimonials...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

// import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
// import CircularGallery from '../components/CircularGallery'
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react' // 1. Import Star

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const galleryRef = useRef(null);

//   const API_URL = "http://localhost:5000";

//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/testimonials`);
//         setTestimonials(response.data);
//       } catch (error) {
//         console.error('Error fetching testimonials:', error);
//       }
//     };
//     fetchTestimonials();
//   }, []);

//   // 2. Helper function to render stars based on a number (1-5)
//   const renderStars = (rating) => {
//     return (
//       <div className="flex gap-1 mb-2">
//         {[...Array(5)].map((_, index) => (
//           <Star
//             key={index}
//             size={16}
//             className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
//           />
//         ))}
//       </div>
//     );
//   };

//   // 3. Map the data and include the rendered stars in the object
//   const testimonialItems = testimonials.map(item => ({
//     image: item.avatar_url ? `${API_URL}${item.avatar_url}` : `https://picsum.photos/seed/${item.id}/800/600`,
//     text: item.customer_name,
//     customer_name: item.customer_name,
//     customer_designation: item.customer_designation,
//     testimonial_text: item.testimonial_text,
//     rating: item.rating, // Pass raw rating number
//     starElement: renderStars(item.rating || 5) // Pass pre-rendered JSX if CircularGallery supports it
//   }));

//   const handleMoveLeft = () => {
//     galleryRef.current?.moveLeft();
//   };

//   const handleMoveRight = () => {
//     galleryRef.current?.moveRight();
//   };

//   return (
//     <div className='bg-white py-16 relative'>
//       <div className="flex justify-between items-end mb-12 px-6 md:px-20">
//         <div>
//           <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//             See What Our Customer <br /> 
//             Say About Us
//           </h2>
//         </div>
//         <div className="flex space-x-3">
//           <button
//             onClick={handleMoveLeft}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
//             aria-label="Previous Testimonial"
//           >
//             <ChevronLeft size={40} />
//           </button>
//           <button
//             onClick={handleMoveRight}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
//             aria-label="Next Testimonial"
//           >
//             <ChevronRight size={40} />
//           </button>
//         </div>
//       </div>

//       <div className="w-full h-[600px] relative">
//         {testimonials.length > 0 ? (
//           <CircularGallery 
//             ref={galleryRef}
//             items={testimonialItems} 
//             bend={0} 
//             textColor="#ffffff" 
//             borderRadius={0.05} 
//             scrollEase={0.02}
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-600">Loading testimonials...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import CircularGallery from '../components/CircularGallery'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const galleryRef = useRef(null);

  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  // --- KEYBOARD NAVIGATION ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        galleryRef.current?.moveLeft();
      } else if (event.key === 'ArrowRight') {
        galleryRef.current?.moveRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const testimonialItems = testimonials.map(item => ({
    image: item.avatar_url ? `${API_URL}${item.avatar_url}` : `https://picsum.photos/seed/${item.id}/800/600`,
    text: item.customer_name,
    customer_name: item.customer_name,
    customer_designation: item.customer_designation,
    testimonial_text: item.testimonial_text,
    rating: item.rating, 
    starElement: renderStars(item.rating || 5) 
  }));

  const handleMoveLeft = () => {
    galleryRef.current?.moveLeft();
  };

  const handleMoveRight = () => {
    galleryRef.current?.moveRight();
  };

  // --- CSS FOR ANIMATED BACKGROUND ---
  const animationStyles = `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `;

  return (
    <div className='relative w-full overflow-hidden bg-gray-50 py-5 md:py-0'>
      {/* Inject Styles */}
      <style>{animationStyles}</style>

      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 w-full h-full">
        {/* Blob 1: Purple (Top Left) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        
        {/* Blob 2: Yellow (Top Right) */}
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        {/* Blob 3: Pink (Bottom Middle) */}
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Optional: Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* --- MAIN CONTENT (Relative + Z-Index to sit on top) --- */}
      <div className="relative z-10">
        
        {/* Header Section */}
        <div className="flex justify-between items-end  px-6 md:px-20">
          <div>
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
              See What Our Customers <br /> 
              Say About Us
            </h2>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleMoveLeft}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={handleMoveRight}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>

        {/* Circular Gallery */}
        <div className="w-full h-[300px] md:h-[700px] md:-mt-[50px] relative">
          {testimonials.length > 0 ? (
            <CircularGallery 
              ref={galleryRef}
              items={testimonialItems} 
              bend={0} 
              textColor="#ffffff" 
              borderRadius={0.05} 
              scrollEase={0.02}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Testimonials;