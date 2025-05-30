
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProviderAutoGenerator from "@/components/admin/ProviderAutoGenerator";

const ProviderGenerator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <ProviderAutoGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default ProviderGenerator;
