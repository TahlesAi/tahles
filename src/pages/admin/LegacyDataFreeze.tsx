
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { 
  Snowflake, 
  Database, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Home,
  FileText,
  Users,
  Package,
  Tag
} from 'lucide-react';

const LegacyDataFreeze = () => {
  const navigate = useNavigate();
  const { providers, services, categories, subcategories, isLoading } = useUnifiedEventContext();
  const [freezeStatus, setFreezeStatus] = useState<'inactive' | 'freezing' | 'frozen'>('inactive');
  const [backupComplete, setBackupComplete] = useState(false);

  // סטטיסטיקות המערכת הנוכחית
  const currentStats = {
    categories: hebrewHierarchy.categories.length,
    subcategories: hebrewHierarchy.categories.reduce((sum, cat) => sum + (cat.subcategories?.length || 0), 0),
    concepts: hebrewHierarchy.concepts.length,
    subconcepts: hebrewHierarchy.concepts.reduce((sum, concept) => sum + (concept.subconcepts?.length || 0), 0),
    providers: providers.length,
    services: services.length,
    realProviders: providers.filter(p => !p.isSimulated).length,
    simulatedProviders: providers.filter(p => p.isSimulated).length,
    activeServices: services.filter(s => s.available).length
  };

  // יצירת גיבוי מלא של המבנה הקיים
  const createFullBackup = () => {
    setFreezeStatus('freezing');
    
    const fullBackup = {
      timestamp: new Date().toISOString(),
      version: '1.0-legacy',
      structure: {
        hierarchy: hebrewHierarchy,
        providers: providers,
        services: services,
        categories: categories,
        subcategories: subcategories
      },
      metadata: {
        totalCategories: currentStats.categories,
        totalSubcategories: currentStats.subcategories,
        totalProviders: currentStats.providers,
        totalServices: currentStats.services,
        realProviders: currentStats.realProviders,
        simulatedProviders: currentStats.simulatedProviders
      }
    };

    // שמירה ב-localStorage לגיבוי זמני
    localStorage.setItem('legacy-structure-backup', JSON.stringify(fullBackup));
    
    // יצירת קובץ גיבוי להורדה
    const backupBlob = new Blob([JSON.stringify(fullBackup, null, 2)], { 
      type: 'application/json;charset=utf-8;' 
    });
    const link = document.createElement('a');
    const url = URL.createObjectURL(backupBlob);
    link.setAttribute('href', url);
    link.setAttribute('download', `legacy-backup-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setBackupComplete(true);
      setFreezeStatus('frozen');
    }, 2000);
  };

  // בדיקת תקינות המבנה הקיים
  const validateCurrentStructure = () => {
    const issues: string[] = [];
    
    // בדיקת קטגוריות ותתי קטגוריות
    hebrewHierarchy.categories.forEach(cat => {
      if (!cat.name || !cat.id) {
        issues.push(`קטגוריה חסרת שם או מזהה: ${cat.id}`);
      }
      
      cat.subcategories?.forEach(sub => {
        if (!sub.name || !sub.id || !sub.categoryId) {
          issues.push(`תת קטגוריה חסרת נתונים: ${sub.id}`);
        }
      });
    });

    // בדיקת ספקים
    providers.forEach(provider => {
      if (!provider.name || !provider.id) {
        issues.push(`ספק חסר נתונים בסיסיים: ${provider.id}`);
      }
    });

    // בדיקת שירותים
    services.forEach(service => {
      if (!service.name || !service.providerId) {
        issues.push(`שירות חסר נתונים בסיסיים: ${service.id}`);
      }
    });

    return issues;
  };

  const structureIssues = validateCurrentStructure();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">טוען נתוני המערכת...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      
      <main className="flex-grow">
        <div className="container px-4 py-6">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <Home className="h-4 w-4 ml-2" />
                חזרה לדף הבית
              </Button>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Snowflake className="h-8 w-8 text-blue-600" />
                הקפאת מבנה קיים
              </h1>
            </div>
            
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>שלב קריטי:</strong> הקפאת המבנה הקיים לפני מעבר למבנה חדש. 
                כל השינויים במבנה הנוכחי ייחסמו עד לסיום המעבר.
              </AlertDescription>
            </Alert>
          </div>

          {/* סטטוס הקפאה */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                סטטוס הקפאה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Badge variant={
                  freezeStatus === 'frozen' ? 'default' : 
                  freezeStatus === 'freezing' ? 'secondary' : 
                  'outline'
                }>
                  {freezeStatus === 'frozen' && <CheckCircle className="h-4 w-4 ml-1" />}
                  {freezeStatus === 'freezing' && <Snowflake className="h-4 w-4 ml-1 animate-spin" />}
                  {freezeStatus === 'inactive' && <AlertTriangle className="h-4 w-4 ml-1" />}
                  
                  {freezeStatus === 'frozen' ? 'מערכת קפואה' :
                   freezeStatus === 'freezing' ? 'מקפיא מערכת...' :
                   'מערכת פעילה'}
                </Badge>
                
                {backupComplete && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-4 w-4 ml-1" />
                    גיבוי הושלם
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* סטטיסטיקות מערכת נוכחית */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <Tag className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{currentStats.categories}</div>
                <div className="text-sm text-gray-600">קטגוריות ראשיות</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{currentStats.subcategories}</div>
                <div className="text-sm text-gray-600">תתי קטגוריות</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{currentStats.providers}</div>
                <div className="text-sm text-gray-600">ספקים</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">{currentStats.services}</div>
                <div className="text-sm text-gray-600">שירותים</div>
              </CardContent>
            </Card>
          </div>

          {/* בדיקת תקינות */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>בדיקת תקינות מבנה קיים</CardTitle>
            </CardHeader>
            <CardContent>
              {structureIssues.length === 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  המבנה הקיים תקין ומוכן להקפאה
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-red-600 mb-3">
                    <AlertTriangle className="h-5 w-5" />
                    נמצאו {structureIssues.length} בעיות במבנה:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {structureIssues.map((issue, index) => (
                      <li key={index} className="text-red-600">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* פעולות הקפאה */}
          <Card>
            <CardHeader>
              <CardTitle>פעולות הקפאה</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">1. יצירת גיבוי מלא</h4>
                <p className="text-sm text-gray-600">
                  גיבוי מלא של כל המבנה הקיים לפני ההקפאה
                </p>
                <Button 
                  onClick={createFullBackup}
                  disabled={freezeStatus !== 'inactive'}
                  className="w-full"
                >
                  <Download className="h-4 w-4 ml-2" />
                  {freezeStatus === 'freezing' ? 'יוצר גיבוי...' : 'צור גיבוי והקפא מערכת'}
                </Button>
              </div>

              {freezeStatus === 'frozen' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>הקפאה הושלמה בהצלחה!</strong><br />
                    המערכת קפואה וגיבוי נוצר. כעת ניתן להתחיל בהטמעת המבנה החדש.
                    <br />
                    <strong>קובץ הגיבוי הורד למחשב שלך.</strong>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegacyDataFreeze;
