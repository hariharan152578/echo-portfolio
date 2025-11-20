// // import React, { useState, useEffect, useRef } from 'react'
// // import axios from 'axios'
// // import CircularGallery from '../components/CircularGallery'
// // import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// // const Testimonials = () => {
// //   const [testimonials, setTestimonials] = useState([]);
// //   const galleryRef = useRef(null);

// //   const API_URL = "http://localhost:5000";

// //   useEffect(() => {
// //     const fetchTestimonials = async () => {
// //       try {
// //         const response = await axios.get(`${API_URL}/api/testimonials`);
// //         setTestimonials(response.data);
// //       } catch (error) {
// //         console.error('Error fetching testimonials:', error);
// //       }
// //     };
// //     fetchTestimonials();
// //   }, []);

// //   // --- KEYBOARD NAVIGATION ---
// //   useEffect(() => {
// //     const handleKeyDown = (event) => {
// //       if (event.key === 'ArrowLeft') {
// //         galleryRef.current?.moveLeft();
// //       } else if (event.key === 'ArrowRight') {
// //         galleryRef.current?.moveRight();
// //       }
// //     };

// //     window.addEventListener('keydown', handleKeyDown);

// //     // Cleanup the event listener when the component unmounts
// //     return () => {
// //       window.removeEventListener('keydown', handleKeyDown);
// //     };
// //   }, []); // Empty dependency array ensures this runs only once on mount

// //   const renderStars = (rating) => {
// //     return (
// //       <div className="flex gap-1 mb-2">
// //         {[...Array(5)].map((_, index) => (
// //           <Star
// //             key={index}
// //             size={16}
// //             className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
// //           />
// //         ))}
// //       </div>
// //     );
// //   };

// //   const testimonialItems = testimonials.map(item => ({
// //     image: item.avatar_url ? `${API_URL}${item.avatar_url}` : `https://picsum.photos/seed/${item.id}/800/600`,
// //     text: item.customer_name,
// //     customer_name: item.customer_name,
// //     customer_designation: item.customer_designation,
// //     testimonial_text: item.testimonial_text,
// //     rating: item.rating, 
// //     starElement: renderStars(item.rating || 5) 
// //   }));

// //   const handleMoveLeft = () => {
// //     galleryRef.current?.moveLeft();
// //   };

// //   const handleMoveRight = () => {
// //     galleryRef.current?.moveRight();
// //   };

// //   // --- CSS FOR ANIMATED BACKGROUND ---
// //   const animationStyles = `
// //     @keyframes blob {
// //       0% { transform: translate(0px, 0px) scale(1); }
// //       33% { transform: translate(30px, -50px) scale(1.1); }
// //       66% { transform: translate(-20px, 20px) scale(0.9); }
// //       100% { transform: translate(0px, 0px) scale(1); }
// //     }
// //     .animate-blob {
// //       animation: blob 7s infinite;
// //     }
// //     .animation-delay-2000 {
// //       animation-delay: 2s;
// //     }
// //     .animation-delay-4000 {
// //       animation-delay: 4s;
// //     }
// //   `;

// //   return (
// //     <div className='relative w-full overflow-hidden bg-gray-50 py-5 md:py-0'>
// //       {/* Inject Styles */}
// //       <style>{animationStyles}</style>

// //       {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
// //       {/* <div className="absolute inset-0 w-full h-full">

// //         <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        
        
// //         <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
// //         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
// //         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
// //       </div> */}

// //       {/* --- MAIN CONTENT (Relative + Z-Index to sit on top) --- */}
// //       <div className="relative z-10">
        
// //         {/* Header Section */}
// //         <div className="flex justify-between items-end  px-6 md:px-20">
// //           <div>
// //             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
// //             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
// //               See What Our Customers <br /> 
// //               Say About Us
// //             </h2>
// //           </div>
          
// //           {/* Navigation Buttons */}
// //           <div className="flex space-x-3">
// //             <button
// //               onClick={handleMoveLeft}
// //               className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm"
// //               aria-label="Previous Testimonial"
// //             >
// //               <ChevronLeft size={30} />
// //             </button>
// //             <button
// //               onClick={handleMoveRight}
// //               className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm"
// //               aria-label="Next Testimonial"
// //             >
// //               <ChevronRight size={30} />
// //             </button>
// //           </div>
// //         </div>

// //         {/* Circular Gallery */}
// //         <div className="w-full h-[300px] md:h-[700px] md:-mt-[50px] relative">
// //           {testimonials.length > 0 ? (
// //             <CircularGallery 
// //               ref={galleryRef}
// //               items={testimonialItems} 
// //               bend={0} 
// //               textColor="#ffffff" 
// //               borderRadius={0.05} 
// //               scrollEase={0.02}
// //             />
// //           ) : (
// //             <div className="flex items-center justify-center h-full">
// //               <p className="text-gray-600">Loading testimonials...</p>
// //             </div>
// //           )}
// //         </div>
        
// //       </div>
// //     </div>
// //   );
// // };

// // export default Testimonials;

// import React, { useState, useEffect, useRef } from 'react'
// import axios from 'axios'
// import CircularGallery from '../components/CircularGallery'
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
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

//   // Keyboard Navigation
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'ArrowLeft') {
//         handleMoveLeft();
//       } else if (event.key === 'ArrowRight') {
//         handleMoveRight();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

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

//   const testimonialItems = testimonials.map(item => ({
//     image: item.avatar_url ? `${API_URL}${item.avatar_url}` : `https://picsum.photos/seed/${item.id}/800/600`,
//     text: item.customer_name,
//     customer_name: item.customer_name,
//     customer_designation: item.customer_designation,
//     testimonial_text: item.testimonial_text,
//     rating: item.rating, 
//     starElement: renderStars(item.rating || 5) 
//   }));

//   const handleMoveLeft = () => {
//     setCurrentIndex(prev => {
//       const newIndex = (prev - 1 + testimonialItems.length) % testimonialItems.length;
//       // If CircularGallery accepts a currentIndex prop, pass it here
//       return newIndex;
//     });
    
//     // Alternative: Call ref method if available
//     if (galleryRef.current?.moveLeft) {
//       galleryRef.current.moveLeft();
//     }
//   };

//   const handleMoveRight = () => {
//     setCurrentIndex(prev => {
//       const newIndex = (prev + 1) % testimonialItems.length;
//       // If CircularGallery accepts a currentIndex prop, pass it here
//       return newIndex;
//     });
    
//     // Alternative: Call ref method if available
//     if (galleryRef.current?.moveRight) {
//       galleryRef.current.moveRight();
//     }
//   };

//   // Add debug to check if ref methods are available
//   useEffect(() => {
//     if (galleryRef.current) {
//       console.log('Gallery ref methods:', Object.keys(galleryRef.current));
//     }
//   }, [galleryRef.current]);

//   const animationStyles = `
//     @keyframes blob {
//       0% { transform: translate(0px, 0px) scale(1); }
//       33% { transform: translate(30px, -50px) scale(1.1); }
//       66% { transform: translate(-20px, 20px) scale(0.9); }
//       100% { transform: translate(0px, 0px) scale(1); }
//     }
//     .animate-blob {
//       animation: blob 7s infinite;
//     }
//     .animation-delay-2000 {
//       animation-delay: 2s;
//     }
//     .animation-delay-4000 {
//       animation-delay: 4s;
//     }
//   `;

//   return (
//     <div className='relative w-full overflow-hidden bg-gray-50 py-5 md:py-0'>
//       <style>{animationStyles}</style>

//       <div className="relative z-10">
//         {/* Header Section */}
//         <div className="flex justify-between items-end px-6 md:px-20">
//           <div>
//             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//               See What Our Customers <br /> 
//               Say About Us
//             </h2>
//           </div>
          
//           {/* Navigation Buttons */}
//           <div className="flex space-x-3">
//             <button
//               onClick={handleMoveLeft}
//               className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm"
//               aria-label="Previous Testimonial"
//             >
//               <ChevronLeft size={30} />
//             </button>
//             <button
//               onClick={handleMoveRight}
//               className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm"
//               aria-label="Next Testimonial"
//             >
//               <ChevronRight size={30} />
//             </button>
//           </div>
//         </div>

//         {/* Circular Gallery */}
//         <div className="w-full h-[300px] md:h-[700px] md:-mt-[50px] relative">
//           {testimonials.length > 0 ? (
//             <CircularGallery 
//               ref={galleryRef}
//               items={testimonialItems} 
//               bend={0} 
//               textColor="#ffffff" 
//               borderRadius={0.05} 
//               scrollEase={0.02}
//               // Add if CircularGallery supports controlled currentIndex
//               // currentIndex={currentIndex}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-gray-600">Loading testimonials...</p>
//             </div>
//           )}
//         </div>
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 

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
      <style>{animationStyles}</style>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10">
        
        {/* Header Section */}
        {/* FIX: Added 'relative z-20' to ensure buttons sit ON TOP of the gallery which has negative margin */}
        <div className="flex justify-between items-end px-6 md:px-20 md:mt-10 relative z-20">
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
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm cursor-pointer active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              onClick={handleMoveRight}
              className="p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white transition-colors text-gray-700 shadow-sm cursor-pointer active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>

        {/* Circular Gallery */}
        <div className="w-full h-[300px] md:h-[700px]  md:-mt-[50px] relative z-10">
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