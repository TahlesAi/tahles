
import React from 'react';
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface BudgetStepProps {
  selectedBudget?: string;
  onSelect: (budget: string) => void;
}

const budgetRanges = [
  '1-1000',
  '1001-3000',
  '3001-6000', 
  '6001-10000',
  '10001+'
];

export const BudgetStep: React.FC<BudgetStepProps> = ({ selectedBudget, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <DollarSign className="mx-auto h-12 w-12 text-green-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">מה התקציב?</h2>
        <p className="text-gray-600">בחרו את מסגרת התקציב בש"ח (לא חובה)</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {budgetRanges.map((budget) => (
          <Button
            key={budget}
            variant={selectedBudget === budget ? "default" : "outline"}
            className="h-12 text-lg"
            onClick={() => onSelect(budget)}
          >
            ₪{budget}
          </Button>
        ))}
      </div>
    </div>
  );
};
