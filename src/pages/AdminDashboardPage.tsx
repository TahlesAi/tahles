
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
