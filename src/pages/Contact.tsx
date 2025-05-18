
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, you'd send this data to your server or a service
      console.log('Form data submitted:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('הודעתך נשלחה בהצלחה! נחזור אליך בהקדם.');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('אירעה שגיאה בשליחת הטופס. אנא נסה שנית.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow" dir="rtl">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brand-600 to-accent1-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">צור קשר</h1>
              <p className="text-xl">
                אנחנו כאן כדי לענות על כל שאלה ולעזור לך למצוא את השירות המושלם עבורך
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Contact Form */}
              <div className="md:col-span-3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">שלח לנו הודעה</h2>
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium">
                          שם מלא
                        </label>
                        <Input
                          id="name"
                          placeholder="השם שלך"
                          dir="rtl"
                          {...register('name', { required: 'שדה חובה' })}
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                          אימייל
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="האימייל שלך"
                          dir="rtl"
                          {...register('email', { 
                            required: 'שדה חובה',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'כתובת אימייל לא תקינה'
                            }
                          })}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                          טלפון
                        </label>
                        <Input
                          id="phone"
                          placeholder="מספר הטלפון שלך"
                          dir="rtl"
                          {...register('phone')}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                          נושא
                        </label>
                        <Input
                          id="subject"
                          placeholder="נושא ההודעה"
                          dir="rtl"
                          {...register('subject', { required: 'שדה חובה' })}
                          className={errors.subject ? 'border-red-500' : ''}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium">
                        הודעה
                      </label>
                      <Textarea
                        id="message"
                        placeholder="כתוב את הודעתך כאן..."
                        rows={5}
                        dir="rtl"
                        {...register('message', { required: 'שדה חובה' })}
                        className={errors.message ? 'border-red-500' : ''}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </Button>
                  </form>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">פרטי התקשרות</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 ml-3 text-brand-600 mt-1" />
                          <div>
                            <p className="font-medium">כתובת</p>
                            <p className="text-gray-600">רחוב המסגר 30, תל אביב</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 ml-3 text-brand-600 mt-1" />
                          <div>
                            <p className="font-medium">טלפון</p>
                            <p className="text-gray-600">03-1234567</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 ml-3 text-brand-600 mt-1" />
                          <div>
                            <p className="font-medium">דוא"ל</p>
                            <p className="text-gray-600">info@tachles.co.il</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 ml-3 text-brand-600 mt-1" />
                          <div>
                            <p className="font-medium">שעות פעילות</p>
                            <p className="text-gray-600">א'-ה': 9:00 - 18:00</p>
                            <p className="text-gray-600">ו': 9:00 - 13:00</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-4">שירות לקוחות</h3>
                      <p className="text-gray-600 mb-4">
                        צוות שירות הלקוחות שלנו זמין לעזור לך בכל שאלה או בעיה.
                      </p>
                      <Button variant="outline" className="w-full">
                        שאלות נפוצות
                      </Button>
                    </CardContent>
                  </Card>
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
