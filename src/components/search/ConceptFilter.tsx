
import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X, Plus } from 'lucide-react';

interface ConceptFilterProps {
  selectedConcepts: string[];
  onConceptsChange: (concepts: string[]) => void;
  availableConcepts?: string[];
  maxSelections?: number;
}

// קונספטים זמינים מהמערכת העברית
const DEFAULT_CONCEPTS = [
  'יום הולדת',
  'בר מצווה',
  'בת מצווה', 
  'חתונה',
  'אירועי חברה',
  'ערב גיבוש',
  'מסיבת רווקים',
  'מסיבת רווקות',
  'אירועי קבלת פנים',
  'מופע מרכזי',
  'מופע אינטימי',
  'פעילויות ילדים',
  'אירועי פרישה',
  'כנסים ועידות',
  'השקות מוצרים',
  'ימי גיבוש עובדים',
  'חגיגות חברה',
  'אירועי רשת',
  'מסיבות נושא',
  'אירועי חורף',
  'אירועי קיץ',
  'אירועים חילוניים',
  'אירועים דתיים',
  'אירועי שבת',
  'מופעי רחוב',
  'מופעי במה',
  'בידור אינטראקטיבי',
  'הופעות מוזיקליות',
  'מופעי קומדיה',
  'מופעי קסמים',
  'מופעי ריקוד'
];

const ConceptFilter: React.FC<ConceptFilterProps> = ({
  selectedConcepts,
  onConceptsChange,
  availableConcepts = DEFAULT_CONCEPTS,
  maxSelections = 5
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // סינון קונספטים לפי חיפוש
  const filteredConcepts = useMemo(() => {
    if (!searchTerm.trim()) {
      return isExpanded ? availableConcepts : availableConcepts.slice(0, 12);
    }
    
    return availableConcepts.filter(concept =>
      concept.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, availableConcepts, isExpanded]);

  const handleConceptToggle = (concept: string) => {
    if (selectedConcepts.includes(concept)) {
      // הסרת קונספט
      onConceptsChange(selectedConcepts.filter(c => c !== concept));
    } else if (selectedConcepts.length < maxSelections) {
      // הוספת קונספט
      onConceptsChange([...selectedConcepts, concept]);
    }
  };

  const clearAllConcepts = () => {
    onConceptsChange([]);
  };

  const canSelectMore = selectedConcepts.length < maxSelections;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            סוג האירוע והקונספט
          </CardTitle>
          {selectedConcepts.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllConcepts}
              className="text-xs"
            >
              <X className="h-3 w-3 ml-1" />
              נקה הכל
            </Button>
          )}
        </div>
        
        {selectedConcepts.length > 0 && (
          <div className="text-sm text-gray-600">
            נבחרו {selectedConcepts.length} מתוך {maxSelections} אפשרויות
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* שורת חיפוש */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חפש סוג אירוע או קונספט..."
            className="pr-10"
          />
        </div>

        {/* קונספטים נבחרים */}
        {selectedConcepts.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">נבחרו:</div>
            <div className="flex flex-wrap gap-2">
              {selectedConcepts.map((concept) => (
                <Badge
                  key={concept}
                  variant="default"
                  className="cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
                  onClick={() => handleConceptToggle(concept)}
                >
                  {concept}
                  <X className="h-3 w-3 mr-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* קונספטים זמינים */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">בחר קונספטים:</div>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {filteredConcepts.map((concept) => {
              const isSelected = selectedConcepts.includes(concept);
              const canSelect = canSelectMore || isSelected;
              
              return (
                <Badge
                  key={concept}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    canSelect 
                      ? "hover:bg-blue-500 hover:text-white" 
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => canSelect && handleConceptToggle(concept)}
                >
                  {concept}
                  {isSelected && <X className="h-3 w-3 mr-1" />}
                  {!isSelected && canSelect && <Plus className="h-3 w-3 mr-1" />}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* כפתור הרחבה */}
        {!searchTerm && availableConcepts.length > 12 && (
          <div className="text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'הצג פחות' : `הצג עוד (${availableConcepts.length - 12})`}
            </Button>
          </div>
        )}

        {/* מגבלת בחירה */}
        {!canSelectMore && (
          <div className="text-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
            הגעת למקסימום {maxSelections} בחירות. הסר קונספט כדי להוסיף אחר.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConceptFilter;
