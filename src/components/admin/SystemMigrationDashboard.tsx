
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { InfoCircled } from 'lucide-react';

const SystemMigrationDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert className="mb-6">
        <InfoCircled className="h-4 w-4" />
        <AlertDescription>
          <strong>מערכת מעבר מקיפה:</strong> המערכת עברה שדרוג משמעותי למערכת מעבר מקיפה.
          המערכת החדשה מאפשרת הקפאה, בדיקה והטמעת מבנה חדש באופן מלא.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-center">
        <Button onClick={() => window.location.reload()}>טען את המערכת המקיפה</Button>
      </div>
    </div>
  );
};

export default SystemMigrationDashboard;
