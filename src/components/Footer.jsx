import React from 'react'
import echologo from '../assets/logo/echologo.png'
import facebook from '../assets/icon/facebook.svg'
import twitter from '../assets/icon/twitter.svg'
import linkedin from '../assets/icon/linkedin.svg'
import instagram from '../assets/icon/instagram.svg'

const Footer = () => {
  return (
    <footer className="bg-[#CDD8FF] py-10 px-6 md:px-20 text-blue-950">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* --- Company Info --- */}
        <div>
          <img src={echologo} alt="Echo Digital Works logo" className="w-40 mb-4" />
          <p className="text-sm leading-relaxed">
            Echo Digital Works creates websites, apps, and digital marketing solutions to help businesses grow online.
          </p>

          <div className="flex gap-3 mt-5">
            <a href="#" target="_blank" rel="noreferrer">
              <img
                src={facebook}
                alt="Facebook"
                className="w-8 h-8 bg-blue-950 p-2 rounded-full hover:bg-blue-800 transition"
              />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img
                src={twitter}
                alt="Twitter"
                className="w-8 h-8 bg-blue-950 p-2 rounded-full hover:bg-blue-800 transition"
              />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-8 h-8 bg-blue-950  p-2 rounded-full hover:bg-blue-800 transition"
              />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <img
                src={instagram}
                alt="Instagram"
                className="w-8 h-8 bg-blue-950 p-2 rounded-full hover:bg-blue-800 transition"
              />
            </a>
          </div>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-blue-800 transition">Home</a></li>
            <li><a href="#services" className="hover:text-blue-800 transition">Services</a></li>
            <li><a href="#projects" className="hover:text-blue-800 transition">Projects</a></li>
            <li><a href="#packages" className="hover:text-blue-800 transition">Packages</a></li>
            <li><a href="#contact" className="hover:text-blue-800 transition">Contact</a></li>
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-sm">Echo Digital Works Pvt. Ltd.</p>
          <p className="text-sm">123 Innovation Street, Chennai, India</p>
          <p className="text-sm mt-2">Email: <a href="mailto:info@echodigital.com" className="hover:text-blue-800 transition">info@echodigital.com</a></p>
          <p className="text-sm">Phone: <a href="tel:+919876543210" className="hover:text-blue-800 transition">+91 98765 43210</a></p>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="border-t border-blue-300 mt-10 pt-4 text-center text-sm text-blue-900">
        © {new Date().getFullYear()} Echo Digital Works. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
