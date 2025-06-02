
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PersonalizationForm from "@/components/personalization/PersonalizationForm";
import CustomizationPreview from "@/components/personalization/CustomizationPreview";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface PersonalizationData {
  eventType: 'business' | 'private';
  audienceType: 'secular' | 'religious' | 'ultra_orthodox' | 'arab';
  language: 'hebrew' | 'arabic' | 'english' | 'russian' | 'french';
  ageGroup: 'children' | 'youth' | 'adults' | 'seniors';
  isReception: boolean;
  isMainShow: boolean;
  isCombined: boolean;
  needsCustomization: boolean;
  attendeesCount: number;
  needsAmplification: boolean;
  eventDate: string;
  eventTime: string;
  location: string;
  budgetLimit?: number;
}

const PersonalizationSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<PersonalizationData>({
    eventType: 'private',
    audienceType: 'secular',
    language: 'hebrew',
    ageGroup: 'adults',
    isReception: false,
    isMainShow: true,
    isCombined: false,
    needsCustomization: false,
    attendeesCount: 50,
    needsAmplification: false,
    eventDate: '',
    eventTime: '',
    location: '',
    budgetLimit: undefined
  });

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  const subcategory = searchParams.get('subcategory') || '';

  const handleFormUpdate = (updates: Partial<PersonalizationData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSearch = () => {
    // בדיקת ולידציה בסיסית
    if (!formData.eventDate || !formData.eventTime || !formData.location) {
      alert('אנא מלא את כל השדות הנדרשים');
      return;
    }

    // יצירת פרמטרי חיפוש
    const searchParams = new URLSearchParams({
      category,
      subcategory,
      eventType: formData.eventType,
      audienceType: formData.audienceType,
      language: formData.language,
      ageGroup: formData.ageGroup,
      attendeesCount: formData.attendeesCount.toString(),
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      location: formData.location,
      isReception: formData.isReception.toString(),
      isMainShow: formData.isMainShow.toString(),
      isCombined: formData.isCombined.toString(),
      needsCustomization: formData.needsCustomization.toString(),
      needsAmplification: formData.needsAmplification.toString(),
      ...(formData.budgetLimit && { budgetLimit: formData.budgetLimit.toString() })
    });

    navigate(`/recommended-results?${searchParams.toString()}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8" dir="rtl">
        <div className="container px-4 max-w-6xl mx-auto">
          {/* כותרת */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">התאמה אישית</h1>
            <p className="text-gray-600">ספר לנו על האירוע שלך ונמצא עבורך את הפתרון המושלם</p>
            <div className="mt-4 text-sm text-brand-600">
              קטגוריה: {category} → {subcategory}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* טופס התאמה אישית */}
            <div className="lg:col-span-2">
              <PersonalizationForm 
                data={formData}
                onUpdate={handleFormUpdate}
              />
            </div>

            {/* תצוגה מקדימה */}
            <div className="lg:col-span-1">
              <CustomizationPreview 
                data={formData}
                category={category}
                subcategory={subcategory}
              />
            </div>
          </div>

          {/* כפתורי פעולה */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              חזור
            </Button>

            <Button
              onClick={handleSearch}
              className="flex items-center bg-brand-600 hover:bg-brand-700"
              disabled={!formData.eventDate || !formData.eventTime || !formData.location}
            >
              חפש עכשיו
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PersonalizationSearch;
