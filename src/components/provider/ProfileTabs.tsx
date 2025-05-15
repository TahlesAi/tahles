
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutTabContent from './tabs/AboutTabContent';
import ServicesTabContent from './tabs/ServicesTabContent';
import ReviewsTabContent from './tabs/ReviewsTabContent';
import BookingTabContent from './tabs/BookingTabContent';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  providerName: string;
  providerDescription?: string;
  services: any[];
  onBookService: (service: any) => void;
}

const ProfileTabs = ({ 
  activeTab, 
  setActiveTab, 
  providerName, 
  providerDescription = '', 
  services, 
  onBookService 
}: ProfileTabsProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
            <TabsTrigger 
              value="about" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              אודות
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              שירותים
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              חוות דעת
            </TabsTrigger>
            <TabsTrigger 
              value="booking" 
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-500 data-[state=active]:shadow-none py-3 px-6"
            >
              זמינות והזמנה
            </TabsTrigger>
          </TabsList>
          
          <AboutTabContent 
            providerName={providerName}
            providerDescription={providerDescription}
          />
          
          <ServicesTabContent 
            services={services}
            onBookService={onBookService}
          />
          
          <ReviewsTabContent />
          
          <BookingTabContent />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileTabs;
