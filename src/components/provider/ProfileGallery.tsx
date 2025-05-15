
import React from 'react';

interface ProfileGalleryProps {
  activeImage: string;
  images: string[];
  onImageSelect: (image: string) => void;
  providerName: string;
}

const ProfileGallery = ({ activeImage, images, onImageSelect, providerName }: ProfileGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-lg overflow-hidden">
        <img 
          src={activeImage || "/placeholder.svg"} 
          alt={providerName} 
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2" dir="rtl">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`h-20 w-32 rounded-md overflow-hidden cursor-pointer border-2 ${
                activeImage === image ? "border-brand-500" : "border-transparent"
              }`}
              onClick={() => onImageSelect(image)}
            >
              <img 
                src={image} 
                alt={`${providerName} ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileGallery;
