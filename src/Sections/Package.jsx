// // // import React, { useState, useEffect } from 'react'
// // // import axios from 'axios'
// // // import { CheckCircle } from 'lucide-react'

// // // const Package = () => {
// // //   // State to hold fetched data
// // //   const [pack, setPack] = useState([]);

// // //   // Fetch data from backend
// // //   useEffect(() => {
// // //     const fetchPackages = async () => {
// // //       try {
// // //         const res = await axios.get("http://localhost:5000/api/packages");
// // //         setPack(res.data);
// // //       } catch (error) {
// // //         console.error("❌ Error fetching packages:", error);
// // //       }
// // //     };

// // //     fetchPackages();
// // //   }, []);

// // //   return (
// // //     <div className="">
// // //       <div className="py-16 px-6 md:px-20">
// // //         {/* Header Section */}
// // //         <div className="max-w-7xl mx-auto">
// // //           <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
// // //             PACKAGES
// // //           </p>
// // //           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
// // //             Find The Packages That Fit
// // //             <br />
// // //             Your Needs
// // //           </h2>
// // //         </div>

// // //         {/* Packages Grid Section */}
// // //         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
// // //           {pack.length > 0 ? (
// // //             pack.map((plan) => (
// // //               <div
// // //                 key={plan.id}
// // //                 className="bg-white shadow-xl rounded-xl p-6 flex flex-col"
// // //               >
// // //                 {/* Plan Header */}
// // //                 <h3 className="text-xl font-bold text-gray-900 mb-1">
// // //                   {plan.category}
// // //                 </h3>
// // //                 <p className="text-sm text-gray-600 mb-6">{plan.content}</p>

// // //                 {/* Plan Points */}
// // //                 <div className="flex-grow">
// // //                   {plan.points &&
// // //                     plan.points.map((point, index) => (
// // //                       <div key={index} className="flex items-start mb-4">
// // //                         <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
// // //                         <p className="ml-3 text-gray-700 leading-snug">
// // //                           {point}
// // //                         </p>
// // //                       </div>
// // //                     ))}
// // //                 </div>

// // //                 {/* Separator */}
// // //                 <hr className="my-6 border-gray-700" />

// // //                 {/* Price */}
// // //                 <p className="text-xl font-semibold text-green-600 mb-6">
// // //                   {plan.price}
// // //                 </p>

// // //                 {/* Button */}
// // //                 <div className="flex justify-around">
// // //                   <button
// // //                     className="bg-[#0d1b3f] hover:bg-[#1a305d] text-white font-semibold py-2 px-6
// // //                       rounded-xl transition duration-200 w-[50%]
// // //                       shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_0_0_2px_#000]"
// // //                     onClick={() => console.log(`Chosen: ${plan.category}`)}
// // //                   >
// // //                     {plan.buttonText}
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))
// // //           ) : (
// // //             <p className="text-gray-600 text-center col-span-3">
// // //               Loading packages...
// // //             </p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Package;

// // import React, { useState, useEffect } from 'react'
// // import axios from 'axios'
// // import { CheckCircle } from 'lucide-react'

// // // --- New Billing Toggle Component ---
// // // (No changes here, this component is perfect)
// // const BillingToggle = ({ isYearly, onToggle }) => {
// //   return (
// //     <div className="flex items-center justify-center space-x-3">
// //       <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
// //         Monthly
// //       </span>
// //       <button
// //         onClick={onToggle}
// //         className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
// //                     rounded-full border-2 border-transparent transition-colors 
// //                     duration-200 ease-in-out 
// //                     ${isYearly ? 'bg-[#0d1b3f]' : 'bg-gray-300'}
// //                     focus:outline-none focus:ring-2 
// //                     focus:ring-[#0d1b3f] focus:ring-offset-2`}
// //         role="switch"
// //         aria-checked={isYearly}
// //       >
// //         <span
// //           aria-hidden="true"
// //           className={`inline-block h-5 w-5 transform rounded-full 
// //                       bg-white shadow ring-0 
// //                       transition duration-200 ease-in-out
// //                       ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}
// //         ></span>
// //       </button>
// //       <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
// //         Yearly
// //       </span>
// //     </div>
// //   )
// // }

// // // --- Main Package Component ---
// // const Package = () => {
// //   // State to hold fetched and *transformed* data
// //   const [pack, setPack] = useState([]);
  
// //   // State for the billing toggle
// //   const [isYearly, setIsYearly] = useState(false);

// //   // Fetch data from backend
// //   useEffect(() => {
// //     const fetchPackages = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/packages");
        
// //         // --- TRANSFORM DATA ---
// //         // (No changes to this logic)
// //         const transformedData = res.data.map(plan => {
// //           const priceMatch = plan.price.match(/\$(\d+)/);
// //           const monthlyPriceNum = priceMatch ? parseInt(priceMatch[1]) : 0;
// //           const yearlyPriceNum = monthlyPriceNum * 10; // 2 months free

// //           return {
// //             ...plan, 
// //             monthly: {
// //               price: plan.price,
// //               points: plan.points || [], 
// //               buttonText: plan.buttonText || "Choose Plan"
// //             },
// //             yearly: {
// //               price: `$${yearlyPriceNum}/yr`,
// //               points: [
// //                 ...(plan.points || []), 
// //                 "Billed annually (Save 2 months!)" 
// //               ],
// //               buttonText: "Choose Yearly Plan"
// //             }
// //           };
// //         });
        
// //         setPack(transformedData);
// //       } catch (error) {
// //         console.error("❌ Error fetching packages:", error);
// //       }
// //     };

// //     fetchPackages();
// //   }, []);

// //   // --- CSS for the 3D Flip (UPDATED) ---
// //   const flipStyles = `
// //     .flip-card {
// //       perspective: 1000px;
// //       /* FIX 1: Force this element onto its own 3D layer */
// //       transform: translateZ(0); 
// //     }
// //     .flip-card-inner {
// //       position: relative;
// //       width: 100%;
// //       height: 100%;
// //       transition: transform 0.7s;
// //       transform-style: preserve-3d;
      
// //       /* FIX 2: Use grid to stack children without position:absolute */
// //       display: grid; 
// //     }
// //     .flip-card-inner.is-flipped {
// //       transform: rotateY(180deg);
// //     }
// //     .card-face {
// //       /* FIX 3: Both faces occupy the same grid cell (1st row, 1st col) */
// //       grid-area: 1 / 1; 
      
// //       /* position: absolute;  <-- We no longer need this! */
// //       width: 100%;
// //       height: 100%;
// //       -webkit-backface-visibility: hidden; /* Safari */
// //       backface-visibility: hidden;
// //       display: flex; 
// //       flex-direction: column;
// //     }
// //     .card-face-back {
// //       transform: rotateY(180deg);
// //     }
// //   `;

// //   // --- Plan Card Component ---
// //   // We extract the card into its own component for clarity
// //   const PlanCard = ({ planData }) => {
// //     const { category, content, price, points, buttonText } = planData;
    
// //     return (
// //       // Added `h-full` to ensure the card fills the grid area,
// //       // which is essential for cards with different amounts of text.
// //       <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full">
// //         {/* Plan Header */}
// //         <h3 className="text-xl font-bold text-gray-900 mb-1">
// //           {category}
// //         </h3>
// //         <p className="text-sm text-gray-600 mb-6">{content}</p>

// //         {/* Plan Points */}
// //         <div className="flex-grow">
// //           {points &&
// //             points.map((point, index) => (
// //               <div key={index} className="flex items-start mb-4">
// //                 <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
// //                 <p className="ml-3 text-gray-700 leading-snug">
// //                   {point}
// //                 </p>
// //               </div>
// //             ))}
// //         </div>

// //         {/* Separator */}
// //         <hr className="my-6 border-gray-700" />

// //         {/* Price */}
// //         <p className="text-xl font-semibold text-green-600 mb-6">
// //           {price}
// //         </p>

// //         {/* Button */}
// //         <div className="flex justify-around">
// //           <button
// //             className="bg-[#0d1b3f] hover:bg-[#1a305d] text-white font-semibold py-2 px-6
// //                        rounded-xl transition duration-200 w-[50%]
// //                        shadow-[0_0_0_1px_rgba(255,255,255,0.8)_inset,0_0_0_2px_#000]"
// //             onClick={() => console.log(`Chosen: ${category} - ${price}`)}
// //           >
// //             {buttonText}
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="">
// //       <style>{flipStyles}</style> {/* Inject the CSS for flipping */}
      
// //       <div className="py-16 px-6 md:px-20">
// //         {/* Header Section */}
// //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
// //                         justify-between md:items-center">
// //           <div>
// //             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
// //               PACKAGES
// //             </p>
// //             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
// //               Find The Packages That Fit
// //               <br />
// //               Your Needs
// //             </h2>
// //           </div>
          
// //           {/* Billing Toggle (Right Corner on Desktop) */}
// //           <div className="mt-6 md:mt-0">
// //             <BillingToggle 
// //               isYearly={isYearly} 
// //               onToggle={() => setIsYearly(!isYearly)} 
// //             />
// //           </div>
// //         </div>

// //         {/* Packages Grid Section */}
// //         {/* Added `isolate` class, which creates a stacking context and can help */}
// //         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
// //           {pack.length > 0 ? (
// //             pack.map((plan) => (
// //               <div
// //                 key={plan.id}
// //                 className="flip-card" // 3D container
// //               >
// //                 <div 
// //                   className={`flip-card-inner ${isYearly ? 'is-flipped' : ''}`} // Flips based on state
// //                 >
// //                   {/* --- FRONT FACE (MONTHLY) --- */}
// //                   <div className="card-face card-face-front">
// //                     <PlanCard planData={{ ...plan, ...plan.monthly }} />
// //                   </div>
                  
// //                   {/* --- BACK FACE (YEARLY) --- */}
// //                   <div className="card-face card-face-back">
// //                     <PlanCard planData={{ ...plan, ...plan.yearly }} />
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <p className="text-gray-600 text-center col-span-3">
// //               Loading packages...
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Package;

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { CheckCircle, ArrowRight } from 'lucide-react' // Added ArrowRight

// // --- Main Package Component ---
// const Package = () => {
//   // State to hold fetched data
//   const [pack, setPack] = useState([]);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/packages");
        
//         // Simplified data loading, no more 'monthly'/'yearly' transform
//         const transformedData = res.data.map(plan => ({
//            ...plan,
//            points: plan.points || [], // Ensure points is always an array
//            buttonText: plan.buttonText || "Choose Plan"
//         }));
        
//         setPack(transformedData);
//       } catch (error) {
//         console.error("❌ Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   // --- CSS for the 3D Flip (UPDATED FOR HOVER) ---
//   const flipStyles = `
//     .flip-card {
//       perspective: 1000px;
//       transform: translateZ(0); /* Lifts card to prevent overlap */
//     }
//     .flip-card-inner {
//       position: relative;
//       width: 100%;
//       height: 100%;
//       transition: transform 0.7s;
//       transform-style: preserve-3d;
//       display: grid; /* Stacks children to give parent height */
//     }
    
//     /* --- THIS IS THE NEW TRIGGER --- */
//     .flip-card:hover .flip-card-inner {
//       transform: rotateY(180deg);
//     }
    
//     .card-face {
//       grid-area: 1 / 1; /* Both faces occupy the same grid cell */
//       width: 100%;
//       height: 100%;
//       -webkit-backface-visibility: hidden; /* Safari */
//       backface-visibility: hidden;
//       display: flex; 
//       flex-direction: column;
//     }
//     .card-face-back {
//       transform: rotateY(180deg);
//     }
//   `;

//   // --- Plan Card FRONT Component ---
//   // This is what the user sees first
//   const PlanCardFront = ({ planData }) => {
//     const { category, content, price } = planData;
    
//     return (
//       <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full 
//                       justify-between cursor-pointer">
//         <div>
//           {/* Plan Header */}
//           <h3 className="text-xl font-bold text-gray-900 mb-1">
//             {category}
//           </h3>
//           <p className="text-sm text-gray-600 mb-6">{content}</p>
//         </div>
        
//         <div>
//           {/* Price */}
//           <p className="text-2xl font-bold text-green-600 mb-6">
//             {price}
//           </p>
          
//           {/* "See Details" Prompt */}
//           <div className="flex items-center text-gray-500 font-semibold text-sm">
//             <span>See Details</span>
//             <ArrowRight className="w-4 h-4 ml-1" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // --- Plan Card BACK Component ---
//   // This is what the user sees on hover
//   const PlanCardBack = ({ planData }) => {
//     const { category, price, points, buttonText } = planData;
    
//     return (
//       <div className="bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 
//                       flex flex-col h-full">
//         {/* Plan Header */}
//         <h3 className="text-xl font-bold text-white mb-6">
//           {category}
//         </h3>

//         {/* Plan Points */}
//         <div className="flex-grow">
//           {points &&
//             points.map((point, index) => (
//               <div key={index} className="flex items-start mb-3">
//                 <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
//                 <p className="ml-3 text-gray-200 leading-snug">
//                   {point}
//                 </p>
//               </div>
//             ))}
//         </div>

//         {/* Separator */}
//         <hr className="my-6 border-gray-600" />

//         {/* Price (optional, for context) */}
//         <p className="text-xl font-semibold text-green-400 mb-6">
//           {price}
//         </p>

//         {/* Button */}
//         <div className="flex justify-around">
//           <button
//             className="bg-white hover:bg-gray-200 text-[#0d1b3f] font-semibold py-2 px-6
//                        rounded-xl transition duration-200 w-[50%]"
//             onClick={() => console.log(`Chosen: ${category} - ${price}`)}
//           >
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <style>{flipStyles}</style> {/* Inject the CSS for flipping */}
      
//       <div className="py-16 px-6 md:px-20">
//         {/* Header Section (No toggle needed) */}
//         <div className="max-w-7xl mx-auto">
//           <div>
//             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
//               PACKAGES
//             </p>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//               Find The Packages That Fit
//               <br />
//               Your Needs
//             </h2>
//           </div>
//         </div>

//         {/* Packages Grid Section */}
//         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
//           {pack.length > 0 ? (
//             pack.map((plan) => (
//               <div
//                 key={plan.id}
//                 className="flip-card" // 3D container
//               >
//                 <div 
//                   className="flip-card-inner" // No "is-flipped" class, now driven by hover
//                 >
//                   {/* --- FRONT FACE --- */}
//                   <div className="card-face card-face-front">
//                     <PlanCardFront planData={plan} />
//                   </div>
                  
//                   {/* --- BACK FACE --- */}
//                   <div className="card-face card-face-back">
//                     <PlanCardBack planData={plan} />
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600 text-center col-span-3">
//               Loading packages...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Package;

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { CheckCircle, ArrowRight } from 'lucide-react'

// // --- Billing Toggle Component ---
// // We add this back in from your second example
// const BillingToggle = ({ isYearly, onToggle }) => {
//   return (
//     <div className="flex items-center justify-center space-x-3">
//       <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
//         Monthly
//       </span>
//       <button
//         onClick={onToggle}
//         className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
//                     rounded-full border-2 border-transparent transition-colors 
//                     duration-200 ease-in-out 
//                     ${isYearly ? 'bg-[#0d1b3f]' : 'bg-gray-300'}
//                     focus:outline-none focus:ring-2 
//                     focus:ring-[#0d1b3f] focus:ring-offset-2`}
//         role="switch"
//         aria-checked={isYearly}
//       >
//         <span
//           aria-hidden="true"
//           className={`inline-block h-5 w-5 transform rounded-full 
//                       bg-white shadow ring-0 
//                       transition duration-200 ease-in-out
//                       ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}
//         ></span>
//       </button>
//       <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
//         Yearly
//       </span>
//     </div>
//   )
// }

// // --- Main Package Component ---
// const Package = () => {
//   // State to hold fetched data
//   const [pack, setPack] = useState([]);
  
//   // State for the billing toggle (from your second example)
//   const [isYearly, setIsYearly] = useState(false);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/packages");
        
//         // --- Use the Data Transform from your second example ---
//         // This creates the 'monthly' and 'yearly' sub-objects
//         const transformedData = res.data.map(plan => {
//           const priceMatch = plan.price.match(/\$(\d+)/);
//           const monthlyPriceNum = priceMatch ? parseInt(priceMatch[1]) : 0;
//           const yearlyPriceNum = monthlyPriceNum * 10; // 2 months free

//           return {
//             ...plan, // Keep id, category, content
//             monthly: {
//               price: plan.price,
//               points: plan.points || [], 
//               buttonText: plan.buttonText || "Choose Plan"
//             },
//             yearly: {
//               price: `$${yearlyPriceNum}/yr`,
//               points: [
//                 ...(plan.points || []), 
//                 "Billed annually (Save 2 months!)" 
//               ],
//               buttonText: "Choose Yearly Plan"
//             }
//           };
//         });
        
//         setPack(transformedData);
//       } catch (error) {
//         console.error("❌ Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   // --- CSS for the 3D Flip (UPDATED FOR HOVER) ---
//   // This is from your first example (hover-to-flip)
//   const flipStyles = `
//     .flip-card {
//       perspective: 1000px;
//       transform: translateZ(0); /* Lifts card to prevent overlap */
//     }
//     .flip-card-inner {
//       position: relative;
//       width: 100%;
//       height: 100%;
//       transition: transform 0.7s;
//       transform-style: preserve-3d;
//       display: grid; /* Stacks children to give parent height */
//     }
    
//     /* --- Trigger is on HOVER --- */
//     .flip-card:hover .flip-card-inner {
//       transform: rotateY(180deg);
//     }
    
//     .card-face {
//       grid-area: 1 / 1; /* Both faces occupy the same grid cell */
//       width: 100%;
//       height: 100%;
//       -webkit-backface-visibility: hidden; /* Safari */
//       backface-visibility: hidden;
//       display: flex; 
//       flex-direction: column;
//     }
//     .card-face-back {
//       transform: rotateY(180deg);
//     }
//   `;

//   // --- Plan Card FRONT Component ---
//   // Updated to accept individual props
//   const PlanCardFront = ({ category, content, price }) => {
//     return (
//       <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full 
//                       justify-between cursor-pointer">
//         <div>
//           {/* Plan Header */}
//           <h3 className="text-xl font-bold text-gray-900 mb-1">
//             {category}
//           </h3>
//           <p className="text-sm text-gray-600 mb-6">{content}</p>
//         </div>
        
//         <div>
//           {/* Price */}
//           <p className="text-2xl font-bold text-green-600 mb-6">
//             {price}
//           </p>
          
//           {/* "See Details" Prompt */}
//           <div className="flex items-center text-gray-500 font-semibold text-sm">
//             <span>See Details</span>
//             <ArrowRight className="w-4 h-4 ml-1" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // --- Plan Card BACK Component ---
//   // Updated to accept individual props
//   const PlanCardBack = ({ category, price, points, buttonText }) => {
//     return (
//       <div className="bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 
//                       flex flex-col h-full">
//         {/* Plan Header */}
//         <h3 className="text-xl font-bold text-white mb-6">
//           {category}
//         </h3>

//         {/* Plan Points */}
//         <div className="flex-grow">
//           {points &&
//             points.map((point, index) => (
//               <div key={index} className="flex items-start mb-3">
//                 <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
//                 <p className="ml-3 text-gray-200 leading-snug">
//                   {point}
//                 </p>
//               </div>
//             ))}
//         </div>

//         {/* Separator */}
//         <hr className="my-6 border-gray-600" />

//         {/* Price (optional, for context) */}
//         <p className="text-xl font-semibold text-green-400 mb-6">
//           {price}
//         </p>

//         {/* Button */}
//         <div className="flex justify-around">
//           <button
//             className="bg-white hover:bg-gray-200 text-[#0d1b3f] font-semibold py-2 px-6
//                        rounded-xl transition duration-200 w-[50%]"
//             onClick={() => console.log(`Chosen: ${category} - ${price}`)}
//           >
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <style>{flipStyles}</style> {/* Inject the CSS for flipping */}
      
//       <div className="py-16 px-6 md:px-20">
//         {/* Header Section (with Toggle) */}
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
//                         justify-between md:items-center">
//           <div>
//             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
//               PACKAGES
//             </p>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//               Find The Packages That Fit
//               <br />
//               Your Needs
//             </h2>
//           </div>
          
//           {/* Billing Toggle (Right Corner on Desktop) */}
//           <div className="mt-6 md:mt-0">
//             <BillingToggle 
//               isYearly={isYearly} 
//               onToggle={() => setIsYearly(!isYearly)} 
//             />
//           </div>
//         </div>

//         {/* Packages Grid Section */}
//         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
//           {pack.length > 0 ? (
//             pack.map((plan) => {
//               // --- KEY CHANGE ---
//               // Select the data based on the toggle state
//               const activeData = isYearly ? plan.yearly : plan.monthly;

//               return (
//                 <div key={plan.id} className="flip-card">
//                   <div className="flip-card-inner">
                    
//                     {/* --- FRONT FACE --- */}
//                     {/* Shows common info + data from the active (M/Y) plan */}
//                     <div className="card-face card-face-front">
//                       <PlanCardFront 
//                         category={plan.category} 
//                         content={plan.content}
//                         price={activeData.price} 
//                       />
//                     </div>
                    
//                     {/* --- BACK FACE --- */}
//                     {/* Shows common info + data from the active (M/Y) plan */}
//                     <div className="card-face card-face-back">
//                       <PlanCardBack 
//                         category={plan.category}
//                         price={activeData.price}
//                         points={activeData.points}
//                         buttonText={activeData.buttonText}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-gray-600 text-center col-span-3">
//               Loading packages...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Package;

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { CheckCircle, ArrowRight } from 'lucide-react'

// // --- Billing Toggle Component ---
// // (No changes here)
// const BillingToggle = ({ isYearly, onToggle }) => {
//   return (
//     <div className="flex items-center justify-center space-x-3">
//       <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
//         Monthly
//       </span>
//       <button
//         onClick={onToggle}
//         className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
//                     rounded-full border-2 border-transparent transition-colors 
//                     duration-200 ease-in-out 
//                     ${isYearly ? 'bg-[#0d1b3f]' : 'bg-gray-300'}
//                     focus:outline-none focus:ring-2 
//                     focus:ring-[#0d1b3f] focus:ring-offset-2`}
//         role="switch"
//         aria-checked={isYearly}
//       >
//         <span
//           aria-hidden="true"
//           className={`inline-block h-5 w-5 transform rounded-full 
//                     bg-white shadow ring-0 
//                     transition duration-200 ease-in-out
//                     ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}
//         ></span>
//       </button>
//       <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
//         Yearly
//       </span>
//     </div>
//   )
// }

// // --- Main Package Component ---
// const Package = () => {
//   const [pack, setPack] = useState([]);
//   const [isYearly, setIsYearly] = useState(false);

//   // Fetch data from backend
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/packages");
        
//         // --- THIS IS THE ONLY CHANGE ---
//         // We removed all the transformation logic.
//         // The data from the API is now used directly.
//         setPack(res.data);
        
//       } catch (error) {
//         console.error("❌ Error fetching packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []); // Empty dependency array, runs once

//   // --- CSS for the 3D Flip (No changes) ---
//   const flipStyles = `
//     .flip-card {
//       perspective: 1000px;
//       transform: translateZ(0);
//     }
//     .flip-card-inner {
//       position: relative;
//       width: 100%;
//       height: 100%;
//       transition: transform 0.7s;
//       transform-style: preserve-d;
//       display: grid;
//     }
//     .flip-card:hover .flip-card-inner {
//       transform: rotateY(180deg);
//     }
//     .card-face {
//       grid-area: 1 / 1;
//       width: 100%;
//       height: 100%;
//       -webkit-backface-visibility: hidden;
//       backface-visibility: hidden;
//       display: flex; 
//       flex-direction: column;
//     }
//     .card-face-back {
//       transform: rotateY(180deg);
//     }
//   `;

//   // --- Plan Card FRONT Component (No changes) ---
//   const PlanCardFront = ({ category, content, price }) => (
//     <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full 
//                     justify-between cursor-pointer">
//       <div>
//         <h3 className="text-xl font-bold text-gray-900 mb-1">{category}</h3>
//         <p className="text-sm text-gray-600 mb-6">{content}</p>
//       </div>
//       <div>
//         <p className="text-2xl font-bold text-green-600 mb-6">{price}</p>
//         <div className="flex items-center text-gray-500 font-semibold text-sm">
//           <span>See Details</span>
//           <ArrowRight className="w-4 h-4 ml-1" />
//         </div>
//       </div>
//     </div>
//   );

//   // --- Plan Card BACK Component (No changes) ---
//   const PlanCardBack = ({ category, price, points, buttonText }) => (
//     <div className="bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 
//                     flex flex-col h-full">
//       <h3 className="text-xl font-bold text-white mb-6">{category}</h3>
//       <div className="flex-grow">
//         {points &&
//           points.map((point, index) => (
//             <div key={index} className="flex items-start mb-3">
//               <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
//               <p className="ml-3 text-gray-200 leading-snug">{point}</p>
//             </div>
//           ))}
//       </div>
//       <hr className="my-6 border-gray-600" />
//       <p className="text-xl font-semibold text-green-400 mb-6">{price}</p>
//       <div className="flex justify-around">
//         <button
//           className="bg-white hover:bg-gray-200 text-[#0d1b3f] font-semibold py-2 px-6
//                      rounded-xl transition duration-200 w-[50%]"
//           onClick={() => console.log(`Chosen: ${category} - ${price}`)}
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );

//   // --- Main Return (No changes) ---
//   return (
//     <div className="">
//       <style>{flipStyles}</style>
//       <div className="py-16 px-6 md:px-20">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
//                         justify-between md:items-center">
//           <div>
//             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
//               PACKAGES
//             </p>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
//               Find The Packages That Fit
//               <br />
//               Your Needs
//             </h2>
//           </div>
//           <div className="mt-6 md:mt-0">
//             <BillingToggle 
//               isYearly={isYearly} 
//               onToggle={() => setIsYearly(!isYearly)} 
//             />
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
//           {pack.length > 0 ? (
//             pack.map((plan) => {
//               // This logic remains the same, but now `plan.monthly` 
//               // and `plan.yearly` come directly from the API.
//               const activeData = isYearly ? plan.yearly : plan.monthly;

//               return (
//                 <div key={plan.id} className="flip-card">
//                   <div className="flip-card-inner">
//                     <div className="card-face card-face-front">
//                       <PlanCardFront 
//                         category={plan.category} 
//                         content={plan.content}
//                         price={activeData.price} 
//                       />
//                     </div>
//                     <div className="card-face card-face-back">
//                       <PlanCardBack 
//                         category={plan.category}
//                         price={activeData.price}
//                         points={activeData.points}
//                         buttonText={activeData.buttonText}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-gray-600 text-center col-span-3">
//               Loading packages...
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Package;
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, ArrowRight } from 'lucide-react'

// --- Billing Toggle Component ---
const BillingToggle = ({ isYearly, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer 
                    rounded-full border-2 border-transparent transition-colors 
                    duration-200 ease-in-out 
                    ${isYearly ? 'bg-[#0d1b3f]' : 'bg-gray-300'}
                    focus:outline-none focus:ring-2 
                    focus:ring-[#0d1b3f] focus:ring-offset-2`}
        role="switch"
        aria-checked={isYearly}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 transform rounded-full 
                    bg-white shadow ring-0 
                    transition duration-200 ease-in-out
                    ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}
        ></span>
      </button>
      <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
        Yearly
      </span>
    </div>
  )
}

// --- Main Package Component ---
const Package = () => {
  const [pack, setPack] = useState([]);
  const [isYearly, setIsYearly] = useState(false);

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

  // --- CSS for the 3D Flip ---
  const flipStyles = `
    .flip-card {
      perspective: 1000px;
      transform: translateZ(0);
    }
    .flip-card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.7s;
      transform-style: preserve-3d;
      display: grid;
    }
    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }
    .card-face {
      grid-area: 1 / 1;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      display: flex; 
      flex-direction: column;
    }
    .card-face-back {
      transform: rotateY(180deg);
    }
  `;

  // --- Plan Card FRONT Component ---
  const PlanCardFront = ({ category, content, price }) => (
    <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full 
                    justify-between cursor-pointer">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{category}</h3>
        <p className="text-sm text-gray-600 mb-6">{content}</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-green-600 mb-6">{price}</p>
        <div className="flex items-center text-gray-500 font-semibold text-sm">
          <span>See Details</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );

  // --- Plan Card BACK Component ---
  const PlanCardBack = ({ category, price, points, buttonText }) => (
    <div className="bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 
                    flex flex-col h-full">
      <h3 className="text-xl font-bold text-white mb-6">{category}</h3>
      
      {/* Points / Features List */}
      <div className="flex-grow overflow-y-auto"> 
        {points && points.length > 0 ? (
          points.map((point, index) => (
            <div key={index} className="flex items-start mb-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
              <p className="ml-3 text-gray-200 leading-snug">{point}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No features listed.</p>
        )}
      </div>

      <hr className="my-6 border-gray-600" />
      <p className="text-xl font-semibold text-green-400 mb-6">{price}</p>
      <div className="flex justify-around">
        <button
          className="bg-white hover:bg-gray-200 text-[#0d1b3f] font-semibold py-2 px-6
                     rounded-xl transition duration-200 w-[50%]"
          onClick={() => console.log(`Chosen: ${category} - ${price}`)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );

  // --- Main Return ---
  return (
    <div className="">
      <style>{flipStyles}</style>
      <div className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
                        justify-between md:items-center">
          <div>
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
              PACKAGES
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
              Find The Packages That Fit
              <br />
              Your Needs
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <BillingToggle 
              isYearly={isYearly} 
              onToggle={() => setIsYearly(!isYearly)} 
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
          {pack.length > 0 ? (
            pack.map((plan) => {
              // 1. Safety Logic: Handle case where monthly/yearly might be null/undefined
              const monthlyData = plan.monthly || {};
              const yearlyData = plan.yearly || {};

              // 2. Select active data
              const activeData = isYearly ? yearlyData : monthlyData;

              // 3. Extract specific fields with fallbacks
              const displayPrice = activeData.price || "$0";
              const displayPoints = activeData.points || []; // Ensures we pass an array
              const displayButton = activeData.buttonText || "Choose Plan";

              return (
                <div key={plan.id} className="flip-card">
                  <div className="flip-card-inner">
                    <div className="card-face card-face-front">
                      <PlanCardFront 
                        category={plan.category} 
                        content={plan.content}
                        price={displayPrice} 
                      />
                    </div>
                    <div className="card-face card-face-back">
                      <PlanCardBack 
                        category={plan.category}
                        price={displayPrice}
                        points={displayPoints} // Passed safely
                        buttonText={displayButton}
                      />
                    </div>
                  </div>
                </div>
              );
            })
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