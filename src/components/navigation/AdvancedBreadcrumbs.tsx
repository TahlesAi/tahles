
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface AdvancedBreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const AdvancedBreadcrumbs: React.FC<AdvancedBreadcrumbsProps> = ({ 
  items,
  className 
}) => {
  const location = useLocation();
  
  // יצירת breadcrumbs אוטומטיים מהנתיב אם לא סופקו items
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'דף הבית', href: '/' }
    ];
    
    let currentPath = '';
    
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      
      // מיפוי שמות ידידותיים לנתיבים
      const friendlyNames: Record<string, string> = {
        'search': 'תוצאות חיפוש',
        'service': 'פרטי שירות',
        'provider': 'פרופיל ספק',
        'categories': 'קטגוריות',
        'booking': 'הזמנה',
        'dashboard': 'לוח בקרה'
      };
      
      breadcrumbs.push({
        label: friendlyNames[segment] || segment,
        href: isLast ? undefined : currentPath,
        isActive: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = items || generateBreadcrumbs();
  
  if (breadcrumbItems.length <= 1) return null;
  
  return (
    <div className={cn("py-2 px-4 bg-gray-50 border-b", className)}>
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-1 text-sm">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href && !item.isActive ? (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={item.href}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {index === 0 && <Home className="h-4 w-4 ml-1" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-gray-900 font-medium">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AdvancedBreadcrumbs;
