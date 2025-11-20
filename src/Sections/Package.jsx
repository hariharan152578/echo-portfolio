
// // import React, { useState, useEffect } from 'react'
// // import axios from 'axios'
// // import { CheckCircle, ArrowRight, X, User, Mail, Phone, CreditCard, Upload, ArrowLeft, Image as ImageIcon, Loader } from 'lucide-react'

// // // --- CONFIGURATION ---
// // const RECEIVER_UPI_ID = "m.hariharan3080@oksbi"; 
// // const RECEIVER_NAME = "Echo Digital Solutions";

// // // --- Billing Toggle Component ---
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
// //                     bg-white shadow ring-0 
// //                     transition duration-200 ease-in-out
// //                     ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}
// //         ></span>
// //       </button>
// //       <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
// //         Yearly
// //       </span>
// //     </div>
// //   )
// // }

// // // --- Payment Modal Component ---
// // const PaymentModal = ({ isOpen, onClose, planDetails }) => {
// //   const [step, setStep] = useState(1); // 1 = Details & QR, 2 = Upload Screenshot
// //   const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
// //   const [screenshot, setScreenshot] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState(null);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [submitError, setSubmitError] = useState('');

// //   // Reset state when modal opens/closes
// //   useEffect(() => {
// //     if (isOpen) {
// //       setStep(1);
// //       setFormData({ name: '', email: '', phone: '' });
// //       setScreenshot(null);
// //       setPreviewUrl(null);
// //       setSubmitError('');
// //       setIsSubmitting(false);
// //     }
// //   }, [isOpen]);

// //   if (!isOpen || !planDetails) return null;

// //   // --- ⬇️ THE FIX IS HERE ⬇️ ---
// //   // Ensure priceString is converted to a String before calling .replace()
// //   // const parsePrice = (priceString) => String(priceString).replace(/[^0-9.]/g, '');

// //   // In the PaymentModal component, fix the price parsing:
// // const parsePrice = (priceString) => {
// //   if (typeof priceString === 'number') return priceString.toString();
// //   if (typeof priceString === 'string') return priceString.replace(/[^0-9.]/g, '');
// //   return '0';
// // };
// //   const amount = parsePrice(planDetails.price);
  
// //   const upiString = `upi://pay?pa=${RECEIVER_UPI_ID}&pn=${encodeURIComponent(RECEIVER_NAME)}&am=${amount}&cu=INR`;
// //   const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiString)}`;

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setSubmitError('');
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Validate file type
// //       const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
// //       if (!validTypes.includes(file.type)) {
// //         setSubmitError('Please upload a valid image file (JPEG, PNG, GIF)');
// //         return;
// //       }
      
// //       // Validate file size (max 5MB)
// //       if (file.size > 5 * 1024 * 1024) {
// //         setSubmitError('File size must be less than 5MB');
// //         return;
// //       }
      
// //       setScreenshot(file);
// //       setPreviewUrl(URL.createObjectURL(file));
// //       setSubmitError('');
// //     }
// //   };

// //   const handleNextStep = (e) => {
// //     e.preventDefault();
// //     // Basic validation
// //     if (!formData.name.trim()) {
// //       setSubmitError("Please enter your name.");
// //       return;
// //     }
// //     if (!formData.email.trim()) {
// //       setSubmitError("Please enter your email.");
// //       return;
// //     }
// //     if (!formData.phone.trim()) {
// //       setSubmitError("Please enter your phone number.");
// //       return;
// //     }
    
// //     // Email validation
// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(formData.email)) {
// //       setSubmitError("Please enter a valid email address.");
// //       return;
// //     }
    
// //     setStep(2);
// //     setSubmitError('');
// //   };

// //   const handleFinalSubmit = async () => {
// //     if (!screenshot) {
// //       setSubmitError("Please upload a screenshot of the payment.");
// //       return;
// //     }

// //     setIsSubmitting(true);
// //     setSubmitError('');

// //     try {
// //       // Create FormData for file upload
// //       const submitData = new FormData();
// //       submitData.append('name', formData.name);
// //       submitData.append('email', formData.email);
// //       submitData.append('phone', formData.phone);
// //       submitData.append('planCategory', planDetails.category);
// //       submitData.append('planPrice', planDetails.price);
// //       submitData.append('planCycle', planDetails.cycle);
// //       submitData.append('screenshot', screenshot);

// //       // Send to backend
// //       const response = await axios.post('http://localhost:5000/api/orders', submitData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       if (response.status === 201) {
// //         alert("Order submitted successfully! We will verify and activate your plan.");
// //         onClose();
// //       }
// //     } catch (error) {
// //       console.error('Error submitting order:', error);
// //       const errorMessage = error.response?.data?.message || 'Failed to submit order. Please try again.';
// //       setSubmitError(errorMessage);
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col min-h-[500px] animate-in fade-in zoom-in duration-300 relative">
        
// //         {/* Modal Header (Desktop Close Button) */}
// //         <button 
// //           onClick={onClose} 
// //           disabled={isSubmitting}
// //           className="absolute top-4 right-4 z-50 text-gray-400 hover:text-red-500 transition disabled:opacity-50"
// //         >
// //           <X size={28} />
// //         </button>

// //         {/* Error Message */}
// //         {submitError && (
// //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mx-4 mt-4">
// //             <div className="flex items-center">
// //               <X size={20} className="mr-2 flex-shrink-0" />
// //               <span className="text-sm">{submitError}</span>
// //             </div>
// //           </div>
// //         )}

// //         {/* STEP 1: DETAILS & QR CODE */}
// //         {step === 1 && (
// //           <div className="flex flex-col md:flex-row h-full">
// //             {/* Left: User Details */}
// //             <div className="w-full md:w-1/2 p-8">
// //               <h3 className="text-2xl font-bold text-gray-800 mb-6">Step 1: Details</h3>
              
// //               <form onSubmit={handleNextStep} className="space-y-4">
// //                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
// //                   <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Selected Plan</p>
// //                   <div className="flex justify-between items-center mt-1">
// //                     <span className="font-bold text-gray-800 text-lg">{planDetails.category}</span>
// //                     <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full uppercase">
// //                       {planDetails.cycle}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //                     <User size={16} /> Name *
// //                   </label>
// //                   <input 
// //                     type="text" 
// //                     name="name" 
// //                     required 
// //                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none disabled:opacity-50" 
// //                     placeholder="John Doe" 
// //                     onChange={handleChange} 
// //                     value={formData.name}
// //                     disabled={isSubmitting}
// //                   />
// //                 </div>
// //                 <div className="space-y-2">
// //                   <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //                     <Mail size={16} /> Email *
// //                   </label>
// //                   <input 
// //                     type="email" 
// //                     name="email" 
// //                     required 
// //                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none disabled:opacity-50" 
// //                     placeholder="john@example.com" 
// //                     onChange={handleChange} 
// //                     value={formData.email}
// //                     disabled={isSubmitting}
// //                   />
// //                 </div>
// //                 <div className="space-y-2">
// //                   <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
// //                     <Phone size={16} /> Phone *
// //                   </label>
// //                   <input 
// //                     type="tel" 
// //                     name="phone" 
// //                     required 
// //                     className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none disabled:opacity-50" 
// //                     placeholder="+91 98765 43210" 
// //                     onChange={handleChange} 
// //                     value={formData.phone}
// //                     disabled={isSubmitting}
// //                   />
// //                 </div>

// //                 <button 
// //                   type="submit" 
// //                   disabled={isSubmitting}
// //                   className="w-full mt-4 bg-[#0d1b3f] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {isSubmitting ? (
// //                     <>
// //                       <Loader size={18} className="animate-spin" />
// //                       Processing...
// //                     </>
// //                   ) : (
// //                     <>
// //                       Next: Upload Proof <ArrowRight size={18} />
// //                     </>
// //                   )}
// //                 </button>
// //               </form>
// //             </div>

// //             {/* Right: QR Code */}
// //             <div className="w-full md:w-1/2 bg-gray-50 p-8 border-l border-gray-200 flex flex-col items-center justify-center text-center">
// //                <h4 className="text-lg font-semibold text-gray-600 mb-4">Scan to Pay</h4>
// //                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 mb-4">
// //                  <img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48 object-contain" />
// //                </div>
// //                <p className="text-gray-500 text-sm">Total Amount</p>
// //                {/* --- ⬇️ UX POLISH HERE ⬇️ --- */}
// //                <p className="text-3xl font-bold text-gray-700">₹{planDetails.price}</p>
// //                <div className="mt-6 flex gap-4 justify-center opacity-60 grayscale">
// //                  <CreditCard size={24} /> <span className="font-bold text-sm pt-1">UPI ID: {RECEIVER_UPI_ID}</span>
// //                </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* STEP 2: UPLOAD SCREENSHOT */}
// //         {step === 2 && (
// //           <div className="flex flex-col h-full p-8">
// //             <div className="flex items-center mb-6">
// //               <button 
// //                 onClick={() => setStep(1)} 
// //                 disabled={isSubmitting}
// //                 className="mr-4 p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
// //               >
// //                 <ArrowLeft size={24} className="text-gray-600" />
// //               </button>
// //               <h3 className="text-2xl font-bold text-gray-800">Step 2: Upload Payment Proof</h3>
// //             </div>

// //             <div className="flex flex-col items-center justify-center flex-grow border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-gray-100 transition relative p-10 group">
// //               <input 
// //                 type="file" 
// //                 accept="image/*" 
// //                 onChange={handleFileChange} 
// //                 disabled={isSubmitting}
// //                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
// //               />
              
// //               {previewUrl ? (
// //                 <div className="flex flex-col items-center">
// //                   <img src={previewUrl} alt="Preview" className="h-64 object-contain rounded-lg shadow-md mb-4" />
// //                   <p className="text-green-600 font-medium flex items-center gap-2">
// //                     <CheckCircle size={20} /> Image Selected
// //                   </p>
// //                   <p className="text-xs text-gray-400 mt-2">Click to change image</p>
// //                 </div>
// //               ) : (
// //                 <div className="flex flex-col items-center text-gray-500">
// //                   <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition">
// //                     <Upload size={40} className="text-[#0d1b3f]" />
// //                   </div>
// //                   <p className="text-lg font-medium text-gray-700">Click to Upload Screenshot</p>
// //                   <p className="text-sm text-gray-400 mt-2">Supported formats: JPG, PNG, JPEG (Max 5MB)</p>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="mt-8 flex justify-end">
// //                <button 
// //                  onClick={handleFinalSubmit}
// //                  disabled={!screenshot || isSubmitting}
// //                  className={`py-3 px-8 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition
// //                    ${(!screenshot || isSubmitting) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 transform active:scale-95'}
// //                  `}
// //                >
// //                  {isSubmitting ? (
// //                    <>
// //                      <Loader size={20} className="animate-spin" />
// //                      Submitting...
// //                    </>
// //                  ) : (
// //                    <>
// //                      <CheckCircle size={20} /> Complete Purchase
// //                    </>
// //                  )}
// //                </button>
// //             </div>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // };

// // // --- Main Package Component ---
// // const Package = () => {
// //   const [pack, setPack] = useState([]);
// //   const [isYearly, setIsYearly] = useState(false);
  
// //   // State for Modal
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedPlan, setSelectedPlan] = useState(null);

// //   // Fetch data from backend
// //   useEffect(() => {
// //     const fetchPackages = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5000/api/packages");
// //         setPack(res.data);
// //       } catch (error) {
// //         console.error("❌ Error fetching packages:", error);
// //       }
// //     };

// //     fetchPackages();
// //   }, []); 

// //   // Handle opening the modal
// //   const handleChoosePlan = (category, price, points) => {
// //     setSelectedPlan({
// //       category,
// //       price,
// //       points,
// //       cycle: isYearly ? 'Yearly' : 'Monthly'
// //     });
// //     setIsModalOpen(true);
// //   };

// //   // --- CSS for the 3D Flip ---
// //   const flipStyles = `
// //     .flip-card {
// //       perspective: 1000px;
// //       transform: translateZ(0);
// //     }
// //     .flip-card-inner {
// //       position: relative;
// //       width: 100%;
// //       height: 100%;
// //       transition: transform 0.7s;
// //       transform-style: preserve-3d;
// //       display: grid;
// //     }
// //     .flip-card:hover .flip-card-inner {
// //       transform: rotateY(180deg);
// //     }
// //     .card-face {
// //       grid-area: 1 / 1;
// //       width: 100%;
// //       height: 100%;
// //       -webkit-backface-visibility: hidden;
// //       backface-visibility: hidden;
// //       display: flex; 
// //       flex-direction: column;
// //     }
// //     .card-face-back {
// //       transform: rotateY(180deg);
// //     }
// //   `;

// //   // --- Plan Card FRONT Component ---
// //   const PlanCardFront = ({ category, content, price }) => (
// //     <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full 
// //                   justify-between cursor-pointer">
// //       <div>
// //         <h3 className="text-xl font-bold text-gray-900 mb-1">{category}</h3>
// //         <p className="text-sm text-gray-600 mb-6">{content}</p>
// //       </div>
// //       <div>
// //         <p className="text-2xl font-bold text-green-600 mb-6"><span>₹</span>{price}</p>
// //         <div className="flex items-center text-gray-500 font-semibold text-sm">
// //           <span>See Details</span>
// //           <ArrowRight className="w-4 h-4 ml-1" />
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // --- Plan Card BACK Component ---
// //   const PlanCardBack = ({ category, price, points, buttonText, onChoose }) => (
// //     <div className="bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 
// //                 flex flex-col h-full">
// //       <h3 className="text-xl font-bold text-white mb-6">{category}</h3>
      
// //       {/* Points / Features List */}
// //       <div className="flex-grow overflow-y-auto"> 
// //         {points && points.length > 0 ? (
// //           points.map((point, index) => (
// //             <div key={index} className="flex items-start mb-3">
// //               <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
// //               <p className="ml-3 text-gray-200 leading-snug">{point}</p>
// //             </div>
// //           ))
// //         ) : (
// //           <p className="text-gray-400 italic">No features listed.</p>
// //         )}
// //       </div>

// //       <hr className="my-6 border-gray-600" />
// //       <p className="text-xl font-semibold text-green-400 mb-6"><span>₹</span>{price}</p>
// //       <div className="flex justify-around">
// //         <button
// //           className="bg-white hover:bg-gray-200 text-[#0d1b3f] font-semibold py-2 px-6
// //                       rounded-xl transition duration-200 w-[70%]"
// //           onClick={onChoose}
// //         >
// //           {buttonText}
// //         </button>
// //       </div>
// //     </div>
// //   );

// //   // --- Main Return ---
// //   return (
// //     <div className="">
// //       <style>{flipStyles}</style>
      
// //       {/* Popup Modal */}
// //       <PaymentModal 
// //         isOpen={isModalOpen} 
// //         onClose={() => setIsModalOpen(false)} 
// //         planDetails={selectedPlan}
// //       />

// //       <div className="py-16 px-6 md:px-20">
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
// //           <div className="mt-6 md:mt-0">
// //             <BillingToggle 
// //               isYearly={isYearly} 
// //               onToggle={() => setIsYearly(!isYearly)} 
// //             />
// //           </div>
// //         </div>

// //         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
// //           {pack.length > 0 ? (
// //             pack.map((plan) => {
// //               const monthlyData = plan.monthly || {};
// //               const yearlyData = plan.yearly || {};
// //               const activeData = isYearly ? yearlyData : monthlyData;

// //               const displayPrice = activeData.price || "$0";
// //               const displayPoints = activeData.points || [];
// //               const displayButton = activeData.buttonText || "Choose Plan";

// //               return (
// //                 <div key={plan.id} className="flip-card h-[450px]"> 
// //                   <div className="flip-card-inner">
// //                     {/* Front */}
// //                     <div className="card-face card-face-front">
// //                       <PlanCardFront 
// //                         category={plan.category} 
// //                         content={plan.content}
// //                         price={displayPrice} 
// //                       />
// //                     </div>
// //                     {/* Back */}
// //                     <div className="card-face card-face-back">
// //                       <PlanCardBack 
// //                         category={plan.category}
// //                         price={displayPrice}
// //                         points={displayPoints} 
// //                         buttonText={displayButton}
// //                         // Pass the click handler with current plan data
// //                         onChoose={() => handleChoosePlan(plan.category, displayPrice, displayPoints)}
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })
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
// import { CheckCircle, ArrowRight, X, User, Mail, Phone, Loader } from 'lucide-react'

// // --- Billing Toggle ---
// const BillingToggle = ({ isYearly, onToggle }) => {
//   return (
//     <div className="flex items-center justify-center space-x-3">
//       <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
//       <button onClick={onToggle} className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isYearly ? 'bg-[#0d1b3f]' : 'bg-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#0d1b3f] focus:ring-offset-2`} role="switch" aria-checked={isYearly}>
//         <span aria-hidden="true" className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}></span>
//       </button>
//       <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Yearly</span>
//     </div>
//   )
// }

// // --- Request Modal ---
// const RequestModal = ({ isOpen, onClose, planDetails }) => {
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');

//   useEffect(() => {
//     if (isOpen) {
//       setFormData({ name: '', email: '', phone: '' });
//       setSubmitError('');
//       setIsSubmitting(false);
//     }
//   }, [isOpen]);

//   if (!isOpen || !planDetails) return null;

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
//       setSubmitError("All fields are required.");
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       // No price in payload
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         planCategory: planDetails.category,
//         planCycle: planDetails.cycle,
//       };
//       const response = await axios.post('http://localhost:5000/api/orders', payload);
//       if (response.status === 201) {
//         alert("Request submitted successfully!");
//         onClose();
//       }
//     } catch (error) {
//       setSubmitError(error.response?.data?.message || 'Failed to submit request.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 relative">
//         <button onClick={onClose} disabled={isSubmitting} className="absolute top-4 right-4 z-50 text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
//         <div className="p-8">
//           <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Plan</h3>
//           <p className="text-gray-500 mb-6">Fill in your details to request the <strong>{planDetails.category}</strong> plan.</p>
//           {submitError && <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg mb-4 text-sm">{submitError}</div>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div><label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"><User size={16} /> Name</label><input type="text" name="name" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none" onChange={handleChange} value={formData.name} disabled={isSubmitting} /></div>
//             <div><label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"><Mail size={16} /> Email</label><input type="email" name="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none" onChange={handleChange} value={formData.email} disabled={isSubmitting} /></div>
//             <div><label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1"><Phone size={16} /> Phone</label><input type="tel" name="phone" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none" onChange={handleChange} value={formData.phone} disabled={isSubmitting} /></div>
//             <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-[#0d1b3f] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition flex items-center justify-center gap-2 disabled:opacity-50">
//               {isSubmitting ? <Loader size={18} className="animate-spin" /> : 'Submit Request'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main Package Component ---
// const Package = () => {
//   const [pack, setPack] = useState([]);
//   const [isYearly, setIsYearly] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/packages");
//         setPack(res.data);
//       } catch (error) { console.error("Error:", error); }
//     };
//     fetchPackages();
//   }, []); 

//   const handleChoosePlan = (category, points) => {
//     setSelectedPlan({ category, points, cycle: isYearly ? 'Yearly' : 'Monthly' });
//     setIsModalOpen(true);
//   };

//   const flipStyles = `
//     .flip-card { perspective: 1000px; transform: translateZ(0); }
//     .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.7s; transform-style: preserve-3d; display: grid; }
//     .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
//     .card-face { grid-area: 1 / 1; width: 100%; height: 100%; backface-visibility: hidden; display: flex; flex-direction: column; }
//     .card-face-back { transform: rotateY(180deg); }
//   `;

//   const PlanCardFront = ({ category, content }) => (
//     <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col h-full justify-between cursor-pointer">
//       <div>
//         <h3 className="text-xl font-bold text-gray-900 mb-1">{category}</h3>
//         <p className="text-sm text-gray-600 mb-6">{content}</p>
//       </div>
//       <div>
//         {/* Removed Price Display */}
//         <div className="flex items-center text-blue-600 font-semibold text-lg">
//           <span>View Details</span> <ArrowRight className="w-5 h-5 ml-2" />
//         </div>
//       </div>
//     </div>
//   );

//   const PlanCardBack = ({ category, points, buttonText, onChoose }) => (
//     <div className="bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 flex flex-col h-full">
//       <h3 className="text-xl font-bold text-white mb-6">{category}</h3>
//       <div className="flex-grow overflow-y-auto"> 
//         {points?.length > 0 ? points.map((point, i) => (
//           <div key={i} className="flex items-start mb-3">
//             <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
//             <p className="ml-3 text-gray-200 leading-snug">{point}</p>
//           </div>
//         )) : <p className="text-gray-400 italic">No features listed.</p>}
//       </div>
//       <hr className="my-6 border-gray-600" />
//       {/* Removed Price Display */}
//       <div className="flex justify-around">
//         <button className="bg-white hover:bg-gray-200 text-[#0d1b3f] font-semibold py-2 px-6 rounded-xl transition w-[70%]" onClick={onChoose}>
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="">
//       <style>{flipStyles}</style>
//       <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} planDetails={selectedPlan} />
//       <div className="py-16 px-6 md:px-20">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between md:items-center">
//           <div>
//             <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">PACKAGES</p>
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">Find The Packages That Fit <br /> Your Needs</h2>
//           </div>
//           <div className="mt-6 md:mt-0"><BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} /></div>
//         </div>
//         <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 isolate">
//           {pack.length > 0 ? pack.map((plan) => {
//             const data = isYearly ? plan.yearly || {} : plan.monthly || {};
//             return (
//               <div key={plan.id} className="flip-card h-[450px]"> 
//                 <div className="flip-card-inner">
//                   <div className="card-face card-face-front">
//                     <PlanCardFront category={plan.category} content={plan.content} />
//                   </div>
//                   <div className="card-face card-face-back">
//                     <PlanCardBack category={plan.category} points={data.points || []} buttonText={data.buttonText || "Request Plan"} 
//                       onChoose={() => handleChoosePlan(plan.category, data.points)} 
//                     />
//                   </div>
//                 </div>
//               </div>
//             );
//           }) : <p className="text-gray-600 text-center col-span-3">Loading packages...</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Package;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, ArrowRight, X, User, Mail, Phone, Loader, FileText } from 'lucide-react'

const BillingToggle = ({ isYearly, onToggle }) => (
    <div className="flex items-center justify-center space-x-3 mb-12">
      <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Monthly</span>
      <button onClick={onToggle} className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${isYearly ? 'bg-[#0d1b3f]' : 'bg-gray-300'}`}>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isYearly ? 'translate-x-5' : 'translate-x-0'}`}></span>
      </button>
      <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>Yearly</span>
    </div>
)

// --- Dynamic Request Modal ---
const RequestModal = ({ isOpen, onClose, planDetails }) => {
  // Basic fields
  const [basicData, setBasicData] = useState({ name: '', email: '', phone: '' });
  // Dynamic fields container
  const [dynamicData, setDynamicData] = useState({});
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
        setBasicData({ name: '', email: '', phone: '' });
        setDynamicData({});
        setError('');
    }
  }, [isOpen]);

  if (!isOpen || !planDetails) return null;

  const handleBasicChange = (e) => setBasicData({ ...basicData, [e.target.name]: e.target.value });
  
  const handleDynamicChange = (label, value) => {
      setDynamicData(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate basic
    if (!basicData.name || !basicData.email || !basicData.phone) { setError("Basic details required."); return; }
    
    setIsSubmitting(true);
    try {
      const payload = {
        ...basicData,
        planCategory: planDetails.category,
        planCycle: planDetails.cycle,
        submissionData: dynamicData // Send the custom answers
      };
      
      const res = await axios.post('http://localhost:5000/api/orders', payload);
      if (res.status === 201) { alert("Request Submitted!"); onClose(); }
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    } finally { setIsSubmitting(false); }
  };

  // Helper to render dynamic inputs based on type
  const renderDynamicInput = (field, index) => {
      const commonClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d1b3f] outline-none mt-1";
      
      if (field.type === 'textarea') {
          return <textarea required={field.required} className={commonClasses} placeholder={`Enter ${field.label}`}
            onChange={(e) => handleDynamicChange(field.label, e.target.value)} />;
      }
      return <input type={field.type} required={field.required} className={commonClasses} placeholder={`Enter ${field.label}`}
        onChange={(e) => handleDynamicChange(field.label, e.target.value)} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X size={24} /></button>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Request Plan</h3>
          <p className="text-gray-500 text-sm mb-6">You are requesting: <strong>{planDetails.category}</strong></p>
          
          {error && <div className="bg-red-50 text-red-700 px-4 py-2 rounded mb-4 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fixed Fields */}
            <div className="grid grid-cols-1 gap-3">
                <div><label className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2"><User size={14}/> Name</label><input type="text" name="name" required className="w-full px-3 py-2 border rounded-lg mt-1" value={basicData.name} onChange={handleBasicChange} /></div>
                <div><label className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2"><Mail size={14}/> Email</label><input type="email" name="email" required className="w-full px-3 py-2 border rounded-lg mt-1" value={basicData.email} onChange={handleBasicChange} /></div>
                <div><label className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2"><Phone size={14}/> Phone</label><input type="tel" name="phone" required className="w-full px-3 py-2 border rounded-lg mt-1" value={basicData.phone} onChange={handleBasicChange} /></div>
            </div>

            {/* DYNAMIC FIELDS */}
            {planDetails.formFields && planDetails.formFields.length > 0 && (
                <div className="border-t pt-4 mt-4">
                    <h4 className="text-sm font-bold text-[#0d1b3f] mb-3">Additional Details</h4>
                    <div className="space-y-3">
                        {planDetails.formFields.map((field, idx) => (
                            <div key={idx}>
                                <label className="text-xs font-bold text-gray-600 uppercase flex items-center gap-2">
                                    <FileText size={14}/> {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {renderDynamicInput(field, idx)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#0d1b3f] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition flex items-center justify-center gap-2 mt-6">
              {isSubmitting ? <Loader size={18} className="animate-spin" /> : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Package = () => {
  const [pack, setPack] = useState([]);
  const [isYearly, setIsYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => { axios.get("http://localhost:5000/api/packages").then(res => setPack(res.data)); }, []);

  const handleChoose = (pkg, data) => {
    // Pass the formFields from the package to the modal
    setSelectedPlan({ 
        category: pkg.category, 
        cycle: isYearly ? 'Yearly' : 'Monthly',
        formFields: pkg.formFields // Important: Pass this
    });
    setIsModalOpen(true);
  };

  const flipStyles = `
    .flip-card { perspective: 1000px; transform: translateZ(0); }
    .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.7s; transform-style: preserve-3d; display: grid; }
    .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
    .card-face { grid-area: 1 / 1; width: 100%; height: 100%; backface-visibility: hidden; display: flex; flex-direction: column; }
    .card-face-back { transform: rotateY(180deg); }
  `;

  return (
    <div>
      <style>{flipStyles}</style>
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} planDetails={selectedPlan} />
      <div className="py-16 px-6 md:px-20">
        <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
            <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {pack.map(pkg => {
                const data = isYearly ? pkg.yearly : pkg.monthly;
                return (
                    <div key={pkg.id} className="flip-card h-[400px]">
                        <div className="flip-card-inner">
                            <div className="card-face card-face-front bg-white shadow-xl rounded-xl p-6 flex flex-col justify-between">
                                <div><h3 className="text-xl font-bold">{pkg.category}</h3><p className="text-gray-500">{pkg.content}</p></div>
                                <div className="text-blue-600 font-semibold flex items-center">View Details <ArrowRight className="ml-2" size={16}/></div>
                            </div>
                            <div className="card-face card-face-back bg-[#0d1b3f] text-white shadow-xl rounded-xl p-6 flex flex-col">
                                <h3 className="text-xl font-bold mb-4">{pkg.category}</h3>
                                <div className="flex-grow overflow-y-auto space-y-2">
                                    {data.points.map((p, i) => <div key={i} className="flex items-start gap-2"><CheckCircle size={16} className="text-green-400 mt-1 shrink-0"/><span>{p}</span></div>)}
                                </div>
                                <button onClick={() => handleChoose(pkg, data)} className="w-full bg-white text-[#0d1b3f] font-bold py-2 rounded-lg mt-4 hover:bg-gray-100">{data.buttonText}</button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default Package;