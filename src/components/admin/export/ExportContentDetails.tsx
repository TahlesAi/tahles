
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExportContentDetailsProps {
  stats: {
    categories: number;
    subcategories: number;
    concepts: number;
    subconcepts: number;
    providers: number;
    services: number;
    simulatedProviders: number;
    simulatedServices: number;
  };
}

const ExportContentDetails: React.FC<ExportContentDetailsProps> = ({ stats }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>מה כלול בייצוא?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">מבנה ארגוני:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Badge variant="outline">{stats.categories}</Badge>
                קטגוריות ראשיות עם תיאורים ואייקונים
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">{stats.subcategories}</Badge>
                תתי קטגוריות מקושרות לקטגוריות אב
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">{stats.concepts}</Badge>
                קונספטים עם {stats.subconcepts} תת קונספטים
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">תוכן עסקי:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Badge variant="outline">{stats.providers}</Badge>
                ספקים עם פרטי קשר ושיוכים
                {stats.simulatedProviders > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {stats.simulatedProviders} סימולציה
                  </Badge>
                )}
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">{stats.services}</Badge>
                שירותים עם מחירים ותיאורים
                {stats.simulatedServices > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {stats.simulatedServices} סימולציה
                  </Badge>
                )}
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportContentDetails;
