
import Hero from "@/components/Hero";
import ServiceCategoriesUnified from "@/components/ServiceCategoriesUnified";
import TopProviders from "@/components/home/TopProviders";
import EventConcepts from "@/components/home/EventConcepts";
import FeaturesBenefits from "@/components/home/FeaturesBenefits";
import MainCTA from "@/components/home/MainCTA";
import FeaturedProvider from "@/components/home/FeaturedProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AssistancePopupManager from "@/components/assistance/AssistancePopupManager";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  console.log('🏠 Index page loading...');
  const navigate = useNavigate();
  
  // Check if we're having Supabase issues
  try {
    console.log('📊 Checking component mounting order...');
    console.log('1. Header component');
    console.log('2. Hero component'); 
    console.log('3. ServiceCategoriesUnified component');
    console.log('4. Other home components');
  } catch (error) {
    console.error('❌ Error in Index page:', error);
  }

  const handleAdminNavigation = () => {
    console.log('🔧 Navigating to admin/system-migration...');
    navigate('/admin/system-migration');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Debug Navigation Button */}
      <div className="fixed top-20 right-4 z-50 bg-red-500 text-white p-2 rounded">
        <Button 
          onClick={handleAdminNavigation}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          🔧 Debug: Go to Migration
        </Button>
      </div>
      
      <main className="flex-grow">
        <Hero />
        <ServiceCategoriesUnified />
        <FeaturedProvider />
        <TopProviders />
        <EventConcepts />
        <FeaturesBenefits />
        <MainCTA />
      </main>
      <Footer />
      <AssistancePopupManager />
    </div>
  );
};

export default Index;
