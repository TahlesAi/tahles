
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneCall, Mail, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ברגיל כאן היה נשלח לשרת, כרגע רק הדגמה
    setTimeout(() => {
      toast.success('הודעתך נשלחה בהצלחה! נחזור אליך בהקדם.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50" dir="rtl">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-brand-600 to-accent1-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">צור קשר</h1>
            <p className="text-xl max-w-2xl mx-auto">
              אנחנו כאן לענות על כל שאלה, לשמוע הצעות או לעזור בכל בעיה.
              הצוות שלנו זמין עבורכם!
            </p>
          </div>
        </section>
      
        {/* Contact Form & Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="bg-brand-100 p-3 rounded-full mr-4">
                      <PhoneCall className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">טלפון</h3>
                      <p className="text-gray-600">03-123-4567</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="bg-brand-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">אימייל</h3>
                      <p className="text-gray-600">info@tachles.co.il</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="bg-brand-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">משרדי החברה</h3>
                      <p className="text-gray-600">רח' הברזל 7, תל אביב</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center">
                    <div className="bg-brand-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">שעות פעילות</h3>
                      <p className="text-gray-600">
                        א׳-ה׳: 9:00-17:00<br />
                        ו׳: 9:00-13:00
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Form */}
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">שלח לנו הודעה</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="הכנס את שמך המלא"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">אימייל</label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="050-000-0000"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">נושא</label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="נושא ההודעה"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">תוכן ההודעה</label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="כתוב את הודעתך כאן..."
                          required
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 px-4 flex justify-center items-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>שולח...</span>
                        ) : (
                          <>
                            <Send className="h-4 w-4 ml-2" />
                            שלח הודעה
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section (optional) */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.6944360853714!2d34.78757147630378!3d32.08463052556325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b9c067242f5%3A0xad9ef7087a6a2cc3!2z15TXkdeo15bXnCA3LCDXqtecINeQ15HXmdeeLeempc-V15Q!5e0!3m2!1siw!2sil!4v1716131887529!5m2!1siw!2sil"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="מפת משרד תכלס"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">שאלות נפוצות</h2>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">כיצד אוכל להצטרף כספק שירותים?</h3>
                  <p className="text-gray-600">
                    ניתן להצטרף בקלות דרך לחיצה על כפתור "ספק חדש" בתפריט העליון ומילוי פרטים בסיסיים. 
                    צוות השירות שלנו יחזור אליכם להשלמת התהליך.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">האם יש עלות להצטרפות למערכת?</h3>
                  <p className="text-gray-600">
                    ההצטרפות והרישום לספקים חדשים היא ללא עלות. המערכת פועלת בשיטת עמלות רק על עסקאות שמתבצעות דרך הפלטפורמה.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">מה הכוונה ב"חיפוש מונחה"?</h3>
                  <p className="text-gray-600">
                    החיפוש המונחה הוא מערכת שמובילה אתכם שלב אחר שלב למציאת השירות המושלם לצרכים שלכם,
                    בהתאם לסוג האירוע, מספר המשתתפים, תקציב ודרישות נוספות.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">איך משלמים לספק דרך המערכת?</h3>
                  <p className="text-gray-600">
                    התשלום מתבצע דרך מערכת סליקה מאובטחת המשולבת באתר. ניתן לשלם באמצעות כרטיס אשראי, 
                    אפליקציות תשלום או העברה בנקאית, הכל באופן מאובטח ונוח.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
