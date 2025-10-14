import React from 'react'
import Heroimg from '../assets/img/Heroimg.png'

const Homepages = () => {
  return (
    <>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center bg-[#CDD8FF] px-6 md:px-20 py-10">
          {/* Left Text Section */}
          <div className="flex flex-col justify-center items-center md:items-start gap-6 text-center md:text-left w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-snug">
              Increase Your Customers’ Loyalty and Satisfaction
            </h1>
            <p className="text-gray-700 text-sm md:text-base max-w-md">
              We help businesses like yours earn more customers, stand out from competitors, 
              and make more money.
            </p>
            <button className="bg-[#20b15a] text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 text-sm md:text-base font-semibold mb-5 md:mb-0">
              Get Started
            </button>
          </div>

          {/* Right Image Section */}
          <div className="w-full md:w-auto flex justify-center mb-8 md:mb-0">
            <img
              src={Heroimg}
              alt="Hero"
              className="w-[85%] md:w-full max-w-[650px] h-auto"
            />
          </div>
        </div>

        {/* Info Highlights Section */}
        <div className="flex flex-col md:flex-row justify-around items-center bg-white py-6 gap-6 md:gap-0 shadow-sm z-20 -mt-10 relative  mb-5">
          {[
            "Turning Ideas Into Digital Success",
            "Innovative Solutions for a Digital World",
            "Your Growth is Our Digital Mission",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-gray-800 text-center md:text-left"
            >
              <span className="text-green-600 font-bold text-2xl">&#9830;</span>
              <p className="text-sm md:text-base font-medium">{text}</p>
              <span className="text-orange-600 font-bold text-2xl">&#9830;</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Homepages
