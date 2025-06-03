
import { useState, useMemo } from 'react';
import { useUnifiedEventContext } from '@/context/UnifiedEventContext';
import { hebrewHierarchy } from '@/lib/hebrewHierarchyData';

export const useDataExport = () => {
  const { providers, services } = useUnifiedEventContext();
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
      simulatedProviders: providers.filter(p => p.isMock || false).length,
      simulatedServices: services.filter(s => s.isMock || false).length
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
        'תתי קטגוריות': (provider.subcategoryIds || []).join(', '),
        'סימולציה': (provider.isMock || false) ? 'כן' : 'לא',
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
        'מזהה תת קטגוריה': service.subcategoryId || '',
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
        'סימולציה': (service.isMock || false) ? 'כן' : 'לא'
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

  return {
    stats,
    exportStatus,
    exportAllData
  };
};
