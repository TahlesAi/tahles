
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface ParticipantsStepProps {
  selectedRange?: string;
  onSelect: (range: string) => void;
}

const participantRanges = [
  '1-50',
  '51-100', 
  '101-200',
  '201-500',
  '501+'
];

export const ParticipantsStep: React.FC<ParticipantsStepProps> = ({ selectedRange, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">כמה משתתפים?</h2>
        <p className="text-gray-600">בחרו את מספר המשתתפים הצפוי (לא חובה)</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {participantRanges.map((range) => (
          <Button
            key={range}
            variant={selectedRange === range ? "default" : "outline"}
            className="h-12 text-lg"
            onClick={() => onSelect(range)}
          >
            {range} משתתפים
          </Button>
        ))}
      </div>
    </div>
  );
};
