
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MapPin } from "lucide-react";

interface LocationDisplayOptionProps {
  showLocation: boolean;
  onToggleShowLocation: (value: boolean) => void;
}

const LocationDisplayOption = ({ showLocation, onToggleShowLocation }: LocationDisplayOptionProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-500" />
          <span>הצגת מיקום</span>
        </CardTitle>
        <CardDescription>האם תרצה להציג את המיקום שלך בכרטיס הספק?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label htmlFor="show-location" className="font-medium">
            הצג את המיקום שלי בכרטיס הספק
          </Label>
          <Switch 
            id="show-location" 
            checked={showLocation} 
            onCheckedChange={onToggleShowLocation}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {showLocation 
            ? "המיקום שלך יוצג בכרטיס הספק. זה יכול לעזור ללקוחות להעריך מרחקי נסיעה."
            : "המיקום שלך לא יוצג בכרטיס הספק."
          }
        </p>
      </CardContent>
    </Card>
  );
};

export default LocationDisplayOption;
