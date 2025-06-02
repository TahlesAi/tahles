
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertTriangle, 
  Database, 
  RefreshCw, 
  Download,
  Upload,
  Settings,
  BarChart3
} from 'lucide-react';
import { 
  diagnoseDataIntegrity, 
  createCurrentDataSnapshot,
  enhancedCategoryHierarchy 
} from '@/lib/enhancedConsolidatedData';

const DataIntegrityMonitor = () => {
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSnapshot, setLastSnapshot] = useState<any>(null);

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    setIsLoading(true);
    try {
      const results = diagnoseDataIntegrity();
      setDiagnostics(results);
      
      // יצירת snapshot אוטומטי
      const snapshot = createCurrentDataSnapshot();
      setLastSnapshot(snapshot);
    } catch (error) {
      console.error('Error running diagnostics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportSnapshot = () => {
    if (lastSnapshot) {
      const dataStr = JSON.stringify(lastSnapshot, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `data-snapshot-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="h-6 w-6 animate-spin ml-2" />
          <span>בודק תקינות נתונים...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* סטטוס כללי */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              סטטוס תקינות המערכת
            </div>
            <div className="flex gap-2">
              <Button onClick={runDiagnostics} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 ml-1" />
                עדכן
              </Button>
              <Button onClick={exportSnapshot} variant="outline" size="sm">
                <Download className="h-4 w-4 ml-1" />
                ייצא נתונים
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {diagnostics && (
            <div className="space-y-4">
              <Alert variant={diagnostics.isHealthy ? "default" : "destructive"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {diagnostics.isHealthy 
                    ? "המערכת תקינה - כל הנתונים מאורגנים ומקושרים כראוי"
                    : `נמצאו ${diagnostics.stats.orphanedData.totalOrphaned} בעיות בתקינות הנתונים`
                  }
                </AlertDescription>
              </Alert>

              {/* סטטיסטיקות מהירות */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {diagnostics.stats.totalCategories}
                  </div>
                  <div className="text-sm text-gray-600">קטגוריות</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {diagnostics.stats.totalSubcategories}
                  </div>
                  <div className="text-sm text-gray-600">תתי קטגוריות</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {diagnostics.stats.totalProviders}
                  </div>
                  <div className="text-sm text-gray-600">ספקים</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {diagnostics.stats.totalServices}
                  </div>
                  <div className="text-sm text-gray-600">שירותים</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* המלצות ותיקונים */}
      {diagnostics?.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              המלצות לשיפור
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {diagnostics.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm">{recommendation}</p>
                  </div>
                  <Badge variant="outline">
                    דורש תשומת לב
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* פירוט נתונים מדומים */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            פירוט נתונים מדומים
          </CardTitle>
        </CardHeader>
        <CardContent>
          {diagnostics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">ספקים מדומים</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">סה"כ ספקים מדומים:</span>
                    <Badge variant="secondary">
                      {diagnostics.stats.simulatedProviders}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">אחוז מהסך הכולל:</span>
                    <Badge variant="outline">
                      {Math.round((diagnostics.stats.simulatedProviders / diagnostics.stats.totalProviders) * 100)}%
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">שירותים מדומים</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">סה"כ שירותים מדומים:</span>
                    <Badge variant="secondary">
                      {diagnostics.stats.simulatedServices}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">אחוז מהסך הכולל:</span>
                    <Badge variant="outline">
                      {Math.round((diagnostics.stats.simulatedServices / diagnostics.stats.totalServices) * 100)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* מידע על snapshot אחרון */}
      {lastSnapshot && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              גיבוי נתונים אחרון
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">מזהה גיבוי:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {lastSnapshot.id}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">זמן יצירה:</span>
                <span className="text-sm text-gray-600">
                  {new Date(lastSnapshot.timestamp).toLocaleString('he-IL')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">גרסה:</span>
                <Badge variant="outline">{lastSnapshot.version}</Badge>
              </div>
              <div>
                <span className="text-sm">שינויים בגיבוי:</span>
                <ul className="list-disc list-inside text-xs text-gray-600 mt-1 mr-4">
                  {lastSnapshot.changes.map((change: string, index: number) => (
                    <li key={index}>{change}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataIntegrityMonitor;
