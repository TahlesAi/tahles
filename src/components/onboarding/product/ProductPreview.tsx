
import { Card, CardContent } from "@/components/ui/card";

const ProductPreview = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">תצוגת דוגמה</h3>
          <span className="text-xs text-gray-500">איך הלקוחות יראו את המוצר שלך</span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center">
          <p className="text-gray-500 text-sm text-center">תצוגה מקדימה של המוצר תופיע כאן</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPreview;
