
import React from "react";
import { Check } from "lucide-react";

interface ServiceDetailInfoProps {
  service: any;
  showMedia?: boolean;
}

const ServiceDetailInfo = ({ service, showMedia = true }: ServiceDetailInfoProps) => {
  // לוודא שהשדות קיימים לפני שימוש בהם
  const features = service.features || [];
  const eventTypes = service.eventTypes || service.event_types || [];
  const technicalRequirements = service.technicalRequirements || service.technical_requirements || [];
  const audienceAges = service.audienceAges || service.audience_ages || [];

  return (
    <div className="mb-8">
      {/* מידע טכני */}
      {(service.duration || service.audienceSize || audienceAges.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">מידע טכני</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.duration && (
              <div className="flex flex-col bg-gray-50 p-3 rounded-md">
                <span className="text-sm text-gray-600">משך זמן</span>
                <span className="font-medium">{service.duration}</span>
              </div>
            )}
            
            {service.audienceSize && (
              <div className="flex flex-col bg-gray-50 p-3 rounded-md">
                <span className="text-sm text-gray-600">גודל קהל מקסימלי</span>
                <span className="font-medium">{service.audienceSize}</span>
              </div>
            )}
            
            {audienceAges.length > 0 && (
              <div className="flex flex-col bg-gray-50 p-3 rounded-md">
                <span className="text-sm text-gray-600">מתאים לגילאים</span>
                <span className="font-medium">{audienceAges.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* סוגי אירועים */}
      {eventTypes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">מתאים לאירועים</h2>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type: string, idx: number) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* דרישות טכניות */}
      {technicalRequirements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">דרישות טכניות</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {technicalRequirements.map((req: string, idx: number) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* מאפיינים/יתרונות */}
      {features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">מאפיינים נוספים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailInfo;
