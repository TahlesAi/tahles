
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedServices } from "@/lib/unifiedMockData";

const FeaturedProviders = () => {
  const featuredServices = getFeaturedServices();

  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ספקי שירות מומלצים
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            גלה את הספקים המובילים והמקצועיים ביותר לאירוע המושלם שלך
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredServices.map((service) => (
            <Link key={service.id} to={`/service/${service.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500">
                    מומלץ
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                    {service.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-2">{service.provider}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-sm text-gray-500">({service.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.location}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-blue-600">
                        ₪{service.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 mr-1">
                        {service.priceUnit}
                      </span>
                    </div>
                    
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/search">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              צפה בכל הספקים
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
