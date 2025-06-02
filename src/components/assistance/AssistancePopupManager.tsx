
import React, { useState, useEffect } from 'react';
import AssistancePopup from './AssistancePopup';

const AssistancePopupManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<{
    sessionId: string;
    searchHistory: any[];
  } | null>(null);

  useEffect(() => {
    const handleShowAssistancePopup = (event: CustomEvent) => {
      setPopupData(event.detail);
      setIsOpen(true);
    };

    window.addEventListener('show-assistance-popup', handleShowAssistancePopup as EventListener);

    return () => {
      window.removeEventListener('show-assistance-popup', handleShowAssistancePopup as EventListener);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPopupData(null);
  };

  if (!popupData) return null;

  return (
    <AssistancePopup
      isOpen={isOpen}
      onClose={handleClose}
      sessionId={popupData.sessionId}
      searchHistory={popupData.searchHistory}
    />
  );
};

export default AssistancePopupManager;
