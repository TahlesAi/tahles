
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ChevronRight } from "lucide-react";

interface AttendeesStepProps {
  attendeesCount?: string;
  onSelect: (count: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const AttendeesStep = ({ attendeesCount, onSelect, onNext, onBack }: AttendeesStepProps) => {
  const [selectedRange, setSelectedRange] = useState(attendeesCount || "");

  const attendeeRanges = [
    { id: "1-10", label: "1-10 אנשים", subtitle: "אירוע אינטימי" },
    { id: "11-20", label: "11-20 אנשים", subtitle: "קבוצה קטנה" },
    { id: "21-50", label: "21-50 אנשים", subtitle: "אירוע בינוני" },
    { id: "51-100", label: "51-100 אנשים", subtitle: "אירוע גדול" },
    { id: "101-200", label: "101-200 אנשים", subtitle: "אירוע מרכזי" },
    { id: "201-500", label: "201-500 אנשים", subtitle: "כנס גדול" },
    { id: "501+", label: "מעל 500 אנשים", subtitle: "אירוע ענק" }
  ];

  const handleRangeSelect = (rangeId: string) => {
    setSelectedRange(rangeId);
    onSelect(rangeId);
  };

  const handleNext = () => {
    if (selectedRange) {
      onNext();
    }
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold">כמה אנשים ישתתפו?</h3>
        </div>
        <p className="text-gray-600 text-sm">בחרו את טווח המשתתפים המשוער</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
        {attendeeRanges.map((range) => (
          <Card
            key={range.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
              selectedRange === range.id 
                ? 'border-purple-500 bg-purple-50 shadow-md' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => handleRangeSelect(range.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <div className={`font-semibold text-base ${
                    selectedRange === range.id ? 'text-purple-700' : 'text-gray-900'
                  }`}>
                    {range.label}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{range.subtitle}</div>
                </div>
                <div className={`rounded-full w-6 h-6 border-2 flex items-center justify-center ${
                  selectedRange === range.id 
                    ? 'border-purple-500 bg-purple-500' 
                    : 'border-gray-300'
                }`}>
                  {selectedRange === range.id && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRange && (
        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-center">
          <p className="text-sm text-purple-700">
            ✅ נבחר: {attendeeRanges.find(r => r.id === selectedRange)?.label}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} className="flex items-center px-6 py-3 h-12">
          <ChevronRight className="ml-2 h-4 w-4" />
          חזרה
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!selectedRange}
          className="px-6 py-3 h-12"
        >
          המשך
        </Button>
      </div>
    </div>
  );
};

export default AttendeesStep;
