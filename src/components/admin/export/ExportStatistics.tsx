
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Package, Tag, Users } from 'lucide-react';

interface ExportStatisticsProps {
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

const ExportStatistics: React.FC<ExportStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-4 text-center">
          <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold">{stats.categories}</div>
          <div className="text-sm text-gray-600">קטגוריות ראשיות</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold">{stats.subcategories}</div>
          <div className="text-sm text-gray-600">תתי קטגוריות</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Tag className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold">{stats.concepts}</div>
          <div className="text-sm text-gray-600">קונספטים</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
          <div className="text-2xl font-bold">{stats.providers}</div>
          <div className="text-sm text-gray-600">ספקים</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportStatistics;
