
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter, Check } from "lucide-react";

interface GenreOption {
  id: string;
  name: string;
  description?: string;
  relevantFor: string[]; // קטגוריות שזה רלוונטי עבורן
}

const genreOptions: GenreOption[] = [
  {
    id: 'kosher',
    name: 'כשר',
    description: 'מוסמך לכשרות',
    relevantFor: ['מזון ומשקאות', 'קייטרינג']
  },
  {
    id: 'religious',
    name: 'מתאים לקהל דתי',
    description: 'מופע מותאם לקהל שומר מסורת',
    relevantFor: ['מופעים ואמנים', 'אמני חושים', 'קוסמים']
  },
  {
    id: 'secular',
    name: 'מתאים לקהל חילוני',
    description: 'ללא מגבלות דתיות',
    relevantFor: ['מופעים ואמנים', 'מוזיקה']
  },
  {
    id: 'family_friendly',
    name: 'מתאים למשפחות',
    description: 'תוכן מתאים לכל הגילאים',
    relevantFor: ['מופעים ואמנים', 'פעילויות']
  },
  {
    id: 'adult_only',
    name: 'למבוגרים בלבד',
    description: 'תוכן למעלה מגיל 18',
    relevantFor: ['מופעים ואמנים', 'בידור']
  },
  {
    id: 'indoor',
    name: 'מקורה',
    description: 'מתאים לחללים מקורים',
    relevantFor: ['לוקיישנים', 'מופעים ואמנים']
  },
  {
    id: 'outdoor',
    name: 'חוץ',
    description: 'מתאים לאירועי חוץ',
    relevantFor: ['לוקיישנים', 'פעילויות']
  },
  {
    id: 'intimate',
    name: 'אינטימי',
    description: 'לקבוצות קטנות (עד 30 אנשים)',
    relevantFor: ['מופעים ואמנים', 'לוקיישנים']
  },
  {
    id: 'large_scale',
    name: 'רחב היקף',
    description: 'לאירועים גדולים (מעל 100 אנשים)',
    relevantFor: ['מופעים ואמנים', 'לוקיישנים', 'הפקה']
  },
  {
    id: 'luxury',
    name: 'יוקרתי',
    description: 'שירות ברמה פרימיום',
    relevantFor: ['לוקיישנים', 'קייטרינג', 'מופעים ואמנים']
  },
  {
    id: 'budget_friendly',
    name: 'חסכוני',
    description: 'מחירים נגישים',
    relevantFor: ['מופעים ואמנים', 'קייטרינג', 'לוקיישנים']
  },
  {
    id: 'interactive',
    name: 'אינטראקטיבי',
    description: 'מערב את הקהל בפעילות',
    relevantFor: ['מופעים ואמנים', 'פעילויות']
  },
  {
    id: 'cultural',
    name: 'תרבותי',
    description: 'עם ערך תרבותי וחינוכי',
    relevantFor: ['מופעים ואמנים', 'פעילויות']
  }
];

interface ProductGenreFilterProps {
  serviceCategory?: string;
  serviceSubcategory?: string;
  selectedGenres: string[];
  onGenreChange: (genres: string[]) => void;
  showOnlyRelevant?: boolean;
}

const ProductGenreFilter: React.FC<ProductGenreFilterProps> = ({
  serviceCategory,
  serviceSubcategory,
  selectedGenres,
  onGenreChange,
  showOnlyRelevant = true
}) => {
  const getRelevantGenres = () => {
    if (!showOnlyRelevant) return genreOptions;
    
    return genreOptions.filter(genre => {
      return genre.relevantFor.some(category => 
        serviceCategory?.includes(category) || 
        serviceSubcategory?.includes(category) ||
        category === 'מופעים ואמנים' // תמיד להציג אפשרויות בסיס
      );
    });
  };

  const relevantGenres = getRelevantGenres();

  const handleGenreToggle = (genreId: string) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    
    onGenreChange(updatedGenres);
  };

  if (relevantGenres.length === 0) {
    return null;
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          סינון לפי ז'אנר ותכונות
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relevantGenres.map((genre) => (
            <div key={genre.id} className="flex items-start space-x-3">
              <Checkbox
                id={genre.id}
                checked={selectedGenres.includes(genre.id)}
                onCheckedChange={() => handleGenreToggle(genre.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label 
                  htmlFor={genre.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {genre.name}
                </Label>
                {genre.description && (
                  <p className="text-xs text-gray-600 mt-1">
                    {genre.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedGenres.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">פילטרים פעילים:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedGenres.map(genreId => {
                const genre = genreOptions.find(g => g.id === genreId);
                return genre ? (
                  <Badge 
                    key={genreId} 
                    variant="secondary" 
                    className="text-xs flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    {genre.name}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductGenreFilter;
