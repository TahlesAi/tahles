
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, User, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AssistancePopupProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  searchHistory: any[];
}

const AssistancePopup: React.FC<AssistancePopupProps> = ({
  isOpen,
  onClose,
  sessionId,
  searchHistory
}) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('assistance_requests')
        .insert([{
          session_id: sessionId,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          search_criteria: {
            searchHistory,
            timestamp: new Date().toISOString()
          },
          failed_searches_count: searchHistory.length,
          notes: formData.notes
        }]);

      if (error) throw error;

      toast.success('הבקשה נשלחה בהצלחה!', {
        description: 'נציג שלנו ייצור איתכם קשר בקרוב',
        duration: 5000
      });

      onClose();
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting assistance request:', error);
      toast.error('שגיאה בשליחת הבקשה', {
        description: 'אנא נסו שוב מאוחר יותר'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            נשמח לעזור לכם!
          </DialogTitle>
          <DialogDescription className="text-center">
            נראה שלא הצלחתם למצוא בדיוק מה שחיפשתם. השאירו פרטים ונמצא עבורכם את הפתרון המושלם
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="customer_name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              שם מלא
            </Label>
            <Input
              id="customer_name"
              value={formData.customer_name}
              onChange={(e) => handleChange('customer_name', e.target.value)}
              required
              placeholder="הכניסו את שמכם המלא"
            />
          </div>

          <div>
            <Label htmlFor="customer_email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              כתובת מייל
            </Label>
            <Input
              id="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={(e) => handleChange('customer_email', e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>

          <div>
            <Label htmlFor="customer_phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              מספר טלפון
            </Label>
            <Input
              id="customer_phone"
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => handleChange('customer_phone', e.target.value)}
              required
              placeholder="050-1234567"
            />
          </div>

          <div>
            <Label htmlFor="notes">פרטים נוספים על מה שאתם מחפשים</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="ספרו לנו יותר על האירוע שלכם והשירות שאתם מחפשים..."
              rows={3}
            />
          </div>

          {/* סיכום החיפושים הקודמים */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-2">מה שחיפשתם עד כה:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              {searchHistory.slice(0, 3).map((search, index) => (
                <div key={index} className="truncate">
                  • {JSON.stringify(search.search_criteria).substring(0, 100)}...
                </div>
              ))}
              {searchHistory.length > 3 && (
                <div className="text-gray-500">
                  ועוד {searchHistory.length - 3} חיפושים...
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              ביטול
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'שולח...' : 'שלח בקשה'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssistancePopup;
