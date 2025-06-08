
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ComparisonPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">השוואת מוצרים</h1>
        <p>עמוד השוואת המוצרים בפיתוח...</p>
      </main>
      <Footer />
    </div>
  );
};

export default ComparisonPage;
