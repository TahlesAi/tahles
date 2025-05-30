
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

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
    { label: "עד 1,000 ₪", min: 0, max: 1000 },
    { label: "1,000 - 3,000 ₪", min: 1000, max: 3000 },
    { label: "3,000 - 5,000 ₪", min: 3000, max: 5000 },
    { label: "5,000 - 10,000 ₪", min: 5000, max: 10000 },
    { label: "10,000 - 20,000 ₪", min: 10000, max: 20000 },
    { label: "מעל 20,000 ₪", min: 20000, max: 100000 }
  ];

  const handleRangeSelect = (range: { min: number; max: number }) => {
    onBudgetChange(range);
  };

  const handleCustomBudget = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    onBudgetChange({
      ...budget,
      [type]: numValue
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <DollarSign className="h-6 w-6 text-brand-600" />
          מה התקציב המיועד לאירוע?
        </CardTitle>
        <p className="text-gray-600">בחרו טווח תקציב או הגדירו טווח מותאם אישית</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* טווחי תקציב מוגדרים מראש */}
        <div className="grid grid-cols-2 gap-3">
          {budgetRanges.map((range, index) => (
            <Button
              key={index}
              variant={budget.min === range.min && budget.max === range.max ? "default" : "outline"}
              className="h-16 text-right justify-center"
              onClick={() => handleRangeSelect(range)}
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* הגדרת טווח מותאם אישית */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 text-center">או הגדירו טווח מותאם אישית</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-budget">תקציב מינימום (₪)</Label>
              <Input
                id="min-budget"
                type="number"
                placeholder="0"
                value={budget.min || ''}
                onChange={(e) => handleCustomBudget('min', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="max-budget">תקציב מקסימום (₪)</Label>
              <Input
                id="max-budget"
                type="number"
                placeholder="50000"
                value={budget.max || ''}
                onChange={(e) => handleCustomBudget('max', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* כפתורי ניווט */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            חזרה
          </Button>
          <Button 
            onClick={onNext}
            disabled={!budget.min && !budget.max}
            className="bg-brand-600 hover:bg-brand-700"
          >
            המשך
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetStep;
