import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountItem from '../components/CountItem';

const Count = () => {
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/counts')
      .then((res) => {
        setCounts(res.data);
      })
      .catch((err) => console.error('Error fetching counts:', err));
  }, []);

  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        
        {/* Optional Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Achievements
          </h2>
          <p className="text-gray-600 mt-4">
            Milestones we are proud of achieving over the years.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-8">
          {counts.length > 0 ? (
            counts.map((item) => (
              <CountItem
                key={item.id}
                limit_value={item.limit_value}
                prefix={item.prefix}
                suffix={item.suffix}
                icon={item.icon}
                content={item.content}
              />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">Loading stats...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Count;