
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, User, Phone, Mail, CreditCard } from "lucide-react";

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    eventDate: '',
    eventTime: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    customerCity: '',
    specialRequests: '',
    paymentMethod: 'credit'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // סימולציה של שליחת טופס
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Booking submitted:', formData);
      alert('ההזמנה נשלחה בהצלחה!');
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('שגיאה בשליחת ההזמנה');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card data-testid="booking-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          טופס הזמנה
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* פרטי השירות */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">פרטי השירות</h3>
            <div>
              <Label htmlFor="serviceName">שם השירות</Label>
              <Input 
                id="serviceName"
                value={formData.serviceName}
                onChange={(e) => handleInputChange('serviceName', e.target.value)}
                placeholder="הזן את שם השירות המבוקש"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="eventDate">תאריך האירוע</Label>
                <Input 
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventTime">שעת האירוע</Label>
                <Input 
                  id="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => handleInputChange('eventTime', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* פרטי לקוח */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              פרטי הלקוח
            </h3>
            <div>
              <Label htmlFor="customerName">שם מלא</Label>
              <Input 
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="הזן שם מלא"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerEmail">דוא"ל</Label>
                <Input 
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="customerPhone">טלפון</Label>
                <Input 
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  placeholder="050-1234567"
                  required
                />
              </div>
            </div>
          </div>

          {/* כתובת */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              כתובת האירוע
            </h3>
            <div>
              <Label htmlFor="customerAddress">כתובת</Label>
              <Input 
                id="customerAddress"
                value={formData.customerAddress}
                onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                placeholder="רחוב, מספר בית"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerCity">עיר</Label>
              <Input 
                id="customerCity"
                value={formData.customerCity}
                onChange={(e) => handleInputChange('customerCity', e.target.value)}
                placeholder="עיר"
                required
              />
            </div>
          </div>

          {/* בקשות מיוחדות */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">בקשות מיוחדות</h3>
            <div>
              <Label htmlFor="specialRequests">הערות נוספות</Label>
              <Textarea 
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="פרטים נוספים לגבי האירוע או בקשות מיוחדות"
                rows={3}
              />
            </div>
          </div>

          {/* אמצעי תשלום */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">אמצעי תשלום</h3>
            <select 
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="credit">כרטיס אשראי</option>
              <option value="bank_transfer">העברה בנקאית</option>
              <option value="cash">מזומן</option>
              <option value="check">צ'ק</option>
            </select>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'שולח הזמנה...' : 'שלח הזמנה'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
