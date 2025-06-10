
import Hero from "@/components/Hero";
import ServiceCategoriesUnified from "@/components/ServiceCategoriesUnified";
import TopProviders from "@/components/home/TopProviders";
import EventConcepts from "@/components/home/EventConcepts";
import FeaturesBenefits from "@/components/home/FeaturesBenefits";
import MainCTA from "@/components/home/MainCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { EventProvider } from "@/context/EventContext";
import AssistancePopupManager from "@/components/assistance/AssistancePopupManager";

const Index = () => {
  console.log('Index page loaded');
  
  return (
    <EventProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <ServiceCategoriesUnified />
          <TopProviders />
          <EventConcepts />
          <FeaturesBenefits />
          <MainCTA />
        </main>
        <Footer />
        <AssistancePopupManager />
      </div>
    </EventProvider>
  );
};

export default Index;
