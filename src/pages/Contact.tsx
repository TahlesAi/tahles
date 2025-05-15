
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form data submitted:", formData);
    
    toast({
      title: "פנייתך התקבלה",
      description: "נציג יחזור אליך בהקדם",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">צרו איתנו קשר</h1>
              <p className="text-xl">
                יש לכם שאלה? צריכים עזרה? נשמח לשמוע מכם!
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">שלחו לנו הודעה</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2" htmlFor="name">שם מלא</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" htmlFor="email">אימייל</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" htmlFor="phone">טלפון</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2" htmlFor="message">תוכן הפנייה</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md h-32"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">שלח פנייה</Button>
                </form>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">פרטי יצירת קשר</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="ml-3 text-brand-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">טלפון</h3>
                      <p className="text-gray-600">03-1234567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="ml-3 text-brand-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">דוא"ל</h3>
                      <p className="text-gray-600">info@tachles.co.il</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="ml-3 text-brand-600 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">כתובת</h3>
                      <p className="text-gray-600">רחוב הברזל 30, תל אביב</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-6">שעות פעילות</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>ימים א'-ה'</span>
                      <span>9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>יום ו'</span>
                      <span>9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>שבת</span>
                      <span>סגור</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
