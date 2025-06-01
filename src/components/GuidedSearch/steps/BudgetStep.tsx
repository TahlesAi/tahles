
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote, ChevronRight, ChevronLeft, TrendingUp } from "lucide-react";

interface BudgetStepProps {
  budget: {
    min: number;
    max: number;
  };
  onBudgetChange: (budget: { min: number; max: number }) => void;
  onNext: () => void;
  onBack: () => void;
}

const BudgetStep: React.FC<BudgetStepProps> = ({
  budget,
  onBudgetChange,
  onNext,
  onBack
}) => {
  const budgetRanges = [
    { label: "עד 500 ₪", min: 0, max: 500, desc: "אירועים קטנים ואינטימיים" },
    { label: "500 - 1,500 ₪", min: 500, max: 1500, desc: "מופעים קטנים, הרצאות" },
    { label: "1,500 - 3,000 ₪", min: 1500, max: 3000, desc: "אירועי משפחה בסיסיים" },
    { label: "3,000 - 5,000 ₪", min: 3000, max: 5000, desc: "חגיגות משפחתיות" },
    { label: "5,000 - 10,000 ₪", min: 5000, max: 10000, desc: "אירועי חברה, בר/בת מצווה" },
    { label: "10,000 - 20,000 ₪", min: 10000, max: 20000, desc: "אירועים גדולים ומפוארים" },
    { label: "20,000 - 50,000 ₪", min: 20000, max: 50000, desc: "חתונות, אירועי פרימיום" },
    { label: "מעל 50,000 ₪", min: 50000, max: 200000, desc: "אירועים יוקרתיים" }
  ];

  const handleRangeSelect = (range: { min: number; max: number }) => {
    onBudgetChange(range);
  };

  const handleCustomBudget = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value.replace(/[^\d]/g, '')) || 0;
    onBudgetChange({
      ...budget,
      [type]: numValue
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('he-IL') + ' ₪';
  };

  const handleNext = () => {
    if (budget.min > 0 || budget.max > 0) {
      onNext();
    }
  };

  const selectedRange = budgetRanges.find(range => 
    budget.min === range.min && budget.max === range.max
  );

  return (
    <div className="space-y-6 text-right max-h-[500px] overflow-y-auto" dir="rtl">
      <div className="text-center sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Banknote className="h-6 w-6 text-green-600" />
          <h3 className="text-xl font-bold">מה התקציב המיועד לשירות?</h3>
        </div>
        <p className="text-gray-600 text-sm">בחרו טווח תקציב שמתאים לכם - זה יעזור לנו להציע אפשרויות רלוונטיות</p>
      </div>
      
      <div className="space-y-6 px-2">
        {/* טווחי תקציב מוגדרים מראש */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
            <TrendingUp className="h-4 w-4" />
            <span>טווחי תקציב נפוצים</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {budgetRanges.map((range, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-200 hover:border-green-500 hover:shadow-md border-2 ${
                  budget.min === range.min && budget.max === range.max 
                    ? 'border-green-500 bg-green-50 shadow-md' 
                    : 'border-gray-200 hover:bg-green-50'
                }`}
                onClick={() => handleRangeSelect(range)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-right flex-1">
                      <div className="font-semibold text-lg text-green-700">{range.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{range.desc}</div>
                    </div>
                    {budget.min === range.min && budget.max === range.max && (
                      <div className="bg-green-500 rounded-full p-2 text-white flex-shrink-0 mr-3">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* הגדרת טווח מותאם אישית */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
            <span>או הגדירו טווח מותאם אישית</span>
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-budget" className="text-right block mb-2">תקציב מינימום</Label>
              <Input
                id="min-budget"
                type="text"
                placeholder="0"
                value={budget.min ? formatCurrency(budget.min) : ''}
                onChange={(e) => handleCustomBudget('min', e.target.value)}
                className="text-right h-12 text-base border-2 focus:border-green-500"
              />
            </div>
            <div>
              <Label htmlFor="max-budget" className="text-right block mb-2">תקציב מקסימום</Label>
              <Input
                id="max-budget"
                type="text"
                placeholder="10,000"
                value={budget.max ? formatCurrency(budget.max) : ''}
                onChange={(e) => handleCustomBudget('max', e.target.value)}
                className="text-right h-12 text-base border-2 focus:border-green-500"
              />
            </div>
          </div>
          
          {(budget.min > 0 || budget.max > 0) && !selectedRange && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-sm text-blue-800">
                ✅ טווח מותאם אישית: {budget.min > 0 ? formatCurrency(budget.min) : '0'} - {budget.max > 0 ? formatCurrency(budget.max) : '∞'}
              </p>
            </div>
          )}
        </div>

        {/* כפתורי ניווט */}
        <div className="flex justify-between pt-6 sticky bottom-0 bg-white border-t">
          <Button variant="outline" onClick={onBack} className="flex items-center px-6 py-3 h-12">
            <ChevronRight className="ml-2 h-4 w-4" />
            חזרה
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!budget.min && !budget.max}
            className="bg-green-600 hover:bg-green-700 flex items-center px-6 py-3 h-12"
          >
            המשך
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* תצוגת סיכום */}
      {selectedRange && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-800 font-medium">
            ✅ נבחר: {selectedRange.label} - {selectedRange.desc}
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetStep;
