
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Send, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NoResultsWithLeadFormProps {
  searchQuery?: string;
  selectedDate?: string;
  selectedTime?: string;
  appliedFilters?: any;
}

const NoResultsWithLeadForm = ({ 
  searchQuery, 
  selectedDate, 
  selectedTime, 
  appliedFilters 
}: NoResultsWithLeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    attendeesCount: '',
    budget: '',
    additionalDetails: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // כאן נשלח את הנתונים לשרת או למערכת ניהול הלידים
      const leadData = {
        ...formData,
        searchQuery,
        selectedDate,
        selectedTime,
        appliedFilters,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      
      console.log('Lead submitted:', leadData);
      
      // סימולציה של שליחה
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <div className="text-green-600 mb-4">
            <Clock className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-bold mb-2">הבקשה נשלחה בהצלחה!</h3>
          <p className="text-gray-600 mb-4">
            הצוות שלנו יצור איתך קשר תוך 48 שעות עם המלצות מותאמות אישית
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>מה הלאה?</strong><br />
              • נבדוק את הזמינות עבור התאריך שבחרת<br />
              • נמצא ספקים מתאימים לתקציב שלך<br />
              • נציג לך 3-5 אפשרויות מומלצות<br />
              • נסייע בתיאום ובביצוע ההזמנה
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>לא מצאנו התאמה לחיפוש שלכם.</strong>
          {selectedDate && selectedTime && (
            <span> אין שירותים זמינים ב-{selectedDate} בשעה {selectedTime}.</span>
          )}
          <br />
          עדכנו את הפרטים או מלאו טופס ונמצא עבורכם את השירות האופטימלי תוך 48 שעות.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* טופס ליד */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              בואו נמצא לכם את השירות המושלם
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">שם מלא *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="השם שלכם"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">טלפון *</label>
                  <Input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="050-1234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">אימייל</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">סוג האירוע *</label>
                  <Input
                    required
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                    placeholder="חתונה, בר מצווה, אירוע חברה..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">מספר משתתפים</label>
                  <Input
                    value={formData.attendeesCount}
                    onChange={(e) => handleInputChange('attendeesCount', e.target.value)}
                    placeholder="50-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">תקציב משוער</label>
                <Input
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="1000-3000 ₪"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">פרטים נוספים</label>
                <Textarea
                  value={formData.additionalDetails}
                  onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                  placeholder="תאריך האירוע, מיקום, דרישות מיוחדות..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'שולח...' : 'שלחו בקשה לחיפוש מותאם'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* מידע נוסף */}
        <Card>
          <CardHeader>
            <CardTitle>למה לבחור בשירות האיתור שלנו?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">חיפוש מותאם אישית</h4>
                  <p className="text-sm text-gray-600">אנו מתאימים בדיוק את הספק לצרכים שלכם</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">בדיקת זמינות מדויקת</h4>
                  <p className="text-sm text-gray-600">אישור זמינות בזמן אמת עבור התאריך שלכם</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">מחירים מיוחדים</h4>
                  <p className="text-sm text-gray-600">הסכמים מיוחדים עם הספקים במחירים מועדפים</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">4</span>
                </div>
                <div>
                  <h4 className="font-medium">ליווי עד ביצוע</h4>
                  <p className="text-sm text-gray-600">תמיכה מלאה בתיאום ובביצוע האירוע</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">התחייבות שלנו:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• מענה תוך 48 שעות</li>
                <li>• לפחות 3 אפשרויות מותאמות</li>
                <li>• שירות ללא תשלום נוסף</li>
                <li>• ביטול ללא עלות עד 72 שעות מהאירוע</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NoResultsWithLeadForm;
