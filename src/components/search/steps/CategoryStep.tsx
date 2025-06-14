
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface CategoryStepProps {
  selectedCategory?: string;
  onSelect: (categoryId: string) => void;
}

const categories = [
  { id: 'locations', name: 'לוקיישנים' },
  { id: 'food-drinks', name: 'מזון ומשקאות' },
  { id: 'performances-stage', name: 'מופעים ובמה' },
  { id: 'production-services', name: 'שירותי הפקה' },
  { id: 'lectures-training', name: 'הרצאות והכשרות' },
  { id: 'attractions', name: 'אטרקציות' }
];

export const CategoryStep: React.FC<CategoryStepProps> = ({ selectedCategory, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Tag className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">איזה סוג שירות?</h2>
        <p className="text-gray-600">בחרו את הקטגוריה הראשית (לא חובה)</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="h-16 text-lg"
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
