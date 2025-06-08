
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCategoriesUnified from "@/components/ServiceCategoriesUnified";
import AdditionalServices from "@/components/AdditionalServices";
import Footer from "@/components/Footer";

// קומפוננטות חדשות שפיצלנו
import EventConcepts from "@/components/home/EventConcepts";
import MainCTA from "@/components/home/MainCTA";
import TopProviders from "@/components/home/TopProviders";
import FeaturesBenefits from "@/components/home/FeaturesBenefits";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <EventConcepts />
        <MainCTA />
        <ServiceCategoriesUnified />
        <TopProviders />
        <FeaturesBenefits />
        <AdditionalServices />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
