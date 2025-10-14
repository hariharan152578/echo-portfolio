import React from 'react'
import greens from "../assets/img/greens.png"
import travel from "../assets/img/Travel.png"
import MRM from "../assets/img/MRMPG.png"
import travelling from "../assets/img/Travelling.png"

const Projects = () => {
  return (
    <div className='bg-white mt-16 py-16 px-6 md:px-20'>
      
      {/* Header Section */}
      <div className="text-left mb-12">
        <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
          Our Portfolio
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
          We provide the Perfect Solution <br /> 
          to your business growth
        </h2>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 gap-16">
        
        {/* Left Column */}
        <div className="flex flex-col gap-14">
          {/* Greens Technology */}
          <div>
            <img src={greens} alt="Greens Technology" className="w-full " />
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
              Greens Technology
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
              This is a website for a client who want to achieve their goals and meet their users’ needs while also increasing their reach. Across all platforms. This is a website rebrand.
            </p>
          </div>

          {/* Travel Suggestion App */}
          <div>
            <img src={travel} alt="Travel Suggestion App" className="w-full " />
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
              Travel Suggestion App
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
              This is a website for a client who want to achieve their goals and meet their users’ needs while also increasing their reach. Across all platforms. This is a website rebrand.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between gap-14">
          {/* MRM PG Accommodation */}
          <div>
            <img src={MRM} alt="MRM PG Accommodation" className="w-full " />
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
              MRM PG Accommodation
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
              This is a website for a client who want to achieve their goals and meet their users’ needs while also increasing their reach. Across all platforms. This is a website rebrand.
            </p>
          </div>

          {/* Travelling Website */}
          <div>
            <img src={travelling} alt="Travelling Website" className="w-full " />
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mt-4">
              Travelling Website
            </h3>
            <p className="text-gray-600 mt-2 leading-relaxed text-sm md:text-base">
              This is a website for a client who want to achieve their goals and meet their users’ needs while also increasing their reach. Across all platforms. This is a website rebrand.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
