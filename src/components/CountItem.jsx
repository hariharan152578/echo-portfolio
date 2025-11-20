// // import React, { useState, useEffect, useRef } from 'react';

// // // Easing function (ease-out cubic)
// // // 't' is the progress from 0 to 1
// // const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// // const CountItem = ({ limit_value, prefix, suffix, icon, content }) => {
// //   const [currentCount, setCurrentCount] = useState(0);
// //   const animationFrameRef = useRef(); // To store the animation frame ID
// //   const startTimeRef = useRef(); // To store the start time of the animation
  
// //   // Total duration of the animation in milliseconds
// //   const duration = 3000; 

// //   useEffect(() => {
// //     // This function runs on every animation frame
// //     const animate = (timestamp) => {
// //       if (!startTimeRef.current) {
// //         // Set the start time on the first frame
// //         startTimeRef.current = timestamp;
// //       }

// //       const elapsedTime = timestamp - startTimeRef.current;
      
// //       // Calculate progress (from 0.0 to 1.0)
// //       let progress = Math.min(elapsedTime / duration, 1);
      
// //       // Apply the easing function to the progress
// //       const easedProgress = easeOutCubic(progress);
      
// //       // Calculate the current value based on the eased progress
// //       const value = Math.floor(easedProgress * limit_value);
      
// //       setCurrentCount(value);

// //       // If the animation is not done, request the next frame
// //       if (progress < 1) {
// //         animationFrameRef.current = requestAnimationFrame(animate);
// //       } else {
// //         // Animation finished, ensure the final value is set exactly
// //         setCurrentCount(limit_value);
// //       }
// //     };

// //     // Start the animation
// //     animationFrameRef.current = requestAnimationFrame(animate);

// //     // ✅ Cleanup function: This runs if the component unmounts
// //     return () => {
// //       cancelAnimationFrame(animationFrameRef.current);
// //       startTimeRef.current = null; // Reset start time
// //     };
// //   }, [limit_value]); // Rerun the animation if the limit_value changes

// //   return (
// //     <div
// //       className="text-center p-4 transition grid gap-1 border-r-2 border-gray-300 duration-300"
// //     >
// //       <p className="text-5xl mb-2">{icon}</p>
// //       <p className="text-gray-800 mt-2 text-s font-medium">{content}</p>
// //       <p className="text-4xl md:text-3xl font-bold justify-center text-emerald-600 items-center gap-2 transition-all duration-500">
// //         {prefix}
// //         {currentCount} {/* ✅ Display the animated state */}
// //         {suffix}
// //       </p>
// //     </div>
// //   );
// // };

// // export default CountItem;

// import React, { useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useGSAP } from '@gsap/react';

// // Register ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);

// const CountItem = ({ limit_value, prefix, suffix, icon, content }) => {
//   const containerRef = useRef(null);
//   const numberRef = useRef(null);

//   useGSAP(() => {
//     // 1. Setup the animation target value
//     const endValue = parseInt(limit_value, 10) || 0;
//     const startValue = { val: 0 }; // Proxy object to animate

//     // 2. Create the Timeline
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: 'top 85%', // Start when top of item hits 85% of viewport height
//         toggleActions: 'play none none reverse', // Play on enter, reverse on leave
//       },
//     });

//     // 3. Animate the container (Fade Up)
//     tl.fromTo(
//       containerRef.current,
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
//     );

//     // 4. Animate the Number "Rolling"
//     tl.to(
//       startValue,
//       {
//         val: endValue,
//         duration: 2,
//         ease: 'power2.out',
//         onUpdate: () => {
//           // Update DOM directly for performance
//           if (numberRef.current) {
//             numberRef.current.textContent = Math.floor(startValue.val);
//           }
//         },
//       },
//       '<' // Start at the same time as the fade up
//     );
//   }, { scope: containerRef }); // Scope ensures efficient cleanup
// console.log(icon);

//   return (
//     <div 
//       ref={containerRef} 
//       className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
//     >
//       {/* Render Icon if it exists (assuming it's a URL string or Component) */}
//       {icon && (
//         <div className="mb-4 text-4xl text-blue-600">
//            {/* If icon is an image URL */}
//            {typeof icon === 'string' && icon.includes('/') ? (
//              <img src={icon} alt={content} className="w-12 h-12 object-contain" />
//            ) : (
//              /* If icon is a component or text/emoji */
//              <span>{icon}</span>
//            )}
//         </div>
//       )}

//       <h3 className="text-4xl font-bold text-gray-900 flex items-baseline">
//         {prefix && <span className="mr-1 text-4xl text-gray-500 ">{prefix}</span>}
        
//         {/* The span that gets animated */}
//         <span ref={numberRef}>0</span>
        
//         {suffix && <span className="ml-1 text-4xl text-gray-500">{suffix}</span>}
//       </h3>
      
//       <p className="mt-2 text-gray-600 font-medium">{content}</p>
//     </div>
//   );
// };

// export default CountItem;


import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CountItem = ({ limit_value, prefix, suffix, icon, content }) => {
  const containerRef = useRef(null);
  const numberRef = useRef(null);

  // API base URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useGSAP(() => {
    // 1. Setup the animation target value
    const endValue = parseInt(limit_value, 10) || 0;
    const startValue = { val: 0 }; // Proxy object to animate

    // 2. Create the Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', // Start when top of item hits 85% of viewport height
        toggleActions: 'play none none reverse', // Play on enter, reverse on leave
      },
    });

    // 3. Animate the container (Fade Up)
    tl.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    );

    // 4. Animate the Number "Rolling"
    tl.to(
      startValue,
      {
        val: endValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          // Update DOM directly for performance
          if (numberRef.current) {
            numberRef.current.textContent = Math.floor(startValue.val).toLocaleString();
          }
        },
      },
      '<' // Start at the same time as the fade up
    );
  }, { scope: containerRef }); // Scope ensures efficient cleanup

  // Construct full image URL
  const getImageUrl = (iconPath) => {
    if (!iconPath) return null;
    if (iconPath.startsWith('http')) return iconPath;
    return `${API_BASE_URL}${iconPath}`;
  };

  const imageUrl = getImageUrl(icon);

  return (
    <div 
      ref={containerRef} 
      className="text-center flex flex-col justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Icon Section */}
      {imageUrl && (
        <div className="mb-4 flex justify-center">
          <div className=" flex items-center justify-center p-3">
            <img 
              src={imageUrl} 
              alt={content} 
              className="w-full h-full  object-fill"
              onError={(e) => {
                // Hide the image if it fails to load
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}
<div>

      {/* Animated Number with Prefix and Suffix */}
<div className="mb-2">
  <h3 className="text-3xl font-bold flex items-baseline justify-center gap-1">
    {/* Prefix */}
    {prefix && (
      <span className="text-4xl text-amber-800 font-bold">
        {prefix}
      </span>
    )}
    
    {/* Animated Number */}
    <span 
      ref={numberRef} 
      className="text-4xl text-brown-600 font-bold" // Custom brown
      >
      0
    </span>
    
    {/* Suffix */}
    {suffix && (
      <span className="text-4xl text-green-800 font-bold">
        {suffix}
      </span>
    )}
  </h3>
</div>
      {/* Content/Title */}
      <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-3">
        {content}
      </p>

    </div>



   
    </div>
  );
};

export default CountItem;