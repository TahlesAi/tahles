
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface ConceptStepProps {
  selectedConcept?: string;
  onSelect: (concept: string) => void;
}

const concepts = [
  'אירוע חברה',
  'אירוע משפחתי', 
  'מפגש חברתי',
  'ילדים ונוער'
];

export const ConceptStep: React.FC<ConceptStepProps> = ({ selectedConcept, onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Tag className="mx-auto h-12 w-12 text-purple-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">איזה סוג אירוע?</h2>
        <p className="text-gray-600">בחרו את הקונספט המתאים (לא חובה)</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {concepts.map((concept) => (
          <Button
            key={concept}
            variant={selectedConcept === concept ? "default" : "outline"}
            className="h-16 text-lg"
            onClick={() => onSelect(concept)}
          >
            {concept}
          </Button>
        ))}
      </div>
    </div>
  );
};
