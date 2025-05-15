
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Check, Globe, MapPin, MessageSquare, Phone, Star, Verified } from "lucide-react";

// Mock provider data
const mockProvider = {
  id: "1",
  name: "Melody Makers Band",
  title: "Professional Live Music Band",
  description: "We are a versatile band specializing in live performances for weddings, corporate events, and private parties. With over 10 years of experience, we bring energy and professionalism to every event.",
  category: "Musicians",
  subcategory: "Live Band",
  location: "New York, NY",
  rating: 4.9,
  reviewCount: 87,
  pricing: "Starting from $1,200 per event",
  images: [
    "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1528489496900-d841974f5290?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1566981731417-d4c8e17a9e82?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80"
  ],
  services: [
    { name: "Live Performance", description: "2-hour live performance with our full band", price: "$1,200" },
    { name: "Acoustic Set", description: "1-hour acoustic performance, perfect for intimate gatherings", price: "$800" },
    { name: "Full Day Package", description: "Multiple sets throughout your event, up to 6 hours of music", price: "$2,400" }
  ],
  availability: {
    monday: "9:00 AM - 6:00 PM",
    tuesday: "9:00 AM - 6:00 PM",
    wednesday: "9:00 AM - 6:00 PM",
    thursday: "9:00 AM - 6:00 PM",
    friday: "9:00 AM - 10:00 PM",
    saturday: "10:00 AM - 11:00 PM",
    sunday: "12:00 PM - 8:00 PM"
  },
  verifiedBadge: true,
  memberSince: "January 2023",
  responseTime: "Usually within 4 hours"
};

// Mock reviews
const mockReviews = [
  {
    id: "r1",
    author: "Sarah Johnson",
    date: "2025-04-18",
    rating: 5,
    content: "Absolutely amazing! The Melody Makers Band performed at our wedding and they were phenomenal. Our guests couldn't stop talking about how great the music was. Highly recommend!"
  },
  {
    id: "r2",
    author: "Michael Chen",
    date: "2025-03-22",
    rating: 5,
    content: "Hired them for our corporate event and they were extremely professional. Great communication before the event, showed up on time, and delivered an outstanding performance."
  },
  {
    id: "r3",
    author: "Jessica Williams",
    date: "2025-03-05",
    rating: 4,
    content: "Very good band with a wide repertoire. They accommodated our song requests and kept the energy high throughout the night. Only small issue was that setup took a bit longer than expected."
  }
];

const ProviderProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");
  const [activeImage, setActiveImage] = useState(mockProvider.images[0]);
  
  // In a real implementation, we would fetch the provider based on the ID
  const provider = mockProvider;
  const reviews = mockReviews;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={provider.images[0]} 
                        alt={provider.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      {provider.name}
                      {provider.verifiedBadge && (
                        <Verified className="h-5 w-5 text-brand-500" />
                      )}
                    </h1>
                    <p className="text-gray-600 mb-4">{provider.title}</p>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{provider.rating}</span>
                      <span className="text-gray-500 ml-1">({provider.reviewCount} reviews)</span>
                    </div>
                    <Badge className="mb-4">{provider.category}</Badge>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {provider.location}
                    </div>
                    <div className="border-t w-full my-4"></div>
                    <div className="space-y-4 w-full">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Calendar className="h-4 w-4 mr-2" />
                        Check Availability
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Quick Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-sm text-gray-600">{provider.memberSince}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Response Time</p>
                        <p className="text-sm text-gray-600">{provider.responseTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Verified Provider</p>
                        <p className="text-sm text-gray-600">Identity & credentials verified</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img 
                    src={activeImage} 
                    alt={provider.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {provider.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`h-20 w-32 rounded-md overflow-hidden cursor-pointer border-2 ${
                        activeImage === image ? "border-brand-500" : "border-transparent"
                      }`}
                      onClick={() => setActiveImage(image)}
                    >
                      <img 
                        src={image} 
                        alt={`${provider.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tabs */}
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                      <TabsTrigger 
                        value="about" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        About
                      </TabsTrigger>
                      <TabsTrigger 
                        value="services" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        Services
                      </TabsTrigger>
                      <TabsTrigger 
                        value="reviews" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        Reviews
                      </TabsTrigger>
                      <TabsTrigger 
                        value="availability" 
                        className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
                      >
                        Availability
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="p-6">
                      <h2 className="text-2xl font-bold mb-4">About {provider.name}</h2>
                      <p className="mb-6">{provider.description}</p>
                      
                      <h3 className="text-xl font-semibold mb-3">What We Offer</h3>
                      <ul className="list-disc pl-5 space-y-2 mb-6">
                        <li>Professional live music performances for all types of events</li>
                        <li>Customizable playlists to match your event's atmosphere</li>
                        <li>State-of-the-art sound equipment included</li>
                        <li>Experienced performers with a diverse repertoire</li>
                        <li>Flexible performance durations to fit your schedule</li>
                      </ul>
                      
                      <h3 className="text-xl font-semibold mb-3">Our Experience</h3>
                      <p>
                        With over a decade of experience performing at hundreds of events, we bring 
                        professionalism and musical excellence to every performance. Our band members 
                        are all professionally trained musicians with backgrounds in jazz, classical, 
                        pop, and rock music.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="services" className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Services & Packages</h2>
                      <p className="mb-6">
                        We offer a range of music services tailored to your specific event needs. 
                        All packages include professional sound equipment and setup.
                      </p>
                      
                      <div className="space-y-4">
                        {provider.services.map((service, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                <div>
                                  <h3 className="text-lg font-semibold">{service.name}</h3>
                                  <p className="text-gray-600">{service.description}</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                  <span className="text-xl font-bold">{service.price}</span>
                                  <Button className="ml-4">Book Now</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Custom Packages</h3>
                        <p className="mb-4">
                          Need something specific for your event? Contact us to create a 
                          custom package tailored to your exact requirements.
                        </p>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Request Custom Quote
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Reviews</h2>
                        <div className="flex items-center">
                          <div className="flex items-center mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-5 w-5 ${
                                  star <= Math.round(provider.rating) 
                                    ? "text-yellow-400 fill-yellow-400" 
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-gray-500 ml-1">({provider.reviewCount})</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6">
                            <div className="flex justify-between mb-2">
                              <div className="font-semibold">{review.author}</div>
                              <div className="text-gray-500 text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${
                                    star <= review.rating 
                                      ? "text-yellow-400 fill-yellow-400" 
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <p>{review.content}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center mt-6">
                        <Button variant="outline">
                          Load More Reviews
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="availability" className="p-6">
                      <h2 className="text-2xl font-bold mb-4">Availability</h2>
                      <p className="mb-6">
                        Below are our general availability hours. For specific dates, please 
                        contact us or check our booking calendar.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(provider.availability).map(([day, hours]) => (
                          <div key={day} className="border rounded-lg p-4 flex justify-between">
                            <div className="font-medium capitalize">{day}</div>
                            <div>{hours}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Book a Date</h3>
                        <p className="mb-4">
                          Ready to secure our services for your event? Check our calendar for 
                          available dates or contact us directly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button>
                            <Calendar className="h-4 w-4 mr-2" />
                            View Calendar
                          </Button>
                          <Button variant="outline">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact for Availability
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderProfile;
