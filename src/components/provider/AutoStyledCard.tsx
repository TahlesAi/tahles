
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, CheckCircle, Eye, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { ProviderProfile } from "@/lib/types";
import { categoryTemplates } from "@/lib/smartProviderGenerator";

interface AutoStyledCardProps {
  provider: ProviderProfile;
  showServices?: boolean;
}

const AutoStyledCard: React.FC<AutoStyledCardProps> = ({ 
  provider, 
  showServices = true 
}) => {
  // מציאת תבנית העיצוב לפי קטגוריה
  const categoryTemplate = categoryTemplates.find(template => 
    provider.categories.some(cat => cat === template.name)
  );

  // עיצוב ברירת מחדל
  const defaultStyling = {
    colors: {
      primary: '#2563EB',
      secondary: '#3B82F6',
      accent: '#60A5FA'
    },
    styling: {
      cardStyle: 'modern' as const,
      imageStyle: 'clean' as const,
      fontStyle: 'modern' as const
    }
  };

  const styling = categoryTemplate || defaultStyling;
  
  // יצירת CSS variables דינמיים
  const cardStyle = {
    '--primary-color': styling.colors.primary,
    '--secondary-color': styling.colors.secondary,
    '--accent-color': styling.colors.accent,
  } as React.CSSProperties;

  // קביעת classes לפי סגנון הקטגוריה
  const getCardClasses = () => {
    const baseClasses = "h-full hover:shadow-lg transition-all duration-300 group relative overflow-hidden";
    
    switch (styling.styling.cardStyle) {
      case 'artistic':
        return `${baseClasses} border-2 border-gradient bg-gradient-to-br from-purple-50 to-violet-100 hover:scale-[1.02]`;
      case 'elegant':
        return `${baseClasses} shadow-md border border-gray-200 bg-white hover:shadow-xl`;
      case 'classic':
        return `${baseClasses} border border-gray-300 bg-gray-50 hover:bg-white`;
      default:
        return `${baseClasses} border border-gray-200 bg-white hover:shadow-xl`;
    }
  };

  const getFontClasses = () => {
    switch (styling.styling.fontStyle) {
      case 'bold':
        return 'font-bold text-gray-900';
      case 'elegant':
        return 'font-serif font-medium text-gray-800';
      case 'casual':
        return 'font-medium text-gray-700';
      default:
        return 'font-semibold text-gray-900';
    }
  };

  const getImageClasses = () => {
    const baseClasses = "w-16 h-16 object-cover rounded-lg border-2";
    
    switch (styling.styling.imageStyle) {
      case 'dramatic':
        return `${baseClasses} border-purple-300 shadow-lg filter contrast-110 saturate-110`;
      case 'vibrant':
        return `${baseClasses} border-red-300 shadow-md filter saturate-125 brightness-105`;
      case 'elegant':
        return `${baseClasses} border-green-300 shadow-sm filter sepia-10`;
      default:
        return `${baseClasses} border-gray-300 shadow-sm`;
    }
  };

  return (
    <Card className={getCardClasses()} style={cardStyle}>
      {/* רקע דקורטיבי לפי קטגוריה */}
      {styling.styling.cardStyle === 'artistic' && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-transparent to-violet-200 opacity-30" />
      )}
      
      <CardContent className="p-6 relative z-10">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              {provider.logo ? (
                <img 
                  src={provider.logo} 
                  alt={provider.businessName}
                  className={getImageClasses()}
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Basic Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-lg truncate ${getFontClasses()}`}>
                  {provider.businessName}
                </h3>
                {provider.verified && (
                  <CheckCircle 
                    className="h-5 w-5 flex-shrink-0" 
                    style={{ color: styling.colors.primary }}
                  />
                )}
              </div>
              
              {provider.rating && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="mr-1 font-medium">{provider.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({provider.reviewCount} ביקורות)
                  </span>
                </div>
              )}
              
              {provider.city && (
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.city}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {provider.description && (
            <p className="text-gray-600 text-sm line-clamp-3 text-right leading-relaxed">
              {provider.description}
            </p>
          )}

          {/* Categories & Specialties */}
          <div className="space-y-2">
            {provider.categories && provider.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {provider.categories.slice(0, 2).map((category, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs border-2"
                    style={{ 
                      borderColor: styling.colors.secondary,
                      color: styling.colors.primary 
                    }}
                  >
                    {category}
                  </Badge>
                ))}
                {provider.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{provider.categories.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {provider.specialties && provider.specialties.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {provider.specialties.slice(0, 3).map((specialty, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs"
                    style={{ 
                      backgroundColor: `${styling.colors.accent}20`,
                      color: styling.colors.primary 
                    }}
                  >
                    {specialty}
                  </Badge>
                ))}
                {provider.specialties.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{provider.specialties.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Experience & Verification */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            {provider.yearsExperience && (
              <span>{provider.yearsExperience} שנות ניסיון</span>
            )}
            {provider.insurance && (
              <Badge variant="outline" className="text-xs">
                ביטוח מקצועי ✓
              </Badge>
            )}
          </div>

          {/* Services Count */}
          {showServices && (
            <div className="text-sm text-gray-600 border-t pt-3">
              שירותים זמינים במערכת
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link to={`/enhanced-providers/${provider.id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-2 hover:bg-opacity-10"
                style={{ 
                  borderColor: styling.colors.secondary,
                  color: styling.colors.primary
                }}
              >
                <Eye className="h-4 w-4 ml-2" />
                צפה בפרופיל
              </Button>
            </Link>
            <Link to={`/enhanced-providers/${provider.id}`}>
              <Button 
                className="text-white font-medium"
                style={{ 
                  backgroundColor: styling.colors.primary,
                  borderColor: styling.colors.primary
                }}
              >
                צור קשר
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoStyledCard;
