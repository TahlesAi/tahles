
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Users, 
  Clock, 
  MapPin, 
  DollarSign,
  Settings,
  Calendar,
  Upload,
  X,
  Plus
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  priceUnit: string;
  priceVariations: Array<{
    condition: string;
    price: number;
    description: string;
  }>;
  mainImage: string;
  additionalImages: string[];
  videos: string[];
  audienceSize: {
    min: number;
    max: number;
  };
  duration: string;
  setupTime: string;
  targetAudience: string[];
  eventTypes: string[];
  technicalRequirements: string[];
  includedServices: string[];
  additionalOptions: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  availability: {
    weekdays: string[];
    timeSlots: Array<{
      start: string;
      end: string;
    }>;
  };
  serviceAreas: string[];
  tags: string[];
}

interface EnhancedProductCreationProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onBack?: () => void;
  adminMode?: boolean;
}

const EnhancedProductCreation: React.FC<EnhancedProductCreationProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  adminMode = false
}) => {
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    longDescription: "",
    price: 0,
    priceUnit: "לאירוע",
    priceVariations: [],
    mainImage: "",
    additionalImages: [],
    videos: [],
    audienceSize: { min: 1, max: 100 },
    duration: "",
    setupTime: "",
    targetAudience: [],
    eventTypes: [],
    technicalRequirements: [],
    includedServices: [],
    additionalOptions: [],
    availability: {
      weekdays: [],
      timeSlots: []
    },
    serviceAreas: [],
    tags: []
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const eventTypeOptions = [
    'חתונות', 'בר/בת מצווה', 'ימי הולדת', 'אירועי חברה',
    'מסיבות רווקים/רווקות', 'אירועי גיבוש', 'כנסים ואירועי עסקים',
    'חגיגות פרטיות', 'אירועי ילדים', 'אירועי משפחה'
  ];

  const targetAudienceOptions = [
    'ילדים (0-12)', 'נוער (13-18)', 'מבוגרים צעירים (19-35)',
    'מבוגרים (36-65)', 'גיל הזהב (65+)', 'משפחות', 'עובדים', 'קהל מעורב'
  ];

  const weekdayOptions = [
    'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'
  ];

  const serviceAreaOptions = [
    'צפון', 'חיפה והקריות', 'מרכז', 'תל אביב והמרכז', 
    'ירושלים והסביבה', 'דרום', 'כל הארץ'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!adminMode) {
      if (!currentProduct.name?.trim()) {
        newErrors.name = "שם המוצר הוא שדה חובה";
      }
      if (!currentProduct.description?.trim()) {
        newErrors.description = "תיאור קצר הוא שדה חובה";
      }
      if (!currentProduct.longDescription?.trim()) {
        newErrors.longDescription = "תיאור מפורט הוא שדה חובה";
      }
      if (!currentProduct.price || currentProduct.price <= 0) {
        newErrors.price = "מחיר חייב להיות גדול מ-0";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleArrayToggle = (item: string, field: keyof Product, value: string[]) => {
    const updated = value.includes(item)
      ? value.filter(v => v !== item)
      : [...value, item];
    setCurrentProduct(prev => ({ ...prev, [field]: updated }));
  };

  const addPriceVariation = () => {
    const variations = currentProduct.priceVariations || [];
    setCurrentProduct(prev => ({
      ...prev,
      priceVariations: [
        ...variations,
        { condition: "", price: 0, description: "" }
      ]
    }));
  };

  const addAdditionalOption = () => {
    const options = currentProduct.additionalOptions || [];
    setCurrentProduct(prev => ({
      ...prev,
      additionalOptions: [
        ...options,
        { name: "", price: 0, description: "" }
      ]
    }));
  };

  const addTimeSlot = () => {
    const slots = currentProduct.availability?.timeSlots || [];
    setCurrentProduct(prev => ({
      ...prev,
      availability: {
        ...prev.availability!,
        timeSlots: [
          ...slots,
          { start: "09:00", end: "17:00" }
        ]
      }
    }));
  };

  const saveProduct = () => {
    if (!validate()) return;

    const products = data.enhancedProducts || [];
    const productWithId = {
      ...currentProduct,
      id: editingIndex !== null ? products[editingIndex].id : Date.now().toString()
    };

    let updatedProducts;
    if (editingIndex !== null) {
      updatedProducts = [...products];
      updatedProducts[editingIndex] = productWithId;
    } else {
      updatedProducts = [...products, productWithId];
    }

    onUpdate({ enhancedProducts: updatedProducts });
    resetCurrentProduct();
  };

  const resetCurrentProduct = () => {
    setCurrentProduct({
      name: "",
      description: "",
      longDescription: "",
      price: 0,
      priceUnit: "לאירוע",
      priceVariations: [],
      mainImage: "",
      additionalImages: [],
      videos: [],
      audienceSize: { min: 1, max: 100 },
      duration: "",
      setupTime: "",
      targetAudience: [],
      eventTypes: [],
      technicalRequirements: [],
      includedServices: [],
      additionalOptions: [],
      availability: {
        weekdays: [],
        timeSlots: []
      },
      serviceAreas: [],
      tags: []
    });
    setEditingIndex(null);
    setErrors({});
  };

  const editProduct = (index: number) => {
    const products = data.enhancedProducts || [];
    setCurrentProduct(products[index]);
    setEditingIndex(index);
  };

  const deleteProduct = (index: number) => {
    const products = data.enhancedProducts || [];
    const updatedProducts = products.filter((_: any, i: number) => i !== index);
    onUpdate({ enhancedProducts: updatedProducts });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center mb-6">
        <Package className="h-12 w-12 text-brand-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">יצירת מוצרים מתקדמת</h2>
        <p className="text-gray-600">
          צור מוצרים מפורטים עם כל המידע הדרוש ללקוחות
        </p>
      </div>

      {/* Product List */}
      {data.enhancedProducts && data.enhancedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>מוצרים שנוצרו ({data.enhancedProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.enhancedProducts.map((product: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">₪{product.price} {product.priceUnit}</Badge>
                      {product.eventTypes && product.eventTypes.length > 0 && (
                        <Badge variant="secondary">{product.eventTypes[0]}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => editProduct(index)}>
                      עריכה
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteProduct(index)}>
                      מחיקה
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Product Creation Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingIndex !== null ? 'עריכת מוצר' : 'הוספת מוצר חדש'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="productName">שם המוצר *</Label>
              <Input
                id="productName"
                value={currentProduct.name || ""}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="מופע קסמים לילדים"
                className="mt-1"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="duration">משך זמן</Label>
              <Input
                id="duration"
                value={currentProduct.duration || ""}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="45 דקות"
                className="mt-1"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <Label htmlFor="shortDescription">תיאור קצר *</Label>
            <Textarea
              id="shortDescription"
              value={currentProduct.description || ""}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, description: e.target.value }))}
              placeholder="תיאור קצר ומעניין של המוצר..."
              className="mt-1"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="longDescription">תיאור מפורט *</Label>
            <Textarea
              id="longDescription"
              value={currentProduct.longDescription || ""}
              onChange={(e) => setCurrentProduct(prev => ({ ...prev, longDescription: e.target.value }))}
              placeholder="תיאור מפורט של המוצר, מה כלול, איך זה עובד..."
              className="mt-1 min-h-[120px]"
            />
            {errors.longDescription && <p className="text-red-500 text-sm mt-1">{errors.longDescription}</p>}
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">מחיר בסיס *</Label>
              <Input
                id="price"
                type="number"
                value={currentProduct.price || ""}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                placeholder="1500"
                className="mt-1"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <Label htmlFor="priceUnit">יחידת מחיר</Label>
              <Select
                value={currentProduct.priceUnit || "לאירוע"}
                onValueChange={(value) => setCurrentProduct(prev => ({ ...prev, priceUnit: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="לאירוע">לאירוע</SelectItem>
                  <SelectItem value="לשעה">לשעה</SelectItem>
                  <SelectItem value="ליום">ליום</SelectItem>
                  <SelectItem value="לאדם">לאדם</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="setupTime">זמן הכנה</Label>
              <Input
                id="setupTime"
                value={currentProduct.setupTime || ""}
                onChange={(e) => setCurrentProduct(prev => ({ ...prev, setupTime: e.target.value }))}
                placeholder="30 דקות"
                className="mt-1"
              />
            </div>
          </div>

          {/* Audience Size */}
          <div>
            <Label>גודל קהל מתאים</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="minAudience">מינימום משתתפים</Label>
                <Input
                  id="minAudience"
                  type="number"
                  value={currentProduct.audienceSize?.min || ""}
                  onChange={(e) => setCurrentProduct(prev => ({
                    ...prev,
                    audienceSize: {
                      ...prev.audienceSize!,
                      min: parseInt(e.target.value) || 1
                    }
                  }))}
                  placeholder="10"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxAudience">מקסימום משתתפים</Label>
                <Input
                  id="maxAudience"
                  type="number"
                  value={currentProduct.audienceSize?.max || ""}
                  onChange={(e) => setCurrentProduct(prev => ({
                    ...prev,
                    audienceSize: {
                      ...prev.audienceSize!,
                      max: parseInt(e.target.value) || 100
                    }
                  }))}
                  placeholder="50"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Event Types */}
          <div>
            <Label>מתאים לאירועים</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {eventTypeOptions.map((type) => (
                <div key={type} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`event-${type}`}
                    checked={currentProduct.eventTypes?.includes(type) || false}
                    onCheckedChange={() => handleArrayToggle(type, 'eventTypes', currentProduct.eventTypes || [])}
                  />
                  <Label htmlFor={`event-${type}`} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <Label>קהל יעד</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {targetAudienceOptions.map((audience) => (
                <div key={audience} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`audience-${audience}`}
                    checked={currentProduct.targetAudience?.includes(audience) || false}
                    onCheckedChange={() => handleArrayToggle(audience, 'targetAudience', currentProduct.targetAudience || [])}
                  />
                  <Label htmlFor={`audience-${audience}`} className="text-sm">
                    {audience}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <Label>אזורי שירות</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {serviceAreaOptions.map((area) => (
                <div key={area} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`service-area-${area}`}
                    checked={currentProduct.serviceAreas?.includes(area) || false}
                    onCheckedChange={() => handleArrayToggle(area, 'serviceAreas', currentProduct.serviceAreas || [])}
                  />
                  <Label htmlFor={`service-area-${area}`} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Requirements */}
          <div>
            <Label htmlFor="technicalRequirements">דרישות טכניות</Label>
            <Textarea
              id="technicalRequirements"
              value={(currentProduct.technicalRequirements || []).join('\n')}
              onChange={(e) => setCurrentProduct(prev => ({
                ...prev,
                technicalRequirements: e.target.value.split('\n').filter(req => req.trim())
              }))}
              placeholder="חשמל 220V&#10;שטח מינימלי 3x3 מטר&#10;גישה לרכב"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">הזן כל דרישה בשורה נפרדת</p>
          </div>

          {/* Included Services */}
          <div>
            <Label htmlFor="includedServices">מה כלול בשירות</Label>
            <Textarea
              id="includedServices"
              value={(currentProduct.includedServices || []).join('\n')}
              onChange={(e) => setCurrentProduct(prev => ({
                ...prev,
                includedServices: e.target.value.split('\n').filter(service => service.trim())
              }))}
              placeholder="מופע מלא&#10;ציוד קסמים&#10;אינטראקציה עם הקהל"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">הזן כל שירות בשורה נפרדת</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={saveProduct} className="flex-1">
              {editingIndex !== null ? 'עדכן מוצר' : 'שמור מוצר'}
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={resetCurrentProduct}>
                בטל עריכה
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            חזור
          </Button>
        )}
        <Button 
          onClick={onNext} 
          className="mr-auto"
          disabled={!data.enhancedProducts || data.enhancedProducts.length === 0}
        >
          המשך
        </Button>
      </div>
    </div>
  );
};

export default EnhancedProductCreation;
