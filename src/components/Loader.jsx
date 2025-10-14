import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#CDD8FF] text-gray-800 z-50">
      <div className="relative">
        {/* Spinner animation */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-lg font-semibold animate-pulse">Loading...</p>
    </div>
  );
};

export default Loader;
