
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { getFeaturedServices } from "@/lib/unifiedMockData";
import AutoStyledCard from "./provider/AutoStyledCard";
import { ProviderProfile } from "@/lib/types";

const FeaturedProviders = () => {
  const featuredServices = getFeaturedServices();

  // המרת שירותים מומלצים לספקים מדומים לצורך התצוגה
  const featuredProviders: ProviderProfile[] = featuredServices.slice(0, 4).map((service, index) => ({
    id: `featured-provider-${index}`,
    userId: `user-${index}`,
    contactPerson: service.provider,
    businessName: service.provider,
    description: service.description,
    phone: '050-123-4567',
    email: `contact@${service.provider.toLowerCase().replace(/\s+/g, '')}.co.il`,
    city: service.location,
    address: 'כתובת לדוגמה 123',
    website: `www.${service.provider.toLowerCase().replace(/\s+/g, '')}.co.il`,
    logo: service.imageUrl,
    gallery: [service.imageUrl],
    rating: service.rating,
    reviewCount: service.reviewCount,
    verified: Math.random() > 0.5,
    categories: [service.category],
    specialties: service.tags || ['מקצועיות', 'איכות', 'מהימנות'],
    yearsExperience: Math.floor(Math.random() * 10) + 5,
    insurance: true,
    testimonials: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  return (
    <section className="py-16 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ספקי שירות מומלצים
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            גלה את הספקים המובילים והמקצועיים ביותר עם עיצוב מותאם לכל תחום
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map((provider) => (
            <AutoStyledCard
              key={provider.id}
              provider={provider}
              showServices={true}
            />
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
