
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGuidedSearchStorage } from '@/hooks/useGuidedSearchStorage';

interface ResultsStepProps {
  searchData?: ReturnType<typeof useGuidedSearchStorage>['data'];
  onNext: () => void;
  onBack: () => void;
  onSubmit?: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ searchData, onNext, onBack, onSubmit }) => {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h2 className="text-xl font-semibold mb-4">תוצאות מומלצות</h2>
        <p className="text-gray-600 mb-6">
          על פי הקריטריונים שלך, מצאנו את ההצעות הבאות:
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">תוצאה דוגמה 1</h3>
                <p className="text-sm text-gray-600">תיאור השירות...</p>
              </div>
              <Button variant="outline" size="sm">
                פרטים נוספים
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">תוצאה דוגמה 2</h3>
                <p className="text-sm text-gray-600">תיאור השירות...</p>
              </div>
              <Button variant="outline" size="sm">
                פרטים נוספים
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          חזור
        </Button>
        <Button onClick={onSubmit || onNext}>
          {onSubmit ? 'שלח פנייה' : 'סיום'}
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
