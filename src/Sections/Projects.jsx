
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Adjust port if your backend runs on a different one
  const API_URL = "http://localhost:5000"; 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        setProjectsData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-24">Loading...</div>;

  return (
    <div className='bg-slate-50 py-24'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-left mb-16">
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">
            Our Portfolio
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 leading-snug">
            We provide the Perfect Solution <br /> 
            to your business growth
          </h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsData.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden 
                         transform transition-all duration-300 
                         hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              {/* Image Section */}
              {project.image_url ? (
                <img 
                  src={`${API_URL}${project.image_url}`} 
                  alt={project.alt_text || project.title} 
                  className="w-full aspect-video object-fill" 
                />
              ) : (
                <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
              )}
              
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-3 text-base leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* --- LIVE URL BUTTON --- */}
                {/* Only render if live_url exists in the database */}
                {project.live_url && (
                  <div className="mt-auto pt-4">
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Visit Live Site 
                      {/* Small Arrow Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects;