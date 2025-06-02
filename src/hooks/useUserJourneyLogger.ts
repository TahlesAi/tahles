
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface JourneyEvent {
  timestamp: Date;
  event: string;
  page: string;
  data?: any;
  sessionId: string;
}

interface UseUserJourneyLoggerReturn {
  logEvent: (event: string, data?: any) => void;
  getJourney: () => JourneyEvent[];
  clearJourney: () => void;
}

const useUserJourneyLogger = (): UseUserJourneyLoggerReturn => {
  const location = useLocation();
  
  // יצירת session ID ייחודי
  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem('user_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('user_session_id', sessionId);
    }
    return sessionId;
  }, []);

  // תיעוד אירוע
  const logEvent = useCallback((event: string, data?: any) => {
    const journeyEvent: JourneyEvent = {
      timestamp: new Date(),
      event,
      page: location.pathname,
      data,
      sessionId: getSessionId()
    };

    // שמירה ב-localStorage
    const existingJourney = JSON.parse(
      localStorage.getItem('user_journey_log') || '[]'
    );
    
    const updatedJourney = [...existingJourney, journeyEvent];
    
    // שמירה של 100 אירועים אחרונים בלבד
    const trimmedJourney = updatedJourney.slice(-100);
    
    localStorage.setItem('user_journey_log', JSON.stringify(trimmedJourney));
    
    // לוג לקונסול לדיבאג
    console.log('User Journey Event:', journeyEvent);
    
    // הכנה עתידית ל-Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        page_path: location.pathname,
        custom_data: data
      });
    }
  }, [location.pathname, getSessionId]);

  // קבלת כל המסע
  const getJourney = useCallback((): JourneyEvent[] => {
    return JSON.parse(localStorage.getItem('user_journey_log') || '[]');
  }, []);

  // ניקוי המסע
  const clearJourney = useCallback(() => {
    localStorage.removeItem('user_journey_log');
    sessionStorage.removeItem('user_session_id');
  }, []);

  // תיעוד אוטומטי של כניסה לעמוד
  useEffect(() => {
    logEvent('page_view', {
      url: location.pathname,
      search: location.search
    });
  }, [location.pathname, location.search, logEvent]);

  return {
    logEvent,
    getJourney,
    clearJourney
  };
};

export default useUserJourneyLogger;
