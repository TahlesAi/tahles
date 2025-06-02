
import React from "react";
import { cn } from "@/lib/utils";

interface AdvancedSkeletonLoaderProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'image' | 'provider' | 'search-result';
  count?: number;
  minLoadTime?: number;
}

export const AdvancedSkeletonLoader = ({ 
  className = "", 
  variant = 'card',
  count = 1,
  minLoadTime = 300
}: AdvancedSkeletonLoaderProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), minLoadTime);
    return () => clearTimeout(timer);
  }, [minLoadTime]);

  if (!isVisible) return null;

  const baseClasses = "animate-pulse bg-gray-200 rounded";
  
  const variants = {
    card: "h-64 w-full",
    text: "h-4 w-3/4",
    circle: "h-12 w-12 rounded-full",
    image: "h-48 w-full",
    provider: "h-32 w-full",
    'search-result': "h-56 w-full"
  };
  
  const skeletonClass = cn(baseClasses, variants[variant], className);
  
  if (variant === 'search-result') {
    const items = Array.from({ length: count }, (_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className={cn(baseClasses, "h-48 w-full")} />
        <div className="p-4 space-y-3">
          <div className={cn(baseClasses, "h-6 w-3/4")} />
          <div className={cn(baseClasses, "h-4 w-1/2")} />
          <div className={cn(baseClasses, "h-4 w-full")} />
          <div className={cn(baseClasses, "h-4 w-2/3")} />
          <div className="flex justify-between items-center mt-4">
            <div className={cn(baseClasses, "h-8 w-20")} />
            <div className={cn(baseClasses, "h-8 w-24")} />
          </div>
        </div>
      </div>
    ));
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items}
      </div>
    );
  }

  if (variant === 'provider') {
    const items = Array.from({ length: count }, (_, i) => (
      <div key={i} className="bg-white rounded-lg p-6 shadow-sm flex gap-4">
        <div className={cn(baseClasses, "w-24 h-24 rounded-full")} />
        <div className="flex-1 space-y-3">
          <div className={cn(baseClasses, "h-6 w-1/3")} />
          <div className={cn(baseClasses, "h-4 w-full")} />
          <div className={cn(baseClasses, "h-4 w-2/3")} />
          <div className="flex gap-2 mt-3">
            <div className={cn(baseClasses, "h-6 w-16")} />
            <div className={cn(baseClasses, "h-6 w-20")} />
          </div>
        </div>
      </div>
    ));
    
    return <div className="space-y-4">{items}</div>;
  }
  
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

export const SearchResultsSkeleton = () => (
  <AdvancedSkeletonLoader variant="search-result" count={6} />
);

export const ProviderListSkeleton = () => (
  <AdvancedSkeletonLoader variant="provider" count={4} />
);

export default AdvancedSkeletonLoader;
