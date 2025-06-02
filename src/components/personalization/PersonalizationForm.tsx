
import React from "react";
import EventDetailsSection from "./EventDetailsSection";
import AudienceSection from "./AudienceSection";
import PreferencesSection from "./PreferencesSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalizationData {
  eventType: 'business' | 'private';
  audienceType: 'secular' | 'religious' | 'ultra_orthodox' | 'arab';
  language: 'hebrew' | 'arabic' | 'english' | 'russian' | 'french';
  ageGroup: 'children' | 'youth' | 'adults' | 'seniors';
  isReception: boolean;
  isMainShow: boolean;
  isCombined: boolean;
  needsCustomization: boolean;
  attendeesCount: number;
  needsAmplification: boolean;
  eventDate: string;
  eventTime: string;
  location: string;
  budgetLimit?: number;
}

interface PersonalizationFormProps {
  data: PersonalizationData;
  onUpdate: (updates: Partial<PersonalizationData>) => void;
}

const PersonalizationForm: React.FC<PersonalizationFormProps> = ({ data, onUpdate }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">פרטי האירוע</CardTitle>
        </CardHeader>
        <CardContent>
          <EventDetailsSection data={data} onUpdate={onUpdate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">קהל היעד</CardTitle>
        </CardHeader>
        <CardContent>
          <AudienceSection data={data} onUpdate={onUpdate} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">העדפות מיוחדות</CardTitle>
        </CardHeader>
        <CardContent>
          <PreferencesSection data={data} onUpdate={onUpdate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizationForm;
