
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

const Index = () => {
  console.log('🏠 Index page loading...');
  
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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
