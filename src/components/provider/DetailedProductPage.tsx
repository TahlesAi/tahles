
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight,
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Star,
  Zap,
  Info,
  CheckCircle,
  AlertTriangle,
  Heart,
  Share2,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

interface DetailedProduct {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  priceVariations?: Array<{
    condition: string;
    price: number;
    description: string;
  }>;
  price_unit: string;
  imageUrl: string;
  additionalImages?: string[];
  videos?: string[];
  provider: {
    id: string;
    name: string;
    contact_phone: string;
    contact_email: string;
    rating?: number;
    is_verified: boolean;
  };
  audienceSize?: string;
  minAudience?: number;
  maxAudience?: number;
  duration?: string;
  setupTime?: number;
  location?: string;
  serviceAreas?: string[];
  rating?: number;
  review_count?: number;
  tags?: string[];
  is_featured?: boolean;
  suitableFor?: string[];
  targetAudience?: string[];
  technicalRequirements?: string[];
  includedServices?: string[];
  additionalOptions?: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  availability?: {
    timeSlots: Array<{
      day: string;
      slots: Array<{
        start: string;
        end: string;
        available: boolean;
      }>;
    }>;
  };
}

interface DetailedProductPageProps {
  product: DetailedProduct;
}

const DetailedProductPage: React.FC<DetailedProductPageProps> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-brand-600">
              דף הבית
            </Link>
            <ArrowRight className="h-4 w-4" />
            <Link to={`/providers/${product.provider.id}`} className="hover:text-brand-600">
              {product.provider.name}
            </Link>
            <ArrowRight className="h-4 w-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={allImages[selectedImageIndex]} 
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  {product.is_featured && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500">
                      <Star className="h-3 w-3 ml-1" />
                      מומלץ
                    </Badge>
                  )}
                </div>
                
                {allImages.length > 1 && (
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {allImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                            selectedImageIndex === index 
                              ? 'border-brand-500' 
                              : 'border-gray-200'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`תמונה ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Videos */}
                {product.videos && product.videos.length > 0 && (
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-3">סרטוני המוצר</h4>
                    <div className="space-y-2">
                      {product.videos.map((video, index) => (
                        <video 
                          key={index}
                          src={video} 
                          controls 
                          className="w-full rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <Link 
                        to={`/providers/${product.provider.id}`}
                        className="text-brand-600 hover:underline font-medium"
                      >
                        {product.provider.name}
                      </Link>
                      {product.provider.is_verified && (
                        <Badge variant="secondary">
                          <CheckCircle className="h-3 w-3 ml-1" />
                          מאומת
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSaveToggle}
                    >
                      <Heart className={`h-4 w-4 ml-2 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                      {isSaved ? 'נשמר' : 'שמור'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 ml-2" />
                      שתף
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="mr-1 font-medium text-lg">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-500">
                      ({product.review_count} ביקורות)
                    </span>
                  </div>
                )}

                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                
                {product.longDescription && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">תיאור מפורט</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {product.longDescription}
                    </p>
                  </div>
                )}

                {/* Key Details */}
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  {(product.minAudience || product.maxAudience || product.audienceSize) && (
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">כמות משתתפים</div>
                        <div className="text-sm text-gray-600">
                          {product.audienceSize || `${product.minAudience}-${product.maxAudience} אנשים`}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {product.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">משך זמן</div>
                        <div className="text-sm text-gray-600">{product.duration}</div>
                      </div>
                    </div>
                  )}
                  
                  {product.setupTime && (
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">זמן הכנה</div>
                        <div className="text-sm text-gray-600">{product.setupTime} דקות</div>
                      </div>
                    </div>
                  )}
                  
                  {(product.location || product.serviceAreas) && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">אזור שירות</div>
                        <div className="text-sm text-gray-600">
                          {product.serviceAreas?.join(', ') || product.location}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">תגיות</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Information Tabs */}
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">פרטים</TabsTrigger>
                    <TabsTrigger value="audience">קהל יעד</TabsTrigger>
                    <TabsTrigger value="technical">דרישות טכניות</TabsTrigger>
                    <TabsTrigger value="options">תוספות</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="mt-6 space-y-4">
                    {product.includedServices && product.includedServices.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          כלול בשירות
                        </h4>
                        <ul className="space-y-2">
                          {product.includedServices.map((service, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{service}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {product.suitableFor && product.suitableFor.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">מתאים לאירועי</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.suitableFor.map((event, index) => (
                            <Badge key={index} variant="secondary">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="audience" className="mt-6">
                    {product.targetAudience && product.targetAudience.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-medium">קהל יעד מומלץ</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.targetAudience.map((audience, index) => (
                            <Badge key={index} variant="outline">
                              {audience}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        אין מידע ספציפי על קהל יעד
                      </p>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="technical" className="mt-6">
                    {product.technicalRequirements && product.technicalRequirements.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-orange-600">
                          <AlertTriangle className="h-5 w-5" />
                          <h4 className="font-medium">דרישות טכניות חובה</h4>
                        </div>
                        <ul className="space-y-2">
                          {product.technicalRequirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-gray-500">
                          לא נדרשות הכנות טכניות מיוחדות
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="options" className="mt-6">
                    {product.additionalOptions && product.additionalOptions.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="font-medium">תוספות אפשריות</h4>
                        <div className="space-y-3">
                          {product.additionalOptions.map((option, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium">{option.name}</div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                              </div>
                              <div className="text-brand-600 font-medium">
                                +₪{option.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        אין תוספות זמינות למוצר זה
                      </p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">הזמנת השירות</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="text-center border-b pb-4">
                    <div className="text-3xl font-bold text-brand-600">
                      ₪{product.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.price_unit}
                    </div>
                    
                    {product.priceVariations && product.priceVariations.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        * המחיר עשוי להשתנות לפי תנאים
                      </div>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="space-y-2 text-sm">
                    {product.audienceSize && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">כמות משתתפים:</span>
                        <span className="font-medium">{product.audienceSize}</span>
                      </div>
                    )}
                    
                    {product.duration && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">משך זמן:</span>
                        <span className="font-medium">{product.duration}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button className="w-full" size="lg">
                      <Calendar className="h-4 w-4 ml-2" />
                      בחר תאריך והזמן
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-2">
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

                  {/* Provider Link */}
                  <div className="pt-4 border-t text-center">
                    <Link 
                      to={`/providers/${product.provider.id}`}
                      className="text-brand-600 hover:underline text-sm"
                    >
                      ← צפה בכל המוצרים של {product.provider.name}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductPage;
