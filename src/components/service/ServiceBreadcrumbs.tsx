
import React from "react";
import { Link } from "react-router-dom";

interface ServiceBreadcrumbsProps {
  service: {
    category_id?: string;
    category_name?: string;
    subcategory_id?: string;
    subcategory_name?: string;
    name: string;
  };
}

const ServiceBreadcrumbs = ({ service }: ServiceBreadcrumbsProps) => {
  return (
    <div className="bg-gray-50 py-2">
      <div className="container px-4">
        <div className="flex text-sm text-gray-600">
          <Link to="/" className="hover:text-brand-600">ראשי</Link>
          <span className="mx-2">/</span>
          <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
          {service.category_name && (
            <>
              <span className="mx-2">/</span>
              <Link 
                to={`/categories/${service.category_id}`} 
                className="hover:text-brand-600"
              >
                {service.category_name}
              </Link>
            </>
          )}
          {service.subcategory_name && (
            <>
              <span className="mx-2">/</span>
              <Link 
                to={`/subcategories/${service.subcategory_id}`}
                className="hover:text-brand-600"
              >
                {service.subcategory_name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{service.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceBreadcrumbs;
