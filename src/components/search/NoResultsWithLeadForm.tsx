
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Send, Clock, Phone, Mail } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface NoResultsWithLeadFormProps {
  searchQuery?: string;
  selectedDate?: string;
  selectedTime?: string;
  appliedFilters?: any;
  onFilterAdjustment?: (suggestion: string) => void;
}

const NoResultsWithLeadForm = ({ 
  searchQuery, 
  selectedDate, 
  selectedTime, 
  appliedFilters,
  onFilterAdjustment 
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
    
    if (!formData.name || !formData.phone) {
      toast.error('אנא מלא שם וטלפון');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // יצירת נתוני הליד
      const leadData = {
        ...formData,
        searchQuery,
        selectedDate,
        selectedTime,
        appliedFilters,
        timestamp: new Date().toISOString(),
        status: 'pending',
        source: 'no_results_search'
      };
      
      console.log('Lead submitted:', leadData);
      
      // שמירה ב-localStorage לגיבוי
      localStorage.setItem('lastLeadSubmission', JSON.stringify(leadData));
      
      // סימולציה של שליחה לשרת
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast.success('הבקשה נשלחה בהצלחה! נחזור אליכם תוך 48 שעות');
      
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast.error('שגיאה בשליחת הבקשה. אנא נסו שוב או צרו קשר טלפונית');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filterSuggestions = [
    'הרחב את טווח התקציב',
    'בחר תאריכים נוספים', 
    'הוסף אזורים נוספים',
    'הסר מגבלות קונספט',
    'נסה מילות חיפוש שונות'
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6" dir="rtl">
        <Card className="text-center">
          <CardContent className="py-8">
            <div className="text-green-600 mb-4">
              <Clock className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              הבקשה נשלחה בהצלחה!
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              הצוות שלנו יצור איתך קשר תוך 48 שעות עם המלצות מותאמות אישית
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-3">מה הלאה?</h4>
              <ul className="text-sm text-blue-700 space-y-2 text-right">
                <li>• נבדוק את הזמינות עבור התאריך שבחרת</li>
                <li>• נמצא ספקים מתאימים לתקציב שלך</li>
                <li>• נציג לך 3-5 אפשרויות מומלצות</li>
                <li>• נסייע בתיאום ובביצוע ההזמנה</li>
              </ul>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex-1 max-w-xs"
              >
                חזור לדף הבית
              </Button>
              <Button 
                onClick={() => setIsSubmitted(false)}
                className="flex-1 max-w-xs"
              >
                שלח בקשה נוספת
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8" dir="rtl">
      {/* הודעת התראה */}
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>לא מצאנו התאמה מושלמת לחיפוש שלכם</strong>
          {selectedDate && selectedTime && (
            <span> עבור התאריך {selectedDate} בשעה {selectedTime}</span>
          )}
          {searchQuery && (
            <span> עבור "{searchQuery}"</span>
          )}
          <br />
          <span className="text-sm">
            אל תדאגו! מלאו את הטופס למטה ואנו נמצא עבורכם את השירות המתאים ביותר תוך 48 שעות.
          </span>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* טופס יצירת קשר */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Send className="h-6 w-6 text-blue-600" />
                בואו נמצא לכם את השירות המושלם
              </CardTitle>
              <p className="text-gray-600">
                מלאו את הפרטים והצוות שלנו יחזור אליכם עם הצעות מותאמות אישית
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* פרטים אישיים */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">שם מלא *</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="השם שלכם"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">טלפון *</label>
                    <Input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="050-1234567"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">אימייל</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>

                {/* פרטי האירוע */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">סוג האירוע *</label>
                    <Input
                      required
                      value={formData.eventType}
                      onChange={(e) => handleInputChange('eventType', e.target.value)}
                      placeholder="חתונה, בר מצווה, אירוע חברה..."
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">מספר משתתפים</label>
                    <Input
                      value={formData.attendeesCount}
                      onChange={(e) => handleInputChange('attendeesCount', e.target.value)}
                      placeholder="50-100"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">תקציב משוער (₪)</label>
                  <Input
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="1,000-3,000"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">פרטים נוספים</label>
                  <Textarea
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                    placeholder="תאריך האירוע, מיקום, דרישות מיוחדות, סוג המופע המבוקש..."
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-3 text-lg" 
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? 'שולח...' : 'שלחו בקשה לחיפוש מותאם'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* מידע נוסף ומיניהות */}
        <div className="space-y-6">
          {/* הצעות לשיפור החיפוש */}
          {onFilterAdjustment && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">נסו לשנות את החיפוש</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {filterSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <span className="text-sm">{suggestion}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onFilterAdjustment(suggestion)}
                    >
                      נסה
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* יתרונות השירות */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">למה לבחור בשירות האיתור שלנו?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">חיפוש מותאם אישית</h4>
                    <p className="text-sm text-gray-600">אנו מתאימים בדיוק את הספק לצרכים, לתקציב ולתאריך שלכם</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">מחירים מיוחדים</h4>
                    <p className="text-sm text-gray-600">הסכמים מיוחדים עם הספקים במחירים מועדפים</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">ליווי מלא</h4>
                    <p className="text-sm text-gray-600">תמיכה וליווי מקצועי עד ביצוע האירוע</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-2">התחייבות שלנו:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• מענה תוך 48 שעות</li>
                  <li>• לפחות 3 אפשרויות מותאמות</li>
                  <li>• שירות ללא תשלום נוסף</li>
                  <li>• ביטול ללא עלות עד 72 שעות</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* פרטי יצירת קשר מיידי */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">צריכים מענה מיידי?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open('tel:03-1234567')}
              >
                <Phone className="h-4 w-4 ml-2" />
                התקשרו אלינו: 03-1234567
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open('mailto:info@tachles-events.co.il')}
              >
                <Mail className="h-4 w-4 ml-2" />
                שלחו מייל: info@tachles-events.co.il
              </Button>
              
              <div className="text-xs text-gray-500 text-center mt-3">
                זמינים ימים א-ה: 8:00-18:00<br />
                ימי ו: 8:00-14:00
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NoResultsWithLeadForm;
