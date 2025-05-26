
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Mail, Phone, Globe, Calendar, CheckCircle, User } from "lucide-react";
import ProfileGallery from "@/components/provider/ProfileGallery";
import { useEventContext } from "@/context/EventContext";
import { supabase } from "@/integrations/supabase/client";

const ProviderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { providers, getServicesByProvider, subcategories, categories } = useEventContext();
  
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProviderData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      
      try {
        // Try to find provider in context first
        let providerData = providers.find(p => p.id === id);
        
        if (!providerData) {
          // If not found in context, fetch directly from Supabase
          const { data, error } = await supabase
            .from('providers')
            .select(`
              *,
              provider_subcategories(subcategory_id)
            `)
            .eq('id', id)
            .single();
            
          if (error) {
            console.error('Error fetching provider:', error);
            return;
          }
          
          if (data) {
            const subcategoryIds = data.provider_subcategories?.map((ps: any) => ps.subcategory_id) || [];
            const categoryIds = subcategoryIds
              .map((subId: string) => {
                const subcategory = subcategories.find(sub => sub.id === subId);
                return subcategory?.category_id;
              })
              .filter(Boolean);
              
            providerData = {
              ...data,
              subcategory_ids: subcategoryIds,
              category_ids: [...new Set(categoryIds)],
              service_type_ids: [],
              contact_email: data.email || '',
              contact_phone: data.phone || '',
              is_verified: data.is_verified || false,
              rating: data.rating || 4.5,
              review_count: data.review_count || 0
            };
          }
        }
        
        if (providerData) {
          // Convert to the expected format for the UI
          const formattedProvider = {
            id: providerData.id,
            businessName: providerData.name,
            description: providerData.description || 'ספק מקצועי לאירועים',
            contactPerson: providerData.contact_person || providerData.name,
            email: providerData.contact_email,
            phone: providerData.contact_phone,
            address: providerData.address,
            city: providerData.city,
            categories: providerData.category_ids?.map((catId: string) => {
              const category = categories.find(c => c.id === catId);
              return category?.name || '';
            }).filter(Boolean) || [],
            logo: providerData.logo_url || 'https://randomuser.me/api/portraits/men/32.jpg',
            coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
            gallery: [
              'https://images.unsplash.com/photo-1501612780327-45045538702b',
              'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7'
            ],
            rating: providerData.rating,
            reviewCount: providerData.review_count,
            verified: providerData.is_verified
          };
          
          setProvider(formattedProvider);
          
          // Get services for this provider
          const providerServices = getServicesByProvider(id);
          setServices(providerServices.map(service => ({
            id: service.id,
            name: service.name,
            description: service.description,
            price: service.price,
            imageUrl: service.imageUrl,
            rating: service.rating
          })));
          
          // Fetch reviews for this provider
          const { data: reviewsData } = await supabase
            .from('reviews')
            .select('*')
            .eq('provider_id', id)
            .eq('is_approved', true)
            .order('created_at', { ascending: false });
            
          if (reviewsData) {
            setReviews(reviewsData.map(review => ({
              id: review.id,
              userName: review.customer_name,
              userAvatar: null,
              rating: review.rating,
              comment: review.comment,
              date: review.created_at,
              providerId: review.provider_id
            })));
          }
        }
      } catch (error) {
        console.error('Error in fetchProviderData:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProviderData();
  }, [id, providers, getServicesByProvider, subcategories, categories]);
  
  if (!provider && !isLoading) {
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
        ) : provider ? (
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
                        <span>{provider.rating?.toFixed(1) || '4.5'}</span>
                        <span className="text-gray-500 mr-1">({provider.reviewCount || 0} ביקורות)</span>
                      </div>
                      
                      {provider.city && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 ml-1" />
                          <span>{provider.city}</span>
                        </div>
                      )}
                      
                      {provider.categories?.map((category: string, idx: number) => (
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
                              {provider.rating?.toFixed(1) || '4.5'}
                              <span className="text-sm text-gray-500 mr-1">({provider.reviewCount || 0} ביקורות)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">מיקום</div>
                            <div>{provider.city ? `${provider.address || ''}, ${provider.city}` : "לא צוין"}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Phone className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">טלפון</div>
                            <div>{provider.phone || 'לא צוין'}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <Mail className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="mr-3">
                            <div className="text-sm text-gray-500">אימייל</div>
                            <div>{provider.email || 'לא צוין'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="py-6">
                  <h2 className="text-xl font-semibold mb-6">השירותים שלנו</h2>
                  
                  {services.length > 0 ? (
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
                                <span className="text-sm ml-1">{service.rating?.toFixed(1) || '4.5'}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">לא נמצאו שירותים עבור ספק זה</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="gallery" className="py-6">
                  <h2 className="text-xl font-semibold mb-6">גלריה</h2>
                  <ProfileGallery images={[provider.coverImage, ...provider.gallery]} />
                </TabsContent>
                
                <TabsContent value="reviews" className="py-6">
                  <div className="flex flex-col md:flex-row gap-12">
                    <div className="md:w-1/3 lg:w-1/4">
                      <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <div className="text-4xl font-bold text-brand-600 mb-2">
                          {provider.rating?.toFixed(1) || '4.5'}
                        </div>
                        <div className="flex justify-center mb-2">
                          {Array(5).fill(0).map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`h-5 w-5 ${
                                idx < Math.floor(provider.rating || 4.5) 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          מבוסס על {provider.reviewCount || 0} ביקורות
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
                                    <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-600 font-bold">
                                      {review.userName.charAt(0)}
                                    </div>
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
                        
                        {provider.phone && (
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
                        )}
                        
                        {provider.email && (
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
                        )}
                        
                        {provider.city && (
                          <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-full">
                              <MapPin className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="mr-4">
                              <div className="text-sm text-gray-500">כתובת</div>
                              <div>{provider.address ? `${provider.address}, ` : ''}{provider.city}</div>
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
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
