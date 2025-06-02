
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryNavigationGridProps {
  categories: Array<{
    id: string;
    name: string;
    description?: string;
    icon?: string;
    subcategories?: any[];
  }>;
}

const CategoryNavigationGrid: React.FC<CategoryNavigationGridProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: any) => {
    console.log('Navigating to category:', category.id);
    navigate(`/search/subcategories?categoryId=${category.id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => {
        const subcategoryCount = category.subcategories ? category.subcategories.length : 0;
        
        return (
          <div 
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="group block cursor-pointer"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group-hover:border-brand-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-brand-100 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-brand-200 transition-colors">
                  <div className="text-brand-600 text-2xl">
                    {category.icon ? category.icon : category.name.substring(0, 1)}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-600 transition-colors">
                  {category.name}
                </h3>
                
                {category.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                )}
                
                <Badge variant="secondary" className="text-xs">
                  {subcategoryCount} תתי קטגוריות
                </Badge>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryNavigationGrid;
