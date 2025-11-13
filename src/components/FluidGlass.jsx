
// // import React, { useEffect, useState } from 'react'

// // /* This is a CSS-only component. 
// //   It simulates a "fluid glass" effect using:
// //   1. Tailwind's backdrop-filter for the "glass"
// //   2. A CSS keyframe animation for the "fluid" morphing
// // */

// // const FluidGlass = ({ containerRef }) => {
// //   const [pos, setPos] = useState({ x: '50%', y: '50%' });

// //   useEffect(() => {
// //     const el = containerRef?.current;
// //     if (!el) return;

// //     const handleMove = (e) => {
// //       const rect = el.getBoundingClientRect();
// //       const clientX = e.touches ? e.touches[0].clientX : e.clientX;
// //       const clientY = e.touches ? e.touches[0].clientY : e.clientY;
// //       const x = clientX - rect.left;
// //       const y = clientY - rect.top;
// //       setPos({ x, y });
// //     };

// //     const handleLeave = () => {
// //       setPos({ x: '50%', y: '50%' });
// //     };

// //     el.addEventListener('mousemove', handleMove);
// //     el.addEventListener('mouseleave', handleLeave);
// //     el.addEventListener('touchstart', handleMove, { passive: true });
// //     el.addEventListener('touchmove', handleMove, { passive: true });
// //     el.addEventListener('touchend', handleLeave, { passive: true });

// //     return () => {
// //       el.removeEventListener('mousemove', handleMove);
// //       el.removeEventListener('mouseleave', handleLeave);
// //       el.removeEventListener('touchstart', handleMove);
// //       el.removeEventListener('touchmove', handleMove);
// //       el.removeEventListener('touchend', handleLeave);
// //     };
// //   }, [containerRef]);
// //   return (
// //     <>
// //       {/* We inject a <style> tag to define the keyframe animation,
// //         as Tailwind's animation classes can't handle complex
// //         border-radius morphing on their own.
// //       */}
// //       <style>
// //         {`
// //           @keyframes morph {
// //             0% {
// //               border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
// //             }
// //             50% {
// //               border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
// //             }
// //             100% {
// //               border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
// //             }
// //           }
// //         `}
// //       </style>
      
// //       {/* This is the "lens" itself.
// //         It's positioned in the center and has the blur effect.
// //         The 'animate-[morph_8s_ease-in-out_infinite]' class
// //         applies the keyframe animation.
// //       */}
// //       <div
// //         className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] animate-[morph_8s_ease-in-out_infinite] backdrop-blur-md border border-white/30 shadow-xl pointer-events-none"
// //         style={{
// //           left: typeof pos.x === 'number' ? `${pos.x}px` : pos.x,
// //           top: typeof pos.y === 'number' ? `${pos.y}px` : pos.y,
// //           transform: 'translate(-50%, -50%)',
// //           backgroundColor: 'rgba(255,255,255,0.05)'
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default FluidGlass;


// import React, { useEffect, useState } from 'react'

// /* This is a CSS-only component. 
//   It simulates a "fluid glass" effect using:
//   1. Tailwind's backdrop-filter for the "glass"
//   2. A CSS keyframe animation for the "fluid" morphing
// */

// const FluidGlass = ({ containerRef }) => {
//   const [pos, setPos] = useState({ x: '50%', y: '50%' });

//   useEffect(() => {
//     const el = containerRef?.current;
//     if (!el) return;

//     const handleMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//       const clientY = e.touches ? e.touches[0].clientY : e.clientY;
//       const x = clientX - rect.left;
//       const y = clientY - rect.top;
//       setPos({ x, y });
//     };

//     const handleLeave = () => {
//       setPos({ x: '50%', y: '50%' });
//     };

//     el.addEventListener('mousemove', handleMove);
//     el.addEventListener('mouseleave', handleLeave);
//     el.addEventListener('touchstart', handleMove, { passive: true });
//     el.addEventListener('touchmove', handleMove, { passive: true });
//     el.addEventListener('touchend', handleLeave, { passive: true });

//     return () => {
//       el.removeEventListener('mousemove', handleMove);
//       el.removeEventListener('mouseleave', handleLeave);
//       el.removeEventListener('touchstart', handleMove);
//       el.removeEventListener('touchmove', handleMove);
//       el.removeEventListener('touchend', handleLeave);
//     };
//   }, [containerRef]);
//   return (
//     <>
//       {/* We inject a <style> tag to define the keyframe animation,
//         as Tailwind's animation classes can't handle complex
//         border-radius morphing on their own.
//       */}
//       <style>
//         {`
//           @keyframes morph {
//             0% {
//               border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
//             }
//             50% {
//               border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
//             }
//             100% {
//               border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
//             }
//           }
//         `}
//       </style>
      
//       {/* This is the "lens" itself.
//         It's positioned in the center and has the blur effect.
//         The 'animate-[morph_8s_ease-in-out_infinite]' class
//         applies the keyframe animation.
//       */}
//       <div
//         className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] animate-[morph_8s_ease-in-out_infinite] backdrop-blur-md border border-white/30 shadow-xl pointer-events-none"
//         style={{
//           left: typeof pos.x === 'number' ? `${pos.x}px` : pos.x,
//           top: typeof pos.y === 'number' ? `${pos.y}px` : pos.y,
//           transform: 'translate(-50%, -50%)',
//           backgroundColor: 'rgba(255,255,255,0.05)'
//         }}
//       />
//     </>
//   );
// };

// export default FluidGlass;

import React, { useEffect, useState } from 'react';

/* This is a CSS-only component. 
  It simulates a "fluid glass" effect using:
  1. Tailwind's backdrop-filter for the "glass"
  2. A CSS keyframe animation for the "fluid" morphing
*/

const FluidGlass = ({ containerRef }) => {
  const [pos, setPos] = useState({ x: '50%', y: '50%' });

  useEffect(() => {
    const el = containerRef?.current;
    if (!el) return;

    const handleMove = e => {
      const rect = el.getBoundingClientRect();
      // Handle both mouse and touch events
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setPos({ x, y });
    };

    const handleLeave = () => {
      setPos({ x: '50%', y: '50%' });
    };

    // Add event listeners
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    el.addEventListener('touchstart', handleMove, { passive: true });
    el.addEventListener('touchmove', handleMove, { passive: true });
    el.addEventListener('touchend', handleLeave, { passive: true });

    // Cleanup function
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      el.removeEventListener('touchstart', handleMove);
      el.removeEventListener('touchmove', handleMove);
      el.removeEventListener('touchend', handleLeave);
    };
  }, [containerRef]);

  return (
    <>
      {/* We inject a <style> tag to define the keyframe animation
        for the border-radius morphing.
      */}
      <style>
        {`
          @keyframes morph {
            0% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
            50% {
              border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
            }
            100% {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            }
          }
        `}
      </style>

      {/* This is the "lens" element */}
      <div
        className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] 
                   animate-[morph_8s_ease-in-out_infinite] 
                   backdrop-blur-md border border-white/30 
                   shadow-xl pointer-events-none"
        style={{
          left: typeof pos.x === 'number' ? `${pos.x}px` : pos.x,
          top: typeof pos.y === 'number' ? `${pos.y}px` : pos.y,
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      />
    </>
  );
};

export default FluidGlass;