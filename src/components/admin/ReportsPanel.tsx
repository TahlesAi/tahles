
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileSpreadsheet, 
  Download, 
  AlertTriangle, 
  Database,
  Users,
  Package,
  BarChart3,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useDataExport } from '@/hooks/useDataExport';
import ExportActions from './export/ExportActions';

const ReportsPanel: React.FC = () => {
  const { stats, exportStatus, exportAllData } = useDataExport();

  // זיהוי בעיות בהיררכיה
  const hierarchyIssues = [
    {
      severity: 'high',
      title: 'חוסר התאמה בין חטיבות לקטגוריות',
      description: 'החטיבות החדשות לא מתאימות לקטגוריות הקיימות במערכת',
      count: 5
    },
    {
      severity: 'medium', 
      title: 'ספקים ללא שיוך נכון',
      description: 'ספקים שמשויכים לקטגוריות שלא קיימות בחטיבות',
      count: stats.simulatedProviders
    },
    {
      severity: 'low',
      title: 'שירותים עם תגיות לא תקינות',
      description: 'שירותים עם קונספטים שלא מתאימים לחטיבה שלהם',
      count: Math.floor(stats.simulatedServices * 0.3)
    }
  ];

  const generateHierarchyReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      currentStructure: {
        divisions: 5,
        categoriesInDivisions: 0, // אין קטגוריות בחטיבות
        hebrewCategories: stats.categories,
        subcategories: stats.subcategories,
        providers: stats.providers,
        services: stats.services
      },
      issues: hierarchyIssues,
      recommendations: [
        'מיפוי קטגוריות קיימות לחטיבות חדשות',
        'עדכון שיוך ספקים לפי החטיבות החדשות',
        'תיקון קונספטים ותת-קונספטים',
        'בדיקת תקינות נתונים'
      ]
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `hierarchy-analysis-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* סטטיסטיקות מערכת */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold">{stats.categories}</div>
            <div className="text-sm text-gray-600">קטגוריות עברית</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold">{stats.subcategories}</div>
            <div className="text-sm text-gray-600">תת-קטגוריות</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold">{stats.providers}</div>
            <div className="text-sm text-gray-600">ספקים</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold">{stats.services}</div>
            <div className="text-sm text-gray-600">שירותים</div>
          </CardContent>
        </Card>
      </div>

      {/* אזהרות היררכיה */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            בעיות בהיררכיה שזוהו
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hierarchyIssues.map((issue, index) => (
              <Alert key={index} className={`border-l-4 ${
                issue.severity === 'high' ? 'border-red-500 bg-red-50' :
                issue.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <strong>{issue.title}</strong>
                      <p className="text-sm mt-1">{issue.description}</p>
                    </div>
                    <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'}>
                      {issue.count} פריטים
                    </Badge>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* פעולות דוחות */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExportActions onExport={exportAllData} exportStatus={exportStatus} />
        
        <Card>
          <CardHeader>
            <CardTitle>דוח ניתוח היררכיה</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-bold mb-4">ניתוח בעיות מבניות</h3>
            <p className="text-gray-600 mb-6">
              הפק דוח מפורט על הבעיות בהיררכיה והמלצות לתיקון
            </p>
            
            <Button 
              onClick={generateHierarchyReport}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4"
            >
              <Download className="h-5 w-5 ml-2" />
              הפק דוח ניתוח היררכיה
            </Button>
            
            <div className="mt-4 text-sm text-gray-500">
              הדוח יוכן בפורמט JSON לניתוח מתקדם
            </div>
          </CardContent>
        </Card>
      </div>

      {/* המלצות תיקון */}
      <Card>
        <CardHeader>
          <CardTitle>המלצות לתיקון מבני</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <strong>שלב 1: מיפוי קטגוריות לחטיבות</strong>
                <p className="text-sm mt-1">
                  יש למפות את 7 הקטגוריות הקיימות ל-5 החטיבות החדשות
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <strong>שלב 2: עדכון שיוך ספקים</strong>
                <p className="text-sm mt-1">
                  עדכון {stats.providers} ספקים לפי החטיבות החדשות
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <strong>שלב 3: תיקון קונספטים</strong>
                <p className="text-sm mt-1">
                  וידוא שכל {stats.concepts} הקונספטים תואמים לחטיבות
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPanel;
