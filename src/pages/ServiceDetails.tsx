
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Users, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Heart,
  Bookmark
} from "lucide-react";
import { mockSearchResults, mockProviders, mockReviews } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState(mockSearchResults.find(s => s.id === id));
  const [provider, setProvider] = useState(mockProviders.find(p => p.id === service?.providerId));
  const [reviews, setReviews] = useState(mockReviews.filter(r => r.serviceId === id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!service || !provider) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">השירות לא נמצא</h2>
            <p className="mb-4">לא הצלחנו למצוא את השירות המבוקש.</p>
            <Button onClick={() => navigate(-1)}>חזרה</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const images = [service.imageUrl, ...provider.gallery];
  
  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  const toggleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would save to user's favorites or wishlist
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {isLoading ? (
          <div className="container px-4 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Breadcrumbs */}
            <div className="bg-gray-50 py-2">
              <div className="container px-4">
                <div className="flex text-sm text-gray-600">
                  <Link to="/" className="hover:text-brand-600">ראשי</Link>
                  <span className="mx-2">/</span>
                  <Link to="/categories" className="hover:text-brand-600">קטגוריות</Link>
                  <span className="mx-2">/</span>
                  <Link 
                    to={`/categories/${encodeURIComponent(service.category)}`} 
                    className="hover:text-brand-600"
                  >
                    {service.category}
                  </Link>
                  {service.subcategory && (
                    <>
                      <span className="mx-2">/</span>
                      <Link 
                        to={`/subcategories/${encodeURIComponent(service.subcategory)}`}
                        className="hover:text-brand-600"
                      >
                        {service.subcategory}
                      </Link>
                    </>
                  )}
                  <span className="mx-2">/</span>
                  <span className="text-gray-800 font-medium">{service.name}</span>
                </div>
              </div>
            </div>
            
            <div className="container px-4 py-8">
              <div className="flex flex-col-reverse lg:flex-row gap-8">
                {/* Service Details */}
                <div className="lg:w-2/3">
                  {/* Image Gallery */}
                  <div className="relative rounded-xl overflow-hidden mb-8 aspect-[16/9]">
                    <img 
                      src={images[selectedImageIndex]} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Image Navigation */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="rounded-full bg-white/80"
                        onClick={handlePrevImage}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="rounded-full bg-white/80"
                        onClick={handleNextImage}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {selectedImageIndex + 1} / {images.length}
                    </div>
                  </div>
                  
                  {/* Thumbnails */}
                  <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                    {images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`w-20 h-20 rounded overflow-hidden cursor-pointer flex-shrink-0 border-2 ${
                          idx === selectedImageIndex ? 'border-brand-500' : 'border-transparent'
                        }`}
                        onClick={() => setSelectedImageIndex(idx)}
                      >
                        <img 
                          src={img} 
                          alt={`תמונה ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Service Info */}
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                    
                    <div className="flex flex-wrap gap-y-2 items-center text-sm text-gray-600 mb-4">
                      <div className="flex items-center ml-4">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                        <span className="font-medium">{service.rating}</span>
                        <span className="text-gray-500 mr-1">({service.reviewCount} ביקורות)</span>
                      </div>
                      
                      {service.location && (
                        <div className="flex items-center ml-4">
                          <MapPin className="h-4 w-4 ml-1" />
                          <span>{service.location}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Provider Info */}
                    <Link 
                      to={`/providers/${provider.id}`}
                      className="flex items-center mb-6 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={provider.logo} alt={provider.businessName} />
                        <AvatarFallback>{provider.businessName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="mr-3">
                        <div className="font-medium">{provider.businessName}</div>
                        <div className="text-sm text-gray-500">ספק שירות מאומת</div>
                      </div>
                    </Link>
                    
                    {/* Description */}
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-3">תיאור השירות</h2>
                      <p className="text-gray-700 leading-relaxed">{service.description}</p>
                    </div>
                    
                    {/* Details */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-3">פרטים</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Users className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">מתאים עבור</div>
                            <div>
                              {service.suitableFor.map((concept, idx) => {
                                const conceptObj = require("@/lib/searchSuggestions").eventConcepts.find(
                                  (c) => c.id === concept
                                );
                                return (
                                  <span key={idx}>
                                    {conceptObj?.value}
                                    {idx < service.suitableFor.length - 1 && ", "}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        
                        {service.priceUnit && (
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Clock className="h-5 w-5 text-gray-600" />
                            </div>
                            <div className="mr-3">
                              <div className="text-sm text-gray-500">יחידת מחיר</div>
                              <div>{service.priceUnit}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabs */}
                  <Tabs defaultValue="reviews">
                    <TabsList className="w-full">
                      <TabsTrigger value="reviews" className="flex-1">ביקורות</TabsTrigger>
                      <TabsTrigger value="availability" className="flex-1">זמינות</TabsTrigger>
                      <TabsTrigger value="location" className="flex-1">מיקום</TabsTrigger>
                    </TabsList>
                    
                    {/* Reviews Tab */}
                    <TabsContent value="reviews" className="pt-4">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">דירוג וביקורות</h3>
                        <div className="flex items-center mb-4">
                          <div className="text-4xl font-bold ml-3">{service.rating}</div>
                          <div>
                            <div className="flex">
                              {Array(5).fill(0).map((_, idx) => (
                                <Star 
                                  key={idx} 
                                  className={`h-5 w-5 ${
                                    idx < Math.floor(service.rating) 
                                      ? "text-yellow-400 fill-yellow-400" 
                                      : "text-gray-300"
                                  }`} 
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-500">{service.reviewCount} ביקורות</div>
                          </div>
                        </div>
                      </div>
                      
                      {reviews.length > 0 ? (
                        <div className="space-y-6">
                          {reviews.map(review => (
                            <div key={review.id} className="border-b pb-4">
                              <div className="flex items-start">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="mr-3 flex-1">
                                  <div className="flex justify-between items-center mb-1">
                                    <div className="font-medium">{review.userName}</div>
                                    <div className="text-sm text-gray-500">
                                      {format(new Date(review.date), 'dd/MM/yyyy')}
                                    </div>
                                  </div>
                                  <div className="flex mb-2">
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
                                  {review.comment && <p className="text-gray-700">{review.comment}</p>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">אין ביקורות עדיין</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    {/* Availability Tab */}
                    <TabsContent value="availability" className="pt-4">
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">לבדיקת זמינות והזמנה, אנא לחצו על כפתור "הזמן עכשיו" בתחתית העמוד</p>
                        <Button onClick={() => navigate(`/booking/${id}`)}>הזמן עכשיו</Button>
                      </div>
                    </TabsContent>
                    
                    {/* Location Tab */}
                    <TabsContent value="location" className="pt-4">
                      <div className="bg-gray-100 p-6 rounded-lg text-center">
                        <MapPin className="h-10 w-10 mx-auto mb-4 text-gray-500" />
                        {service.location ? (
                          <p className="text-gray-700">{service.location}</p>
                        ) : (
                          <p className="text-gray-500">אין פרטי מיקום זמינים</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Booking Card */}
                <div className="lg:w-1/3">
                  <div className="border rounded-lg bg-white p-6 shadow-sm sticky top-20">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-2xl font-bold">₪{service.price}</div>
                      <div className="text-gray-500">{service.priceUnit}</div>
                    </div>
                    
                    <div className="border-t border-b py-4 my-4">
                      <Button 
                        className="w-full bg-brand-600 hover:bg-brand-700 mb-3"
                        onClick={() => navigate(`/booking/${id}`)}
                      >
                        הזמן עכשיו
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={toggleSave}
                      >
                        {isSaved ? (
                          <>
                            <Bookmark className="ml-2 h-4 w-4 fill-current" />
                            נשמר למועדפים
                          </>
                        ) : (
                          <>
                            <Bookmark className="ml-2 h-4 w-4" />
                            שמור למועדפים
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex">
                        <div className="w-5 text-gray-500 mr-2">
                          <User className="h-4 w-4" />
                        </div>
                        <div>איש קשר: {provider.contactPerson}</div>
                      </div>
                      
                      {service.location && (
                        <div className="flex">
                          <div className="w-5 text-gray-500 mr-2">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <div>מיקום: {service.location}</div>
                        </div>
                      )}
                      
                      <div className="flex">
                        <div className="w-5 text-gray-500 mr-2">
                          <Star className="h-4 w-4" />
                        </div>
                        <div>דירוג: {service.rating} ({service.reviewCount} ביקורות)</div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4 text-gray-500"
                      onClick={() => {
                        // In a real app, this would open a share dialog
                        alert("שיתוף השירות");
                      }}
                    >
                      <Share2 className="ml-2 h-4 w-4" />
                      שתף
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetails;
