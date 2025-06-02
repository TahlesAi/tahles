
import React, { useState } from 'react';
import ProviderCalendarSetup from '@/components/provider/calendar/ProviderCalendarSetup';
import ProviderCalendarView from '@/components/provider/calendar/ProviderCalendarView';

const ProviderCalendar = () => {
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [setupData, setSetupData] = useState(null);

  const handleSetupComplete = (data: any) => {
    setSetupData(data);
    setSetupCompleted(true);
  };

  const handleBackToSetup = () => {
    setSetupCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!setupCompleted ? (
        <ProviderCalendarSetup 
          onComplete={handleSetupComplete}
        />
      ) : (
        <ProviderCalendarView 
          setupData={setupData}
        />
      )}
    </div>
  );
};

export default ProviderCalendar;
