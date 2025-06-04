
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { 
  Settings, 
  Download, 
  FileText, 
  Hierarchy,
  Snowflake,
  AlertTriangle,
  Database,
  Users,
  Package
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { providers, services, categories, subcategories, isLoading } = useUnifiedEventContext();

  const stats = {
    totalProviders: providers.length,
    totalServices: services.length,
    totalCategories: categories.length,
    totalSubcategories: subcategories.length,
    activeServices: services.filter(s => s.available).length,
    simulatedProviders: providers.filter(p => p.isSimulated).length
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8" dir="rtl">
        <div className="text-center">טוען נתוני מערכת...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ממשק ניהול מערכת</h1>
        <p className="text-gray-600">ניהול תוכן, נתונים והגדרות מערכת</p>
      </div>

      {/* אזהרת מעבר מבני */}
      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            מעבר מבני במערכת
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-700 mb-4">
            מערכת ההנהלה זמינה למעבר למבנה חדש. יש להקפיא את המבנה הקיים לפני תחילת המעבר.
          </p>
          <Button 
            onClick={() => navigate('/admin/legacy-freeze')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            <Snowflake className="h-4 w-4 ml-2" />
            התחל הקפאת מבנה
          </Button>
        </CardContent>
      </Card>

      {/* סטטיסטיקות מערכת */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold mb-2">{stats.totalProviders}</div>
            <div className="text-gray-600">ספקים</div>
            <Badge variant="outline" className="mt-2">
              {stats.simulatedProviders} סימולציה
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <div className="text-3xl font-bold mb-2">{stats.totalServices}</div>
            <div className="text-gray-600">שירותים</div>
            <Badge variant="outline" className="mt-2">
              {stats.activeServices} פעילים
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Database className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <div className="text-3xl font-bold mb-2">{stats.totalCategories}</div>
            <div className="text-gray-600">קטגוריות</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Hierarchy className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <div className="text-3xl font-bold mb-2">{stats.totalSubcategories}</div>
            <div className="text-gray-600">תתי קטגוריות</div>
          </CardContent>
        </Card>
      </div>

      {/* כלי ניהול */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-blue-600" />
              הקפאת מבנה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              הקפאת המבנה הקיים לפני מעבר למבנה חדש
            </p>
            <Button 
              onClick={() => navigate('/admin/legacy-freeze')}
              className="w-full"
              variant="outline"
            >
              התחל הקפאה
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hierarchy className="h-5 w-5 text-green-600" />
              ניהול היררכיה
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              ניהול קטגוריות, תתי קטגוריות וקונספטים
            </p>
            <Button 
              onClick={() => navigate('/admin/hierarchy')}
              className="w-full"
              variant="outline"
            >
              נהל היררכיה
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-600" />
              ייצוא נתונים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              ייצוא נתוני המערכת לקבצי CSV
            </p>
            <Button 
              onClick={() => navigate('/admin/data-export')}
              className="w-full"
              variant="outline"
            >
              ייצא נתונים
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              ייצוא קריא
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              ייצוא נתונים בפורמט קריא לוורד ואקסל
            </p>
            <Button 
              onClick={() => navigate('/admin/readable-export')}
              className="w-full"
              variant="outline"
            >
              ייצא קריא
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              הגדרות מערכת
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              הגדרות כלליות ותצורת מערכת
            </p>
            <Button 
              className="w-full"
              variant="outline"
              disabled
            >
              בפיתוח
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
