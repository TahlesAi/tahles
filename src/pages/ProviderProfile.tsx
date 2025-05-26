import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProviders, mockSearchResults, mockReviews } from "@/lib/mockData";
import { Star, MapPin, Mail, Phone, Globe, Calendar, CheckCircle, User } from "lucide-react";
import ProfileGallery from "@/components/provider/ProfileGallery";

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(mockProviders.find(p => p.id === id));
  const [services, setServices] = useState(mockSearchResults.filter(s => s.providerId === id));
  const [reviews, setReviews] = useState(mockReviews.filter(r => r.providerId === id));
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading provider data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">הספק לא נמצא</h2>
            <p className="mb-6">לא הצלחנו למצוא את הספק המבוקש.</p>
            <Button onClick={() => navigate(-1)}>חזרה</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {isLoading ? (
          <div className="container px-4 py-8">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-8"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Hero Banner */}
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img 
                src={provider.coverImage} 
                alt={provider.businessName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div className="container px-4 relative">
              {/* Provider Logo */}
              <div className="absolute -top-16 right-8 h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                <img 
                  src={provider.logo} 
                  alt={provider.businessName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Provider Header */}
              <div className="pt-20 pb-6 md:pb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-2xl md:text-3xl font-bold">{provider.businessName}</h1>
                      {provider.verified && (
                        <Badge 
                          variant="secondary" 
                          className="mr-2 bg-brand-100 text-brand-800 border-brand-200"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          מאומת
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                        <span>{provider.rating}</span>
                        <span className="text-gray-500 mr-1">({provider.reviewCount} ביקורות)</span>
                      </div>
                      
                      {provider.city && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 ml-1" />
                          <span>{provider.city}</span>
                        </div>
                      )}
                      
                      {provider.categories?.map((category, idx) => (
                        <Badge key={idx} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button 
                      className="bg-brand-600 hover:bg-brand-700"
                      onClick={() => {
                        // In a real app, this would check if the user has already booked
                        // For now, let's go to the first service offered by this provider
                        if (services.length > 0) {
                          navigate(`/booking/${services[0].id}`);
                        }
                      }}
                    >
                      הזמן שירות
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Provider Tabs */}
              <Tabs defaultValue="about" className="mb-12">
                <TabsList className="w-full">
                  <TabsTrigger value="about">אודות</TabsTrigger>
                  <TabsTrigger value="services">שירותים</TabsTrigger>
                  <TabsTrigger value="gallery">גלריה</TabsTrigger>
                  <TabsTrigger value="reviews">ביקורות</TabsTrigger>
                  <TabsTrigger value="contact">צור קשר</TabsTrigger>
                </TabsList>
                
                {/* About Tab */}
                <TabsContent value="about" className="py-6">
                  <div className="max-w-3xl">
                    <h2 className="text-xl font-semibold mb-4">אודות {provider.businessName}</h2>
                    <div className="prose max-w-none">
                      <p>{provider.description}</p>
                    </div>
                    
                    <div className="mt-10">
                      <h3 className="text-lg font-semibold mb-3">פרטים נוספים</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Star className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">דירוג</div>
                            <div className="flex items-center">
                              {provider.rating}
                              <span className="text-sm text-gray-500 mr-1">({provider.reviewCount} ביקורות)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">מיקום</div>
                            <div>{provider.city ? `${provider.address}, ${provider.city}` : "לא צוין"}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Phone className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">טלפון</div>
                            <div>{provider.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Mail className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">אימייל</div>
                            <div>{provider.email}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Services Tab */}
                <TabsContent value="services" className="py-6">
                  <h2 className="text-xl font-semibold mb-6">השירותים שלנו</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <Link 
                        key={service.id} 
                        to={`/services/${service.id}`}
                        className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={service.imageUrl} 
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1">{service.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-brand-600 font-medium">₪{service.price}</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm ml-1">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Gallery Tab */}
                <TabsContent value="gallery" className="py-6">
                  <h2 className="text-xl font-semibold mb-6">גלריה</h2>
                  <ProfileGallery images={[provider.coverImage, ...provider.gallery]} />
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="py-6">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3 lg:w-1/4">
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-4xl font-bold text-brand-600 mb-2">
                          {provider.rating}
                        </div>
                        <div className="flex justify-center mb-2">
                          {Array(5).fill(0).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`h-5 w-5 ${
                                idx < Math.floor(provider.rating) 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          מבוסס על {provider.reviewCount} ביקורות
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3 lg:w-3/4">
                      <h2 className="text-xl font-semibold mb-6">ביקורות</h2>
                      
                      {reviews.length > 0 ? (
                        <div className="space-y-6">
                          {reviews.map(review => (
                            <div key={review.id} className="border-b pb-6">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    {review.userAvatar ? (
                                      <img 
                                        src={review.userAvatar} 
                                        alt={review.userName}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-600 font-bold">
                                        {review.userName.charAt(0)}
                                      </div>
                                    )}
                                  </div>
                                  <div className="mr-3">
                                    <div className="font-medium">{review.userName}</div>
                                    <div className="text-sm text-gray-500">
                                      {new Date(review.date).toLocaleDateString('he-IL')}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex">
                                  {Array(5).fill(0).map((_, idx) => (
                                    <Star 
                                      key={idx} 
                                      className={`h-4 w-4 ${
                                        idx < review.rating 
                                          ? "text-yellow-400 fill-yellow-400" 
                                          : "text-gray-300"
                                      }`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              
                              {review.comment && (
                                <p className="text-gray-700">{review.comment}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">אין ביקורות עדיין</p>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Contact Tab */}
                <TabsContent value="contact" className="py-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <h2 className="text-xl font-semibold mb-6">צור קשר</h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="mr-4">
                            <div className="text-sm text-gray-500">איש קשר</div>
                            <div>{provider.contactPerson}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <Phone className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="mr-4">
                            <div className="text-sm text-gray-500">טלפון</div>
                            <a href={`tel:${provider.phone}`} className="text-brand-600">
                              {provider.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="mr-4">
                            <div className="text-sm text-gray-500">אימייל</div>
                            <a href={`mailto:${provider.email}`} className="text-brand-600">
                              {provider.email}
                            </a>
                          </div>
                        </div>
                        
                        {provider.city && (
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-full">
                              <MapPin className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="mr-4">
                              <div className="text-sm text-gray-500">כתובת</div>
                              <div>{provider.address}, {provider.city}</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          className="bg-brand-600 hover:bg-brand-700"
                          onClick={() => {
                            if (services.length > 0) {
                              navigate(`/booking/${services[0].id}`);
                            }
                          }}
                        >
                          הזמן שירות
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="bg-gray-100 rounded-lg h-full min-h-[300px] flex items-center justify-center">
                        <div className="text-center p-8">
                          {provider.city ? (
                            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                          ) : (
                            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-500" />
                          )}
                          {provider.city ? (
                            <p className="text-gray-600">מפה תוצג כאן</p>
                          ) : (
                            <p className="text-gray-600">לוח זמינות יוצג כאן</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
