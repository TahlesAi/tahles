
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
  console.log('Index page loaded');
  
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
