
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEventContext } from "@/context/EventContext";

const TopProviders = () => {
  const { topProviders } = useEventContext();

  return (
    <section className="py-16 bg-white" dir="rtl">
      <div className="container px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">ספקים מובילים</h2>
          <Link to="/providers" className="text-brand-600 hover:text-brand-700 font-medium flex items-center text-sm">
            לכל הספקים
            <ArrowRight className="h-4 w-4 mr-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(topProviders && topProviders.length > 0 ? topProviders.slice(0, 4) : Array(4).fill(null)).map((provider, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {provider ? (
                <Link to={`/providers/${provider.id}`}>
                  <div className="aspect-video bg-gray-100">
                    {provider.logo_url ? (
                      <img src={provider.logo_url} alt={provider.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">אין תמונה</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{provider.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{provider.description}</p>
                    {provider.rating && (
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-lg">
                              {i < Math.round(provider.rating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({provider.review_count || 0})</span>
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-400">טוען...</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" asChild>
            <Link to="/providers">לכל הספקים</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopProviders;
