
import React from "react";
import { Check, Clock, Users, Star, MapPin } from "lucide-react";

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
    <div className="space-y-8">
      {/* מידע טכני בכרטיסים */}
      {(service.duration || service.audienceSize || audienceAges.length > 0) && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-brand-600" />
            מידע טכני
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.duration && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">משך זמן</span>
                </div>
                <span className="text-lg font-semibold text-blue-900">{service.duration}</span>
              </div>
            )}
            
            {service.audienceSize && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">גודל קהל מקסימלי</span>
                </div>
                <span className="text-lg font-semibold text-green-900">{service.audienceSize}</span>
              </div>
            )}
            
            {audienceAges.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-800">מתאים לגילאים</span>
                </div>
                <span className="text-lg font-semibold text-purple-900">{audienceAges.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* סוגי אירועים */}
      {eventTypes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-brand-600" />
            מתאים לאירועים
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-3 py-2 bg-white border border-brand-200 text-brand-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* דרישות טכניות */}
      {technicalRequirements.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">דרישות טכניות</h2>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <ul className="space-y-2">
              {technicalRequirements.map((req: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* מאפיינים/יתרונות */}
      {features.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-brand-600" />
            מאפיינים נוספים
          </h2>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailInfo;
