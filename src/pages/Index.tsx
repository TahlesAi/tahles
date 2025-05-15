
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategories from "@/components/ServiceCategories";
import FeaturedProviders from "@/components/FeaturedProviders";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Find the Perfect Match",
    description: "Search and filter through our extensive network of verified event service providers to find exactly what you need.",
    icon: "🔍"
  },
  {
    title: "Easy Booking Process",
    description: "Simple, transparent booking system with secure payments and agreement protection for both parties.",
    icon: "📅"
  },
  {
    title: "Verified Providers",
    description: "All service providers undergo a verification process ensuring quality and reliability for your event.",
    icon: "✅"
  },
  {
    title: "Manage Everything in One Place",
    description: "From communication to payments, manage all aspects of your event services in a single platform.",
    icon: "📱"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        
        <ServiceCategories />
        
        {/* How it Works */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              We make it simple to connect event organizers with exceptional service providers
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <span className="text-2xl text-brand-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Search & Discover</h3>
                <p className="text-gray-600">
                  Browse through categories, search for specific services, or explore featured providers for your event needs.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <span className="text-2xl text-brand-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect & Discuss</h3>
                <p className="text-gray-600">
                  Communicate directly with providers to discuss your requirements, check availability, and finalize details.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                  <span className="text-2xl text-brand-600 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Book & Enjoy</h3>
                <p className="text-gray-600">
                  Secure your booking with our safe payment system, then sit back and enjoy a successful event!
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Button size="lg">
                Learn More About The Process
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        <FeaturedProviders />
        
        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4">
            <h2 className="section-title">Why Choose EventConnect</h2>
            <p className="section-subtitle">
              Discover the advantages of using our platform for all your event service needs
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-brand-600 to-accent1-600 text-white">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create an Amazing Event?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers who have found the perfect service providers for their special occasions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="default" className="bg-white text-brand-600 hover:bg-gray-100">
                Find Services
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Become a Provider
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
