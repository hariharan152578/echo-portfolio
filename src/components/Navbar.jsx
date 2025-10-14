// import React, { useState, useEffect } from 'react'
// import { NavLink } from 'react-router-dom'
// import echologo from '../assets/logo/echologo.png'
// import serviceiconopen from '../assets/icon/chevron-down.svg'
// import serviceiconclose from '../assets/icon/chevron-up.svg'

// const Navbar = () => {
//   const [isServiceOpen, setIsServiceOpen] = useState(false)
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   // Prevent background scroll when sidebar is open
//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
//   }, [isMenuOpen])

//   return (
//     <>
//       <div className="flex items-center justify-between p-4 bg-[#CDD8FF] relative z-50">
//         {/* Logo */}
//         <img src={echologo} alt="Echo logo" className="h-14 w-auto" />

//         {/* Hamburger Icon (Mobile only) */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="focus:outline-none"
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-7 w-7 text-gray-800"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <div className="space-y-1.5">
//                 <span className="block w-6 h-0.5 bg-gray-800"></span>
//                 <span className="block w-6 h-0.5 bg-gray-800"></span>
//                 <span className="block w-6 h-0.5 bg-gray-800"></span>
//               </div>
//             )}
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-10 text-black mr-5">
//           {/* Services Dropdown */}
//           <div className="relative flex items-center cursor-pointer">
//             <span
//               onClick={() => setIsServiceOpen(!isServiceOpen)}
//               className="flex items-center gap-1 text-gray-700 font-semibold select-none"
//             >
//               Services
//               <img
//                 src={isServiceOpen ? serviceiconclose : serviceiconopen}
//                 alt="toggle icon"
//                 className="w-4 h-4 ml-1"
//               />
//             </span>

//             {isServiceOpen && (
//               <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md p-3 space-y-2 w-44 z-30">
//                 <NavLink
//                   to="/web-dev"
//                   className="block text-sm text-gray-700 hover:text-blue-600"
//                 >
//                   Web Development
//                 </NavLink>
//                 <NavLink
//                   to="/app-dev"
//                   className="block text-sm text-gray-700 hover:text-blue-600"
//                 >
//                   App Development
//                 </NavLink>
//                 <NavLink
//                   to="/ui-ux"
//                   className="block text-sm text-gray-700 hover:text-blue-600"
//                 >
//                   UI/UX Design
//                 </NavLink>
//               </div>
//             )}
//           </div>

//           {/* Other Links */}
//           {[
//             { to: '/about', label: 'About Us' },
//             { to: '/portfolio', label: 'Portfolio' },
//             { to: '/testimonials', label: 'Testimonials' },
//             { to: '/packages', label: 'Packages' },
//             { to: '/contact', label: 'Contact Us' },
//           ].map((link, i) => (
//             <NavLink
//               key={i}
//               to={link.to}
//               className="text-gray-700 font-semibold hover:text-blue-700 transition-colors"
//             >
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Mobile Sidebar Menu */}
//         <div
//           className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
//             isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//           } md:hidden`}
//         >
//           {/* Header */}
//           <div className="flex justify-between items-center p-4 border-b">
//             <img src={echologo} alt="Echo logo" className="h-10 w-auto" />
//             <button
//               onClick={() => setIsMenuOpen(false)}
//               className="text-gray-700 focus:outline-none"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Menu Links */}
//           <div className="flex flex-col space-y-4 p-6 text-gray-800 font-semibold">
//             {/* Services Dropdown */}
//             <div className="flex flex-col space-y-2">
//               <button
//                 onClick={() => setIsServiceOpen(!isServiceOpen)}
//                 className="flex items-center justify-between"
//               >
//                 <span>Services</span>
//                 <img
//                   src={isServiceOpen ? serviceiconclose : serviceiconopen}
//                   alt="toggle"
//                   className="w-4 h-4"
//                 />
//               </button>

//               {isServiceOpen && (
//                 <div className="flex flex-col pl-4 space-y-2 text-sm text-gray-600">
//                   <NavLink to="/web-dev" onClick={() => setIsMenuOpen(false)}>
//                     Web Development
//                   </NavLink>
//                   <NavLink to="/app-dev" onClick={() => setIsMenuOpen(false)}>
//                     App Development
//                   </NavLink>
//                   <NavLink to="/ui-ux" onClick={() => setIsMenuOpen(false)}>
//                     UI/UX Design
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             {[
//               { to: '/about', label: 'About Us' },
//               { to: '/portfolio', label: 'Portfolio' },
//               { to: '/testimonials', label: 'Testimonials' },
//               { to: '/packages', label: 'Packages' },
//               { to: '/contact', label: 'Contact Us' },
//             ].map((link, i) => (
//               <NavLink
//                 key={i}
//                 to={link.to}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="hover:text-blue-700 transition-colors"
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>
//         </div>

//         {/* Overlay */}
//         {isMenuOpen && (
//           <div
//             className="fixed inset-0  z-40 md:hidden transition-opacity duration-300"
//             onClick={() => setIsMenuOpen(false)}
//           ></div>
//         )}
//       </div>
//     </>
//   )
// }

// export default Navbar

import React, { useState, useEffect } from 'react'
import echologo from '../assets/logo/echologo.png'
import serviceiconopen from '../assets/icon/chevron-down.svg'
import serviceiconclose from '../assets/icon/chevron-up.svg'

const Navbar = () => {
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
  }, [isMenuOpen])

  // Function to scroll to section smoothly
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false) // Close mobile menu
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-[#CDD8FF] relative z-50">
        {/* Logo */}
        <img src={echologo} alt="Echo logo" className="h-14 w-auto" />

        {/* Hamburger Icon (Mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
                <span className="block w-6 h-0.5 bg-gray-800"></span>
              </div>
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-black mr-5">
          {/* Services Dropdown */}
          <div className="relative flex items-center cursor-pointer">
            <span
              onClick={() => setIsServiceOpen(!isServiceOpen)}
              className="flex items-center gap-1 text-gray-700 font-semibold select-none"
            >
              Services
              <img
                src={isServiceOpen ? serviceiconclose : serviceiconopen}
                alt="toggle icon"
                className="w-4 h-4 ml-1"
              />
            </span>

            {isServiceOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md p-3 space-y-2 w-44 z-30">
                <button
                  onClick={() => scrollToSection('web-dev')}
                  className="block text-sm text-gray-700 hover:text-blue-600 text-left w-full"
                >
                  Web Development
                </button>
                <button
                  onClick={() => scrollToSection('app-dev')}
                  className="block text-sm text-gray-700 hover:text-blue-600 text-left w-full"
                >
                  App Development
                </button>
                <button
                  onClick={() => scrollToSection('ui-ux')}
                  className="block text-sm text-gray-700 hover:text-blue-600 text-left w-full"
                >
                  UI/UX Design
                </button>
              </div>
            )}
          </div>

          {/* Other Links */}
          {[
            { id: 'about', label: 'About Us' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'packages', label: 'Packages' },
            { id: 'contact', label: 'Contact Us' },
          ].map((link, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(link.id)}
              className="text-gray-700 font-semibold hover:text-blue-700 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <img src={echologo} alt="Echo logo" className="h-10 w-auto" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 focus:outline-none"
            >
              ✖
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col space-y-4 p-6 text-gray-800 font-semibold">
            {/* Services Dropdown */}
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => setIsServiceOpen(!isServiceOpen)}
                className="flex items-center justify-between"
              >
                <span>Services</span>
                <img
                  src={isServiceOpen ? serviceiconclose : serviceiconopen}
                  alt="toggle"
                  className="w-4 h-4"
                />
              </button>

              {isServiceOpen && (
                <div className="flex flex-col pl-4 space-y-2 text-sm text-gray-600">
                  <button onClick={() => scrollToSection('web-dev')}>Web Development</button>
                  <button onClick={() => scrollToSection('app-dev')}>App Development</button>
                  <button onClick={() => scrollToSection('ui-ux')}>UI/UX Design</button>
                </div>
              )}
            </div>

            {[
              { id: 'about', label: 'About Us' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'packages', label: 'Packages' },
              { id: 'contact', label: 'Contact Us' },
            ].map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-blue-700 transition-colors text-left w-full"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </div>
    </>
  )
}

export default Navbar
