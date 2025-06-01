
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
  Settings,
  Calendar,
  Wrench
} from "lucide-react";
import ProductGenreFilter from './ProductGenreFilter';
import EnhancedServicePricing from './EnhancedServicePricing';
import { ProductVariant, PricingRule, Commission } from '@/types';

interface AdvancedServiceDetailsProps {
  service: any;
  provider: any;
  onPriceUpdate: (price: number, details: any) => void;
  commission?: Commission;
}

const AdvancedServiceDetails: React.FC<AdvancedServiceDetailsProps> = ({
  service,
  provider,
  onPriceUpdate,
  commission = { rate: 0.05, type: 'percentage', includesProcessingFees: true }
}) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [activeVariant, setActiveVariant] = useState(0);

  // יצירת וריאנטים מתקדמים בהתבסס על המוצר
  const createServiceVariants = (): ProductVariant[] => {
    const basePrice = service.price || 5000;
    const variants: ProductVariant[] = [
      {
        id: 'basic',
        name: 'חבילה בסיסית',
        basePrice: basePrice,
        priceUnit: 'per_event',
        inventory: {
          type: 'unlimited'
        },
        setupRequirements: {
          setupTimeMinutes: 30,
          teardownTimeMinutes: 15,
          requiresTechnicalCrew: false
        },
        pricingRules: [
          {
            type: 'audience',
            condition: '100',
            modifier: 500,
            modifierType: 'per_unit',
            description: 'תוספת עבור מעל 100 משתתפים - ₪500 לכל 50 נוספים',
            isActive: true
          },
          {
            type: 'distance',
            condition: '30',
            modifier: 10,
            modifierType: 'per_unit',
            description: 'תוספת נסיעה מעל 30 ק״מ - ₪10 לק״מ',
            isActive: true
          },
          {
            type: 'setup_time',
            condition: '1',
            modifier: 300,
            modifierType: 'fixed',
            description: 'תוספת עבור הקמה מורכבת',
            isActive: true
          }
        ]
      }
    ];

    // וריאנטים לפי סוג השירות
    if (service.category === 'מזון ומשקאות' || service.subcategory?.includes('קייטרינג')) {
      variants.push({
        id: 'per_person',
        name: 'מחיר לאדם',
        basePrice: Math.round(basePrice / 50),
        priceUnit: 'per_person',
        inventory: {
          type: 'limited',
          currentStock: 200,
          maxStock: 500,
          reorderLevel: 50
        },
        pricingRules: [
          {
            type: 'kosher',
            condition: 'required',
            modifier: 15,
            modifierType: 'percentage',
            description: 'תוספת כשרות - 15%',
            isActive: true
          },
          {
            type: 'quantity',
            condition: '100',
            modifier: 10,
            modifierType: 'percentage',
            description: 'הנחת כמות מעל 100 אנשים - 10%',
            isActive: true
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
        inventory: {
          type: 'time_based',
          maxConcurrent: 1,
          cooldownPeriod: 120 // 2 hours between shows
        },
        setupRequirements: {
          setupTimeMinutes: 45,
          teardownTimeMinutes: 30,
          requiresTechnicalCrew: true,
          requiredSpace: 'במה 4x6 מטר מינימום',
          powerRequirements: '220V, 16A'
        },
        pricingRules: [
          {
            type: 'duration',
            condition: '3',
            modifier: 20,
            modifierType: 'percentage',
            description: 'תוספת למופע מעל 3 שעות - 20%',
            isActive: true
          },
          {
            type: 'day_of_week',
            condition: 'friday,saturday',
            modifier: 25,
            modifierType: 'percentage',
            description: 'תוספת סוף שבוע - 25%',
            isActive: true
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
        inventory: {
          type: 'limited',
          currentStock: 100,
          maxStock: 200,
          reorderLevel: 20
        },
        maxQuantity: 50,
        pricingRules: [
          {
            type: 'quantity',
            condition: '20',
            modifier: 15,
            modifierType: 'percentage',
            description: 'הנחת כמות מעל 20 יחידות - 15%',
            isActive: true
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
      value: service.audienceSize ? 
        `${service.audienceSize.min}-${service.audienceSize.max} אנשים` : 
        '10-200 אנשים'
    });
    
    capabilities.push({
      icon: <Clock className="h-4 w-4" />,
      title: 'משך זמן',
      value: service.duration ? `${Math.round(service.duration / 60)} שעות` : '1-2 שעות'
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

    // מידע על מלאי וזמינות
    if (serviceVariants[0]?.inventory) {
      const inventory = serviceVariants[0].inventory;
      capabilities.push({
        icon: <Package className="h-4 w-4" />,
        title: 'זמינות',
        value: inventory.type === 'unlimited' ? 'ללא הגבלה' : 
               inventory.type === 'time_based' ? 'לפי זמינות יומן' :
               `${inventory.currentStock} יחידות במלאי`
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

      {/* תמחור מתקדם עם עמלה */}
      <EnhancedServicePricing
        service={service}
        variants={serviceVariants}
        onPriceUpdate={onPriceUpdate}
        commission={commission}
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="capabilities">יכולות</TabsTrigger>
              <TabsTrigger value="requirements">דרישות</TabsTrigger>
              <TabsTrigger value="included">כלול</TabsTrigger>
              <TabsTrigger value="options">תוספות</TabsTrigger>
              <TabsTrigger value="availability">זמינות</TabsTrigger>
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

              {/* דרישות הקמה */}
              {serviceVariants[0]?.setupRequirements && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-900">דרישות הקמה ופירוק</h4>
                  </div>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• זמן הקמה: {serviceVariants[0].setupRequirements.setupTimeMinutes} דקות</p>
                    <p>• זמן פירוק: {serviceVariants[0].setupRequirements.teardownTimeMinutes} דקות</p>
                    {serviceVariants[0].setupRequirements.requiresTechnicalCrew && (
                      <p>• נדרש צוות טכני מקצועי</p>
                    )}
                    {serviceVariants[0].setupRequirements.requiredSpace && (
                      <p>• דרישות מקום: {serviceVariants[0].setupRequirements.requiredSpace}</p>
                    )}
                    {serviceVariants[0].setupRequirements.powerRequirements && (
                      <p>• דרישות חשמל: {serviceVariants[0].setupRequirements.powerRequirements}</p>
                    )}
                  </div>
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

            <TabsContent value="availability" className="mt-6">
              <div className="space-y-4">
                {serviceVariants.map((variant, index) => (
                  <div key={variant.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{variant.name}</h4>
                      <Badge variant={variant.inventory?.type === 'unlimited' ? 'default' : 'secondary'}>
                        {variant.inventory?.type === 'unlimited' ? 'זמין' : 
                         variant.inventory?.type === 'time_based' ? 'לפי יומן' : 'מלאי מוגבל'}
                      </Badge>
                    </div>
                    
                    {variant.inventory?.type === 'limited' && (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>מלאי נוכחי: {variant.inventory.currentStock} יחידות</p>
                        <p>מלאי מקסימלי: {variant.inventory.maxStock} יחידות</p>
                        {variant.inventory.reorderLevel && (
                          <p>רמת הזמנה חוזרת: {variant.inventory.reorderLevel} יחידות</p>
                        )}
                      </div>
                    )}
                    
                    {variant.inventory?.type === 'time_based' && (
                      <div className="text-sm text-gray-600 space-y-1">
                        {variant.inventory.maxConcurrent && (
                          <p>מקסימום במקביל: {variant.inventory.maxConcurrent} הופעות</p>
                        )}
                        {variant.inventory.cooldownPeriod && (
                          <p>זמן המתנה בין הופעות: {variant.inventory.cooldownPeriod} דקות</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
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

      {/* מידע על עמלת הפלטפורמה */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">עמלת פלטפורמה</h4>
              <p className="text-sm text-gray-700">
                עמלת הפלטפורמה היא {(commission.rate * 100).toFixed(1)}% מערך השירות ו
                {commission.includesProcessingFees ? 'כוללת' : 'לא כוללת'} עמלות עיבוד תשלומים.
                העמלה מאפשרת לנו לספק שירות איכותי, תמיכה טכנית ובטחון עסקאות.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedServiceDetails;
