
import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const RatingDisplay: React.FC<RatingDisplayProps> = ({ 
  rating, 
  reviewCount = 0, 
  size = 'md',
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.round(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      {showText && (
        <div className={`${textSizeClasses[size]} text-gray-600 flex items-center gap-1`}>
          <span className="font-medium">{rating.toFixed(1)}</span>
          {reviewCount > 0 && (
            <span>({reviewCount} ביקורות)</span>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingDisplay;
