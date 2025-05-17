
import React from "react";
import { MapPin } from "lucide-react";

interface ServiceLocationTabProps {
  provider: {
    address?: string;
    travel_distance?: string;
  };
  serviceLocation?: string;
}

const ServiceLocationTab = ({ provider, serviceLocation }: ServiceLocationTabProps) => {
  return (
    <div className="pt-4">
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <MapPin className="h-10 w-10 mx-auto mb-4 text-gray-500" />
        {provider.address || serviceLocation ? (
          <>
            <h3 className="font-medium mb-2">מיקום השירות</h3>
            <p className="text-gray-700">{provider.address || serviceLocation}</p>
            {provider.travel_distance && (
              <div className="mt-4 text-sm p-2 bg-gray-100 rounded inline-block">
                ספק השירות מוכן להגיע למרחק של עד {provider.travel_distance} ק"מ
              </div>
            )}
          </>
        ) : (
          <>
            <h3 className="font-medium mb-2">מיקום לא זמין</h3>
            <p className="text-gray-500">אין פרטי מיקום זמינים לשירות זה</p>
            <p className="text-sm mt-2">
              צרו קשר עם הספק לפרטים נוספים אודות מיקום השירות
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceLocationTab;
