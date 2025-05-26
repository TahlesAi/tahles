
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Calendar, 
  Award, 
  ExternalLink, 
  Phone, 
  Mail,
  Star,
  CheckCircle,
  Globe,
  Newspaper,
  Building,
  ThumbsUp
} from "lucide-react";

interface ProviderBusinessProfileProps {
  provider: {
    id: string;
    name: string;
    description: string;
    city?: string;
    contact_phone: string;
    contact_email: string;
    website?: string;
    rating?: number;
    review_count?: number;
    is_verified: boolean;
    logo_url?: string;
    serviceAreas?: string[];
    experience?: string;
    testimonials?: Array<{
      id: string;
      text: string;
      author: string;
      rating: number;
    }>;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
    specialties?: string[];
    mediaLinks?: Array<{
      id: string;
      title: string;
      url: string;
      source: string;
      date?: string;
    }>;
    clientRecommendations?: Array<{
      id: string;
      clientName: string;
      company: string;
      position?: string;
      logoUrl?: string;
      recommendation: string;
    }>;
  };
  gallery?: Array<{
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
}

const ProviderBusinessProfile: React.FC<ProviderBusinessProfileProps> = ({ 
  provider, 
  gallery = [] 
}) => {
  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Logo and Basic Info */}
            <div className="flex-shrink-0">
              {provider.logo_url ? (
                <img 
                  src={provider.logo_url} 
                  alt={provider.name}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Business Details */}
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{provider.name}</h1>
                    {provider.is_verified && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  
                  {provider.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="mr-1 font-medium">{provider.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-500">
                        ({provider.review_count} ביקורות)
                      </span>
                    </div>
                  )}
                  
                  {provider.city && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.city}</span>
                    </div>
                  )}
                </div>
                
                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 ml-2" />
                    התקשר
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 ml-2" />
                    שלח מייל
                  </Button>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-4">
                {provider.description}
              </p>
              
              {/* Specialties */}
              {provider.specialties && provider.specialties.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      {provider.serviceAreas && provider.serviceAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              אזורי שירות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {provider.serviceAreas.map((area, index) => (
                <Badge key={index} variant="outline">
                  {area}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>גלריה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((item, index) => (
                <div key={index} className="relative group">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={`תמונה ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    />
                  ) : (
                    <div className="relative">
                      <video 
                        src={item.url} 
                        className="w-full h-32 object-cover rounded-lg"
                        poster={item.thumbnail}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-4 border-l-gray-800 border-t-2 border-b-2 border-t-transparent border-b-transparent mr-0.5"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Coverage */}
      {provider.mediaLinks && provider.mediaLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5" />
              כתבו עלינו
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {provider.mediaLinks.map((link) => (
                <div key={link.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg mb-1">{link.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{link.source}</p>
                      {link.date && (
                        <p className="text-gray-500 text-xs">{link.date}</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 ml-2" />
                        קרא
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Recommendations */}
      {provider.clientRecommendations && provider.clientRecommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5" />
              ממליצים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {provider.clientRecommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-start gap-4">
                    {rec.logoUrl && (
                      <div className="flex-shrink-0">
                        <img 
                          src={rec.logoUrl} 
                          alt={rec.company}
                          className="w-12 h-12 object-contain rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{rec.company}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {rec.clientName}
                        {rec.position && ` - ${rec.position}`}
                      </p>
                      <p className="text-gray-700 text-sm italic">
                        "{rec.recommendation}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials */}
      {provider.testimonials && provider.testimonials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              המלצות לקוחות
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {provider.testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border-r-4 border-brand-200 pr-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < testimonial.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-2">"{testimonial.text}"</p>
                  <p className="text-sm font-medium text-gray-900">
                    - {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* External Links */}
      {(provider.website || provider.socialLinks) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              קישורים חיצוניים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {provider.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={provider.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 ml-2" />
                    אתר האינטרנט
                  </a>
                </Button>
              )}
              
              {provider.socialLinks?.facebook && (
                <Button variant="outline" size="sm" asChild>
                  <a href={provider.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    פייסבוק
                  </a>
                </Button>
              )}
              
              {provider.socialLinks?.instagram && (
                <Button variant="outline" size="sm" asChild>
                  <a href={provider.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    אינסטגרם
                  </a>
                </Button>
              )}
              
              {provider.socialLinks?.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={provider.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    לינקדאין
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderBusinessProfile;
