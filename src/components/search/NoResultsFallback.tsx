
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SearchX, Lightbulb, Phone, Mail, Star, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface NoResultsFallbackProps {
  searchQuery?: string;
  appliedFilters?: any;
  onFilterAdjustment: (suggestion: string) => void;
}

const NoResultsFallback: React.FC<NoResultsFallbackProps> = ({
  searchQuery,
  appliedFilters,
  onFilterAdjustment
}) => {
  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const popularProviders = [
    { id: '1', name: 'נטע ברסלר - אמן המחשבות', category: 'אומני חושים', rating: 4.8, location: 'תל אביב' },
    { id: '2', name: 'להקת רוק עברי', category: 'זמרים', rating: 4.9, location: 'ירושלים' },
    { id: '3', name: 'קוסם הילדים', category: 'קוסמים', rating: 4.7, location: 'חיפה' },
  ];

  const filterSuggestions = [
    'הרחב את טווח התקציב',
    'בחר אזורים נוספים',
    'הסר מגבלות תאריך',
    'הוסף קטגוריות נוספות',
    'הוריד את דירוג המינימום'
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    toast.success('הפנייה נשלחה בהצלחה! נחזור אליכם בהקדם');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto" dir="rtl">
      {/* הודעה ראשית */}
      <Card className="text-center py-8">
        <CardContent>
          <SearchX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            לא נמצאו תוצאות מתאימות
          </h2>
          <p className="text-gray-600 mb-4">
            {searchQuery ? `לא מצאנו תוצאות עבור "${searchQuery}"` : 'לא מצאנו תוצאות התואמות לקריטריונים שבחרתם'}
          </p>
          <p className="text-sm text-gray-500">
            אל תדאגו! יש לנו הצעות שיעזרו לכם למצוא בדיוק מה שאתם מחפשים
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* הצעות לריכוך מסננים */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">הצעות לשיפור החיפוש</h3>
            </div>
            
            <div className="space-y-3">
              {filterSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <span className="text-sm">{suggestion}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onFilterAdjustment(suggestion)}
                  >
                    החל
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>טיפ:</strong> נסו חיפוש רחב יותר ואז צמצמו בעזרת הסינונים
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ספקים פופולריים */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold">ספקים פופולריים</h3>
            </div>
            
            <div className="space-y-3">
              {popularProviders.map((provider) => (
                <div key={provider.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{provider.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">{provider.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <Badge variant="outline">{provider.category}</Badge>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {provider.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              צפה בכל הספקים הפופולריים
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* טופס פנייה */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">לא מצאתם מה שחיפשתם?</h3>
            <p className="text-gray-600">פנו אלינו ואנו נעזור לכם למצוא את הפתרון המושלם</p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="שם מלא"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="כתובת אימייל"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                  required
                />
              </div>
            </div>
            
            <Input
              type="tel"
              placeholder="מספר טלפון"
              value={contactForm.phone}
              onChange={(e) => setContactForm(prev => ({...prev, phone: e.target.value}))}
            />
            
            <Textarea
              placeholder="ספרו לנו על האירוע שלכם ומה אתם מחפשים..."
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
              className="min-h-[100px]"
              required
            />
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button type="submit" className="flex-1">
                <Mail className="h-4 w-4 ml-2" />
                שלח פנייה
              </Button>
              <Button type="button" variant="outline" className="flex-1">
                <Phone className="h-4 w-4 ml-2" />
                התקשר אלינו
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
            <h4 className="font-medium text-green-800 mb-1">שירות אישי וללא תשלום</h4>
            <p className="text-sm text-green-700">
              הצוות שלנו זמין לעזור לכם למצוא את הפתרון המושלם לאירוע שלכם - ללא עלות נוספת!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoResultsFallback;
