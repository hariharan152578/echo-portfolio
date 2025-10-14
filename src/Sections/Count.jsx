import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Count = () => {
  const [counts, setCounts] = useState([]);
  const [currentCounts, setCurrentCounts] = useState([]);

  // ✅ Fetch data from backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/counts')
      .then((res) => {
        setCounts(res.data);
        setCurrentCounts(res.data.map(() => 0)); // initialize animation counters
      })
      .catch((err) => console.error('Error fetching counts:', err));
  }, []);

  // ✅ Animation effect (same as before)
  useEffect(() => {
    if (counts.length === 0) return;

    const intervals = [];

    counts.forEach((item, index) => {
      let count = 0;
      const totalDuration = 3000; // total duration in ms
      const frameRate = 20; // frames per second
      const totalFrames = Math.round(totalDuration / (1000 / frameRate));
      const increment = item.limit_value / totalFrames;

      const interval = setInterval(() => {
        count += increment;

        setCurrentCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(count);
          return newCounts;
        });

        if (count >= item.limit_value) {
          clearInterval(interval);
          setCurrentCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = item.limit_value;
            return newCounts;
          });
        }
      }, 1000 / frameRate);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [counts]);

  return (
    <div className="flex justify-around mt-10 px-6 md:px-20 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {counts.map((item, index) => (
          <div
            key={item.id}
            className="text-center p-4 transition grid gap-1 border-r-2 border-gray-300 duration-300"
          >
            <p className="text-5xl mb-2">{item.icon}</p>
            <p className="text-gray-800 mt-2 text-s font-medium">{item.content}</p>
            <p className="text-4xl md:text-3xl font-bold justify-center text-emerald-600 items-center gap-2 transition-all duration-500">
              {item.prefix}
              {currentCounts[index]}
              {item.suffix}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Count;
