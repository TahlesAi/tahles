
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Calendar,
  Lightbulb,
  Star,
  CheckCircle,
  Tag,
  User,
  Video,
  Image
} from 'lucide-react';

interface ServiceDetailInfoProps {
  service: any;
  showMedia?: boolean;
}

const ServiceDetailInfo = ({ service, showMedia = false }: ServiceDetailInfoProps) => {
  // Check if specific metadata exists
  const hasAudienceInfo = service.audience_size || (service.audience_ages?.length > 0);
  const hasTechnicalRequirements = service.technical_requirements?.length > 0;
  const hasEventTypes = service.event_types?.length > 0;
  
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">מידע כללי</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.duration && (
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-gray-500">משך זמן</div>
                  <div>{service.duration}</div>
                </div>
              </div>
            )}
            
            {service.price_range && (
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Tag className="h-5 w-5 text-gray-600" />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-gray-500">מחיר</div>
                  <div>{service.price_range} {service.price_unit || 'לאירוע'}</div>
                </div>
              </div>
            )}
            
            {service.availability && (
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-gray-500">זמינות</div>
                  <div>{service.availability}</div>
                </div>
              </div>
            )}
            
            {service.is_reception_service !== undefined && (
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${service.is_reception_service ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <User className={`h-5 w-5 ${service.is_reception_service ? 'text-green-600' : 'text-gray-600'}`} />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-gray-500">סוג שירות</div>
                  <div>{service.is_reception_service ? 'מתאים לקבלת פנים' : 'שירות מרכזי'}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Audience Information */}
      {hasAudienceInfo && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">מותאם לקהל</h3>
            <div className="space-y-4">
              {service.audience_size && (
                <div className="flex items-center">
                  <div className="bg-brand-50 p-2 rounded-full">
                    <Users className="h-5 w-5 text-brand-600" />
                  </div>
                  <div className="mr-3">
                    <div className="text-sm text-gray-500">גודל קהל</div>
                    <div>עד {service.audience_size} אנשים</div>
                  </div>
                </div>
              )}
              
              {service.audience_ages && service.audience_ages.length > 0 && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">קבוצות גיל</div>
                  <div className="flex flex-wrap gap-2">
                    {service.audience_ages.map((age: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-brand-50 border-brand-200">
                        {age}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Event Types */}
      {hasEventTypes && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">מתאים לאירועים</h3>
            <div className="flex flex-wrap gap-2">
              {service.event_types.map((eventType: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-accent1-50 border-accent1-200">
                  {eventType}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Technical Requirements */}
      {hasTechnicalRequirements && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">דרישות טכניות</h3>
            <ul className="space-y-2">
              {service.technical_requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5 ml-2" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      {/* Media information */}
      {showMedia && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-3">מדיה זמינה</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full">
                  <Image className="h-5 w-5 text-gray-600" />
                </div>
                <div className="mr-3">
                  <div className="text-sm text-gray-500">תמונות</div>
                  <div>{(service.additional_images && Array.isArray(service.additional_images)) ? service.additional_images.length + 1 : 1}</div>
                </div>
              </div>
              
              {service.videos && Array.isArray(service.videos) && service.videos.length > 0 && (
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Video className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="mr-3">
                    <div className="text-sm text-gray-500">סרטונים</div>
                    <div>{service.videos.length}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServiceDetailInfo;
