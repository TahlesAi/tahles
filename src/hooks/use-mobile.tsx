
import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // בדיקה ראשונית
    checkIsMobile();

    // האזנה לשינויי גודל המסך
    window.addEventListener('resize', checkIsMobile);
    
    // ניקוי האירוע בעת עזיבת הקומפוננטה
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile; // גם ייצוא כברירת מחדל למקרה שמייבאים ללא שם ספציפי
