
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecommendedResults from "@/components/results/RecommendedResults";
import SearchCriteriaSummary from "@/components/results/SearchCriteriaSummary";
import ComparisonSelector from "@/components/results/ComparisonSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { searchServices } from "@/lib/unifiedMockData";

const RecommendedResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState<any[]>([]);
  const [showMoreResults, setShowMoreResults] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const searchCriteria = {
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    eventType: searchParams.get('eventType') || '',
    audienceType: searchParams.get('audienceType') || '',
    language: searchParams.get('language') || '',
    ageGroup: searchParams.get('ageGroup') || '',
    attendeesCount: parseInt(searchParams.get('attendeesCount') || '50'),
    eventDate: searchParams.get('eventDate') || '',
    eventTime: searchParams.get('eventTime') || '',
    location: searchParams.get('location') || '',
    isReception: searchParams.get('isReception') === 'true',
    isMainShow: searchParams.get('isMainShow') === 'true',
    isCombined: searchParams.get('isCombined') === 'true',
    needsCustomization: searchParams.get('needsCustomization') === 'true',
    needsAmplification: searchParams.get('needsAmplification') === 'true',
    budgetLimit: searchParams.get('budgetLimit') ? parseInt(searchParams.get('budgetLimit')!) : undefined
  };

  // חיפוש שירותים מתאימים
  const allResults = searchServices('', {
    category: searchCriteria.category,
    subcategory: searchCriteria.subcategory
  });

  // אלגוריתם דירוג חכם
  const rankedResults = allResults.map(service => {
    let score = 0;
    
    // דירוג לפי rating בסיסי
    score += (service.rating || 0) * 2;
    
    // דירוג לפי מספר ביקורות
    score += Math.min((service.reviewCount || 0) / 10, 5);
    
    // דירוג לפי התאמה לקהל יעד
    if (service.suitableFor?.includes(searchCriteria.ageGroup)) score += 3;
    
    // דירוג לפי התאמה לסוג מופע
    if (searchCriteria.isReception && service.isReceptionService) score += 5;
    if (searchCriteria.isMainShow) score += 3;
    
    // דירוג לפי מיקום (סימולציה)
    score += Math.random() * 2;
    
    // דירוג לפי תקציב
    if (searchCriteria.budgetLimit && service.price <= searchCriteria.budgetLimit) {
      score += 4;
    }
    
    // בונוס לשירותים מומלצים
    if (service.featured) score += 3;
    
    return {
      ...service,
      dynamicScore: Math.round(score * 10) / 10,
      matchPercentage: Math.min(Math.round((score / 20) * 100), 100)
    };
  }).sort((a, b) => b.dynamicScore - a.dynamicScore);

  const topResults = rankedResults.slice(0, 5);
  const additionalResults = rankedResults.slice(5, 15);

  const handleServiceSelection = (service: any) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else if (selectedServices.length < 3) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleCompareServices = () => {
    if (selectedServices.length >= 2) {
      const serviceIds = selectedServices.map(s => s.id).join(',');
      navigate(`/compare?services=${serviceIds}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8" dir="rtl">
        <div className="container px-4 max-w-7xl mx-auto">
          {/* כותרת וסיכום חיפוש */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 ml-2" />
                חזור לחיפוש
              </Button>
              
              <h1 className="text-3xl font-bold text-gray-900">תוצאות מומלצות</h1>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                סנן תוצאות
              </Button>
            </div>

            <SearchCriteriaSummary criteria={searchCriteria} />
          </div>

          {/* TOP 5 תוצאות */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">TOP 5 מומלצים עבורך</h2>
              <span className="text-sm text-gray-500">
                {topResults.length} מתוך {rankedResults.length} תוצאות
              </span>
            </div>

            <RecommendedResults
              services={topResults}
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelection}
            />
          </div>

          {/* תוצאות נוספות */}
          {additionalResults.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">תוצאות נוספות</h3>
                <Button
                  variant="outline"
                  onClick={() => setShowMoreResults(!showMoreResults)}
                >
                  {showMoreResults ? 'הסתר' : 'הצג עוד'}
                </Button>
              </div>

              {showMoreResults && (
                <RecommendedResults
                  services={additionalResults}
                  selectedServices={selectedServices}
                  onServiceSelect={handleServiceSelection}
                  showRanking={false}
                />
              )}
            </div>
          )}

          {/* בר השוואה */}
          <ComparisonSelector
            selectedServices={selectedServices}
            onCompare={handleCompareServices}
            onRemove={(serviceId) => 
              setSelectedServices(prev => prev.filter(s => s.id !== serviceId))
            }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendedResultsPage;
