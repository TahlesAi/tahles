
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SystemDashboard from '@/components/admin/SystemDashboard';

const SystemDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <SystemDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default SystemDashboardPage;
