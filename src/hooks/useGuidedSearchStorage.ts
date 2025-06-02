
import { useState, useEffect } from 'react';

export type EventType = 'private' | 'business' | 'mixed' | 'children';

interface GuidedSearchData {
  eventDate?: Date | null;
  eventStartTime?: string;
  eventEndTime?: string;
  eventType?: EventType;
  location?: { city: string; address?: string };
  attendeesCount?: string;
  budget?: { min: number; max: number };
  [key: string]: any;
}

export const useGuidedSearchStorage = (storageKey: string = 'guided-search-data') => {
  const [data, setData] = useState<GuidedSearchData>({});

  // טעינה ראשונית מ-localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // המרת תאריך חזרה מ-string
        if (parsed.eventDate && typeof parsed.eventDate === 'string') {
          parsed.eventDate = new Date(parsed.eventDate);
        }
        setData(parsed);
      }
    } catch (error) {
      console.warn('Error loading guided search data from localStorage:', error);
    }
  }, [storageKey]);

  // פונקציה לעדכון ושמירה
  const updateData = (newData: Partial<GuidedSearchData>) => {
    setData(prev => {
      const updated = { ...prev, ...newData };
      
      // שמירה ב-localStorage
      try {
        const dataToSave = { ...updated };
        // המרת תאריך ל-string לשמירה
        if (dataToSave.eventDate instanceof Date) {
          dataToSave.eventDate = dataToSave.eventDate.toISOString() as any;
        }
        localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      } catch (error) {
        console.warn('Error saving guided search data to localStorage:', error);
      }
      
      return updated;
    });
  };

  // פונקציה לניקוי הנתונים
  const clearData = () => {
    setData({});
    localStorage.removeItem(storageKey);
  };

  return {
    data,
    updateData,
    clearData
  };
};
