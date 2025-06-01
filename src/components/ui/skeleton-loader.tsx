
import React from "react";

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'image';
  count?: number;
}

export const SkeletonLoader = ({ 
  className = "", 
  variant = 'card',
  count = 1 
}: SkeletonLoaderProps) => {
  const baseClasses = "animate-pulse bg-gray-200 rounded";
  
  const variants = {
    card: "h-48 w-full",
    text: "h-4 w-3/4",
    circle: "h-12 w-12 rounded-full",
    image: "h-32 w-full"
  };
  
  const skeletonClass = `${baseClasses} ${variants[variant]} ${className}`;
  
  if (count === 1) {
    return <div className={skeletonClass} />;
  }
  
  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={skeletonClass} />
      ))}
    </div>
  );
};

export const CategorySkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
        <SkeletonLoader variant="circle" className="mx-auto mb-4" />
        <SkeletonLoader variant="text" className="mx-auto mb-2" />
        <SkeletonLoader variant="text" className="mx-auto w-1/2 mb-4" />
        <SkeletonLoader variant="text" className="mx-auto w-1/3" />
      </div>
    ))}
  </div>
);

export const ProviderSkeleton = () => (
  <div className="space-y-6">
    {Array.from({ length: 4 }, (_, i) => (
      <div key={i} className="bg-white rounded-lg p-6 shadow-sm flex gap-4">
        <SkeletonLoader variant="image" className="w-24 h-24" />
        <div className="flex-1 space-y-3">
          <SkeletonLoader variant="text" className="w-1/3" />
          <SkeletonLoader variant="text" className="w-full" />
          <SkeletonLoader variant="text" className="w-2/3" />
        </div>
      </div>
    ))}
  </div>
);
