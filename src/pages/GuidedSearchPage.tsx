
import { GuidedSearchForm } from "@/components/search/GuidedSearchForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { EventProvider } from "@/context/EventContext";

const GuidedSearchPage = () => {
  console.log('Guided search page loaded');
  
  return (
    <EventProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <GuidedSearchForm />
        </main>
        <Footer />
      </div>
    </EventProvider>
  );
};

export default GuidedSearchPage;
