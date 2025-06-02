
import { useState, useCallback } from 'react';
import useIsMobile from './use-mobile';
import useUserJourneyLogger from './useUserJourneyLogger';

interface QuickViewData {
  id: string;
  type: 'service' | 'provider';
  name: string;
  description: string;
  imageUrl?: string;
  price?: number;
  priceUnit?: string;
  provider?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  tags?: string[];
}

interface UseQuickViewReturn {
  quickViewData: QuickViewData | null;
  isQuickViewOpen: boolean;
  openQuickView: (data: QuickViewData) => void;
  closeQuickView: () => void;
  handleLongPress: (data: QuickViewData) => (e: React.TouchEvent) => void;
}

const useQuickView = (): UseQuickViewReturn => {
  const [quickViewData, setQuickViewData] = useState<QuickViewData | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const isMobile = useIsMobile();
  const { logEvent } = useUserJourneyLogger();

  const openQuickView = useCallback((data: QuickViewData) => {
    if (!isMobile) return;
    
    setQuickViewData(data);
    setIsQuickViewOpen(true);
    
    logEvent('quick_view_open', {
      id: data.id,
      type: data.type,
      name: data.name
    });
  }, [isMobile, logEvent]);

  const closeQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewData(null), 300); // המתנה לאנימציה
    
    logEvent('quick_view_close');
  }, [logEvent]);

  const handleLongPress = useCallback((data: QuickViewData) => {
    let pressTimer: NodeJS.Timeout | null = null;
    
    return (e: React.TouchEvent) => {
      if (!isMobile) return;
      
      if (e.type === 'touchstart') {
        pressTimer = setTimeout(() => {
          e.preventDefault();
          openQuickView(data);
        }, 500); // לחיצה ארוכה של 500ms
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
      }
    };
  }, [isMobile, openQuickView]);

  return {
    quickViewData,
    isQuickViewOpen,
    openQuickView,
    closeQuickView,
    handleLongPress
  };
};

export default useQuickView;
