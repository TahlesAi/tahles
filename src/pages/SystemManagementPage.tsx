
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedSystemDashboard from '@/components/system/EnhancedSystemDashboard';

const SystemManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <EnhancedSystemDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SystemManagementPage;
