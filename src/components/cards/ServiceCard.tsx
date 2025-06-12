
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  rating,
  reviewCount
}) => {
  return (
    <Card className="service-card">
      <CardHeader className="p-0">
        <div className="aspect-video w-full bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500">({reviewCount} ביקורות)</span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Badge variant="outline">₪{price.toLocaleString()}</Badge>
            <Button size="sm">הזמן עכשיו</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
