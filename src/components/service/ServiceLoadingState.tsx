
import React from "react";

const ServiceLoadingState = () => {
  return (
    <div className="container px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-40 bg-gray-200 rounded mb-4"></div>
      </div>
    </div>
  );
};

export default ServiceLoadingState;
