
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SearchCriteria {
  category?: string;
  subcategory?: string;
  eventType?: string;
  location?: string;
  date?: string;
  budget?: { min: number; max: number };
  attendees?: number;
}

export const useSearchTracking = () => {
  const [sessionId] = useState(() => 
    localStorage.getItem('search-session-id') || 
    (() => {
      const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('search-session-id', id);
      return id;
    })()
  );

  const trackSearch = async (criteria: SearchCriteria, resultsCount: number) => {
    try {
      await supabase.from('search_tracking').insert([{
        session_id: sessionId,
        search_criteria: criteria,
        results_found: resultsCount,
        user_ip: await getUserIP(),
        user_agent: navigator.userAgent
      }]);

      // בדיקה אם צריך להציג פופ-אפ סיוע
      await checkForAssistancePopup();
    } catch (error) {
      console.error('Error tracking search:', error);
    }
  };

  const checkForAssistancePopup = async () => {
    try {
      const { data: searches } = await supabase
        .from('search_tracking')
        .select('*')
        .eq('session_id', sessionId)
        .lte('results_found', 2) // חיפושים עם מעט תוצאות
        .order('search_timestamp', { ascending: false })
        .limit(10);

      if (searches && searches.length >= 10) {
        // השתמש ב-custom event כדי להפעיל את הפופ-אפ
        window.dispatchEvent(new CustomEvent('show-assistance-popup', {
          detail: {
            sessionId,
            searchHistory: searches
          }
        }));
      }
    } catch (error) {
      console.error('Error checking assistance popup:', error);
    }
  };

  const getUserIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  };

  return {
    sessionId,
    trackSearch
  };
};
