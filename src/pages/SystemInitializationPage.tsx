
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewSystemInitializer from '@/components/system/NewSystemInitializer';

const SystemInitializationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8" dir="rtl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">מערכת תכל'ס החדשה</h1>
            <p className="text-gray-600">
              בדיקת המבנה החדש עם 5 חטיבות, קטגוריות ותתי קטגוריות
            </p>
          </div>
          
          <NewSystemInitializer />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SystemInitializationPage;
