
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceResultCard from "@/components/search/ServiceResultCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Filter, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { getGuidedSearchRecommendations } from "@/lib/unifiedMockData";

interface RecommendationFilters {
  priceRange?: [number, number];
  location?: string;
  rating?: number;
  isReceptionService?: boolean;
}

const RecommendedResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state?.searchData;
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<any[]>([]);
  const [filters, setFilters] = useState<RecommendationFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!searchData) {
      navigate('/');
      return;
    }

    const loadRecommendations = async () => {
      try {
        setIsLoading(true);
        const results = getGuidedSearchRecommendations(searchData);
        setRecommendations(results);
        setFilteredRecommendations(results);
      } catch (error) {
        console.error('Error loading recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecommendations();
  }, [searchData, navigate]);

  useEffect(() => {
    let filtered = [...recommendations];

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(item => item.price >= min && item.price <= max);
    }

    if (filters.location) {
      filtered = filtered.filter(item => 
        item.location && item.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(item => item.rating >= filters.rating!);
    }

    if (filters.isReceptionService !== undefined) {
      filtered = filtered.filter(item => item.isReceptionService === filters.isReceptionService);
    }

    setFilteredRecommendations(filtered);
  }, [filters, recommendations]);

  if (!searchData) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-primary">דף הבית</Link>
            <ArrowRight className="h-4 w-4" />
            <span>תוצאות מומלצות</span>
          </nav>

          {/* Search Summary */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4">התוצאות המומלצות עבורכם</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                {searchData.eventType && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>סוג אירוע: {searchData.eventType}</span>
                  </div>
                )}
                {searchData.attendeesCount && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>מספר משתתפים: {searchData.attendeesCount}</span>
                  </div>
                )}
                {searchData.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>מיקום: {searchData.location}</span>
                  </div>
                )}
                {searchData.budget && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>תקציב: {searchData.budget}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Filters Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">
                נמצאו {filteredRecommendations.length} המלצות
              </h2>
              {Object.keys(filters).length > 0 && (
                <Badge variant="secondary">
                  {Object.keys(filters).length} פילטרים פעילים
                </Badge>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              פילטרים
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">טווח מחירים</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'all') {
                          setFilters(prev => ({ ...prev, priceRange: undefined }));
                        } else {
                          const [min, max] = value.split('-').map(Number);
                          setFilters(prev => ({ ...prev, priceRange: [min, max] }));
                        }
                      }}
                    >
                      <option value="all">כל המחירים</option>
                      <option value="0-1000">עד 1,000 ₪</option>
                      <option value="1000-3000">1,000 - 3,000 ₪</option>
                      <option value="3000-5000">3,000 - 5,000 ₪</option>
                      <option value="5000-10000">5,000 - 10,000 ₪</option>
                      <option value="10000-999999">מעל 10,000 ₪</option>
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">דירוג מינימלי</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFilters(prev => ({ 
                          ...prev, 
                          rating: value === 'all' ? undefined : Number(value)
                        }));
                      }}
                    >
                      <option value="all">כל הדירוגים</option>
                      <option value="4">4+ כוכבים</option>
                      <option value="4.5">4.5+ כוכבים</option>
                      <option value="5">5 כוכבים</option>
                    </select>
                  </div>

                  {/* Reception Service Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">סוג שירות</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === 'all') {
                          setFilters(prev => ({ ...prev, isReceptionService: undefined }));
                        } else {
                          setFilters(prev => ({ 
                            ...prev, 
                            isReceptionService: value === 'reception'
                          }));
                        }
                      }}
                    >
                      <option value="all">כל השירותים</option>
                      <option value="reception">שירותי קבלת פנים</option>
                      <option value="main">מופעים מרכזיים</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={() => setFilters({})}
                      className="w-full"
                    >
                      נקה פילטרים
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((recommendation) => (
                <ServiceResultCard
                  key={recommendation.id}
                  service={recommendation}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold mb-4">לא נמצאו תוצאות מתאימות</h3>
                <p className="text-gray-600 mb-6">
                  נסו לשנות את הפילטרים או לחזור לחיפוש חדש
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => setFilters({})}>
                    נקה פילטרים
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/')}>
                    חיפוש חדש
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Back to Search */}
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowRight className="h-4 w-4 ml-2" />
              חזרה לחיפוש
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendedResults;
