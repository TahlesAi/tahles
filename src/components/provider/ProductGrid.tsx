
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Star,
  Zap,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  price_unit: string;
  imageUrl: string;
  audienceSize?: string;
  duration?: string;
  location?: string;
  rating?: number;
  review_count?: number;
  tags?: string[];
  is_featured?: boolean;
  suitableFor?: string[];
  technicalRequirements?: string[];
}

interface ProductGridProps {
  products: Product[];
  providerId: string;
  providerName: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  providerId, 
  providerName 
}) => {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            אין מוצרים זמינים
          </h3>
          <p className="text-gray-500">
            הספק עדיין לא הוסיף מוצרים למערכת
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">מוצרים ושירותים</h2>
        <div className="text-sm text-gray-500">
          {products.length} מוצרים זמינים
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              {product.is_featured && (
                <Badge className="absolute top-2 right-2 bg-yellow-500">
                  <Star className="h-3 w-3 ml-1" />
                  מומלץ
                </Badge>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="sm" asChild>
                  <Link to={`/services/${product.id}`}>
                    <Eye className="h-4 w-4 ml-2" />
                    צפה במוצר
                  </Link>
                </Button>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-lg line-clamp-2">
                {product.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-3">
                {product.description}
              </p>
              
              {/* Product Details */}
              <div className="space-y-2 text-sm">
                {product.audienceSize && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{product.audienceSize} משתתפים</span>
                  </div>
                )}
                
                {product.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{product.duration}</span>
                  </div>
                )}
                
                {product.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{product.location}</span>
                  </div>
                )}
                
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{product.rating.toFixed(1)}</span>
                    {product.review_count && (
                      <span className="text-gray-500">
                        ({product.review_count})
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {product.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              
              {/* Suitable For */}
              {product.suitableFor && product.suitableFor.length > 0 && (
                <div className="text-xs text-gray-500">
                  מתאים לאירועי: {product.suitableFor.slice(0, 2).join(', ')}
                  {product.suitableFor.length > 2 && '...'}
                </div>
              )}
              
              {/* Technical Requirements */}
              {product.technicalRequirements && product.technicalRequirements.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <Zap className="h-3 w-3" />
                  <span>דורש הכנה טכנית</span>
                </div>
              )}
              
              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-left">
                  <div className="text-lg font-bold text-brand-600">
                    ₪{product.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.price_unit}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 ml-2" />
                    זמינות
                  </Button>
                  <Button size="sm" asChild>
                    <Link to={`/services/${product.id}`}>
                      הזמן עכשיו
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
