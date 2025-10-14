
import React, { useRef, useEffect, useState } from 'react';
import leftarrow from "../assets/icon/chevron-left.svg";
import rightarrow from "../assets/icon/chevron-right.svg";
import axios from 'axios';
import '../index.css'; // Keep your scroll-hide styles

const Testimonials = () => {
  const [content, setContent] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials');
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  const scrollLeft = () => containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRight = () => containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <div className='bg-white py-16 px-6 md:px-20 relative'>
      <div className="text-left mb-12 flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">TESTIMONIALS</p>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-3 leading-snug">
            See What Our Customer <br /> 
            Say About Us
          </h2>
        </div>

        <div className="flex gap-2">
          <button onClick={scrollLeft} className="bg-gray-300 p-5 rounded-full hover:bg-gray-400"><img src={leftarrow} alt="" /></button>
          <button onClick={scrollRight} className="bg-gray-300 p-5 rounded-full hover:bg-gray-400"><img src={rightarrow} alt="" /></button>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-10 p-5 overflow-x-auto scroll-hide scroll-smooth">
        {content.map((item) => (
          <div key={item.id} className="w-[300px] md:w-[400px] bg-white shadow-md py-4 px-10 rounded-lg flex-shrink-0 flex flex-col justify-between gap-4">
            <p className="text-gray-700 italic mb-4">"{item.testimonial_text}"</p>
            <div className='flex gap-4'>
              <img 
                src={item.avatar_url ? `http://localhost:5000${item.avatar_url}` : '/default-avatar.png'} 
                alt={item.customer_name}  
                className="w-12 h-12 rounded-full mb-2"
              />
              <div>
                <p className="font-semibold text-gray-900">{item.customer_name}</p>
                <p className="text-gray-500 text-sm">{item.customer_designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
