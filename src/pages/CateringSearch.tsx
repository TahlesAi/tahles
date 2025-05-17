
import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CateringFilterFlow from "@/components/catering/CateringFilterFlow";
import LeadCaptureForm from "@/components/catering/LeadCaptureForm";
import CateringResults from "@/components/catering/CateringResults";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";
import { getFilteredCateringCompanies } from "@/lib/mockCateringData";

// סוגי התצוגה
type ViewState = 'filter' | 'results' | 'lead-capture' | 'success';

const CateringSearch = () => {
  const [viewState, setViewState] = useState<ViewState>('filter');
  const [results, setResults] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any>(null);
  
  // כאשר נמצאות תוצאות מתאימות
  const handleResultsFound = (formData: any) => {
    // השתמש במידע המלא מהטופס לסנן את הנתונים
    const foundResults = getFilteredCateringCompanies(formData);
    
    setResults(foundResults);
    setFilterData(formData);
    setViewState(foundResults.length > 0 ? 'results' : 'lead-capture');
  };
  
  // כאשר אין תוצאות מתאימות
  const handleNoResults = (formData: any) => {
    setFilterData(formData);
    setViewState('lead-capture');
  };
  
  // כאשר הליד נשמר בהצלחה
  const handleLeadSuccess = () => {
    setViewState('success');
  };
  
  // חזרה לפילטרים
  const handleBackToFilters = () => {
    setViewState('filter');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* כותרת העמוד */}
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <div className="inline-block bg-brand-50 p-3 rounded-full mb-3">
              <Utensils className="h-8 w-8 text-brand-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3">חיפוש שירותי קייטרינג</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              מצאו את הקייטרינג המושלם לאירוע שלכם בעזרת מערכת הסינון המתקדמת.
              בחרו את סוג האוכל, מיקום, והתקציב המתאים לצרכים שלכם.
            </p>
          </div>
          
          {/* תצוגת פילטרים */}
          {viewState === 'filter' && (
            <CateringFilterFlow
              onResultsFound={handleResultsFound}
              onNoResults={handleNoResults}
            />
          )}
          
          {/* תצוגת תוצאות */}
          {viewState === 'results' && (
            <CateringResults
              results={results}
              filterData={filterData}
              onBackToFilters={handleBackToFilters}
            />
          )}
          
          {/* תצוגת לקיחת פרטים כאשר אין תוצאות */}
          {viewState === 'lead-capture' && (
            <div className="max-w-3xl mx-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToFilters}
                className="mb-6"
              >
                ↩️ חזרה לסינון
              </Button>
              <LeadCaptureForm
                filterData={filterData}
                onSubmitSuccess={handleLeadSuccess}
              />
            </div>
          )}
          
          {/* תצוגת הצלחה לאחר שמירת ליד */}
          {viewState === 'success' && (
            <div className="max-w-xl mx-auto text-center py-12">
              <div className="inline-block bg-green-50 p-4 rounded-full mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-3">תודה! פרטיך נקלטו בהצלחה</h2>
              <p className="text-gray-600 mb-8">
                נציג שלנו יצור איתך קשר בהקדם עם הצעות מותאמות אישית לצרכים שלך.
                בינתיים, אתה מוזמן לעיין בקטגוריות השירותים הנוספות שלנו.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => setViewState('filter')}>חיפוש חדש</Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>חזרה לדף הבית</Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CateringSearch;
