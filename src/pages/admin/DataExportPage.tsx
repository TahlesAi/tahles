
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { 
  Download, 
  Home, 
  FileSpreadsheet, 
  Package, 
  Users, 
  Building, 
  Tag, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const DataExportPage = () => {
  const navigate = useNavigate();
  const { providers, services, isLoading } = useUnifiedEventContext();
  const [exportStatus, setExportStatus] = useState<string>('');

  // סטטיסטיקות כלליות
  const stats = useMemo(() => {
    const totalSubcategories = hebrewHierarchy.categories.reduce(
      (sum, cat) => sum + (cat.subcategories?.length || 0), 0
    );
    const totalSubconcepts = hebrewHierarchy.concepts.reduce(
      (sum, concept) => sum + (concept.subconcepts?.length || 0), 0
    );

    return {
      categories: hebrewHierarchy.categories.length,
      subcategories: totalSubcategories,
      concepts: hebrewHierarchy.concepts.length,
      subconcepts: totalSubconcepts,
      providers: providers.length,
      services: services.length,
      simulatedProviders: providers.filter(p => p.isSimulated).length,
      simulatedServices: services.filter(s => s.isSimulated).length
    };
  }, [providers, services]);

  // יצירת נתוני האקסל
  const createExcelData = () => {
    const data = {
      // גיליון 1: קטגוריות ותתי קטגוריות
      categories: hebrewHierarchy.categories.map(cat => ({
        'מזהה קטגוריה': cat.id,
        'שם קטגוריה': cat.name,
        'תיאור': cat.description || '',
        'אייקון': cat.icon || '',
        'מספר תתי קטגוריות': cat.subcategories?.length || 0
      })),

      // גיליון 2: תתי קטגוריות
      subcategories: hebrewHierarchy.categories.flatMap(cat => 
        (cat.subcategories || []).map(sub => ({
          'מזהה תת קטגוריה': sub.id,
          'שם תת קטגוריה': sub.name,
          'מזהה קטגוריה אב': sub.categoryId,
          'שם קטגוריה אב': cat.name,
          'תיאור': sub.description || ''
        }))
      ),

      // גיליון 3: קונספטים
      concepts: hebrewHierarchy.concepts.map(concept => ({
        'מזהה קונספט': concept.id,
        'שם קונספט': concept.name,
        'אייקון': concept.icon || '',
        'מספר תת קונספטים': concept.subconcepts?.length || 0
      })),

      // גיליון 4: תת קונספטים
      subconcepts: hebrewHierarchy.concepts.flatMap(concept => 
        (concept.subconcepts || []).map(sub => ({
          'מזהה תת קונספט': sub.id,
          'שם תת קונספט': sub.name,
          'מזהה קונספט אב': sub.conceptId,
          'שם קונספט אב': concept.name
        }))
      ),

      // גיליון 5: ספקים
      providers: providers.map(provider => ({
        'מזהה ספק': provider.id,
        'שם ספק': provider.name,
        'שם עסק': provider.businessName || '',
        'תיאור': provider.description || '',
        'איש קשר': provider.contactPerson || '',
        'אימייל': provider.email || '',
        'טלפון': provider.phone || '',
        'עיר': provider.city || '',
        'כתובת': provider.address || '',
        'דירוג': provider.rating || 0,
        'מספר ביקורות': provider.reviewCount || 0,
        'מאומת': provider.verified ? 'כן' : 'לא',
        'מוצג': provider.featured ? 'כן' : 'לא',
        'יומן פעיל': provider.calendarActive ? 'כן' : 'לא',
        'יומן מחובר': provider.hasAvailableCalendar ? 'כן' : 'לא',
        'אזורי שירות': (provider.serviceAreas || []).join(', '),
        'תתי קטגוריות': (provider.subcategoryIds || []).join(', '),
        'סימולציה': provider.isSimulated ? 'כן' : 'לא',
        'מספר שירותים': services.filter(s => s.providerId === provider.id).length
      })),

      // גיליון 6: שירותים
      services: services.map(service => ({
        'מזהה שירות': service.id,
        'שם שירות': service.name,
        'תיאור': service.description || '',
        'מזהה ספק': service.providerId,
        'שם ספק': providers.find(p => p.id === service.providerId)?.name || '',
        'מחיר': service.price || 0,
        'יחידת מחיר': service.priceUnit || '',
        'משך': service.duration || '',
        'מזהה קטגוריה': service.categoryId || '',
        'מזהה תת קטגוריה': service.subcategoryId || '',
        'גודל קהל': service.audienceSize || '',
        'שירות קבלת פנים': service.isReceptionService ? 'כן' : 'לא',
        'זמין': service.available ? 'כן' : 'לא',
        'מוצג': service.featured ? 'כן' : 'לא',
        'דירוג': service.rating || 0,
        'מספר ביקורות': service.reviewCount || 0,
        'תגיות': (service.tags || []).join(', '),
        'תגיות קונספט': (service.conceptTags || []).join(', '),
        'מתאים עבור': (service.suitableFor || []).join(', '),
        'דרישות טכניות': (service.technicalRequirements || []).join(', '),
        'זמן הכנה (דק)': service.setupTime || '',
        'תמונות נוספות': (service.additionalImages || []).join(', '),
        'סרטונים': (service.videos || []).join(', '),
        'סימולציה': service.isSimulated ? 'כן' : 'לא'
      }))
    };

    return data;
  };

  // פונקציה לייצוא לאקסל (CSV פשוט)
  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header] || '';
        return `"${value.toString().replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // ייצוא כל הנתונים
  const exportAllData = () => {
    setExportStatus('מכין נתונים לייצוא...');
    
    try {
      const data = createExcelData();
      
      // ייצוא כל גיליון בנפרד
      exportToCSV(data.categories, 'קטגוריות');
      exportToCSV(data.subcategories, 'תתי-קטגוריות');
      exportToCSV(data.concepts, 'קונספטים');
      exportToCSV(data.subconcepts, 'תת-קונספטים');
      exportToCSV(data.providers, 'ספקים');
      exportToCSV(data.services, 'שירותים');

      setExportStatus('הייצוא הושלם בהצלחה! 6 קבצים הורדו');
      
      setTimeout(() => {
        setExportStatus('');
      }, 3000);
    } catch (error) {
      setExportStatus('שגיאה בייצוא הנתונים');
      console.error('Export error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">טוען נתונים לייצוא...</div>
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
          {/* כותרת */}
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
              <h1 className="text-3xl font-bold">ייצוא נתוני המערכת</h1>
            </div>
            
            <p className="text-gray-600 mb-4">
              דף זה מאפשר לך לייצא את כל המידע שהכנסת למערכת בפורמט CSV (ניתן לפתוח באקסל)
            </p>

            {exportStatus && (
              <div className={`p-4 rounded-lg mb-4 ${
                exportStatus.includes('הושלם') 
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : exportStatus.includes('שגיאה')
                  ? 'bg-red-50 border border-red-200 text-red-800'
                  : 'bg-blue-50 border border-blue-200 text-blue-800'
              }`}>
                {exportStatus.includes('הושלם') && <CheckCircle className="h-5 w-5 inline ml-2" />}
                {exportStatus.includes('שגיאה') && <AlertTriangle className="h-5 w-5 inline ml-2" />}
                {exportStatus}
              </div>
            )}
          </div>

          {/* סטטיסטיקות */}
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

          {/* פרטי הייצוא */}
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

          {/* כפתור ייצוא */}
          <Card>
            <CardContent className="p-6 text-center">
              <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-4">ייצוא לאקסל</h3>
              <p className="text-gray-600 mb-6">
                הקליק כדי להוריד 6 קבצי CSV עם כל הנתונים. 
                <br />
                הקבצים ניתנים לפתיחה באקסל ולעריכה נוחה.
              </p>
              
              <Button 
                onClick={exportAllData}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4"
                disabled={!!exportStatus && !exportStatus.includes('הושלם')}
              >
                <Download className="h-5 w-5 ml-2" />
                ייצא את כל הנתונים
              </Button>
              
              <div className="mt-4 text-sm text-gray-500">
                יורדו 6 קבצים: קטגוריות, תתי-קטגוריות, קונספטים, תת-קונספטים, ספקים ושירותים
              </div>
            </CardContent>
          </Card>

          {/* הערות חשובות */}
          <Card className="mt-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-yellow-800 mb-3">הערות חשובות:</h3>
              <ul className="text-yellow-700 space-y-2">
                <li>• הקבצים בפורמט CSV עם קידוד UTF-8 (תומך עברית)</li>
                <li>• ניתן לפתוח באקסל: פתח → טקסט → בחר UTF-8</li>
                <li>• כל קובץ מכיל נתונים של קטגוריה אחת</li>
                <li>• רשומות סימולציה מסומנות בעמודה נפרדת</li>
                <li>• מזהים (IDs) חשובים לשמירת הקשרים בין הרשומות</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DataExportPage;
