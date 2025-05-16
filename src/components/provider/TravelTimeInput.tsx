
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface TravelTimeInputProps {
  travelTime: string;
  onChangeTravelTime: (value: string) => void;
}

const TravelTimeInput = ({ travelTime, onChangeTravelTime }: TravelTimeInputProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-brand-500" />
          <span>זמן נסיעה</span>
        </CardTitle>
        <CardDescription>הגדר את זמן הנסיעה המקסימלי שאתה מוכן לנסוע למיקום האירוע</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="travel-time">זמן נסיעה מקסימלי</Label>
          <Input
            id="travel-time"
            type="text"
            placeholder="לדוגמה: עד 60 דקות"
            dir="rtl"
            value={travelTime}
            onChange={(e) => {
              // Limit to 30 characters
              if (e.target.value.length <= 30) {
                onChangeTravelTime(e.target.value);
              }
            }}
            className="max-w-[300px]"
          />
          <p className="text-xs text-gray-500">
            מידע זה יוצג בכרטיס הספק שלך ויעזור ללקוחות להעריך את זמינותך לאירועים במיקומים שונים.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelTimeInput;
