
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface LocationStepProps {
  location?: string;
  onLocationChange: (location: string) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({ location, onLocationChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <MapPin className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">איפה האירוע?</h2>
        <p className="text-gray-600">הזינו את מיקום האירוע (לא חובה)</p>
      </div>
      
      <div>
        <Label htmlFor="location">מיקום בארץ (לא חובה)</Label>
        <Input
          id="location"
          placeholder="למשל: תל אביב, ירושלים, חיפה..."
          value={location || ''}
          onChange={(e) => onLocationChange(e.target.value)}
          className="text-right"
        />
      </div>
    </div>
  );
};
