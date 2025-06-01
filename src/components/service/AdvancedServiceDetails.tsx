
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertTriangle,
  Package,
  Star,
  Zap,
  Settings
} from "lucide-react";
import ProductGenreFilter from './ProductGenreFilter';
import EnhancedServicePricing from './EnhancedServicePricing';

interface PricingRule {
  type: 'audience' | 'distance' | 'duration' | 'kosher' | 'special_requirements' | 'quantity';
  condition: string;
  modifier: number;
  modifierType: 'fixed' | 'percentage' | 'per_unit';
  description: string;
}

interface ProductVariant {
  id: string;
  name: string;
  basePrice: number;
  priceUnit: 'per_event' | 'per_person' | 'per_hour' | 'per_item';
  inventory?: number;
  maxQuantity?: number;
  pricingRules: PricingRule[];
}

interface AdvancedServiceDetailsProps {
  service: any;
  provider: any;
  onPriceUpdate: (price: number, details: any) => void;
}

const AdvancedServiceDetails: React.FC<AdvancedServiceDetailsProps> = ({
  service,
  provider,
  onPriceUpdate
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [activeVariant, setActiveVariant] = useState(0);

  // יצירת וריאנטים לדוגמה בהתבסס על המוצר
  const createServiceVariants = (): ProductVariant[] => {
    const basePrice = service.price || 5000;
    const variants: ProductVariant[] = [
      {
        id: 'basic',
        name: 'חבילה בסיסית',
        basePrice: basePrice,
        priceUnit: 'per_event',
        pricingRules: [
          {
            type: 'audience',
            condition: '100',
            modifier: 500,
            modifierType: 'per_unit',
            description: 'תוספת עבור מעל 100 משתתפים - ₪500 לכל 50 נוספים'
          },
          {
            type: 'distance',
            condition: '30',
            modifier: 10,
            modifierType: 'per_unit',
            description: 'תוספת נסיעה מעל 30 ק״מ - ₪10 לק״מ'
          }
        ]
      }
    ];

    // הוספת וריאנטים לפי סוג השירות
    if (service.category === 'מזון ומשקאות' || service.subcategory?.includes('קייטרינג')) {
      variants.push({
        id: 'per_person',
        name: 'מחיר לאדם',
        basePrice: Math.round(basePrice / 50),
        priceUnit: 'per_person',
        pricingRules: [
          {
            type: 'kosher',
            condition: 'required',
            modifier: 15,
            modifierType: 'percentage',
            description: 'תוספת כשרות - 15%'
          },
          {
            type: 'quantity',
            condition: '100',
            modifier: 10,
            modifierType: 'percentage',
            description: 'הנחת כמות מעל 100 אנשים - 10%'
          }
        ]
      });
    }

    if (service.category === 'מופעים ואמנים') {
      variants.push({
        id: 'hourly',
        name: 'תמחור שעתי',
        basePrice: Math.round(basePrice / 2),
        priceUnit: 'per_hour',
        pricingRules: [
          {
            type: 'duration',
            condition: '3',
            modifier: 20,
            modifierType: 'percentage',
            description: 'תוספת למופע מעל 3 שעות - 20%'
          }
        ]
      });
    }

    // מוצרים הנמכרים ליחידה
    if (service.category === 'מתנות' || service.subcategory?.includes('מתנות')) {
      variants.push({
        id: 'per_item',
        name: 'מחיר ליחידה',
        basePrice: 50,
        priceUnit: 'per_item',
        inventory: 100,
        maxQuantity: 50,
        pricingRules: [
          {
            type: 'quantity',
            condition: '20',
            modifier: 15,
            modifierType: 'percentage',
            description: 'הנחת כמות מעל 20 יחידות - 15%'
          }
        ]
      });
    }

    return variants;
  };

  const serviceVariants = createServiceVariants();

  const getServiceCapabilities = () => {
    const capabilities = [];
    
    // יכולות בסיס
    capabilities.push({
      icon: <Users className="h-4 w-4" />,
      title: 'קהל יעד',
      value: service.audienceSize || '10-200 אנשים'
    });
    
    capabilities.push({
      icon: <Clock className="h-4 w-4" />,
      title: 'משך זמן',
      value: service.duration || '1-2 שעות'
    });
    
    if (service.location || provider.city) {
      capabilities.push({
        icon: <MapPin className="h-4 w-4" />,
        title: 'אזור שירות',
        value: service.location || provider.city
      });
    }

    // יכולות מתקדמות
    if (service.features && service.features.length > 0) {
      capabilities.push({
        icon: <Zap className="h-4 w-4" />,
        title: 'תכונות מיוחדות',
        value: service.features.slice(0, 2).join(', ')
      });
    }

    return capabilities;
  };

  return (
    <div className="space-y-6">
      {/* פילטר ז'אנרים */}
      <ProductGenreFilter
        serviceCategory={service.category}
        serviceSubcategory={service.subcategory}
        selectedGenres={selectedGenres}
        onGenreChange={setSelectedGenres}
      />

      {/* תמחור מתקדם */}
      <EnhancedServicePricing
        service={service}
        variants={serviceVariants}
        onPriceUpdate={onPriceUpdate}
      />

      {/* פרטי שירות מתקדמים */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-600" />
            מפרט השירות המלא
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="capabilities" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="capabilities">יכולות</TabsTrigger>
              <TabsTrigger value="requirements">דרישות</TabsTrigger>
              <TabsTrigger value="included">כלול</TabsTrigger>
              <TabsTrigger value="options">תוספות</TabsTrigger>
            </TabsList>
            
            <TabsContent value="capabilities" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getServiceCapabilities().map((capability, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="text-brand-600">
                      {capability.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{capability.title}</div>
                      <div className="text-gray-600 text-sm">{capability.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="requirements" className="mt-6">
              {service.technicalRequirements && service.technicalRequirements.length > 0 ? (
                <div className="space-y-3">
                  {service.technicalRequirements.map((req: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p className="text-gray-500">אין דרישות טכניות מיוחדות</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="included" className="mt-6">
              {service.features && service.features.length > 0 ? (
                <div className="space-y-2">
                  {service.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  פרטי השירות הכלולים יוצגו כאן
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="options" className="mt-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">זמן נוסף</h4>
                    <Badge variant="outline">+₪500/שעה</Badge>
                  </div>
                  <p className="text-sm text-gray-600">הארכת המופע מעבר למשך הזמן הבסיסי</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">ציוד מתקדם</h4>
                    <Badge variant="outline">+₪800</Badge>
                  </div>
                  <p className="text-sm text-gray-600">ציוד הגברה ותאורה מקצועי</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">תוכן מותאם אישית</h4>
                    <Badge variant="outline">+₪1,200</Badge>
                  </div>
                  <p className="text-sm text-gray-600">התאמת המופע לנושא האירוע</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* התאמות לז'אנרים נבחרים */}
      {selectedGenres.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">התאמות לפי הפילטרים שנבחרו</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  {selectedGenres.includes('kosher') && (
                    <p>• השירות כולל אישור כשרות מהרבנות המקומית</p>
                  )}
                  {selectedGenres.includes('religious') && (
                    <p>• המופע מותאם לקהל שומר מסורת (ללא מגע, תוכן מתאים)</p>
                  )}
                  {selectedGenres.includes('family_friendly') && (
                    <p>• התוכן מתאים לכל בני המשפחה כולל ילדים</p>
                  )}
                  {selectedGenres.includes('luxury') && (
                    <p>• שירות פרימיום עם תוספות יוקרה</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdvancedServiceDetails;
