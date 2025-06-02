
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

interface SubcategoryGridProps {
  categories: Array<{
    id: string;
    name: string;
    description?: string;
    parentCategoryId: string;
    icon?: string;
  }>;
}

const SubcategoryGrid: React.FC<SubcategoryGridProps> = ({ categories }) => {
  const handleSubcategoryClick = (subcategory: any) => {
    console.log('Navigating to subcategory:', subcategory.id, 'from parent:', subcategory.parentCategoryId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((subcategory) => (
        <Link
          key={subcategory.id}
          to={`/search?subcategory=${subcategory.id}&category=${subcategory.parentCategoryId}`}
          className="group block"
          onClick={() => handleSubcategoryClick(subcategory)}
        >
          <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group-hover:border-brand-200">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-brand-200 transition-colors">
                <Layers className="h-8 w-8 text-brand-600" />
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                {subcategory.name}
              </h3>
              
              {subcategory.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {subcategory.description}
                </p>
              )}
              
              <Badge variant="secondary" className="text-xs">
                תת קטגוריה
              </Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SubcategoryGrid;
