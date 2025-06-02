
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Tag, X } from 'lucide-react';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';

interface ConceptFilterProps {
  selectedConcepts: string[];
  onConceptsChange: (concepts: string[]) => void;
  availableConcepts?: string[];
}

const ConceptFilter: React.FC<ConceptFilterProps> = ({
  selectedConcepts,
  onConceptsChange,
  availableConcepts
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // שימוש בקונספטים זמינים או בקונספטים מהנתונים
  const concepts = availableConcepts || hebrewHierarchy.concepts.map(c => c.name);
  
  // סינון לפי חיפוש
  const filteredConcepts = concepts.filter(concept =>
    concept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleConcept = (conceptName: string) => {
    const newSelectedConcepts = selectedConcepts.includes(conceptName)
      ? selectedConcepts.filter(c => c !== conceptName)
      : [...selectedConcepts, conceptName];
    
    onConceptsChange(newSelectedConcepts);
  };

  const clearAllConcepts = () => {
    onConceptsChange([]);
  };

  const displayedConcepts = isExpanded 
    ? filteredConcepts 
    : filteredConcepts.slice(0, 8);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Tag className="h-4 w-4" />
          סינון לפי קונספטים
          {selectedConcepts.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedConcepts.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* חיפוש בקונספטים */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חפש קונספט..."
            className="pr-10"
          />
        </div>

        {/* קונספטים נבחרים */}
        {selectedConcepts.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">נבחרו:</Label>
              <Button 
                onClick={clearAllConcepts}
                size="sm"
                variant="ghost"
                className="h-auto p-1 text-xs"
              >
                נקה הכל
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedConcepts.map(concept => (
                <Badge 
                  key={concept} 
                  variant="default" 
                  className="flex items-center gap-1 text-xs"
                >
                  {concept}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-red-200" 
                    onClick={() => toggleConcept(concept)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* רשימת קונספטים לבחירה */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">קונספטים זמינים:</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {displayedConcepts.map(concept => (
              <div key={concept} className="flex items-center space-x-2">
                <Checkbox
                  id={`concept-${concept}`}
                  checked={selectedConcepts.includes(concept)}
                  onCheckedChange={() => toggleConcept(concept)}
                />
                <Label 
                  htmlFor={`concept-${concept}`}
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  {concept}
                </Label>
              </div>
            ))}
          </div>

          {/* הצג עוד/פחות */}
          {filteredConcepts.length > 8 && (
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              variant="ghost"
              size="sm"
              className="w-full text-xs"
            >
              {isExpanded ? 'הצג פחות' : `הצג עוד (${filteredConcepts.length - 8})`}
            </Button>
          )}
        </div>

        {/* סטטיסטיקה */}
        <div className="text-xs text-gray-500 border-t pt-2">
          {searchTerm ? (
            <span>נמצאו {filteredConcepts.length} קונספטים</span>
          ) : (
            <span>סה"כ {concepts.length} קונספטים זמינים</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptFilter;
