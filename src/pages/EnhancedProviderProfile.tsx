
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle,
  Heart,
  Share2,
  Users,
  Calendar,
  Award
} from "lucide-react";
import { getProviderById, getServicesByProvider } from "@/lib/unifiedMockData";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";

const EnhancedProviderProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    if (providerId) {
      loadProviderData(providerId);
    }
  }, [providerId]);

  const loadProviderData = async (id: string) => {
    setIsLoading(true);
    try {
      // נחפש את הספק
      const providerData = getProviderById(id);
      if (providerData) {
        setProvider(providerData);
        // נטען את השירותים של הספק
        const providerServices = getServicesByProvider(id);
        setServices(providerServices);
      } else {
        console.warn('Provider not found:', id);
        // ננסה למצוא ספק לפי שם או מזהה אחר
        // זה fallback במקרה שהנתונים לא מסונכרנים
      }
    } catch (error) {
      console.error('Error loading provider:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container px-4">
            <SkeletonLoader variant="card" className="h-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonLoader variant="card" count={3} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container px-4 text-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-2xl font-bold mb-4">הספק לא נמצא</h1>
              <p className="text-gray-600 mb-6">מצטערים, לא הצלחנו למצוא את הספק המבוקש</p>
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowRight className="h-4 w-4 ml-2" />
                חזרה
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="container px-4 py-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="mb-6"
            >
              <ArrowRight className="h-4 w-4 ml-2" />
              חזרה
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Basic Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-6 mb-6">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    {(provider.logo_url || provider.logoUrl) ? (
                      <img 
                        src={provider.logo_url || provider.logoUrl} 
                        alt={provider.name}
                        className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                        <Users className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Name and details */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{provider.name}</h1>
                      {(provider.is_verified || provider.isVerified) && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 ml-1" />
                          מאומת
                        </Badge>
                      )}
                    </div>
                    
                    {/* Rating */}
                    {provider.rating && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="font-medium mr-1">{Number(provider.rating).toFixed(1)}</span>
                        </div>
                        <span className="text-gray-600">
                          ({provider.review_count || provider.reviewCount || 0} ביקורות)
                        </span>
                      </div>
                    )}
                    
                    {/* Location */}
                    {(provider.city || provider.location) && (
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{provider.city || provider.location}</span>
                      </div>
                    )}
                    
                    {/* Description */}
                    {provider.description && (
                      <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">יצירת קשר</h3>
                    <div className="space-y-3">
                      {provider.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{provider.phone}</span>
                        </div>
                      )}
                      {provider.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{provider.email}</span>
                        </div>
                      )}
                      {provider.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a href={provider.website} className="text-sm text-blue-600 hover:underline">
                            אתר האינטרנט
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-6">
                      <Button className="flex-1">
                        <Phone className="h-4 w-4 ml-2" />
                        התקשר
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="container px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">השירותים שלנו</TabsTrigger>
              <TabsTrigger value="about">אודות</TabsTrigger>
              <TabsTrigger value="reviews">ביקורות</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">השירותים שלנו ({services.length})</h2>
              {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <img
                          src={service.imageUrl || service.image_url}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                          <span className="font-bold text-blue-600 text-sm">
                            ₪{typeof service.price === 'number' ? service.price.toLocaleString() : service.price}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                        <Button asChild className="w-full">
                          <a href={`/service/${service.id}`}>צפה בפרטים</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">עדיין אין שירותים</h3>
                  <p className="text-gray-600">הספק עדיין לא הוסיף שירותים לפרופיל</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="about" className="mt-6">
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold mb-6">אודות {provider.name}</h2>
                {provider.description ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{provider.description}</p>
                    {provider.experience && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">ניסיון מקצועי</h3>
                        <p className="text-gray-700">{provider.experience}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">הספק עדיין לא הוסיף מידע מפורט על עצמו</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">ביקורות לקוחות</h2>
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">עדיין אין ביקורות</h3>
                <p className="text-gray-600">תהיו הראשונים לכתוב ביקורת על הספק</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EnhancedProviderProfile;
