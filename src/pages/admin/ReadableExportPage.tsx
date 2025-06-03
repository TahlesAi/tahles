
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';
import { availabilityManager } from '@/lib/availabilityManager';
import { Home, Download, FileText, Table } from 'lucide-react';

const ReadableExportPage = () => {
  const navigate = useNavigate();

  // ייצוא קטגוריות ותתי קטגוריות לקובץ טקסט
  const exportCategoriesToText = () => {
    let content = 'רשימת קטגוריות ותתי קטגוריות - תכלס הפקות\n';
    content += '=================================================\n\n';

    hebrewHierarchy.categories.forEach((category, index) => {
      content += `${index + 1}. ${category.name}\n`;
      content += `   תיאור: ${category.description || 'אין תיאור'}\n`;
      content += `   אייקון: ${category.icon || 'אין אייקון'}\n`;
      content += `   תתי קטגוריות:\n`;
      
      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((sub, subIndex) => {
          content += `   ${subIndex + 1}. ${sub.name}\n`;
          if (sub.description) {
            content += `      תיאור: ${sub.description}\n`;
          }
        });
      } else {
        content += '   אין תתי קטגוריות\n';
      }
      content += '\n';
    });

    downloadTextFile(content, 'קטגוריות-ותתי-קטגוריות.txt');
  };

  // ייצוא קונספטים לקובץ טקסט
  const exportConceptsToText = () => {
    let content = 'רשימת קונספטים ותת קונספטים - תכלס הפקות\n';
    content += '==============================================\n\n';

    hebrewHierarchy.concepts.forEach((concept, index) => {
      content += `${index + 1}. ${concept.name}\n`;
      content += `   אייקון: ${concept.icon || 'אין אייקון'}\n`;
      content += `   תת קונספטים:\n`;
      
      if (concept.subconcepts && concept.subconcepts.length > 0) {
        concept.subconcepts.forEach((sub, subIndex) => {
          content += `   ${subIndex + 1}. ${sub.name}\n`;
        });
      } else {
        content += '   אין תת קונספטים\n';
      }
      content += '\n';
    });

    downloadTextFile(content, 'קונספטים-ותת-קונספטים.txt');
  };

  // ייצוא קטגוריות ל-CSV
  const exportCategoriesToCSV = () => {
    const csvContent = [
      'מספר,שם קטגוריה,תיאור,אייקון,מספר תתי קטגוריות,רשימת תתי קטגוריות',
      ...hebrewHierarchy.categories.map((cat, index) => {
        const subcatNames = cat.subcategories?.map(sub => sub.name).join(' | ') || '';
        return `${index + 1},"${cat.name}","${cat.description || ''}","${cat.icon || ''}",${cat.subcategories?.length || 0},"${subcatNames}"`;
      })
    ].join('\n');

    downloadCSVFile(csvContent, 'קטגוריות-רשימה.csv');
  };

  // ייצוא תתי קטגוריות ל-CSV
  const exportSubcategoriesToCSV = () => {
    const rows = ['מספר,שם תת קטגוריה,קטגוריה אב,תיאור'];
    
    let counter = 1;
    hebrewHierarchy.categories.forEach(cat => {
      if (cat.subcategories) {
        cat.subcategories.forEach(sub => {
          rows.push(`${counter},"${sub.name}","${cat.name}","${sub.description || ''}"`);
          counter++;
        });
      }
    });

    downloadCSVFile(rows.join('\n'), 'תתי-קטגוריות-רשימה.csv');
  };

  // ייצוא קונספטים ל-CSV
  const exportConceptsToCSV = () => {
    const csvContent = [
      'מספר,שם קונספט,אייקון,מספר תת קונספטים,רשימת תת קונספטים',
      ...hebrewHierarchy.concepts.map((concept, index) => {
        const subconceptNames = concept.subconcepts?.map(sub => sub.name).join(' | ') || '';
        return `${index + 1},"${concept.name}","${concept.icon || ''}",${concept.subconcepts?.length || 0},"${subconceptNames}"`;
      })
    ].join('\n');

    downloadCSVFile(csvContent, 'קונספטים-רשימה.csv');
  };

  // ייצוא מערכת ניהול זמינות
  const exportAvailabilitySystem = () => {
    let content = 'מערכת ניהול זמינות - תכלס הפקות\n';
    content += '=====================================\n\n';
    
    content += 'תיאור המערכת:\n';
    content += 'מערכת לניהול זמינות שירותים בזמן אמת עם אפשרות להקפאת זמנית (Soft Hold)\n\n';
    
    content += 'פונקציות עיקריות:\n';
    content += '1. בדיקת זמינות שירות\n';
    content += '2. יצירת הקפאה זמנית (15 דקות)\n';
    content += '3. שחרור הקפאה זמנית\n';
    content += '4. הקפאת כל שירותי ספק\n';
    content += '5. רישום שירותים במערכת\n';
    content += '6. ניקוי אוטומטי של הקפאות שפגו\n\n';
    
    content += 'הגדרות זמינות:\n';
    content += '- זמן הקפאה: 15 דקות\n';
    content += '- מקסימום הזמנות מקבילות: 1 (ברירת מחדל)\n';
    content += '- בדיקת יומן: חובה\n';
    content += '- בדיקת אזור שירות: אופציונלי\n\n';
    
    content += 'סטטיסטיקות זמינות (עבור ניטור):\n';
    content += '- סך השירותים במערכת\n';
    content += '- שירותים זמינים\n';
    content += '- שירותים עם יומן מחובר\n';
    content += '- הקפאות פעילות\n';
    content += '- שירותים נעולים\n\n';

    downloadTextFile(content, 'מערכת-ניהול-זמינות.txt');
  };

  // פונקציות עזר להורדת קבצים
  const downloadTextFile = (content: string, filename: string) => {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSVFile = (content: string, filename: string) => {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <h1 className="text-3xl font-bold">ייצוא נתונים קריאים</h1>
            </div>
            
            <p className="text-gray-600 mb-4">
              דף זה מאפשר לך להוריד את הנתונים בפורמטים קריאים לוורד ואקסל
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* קטגוריות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  קטגוריות ותתי קטגוריות
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  {hebrewHierarchy.categories.length} קטגוריות עיקריות
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={exportCategoriesToText}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 ml-2" />
                    הורד כקובץ טקסט
                  </Button>
                  <Button 
                    onClick={exportCategoriesToCSV}
                    variant="outline"
                    className="w-full"
                  >
                    <Table className="h-4 w-4 ml-2" />
                    הורד כ-CSV לאקסל
                  </Button>
                  <Button 
                    onClick={exportSubcategoriesToCSV}
                    variant="outline"
                    className="w-full"
                  >
                    <Table className="h-4 w-4 ml-2" />
                    תתי קטגוריות נפרד
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* קונספטים */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  קונספטים ותת קונספטים
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  {hebrewHierarchy.concepts.length} קונספטים עיקריים
                </p>
                <div className="space-y-2">
                  <Button 
                    onClick={exportConceptsToText}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 ml-2" />
                    הורד כקובץ טקסט
                  </Button>
                  <Button 
                    onClick={exportConceptsToCSV}
                    variant="outline"
                    className="w-full"
                  >
                    <Table className="h-4 w-4 ml-2" />
                    הורד כ-CSV לאקסל
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* מערכת זמינות */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  מערכת ניהול זמינות
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  תיעוד מלא של מערכת ניהול הזמינות
                </p>
                <Button 
                  onClick={exportAvailabilitySystem}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 ml-2" />
                  הורד תיעוד המערכת
                </Button>
              </CardContent>
            </Card>

            {/* הערות */}
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">הערות חשובות</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• קבצי טקסט ניתנים לפתיחה בוורד</li>
                  <li>• קבצי CSV ניתנים לפתיחה באקסל</li>
                  <li>• כל הקבצים בקידוד UTF-8 (תומך עברית)</li>
                  <li>• הנתונים מעודכנים לפי המצב הנוכחי</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReadableExportPage;
