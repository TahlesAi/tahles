
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Grid, 
  List, 
  Star,
  MapPin,
  Users,
  Clock,
  Eye,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_unit?: string;
  imageUrl?: string;
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatPrice = (price: number, unit?: string) => {
    return `₪${price.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  };

  const ProductGridItem = ({ product }: { product: Product }) => (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          {/* Product Image */}
          <div className="relative h-48 overflow-hidden rounded-t-lg">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="text-2xl mb-2">📷</div>
                  <div className="text-sm">אין תמונה</div>
                </div>
              </div>
            )}
            
            {/* Featured Badge */}
            {product.is_featured && (
              <Badge className="absolute top-3 right-3 bg-yellow-500">
                <Star className="h-3 w-3 ml-1" />
                מומלץ
              </Badge>
            )}
          </div>

          {/* Product Content */}
          <div className="p-4 space-y-3">
            <h4 className="font-semibold text-lg line-clamp-2 text-right">
              {product.name}
            </h4>

            {product.description && (
              <p className="text-gray-600 text-sm line-clamp-2 text-right">
                {product.description}
              </p>
            )}

            {/* Product Details */}
            <div className="space-y-2 text-sm text-gray-600">
              {product.audienceSize && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{product.audienceSize}</span>
                </div>
              )}
              
              {product.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{product.duration}</span>
                </div>
              )}
              
              {product.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {product.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{product.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Price and Actions */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="text-right">
                <div className="text-lg font-bold text-brand-600">
                  {formatPrice(product.price, product.price_unit)}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/enhanced-services/${product.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 ml-2" />
                    צפה
                  </Button>
                </Link>
                <Link to={`/enhanced-services/${product.id}`}>
                  <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                    הזמן
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 overflow-hidden rounded-lg">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-center text-xs">
                    📷
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-grow min-w-0 space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-lg line-clamp-1 text-right">
                {product.name}
              </h4>
              {product.is_featured && (
                <Badge className="bg-yellow-500 ml-2">
                  <Star className="h-3 w-3 ml-1" />
                  מומלץ
                </Badge>
              )}
            </div>

            {product.description && (
              <p className="text-gray-600 text-sm line-clamp-2 text-right">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
              {product.audienceSize && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{product.audienceSize}</span>
                </div>
              )}
              
              {product.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{product.duration}</span>
                </div>
              )}
              
              {product.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{product.location}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-brand-600">
                {formatPrice(product.price, product.price_unit)}
              </div>
              
              <div className="flex gap-2">
                <Link to={`/enhanced-services/${product.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 ml-2" />
                    צפה
                  </Button>
                </Link>
                <Link to={`/enhanced-services/${product.id}`}>
                  <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
                    הזמן
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              מוצרים ושירותים של {providerName}
            </CardTitle>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <p className="text-gray-600">
            {products.length} מוצרים זמינים
          </p>
        </CardHeader>
      </Card>

      {/* Products Grid/List */}
      {products.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }>
          {products.map((product) => 
            viewMode === 'grid' ? (
              <ProductGridItem key={product.id} product={product} />
            ) : (
              <ProductListItem key={product.id} product={product} />
            )
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                אין מוצרים זמינים
              </h3>
              <p className="text-gray-600">
                הספק עדיין לא העלה מוצרים למערכת
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductGrid;
