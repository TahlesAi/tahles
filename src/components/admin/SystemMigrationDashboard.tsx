
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Snowflake, 
  ArrowRight, 
  Database, 
  CheckCircle,
  AlertTriangle,
  Settings,
  Archive,
  RefreshCw
} from 'lucide-react';
import { legacyDataFreezer } from '@/lib/systemMigration/legacyDataFreezer';
import { newSystemManager } from '@/lib/newSystem/newSystemManager';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';

const SystemMigrationDashboard: React.FC = () => {
  const { providers, services, categories, subcategories } = useUnifiedEventContext();
  const [migrationStatus, setMigrationStatus] = useState<'pending' | 'freezing' | 'frozen' | 'migrated'>('pending');
  const [freezeId, setFreezeId] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // בדיקה אם המערכת כבר מוקפאת
    if (legacyDataFreezer.isSystemFrozen()) {
      setMigrationStatus('frozen');
      const snapshots = legacyDataFreezer.getAllFrozenSnapshots();
      if (snapshots.length > 0) {
        setFreezeId(snapshots[snapshots.length - 1].id);
      }
    }

    // טעינת סטטיסטיקות
    setStats(legacyDataFreezer.getFreezeStatistics());
  }, []);

  const handleFreezeLegacySystem = async () => {
    setMigrationStatus('freezing');
    
    try {
      const snapshotId = legacyDataFreezer.freezeCurrentSystem(
        providers,
        services,
        categories,
        subcategories,
        'admin',
        'מעבר למבנה חדש לפי דרישות מעודכנות'
      );
      
      setFreezeId(snapshotId);
      setMigrationStatus('frozen');
      setStats(legacyDataFreezer.getFreezeStatistics());
      
      console.log('✅ המבנה הישן הוקפא בהצלחה');
    } catch (error) {
      console.error('❌ שגיאה בהקפאת המבנה:', error);
      setMigrationStatus('pending');
    }
  };

  const handleActivateNewSystem = () => {
    setMigrationStatus('migrated');
    console.log('🚀 המערכת החדשה הופעלה');
  };

  const renderMigrationStep = () => {
    switch (migrationStatus) {
      case 'pending':
        return (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                המערכת מוכנה להקפאה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-yellow-700">
                  המערכת מוכנה למעבר למבנה החדש. פעולה זו תקפיא את כל הנתונים הקיימים ותעביר אותם לארכיון.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-blue-600">{providers.length}</div>
                    <div className="text-sm text-gray-600">ספקים</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-green-600">{services.length}</div>
                    <div className="text-sm text-gray-600">שירותים</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
                    <div className="text-sm text-gray-600">קטגוריות</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-orange-600">{subcategories.length}</div>
                    <div className="text-sm text-gray-600">תתי קטגוריות</div>
                  </div>
                </div>

                <Button 
                  onClick={handleFreezeLegacySystem}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  size="lg"
                >
                  <Snowflake className="h-5 w-5 ml-2" />
                  הקפא מבנה ישן והתחל מעבר
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'freezing':
        return (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <RefreshCw className="h-5 w-5 animate-spin" />
                מקפיא מערכת...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                המערכת בתהליך הקפאה. אנא המתן...
              </p>
            </CardContent>
          </Card>
        );

      case 'frozen':
        return (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="h-5 w-5" />
                המבנה הישן הוקפא בהצלחה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-700">
                  המבנה הישן הועבר לארכיון. כעת ניתן להפעיל את המערכת החדשה.
                </p>
                
                {freezeId && (
                  <Alert>
                    <Archive className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Snapshot ID:</strong> {freezeId}
                      <br />
                      <small>שמור מזהה זה לשחזור עתידי במידת הצורך</small>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button 
                    onClick={handleActivateNewSystem}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <ArrowRight className="h-4 w-4 ml-2" />
                    הפעל מערכת חדשה
                  </Button>
                  
                  <Button variant="outline" className="px-6">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'migrated':
        return (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                המערכת החדשה פעילה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-green-700">
                  המערכת החדשה הופעלה בהצלחה עם המבנה המעודכן.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-blue-600">{newSystemManager.getCategories().length}</div>
                    <div className="text-sm text-gray-600">קטגוריות חדשות</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-green-600">{newSystemManager.getConcepts().length}</div>
                    <div className="text-sm text-gray-600">קונספטים</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-purple-600">{newSystemManager.getProviders().length}</div>
                    <div className="text-sm text-gray-600">ספקים פעילים</div>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <div className="text-2xl font-bold text-orange-600">{newSystemManager.getProducts().length}</div>
                    <div className="text-sm text-gray-600">מוצרים זמינים</div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>המערכת פועלת לפי החוקים החדשים:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>מוצרים לא זמינים אינם מוצגים</li>
                      <li>כל מוצר דורש חיוב מיידי</li>
                      <li>מחירים ברורים וקבועים</li>
                      <li>מערכת קונספטים פעילה</li>
                      <li>Wishlist מופעל</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">מעבר למערכת חדשה</h1>
        <p className="text-gray-600">הקפאת מבנה ישן והטמעת מבנה חדש</p>
      </div>

      <div className="space-y-6">
        {renderMigrationStep()}

        {/* סטטיסטיקות הקפאה */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                סטטיסטיקות הקפאה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalSnapshots}</div>
                  <div className="text-sm text-gray-600">Snapshots</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.totalFrozenProviders}</div>
                  <div className="text-sm text-gray-600">ספקים מוקפאים</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.totalFrozenServices}</div>
                  <div className="text-sm text-gray-600">שירותים מוקפאים</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">
                    {stats.latestFreezeDate ? new Date(stats.latestFreezeDate).toLocaleDateString('he-IL') : 'אין'}
                  </div>
                  <div className="text-sm text-gray-600">הקפאה אחרונה</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* רשימת קונספטים החדשים */}
        {migrationStatus === 'migrated' && (
          <Card>
            <CardHeader>
              <CardTitle>קונספטים זמינים במערכת החדשה</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newSystemManager.getConcepts().map(concept => (
                  <div key={concept.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{concept.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{concept.description}</p>
                    <div className="space-y-1">
                      {concept.eventTypes.map(eventType => (
                        <Badge key={eventType} variant="outline" className="text-xs">
                          {eventType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SystemMigrationDashboard;
