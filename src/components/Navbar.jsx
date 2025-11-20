import React, { useState, useEffect } from 'react'
import echologo from '../assets/logo/echologo.png'
import serviceiconopen from '../assets/icon/chevron-down.svg'
import serviceiconclose from '../assets/icon/chevron-up.svg'

const Navbar = () => {
  const [isServiceOpen, setIsServiceOpen] = useState(false) // desktop dropdown
  const [isMenuOpen, setIsMenuOpen] = useState(false) // mobile sidebar
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false) // mobile dropdown

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
  }, [isMenuOpen])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
      setIsMobileServiceOpen(false)
    }
  }

  // Close dropdowns when clicking outside (for desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isServiceOpen && !event.target.closest('.services-dropdown')) {
        setIsServiceOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isServiceOpen])

  return (
    <div className="top-0 left-0 w-full flex items-center justify-between p-2 md:p-4 bg-[#CDD8FF] shadow-md z-[10000]">
      {/* Logo */}
      <img src={echologo} alt="Echo logo" className="h-14 w-auto" />

      {/* Hamburger Icon (Mobile only) */}
      <div className="md:hidden z-[10002]">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="focus:outline-none p-2"
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
        {/* <div className="relative flex items-center cursor-pointer services-dropdown">
          <span
            onClick={() => setIsServiceOpen(!isServiceOpen)}
            className="flex items-center gap-1 text-gray-700 font-semibold select-none hover:text-blue-700 transition-colors"
          >
            Services
            <img
              src={isServiceOpen ? serviceiconclose : serviceiconopen}
              alt="toggle icon"
              className="w-4 h-4 ml-1"
            />
          </span>

          {isServiceOpen && (
            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-md p-3 space-y-2 w-48 z-[10001] border border-gray-200">
              <button
                onClick={() => scrollToSection('web-dev')}
                className="block text-sm text-gray-700 hover:text-blue-600 text-left w-full py-2 px-3 rounded hover:bg-gray-50 transition-colors"
              >
                Web Development
              </button>
              <button
                onClick={() => scrollToSection('app-dev')}
                className="block text-sm text-gray-700 hover:text-blue-600 text-left w-full py-2 px-3 rounded hover:bg-gray-50 transition-colors"
              >
                App Development
              </button>
              <button
                onClick={() => scrollToSection('ui-ux')}
                className="block text-sm text-gray-700 hover:text-blue-600 text-left w-full py-2 px-3 rounded hover:bg-gray-50 transition-colors"
              >
                UI/UX Design
              </button>
            </div>
          )}
        </div> */}

        {/* Other Links */}
        {[
          { id: 'home', label: 'About Us' },
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
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[10001] md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center p-4 border-b">
          <img src={echologo} alt="Echo logo" className="h-10 w-auto" />
        </div>

        <div className="flex flex-col space-y-1 p-4 text-gray-800 font-semibold">
          {/* Mobile Services Dropdown */}
         
          {/* Other Mobile Links */}
          {[
            { id: 'home', label: 'Services' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'packages', label: 'Packages' },
            { id: 'contact', label: 'Contact Us' },
          ].map((link, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(link.id)}
              className="py-3 px-4 rounded-lg hover:bg-gray-50 hover:text-blue-700 transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay (click to close) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000] md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default Navbar