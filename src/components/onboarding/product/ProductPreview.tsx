
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Ban, Check } from "lucide-react";

interface ProductPreviewProps {
  productData: {
    title: string;
    duration: number;
    audience: number;
    ageRange: string;
    price: number;
  };
}

const ProductPreview = ({ productData }: ProductPreviewProps) => {
  const { title, duration, audience, ageRange, price } = productData;
  
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">תצוגת דוגמה</h3>
          <span className="text-xs text-gray-500">איך הלקוחות יראו את המוצר שלך</span>
        </div>
        
        {title ? (
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 aspect-[3/1] flex items-center justify-center border-b">
              <div className="text-gray-400 flex flex-col items-center">
                <span className="text-4xl mb-2">🖼️</span>
                <span className="text-sm">תמונת נושא תופיע כאן</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{title || "שם המוצר/שירות"}</h3>
                <span className="font-bold text-primary">
                  {price ? `₪${price}` : "₪0"}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-4 text-sm">
                {duration > 0 && (
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 ml-1" />
                    <span>{duration} דקות</span>
                  </div>
                )}
                
                {audience > 0 && (
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 ml-1" />
                    <span>עד {audience} משתתפים</span>
                  </div>
                )}
                
                {ageRange && (
                  <div className="flex items-center text-gray-600">
                    <span>גילאי {ageRange}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10">שירות מובחר</Badge>
                <Badge variant="outline">מקצועי</Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center">
            <p className="text-gray-500 text-sm text-center">תצוגה מקדימה של המוצר תופיע כאן</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductPreview;
