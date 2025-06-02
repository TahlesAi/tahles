
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeadphonesIcon, SearchIcon, Clock } from 'lucide-react';
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
    additional_notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('assistance_requests')
        .insert([{
          session_id: sessionId,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          search_criteria: {
            search_history: searchHistory,
            additional_notes: formData.additional_notes
          },
          failed_searches_count: searchHistory.length
        }]);

      if (error) throw error;

      toast.success('הבקשה נשלחה בהצלחה!', {
        description: 'נציג שלנו ייצור איתכם קשר תוך 24 שעות'
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting assistance request:', error);
      toast.error('שגיאה בשליחת הבקשה');
    } finally {
      setSubmitting(false);
    }
  };

  const getSearchSummary = () => {
    const categories = new Set();
    const locations = new Set();
    const eventTypes = new Set();

    searchHistory.forEach(search => {
      const criteria = search.search_criteria;
      if (criteria.category) categories.add(criteria.category);
      if (criteria.location) locations.add(criteria.location);
      if (criteria.eventType) eventTypes.add(criteria.eventType);
    });

    return { categories: Array.from(categories), locations: Array.from(locations), eventTypes: Array.from(eventTypes) };
  };

  const summary = getSearchSummary();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HeadphonesIcon className="h-6 w-6 text-primary" />
            בואו נמצא לכם את הפתרון המושלם!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* סיכום החיפושים */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <SearchIcon className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium text-blue-900">מה שחיפשתם עד כה:</h3>
              </div>
              
              <div className="space-y-2">
                {summary.categories.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-blue-800">קטגוריות: </span>
                    {summary.categories.map((cat, idx) => (
                      <Badge key={idx} variant="secondary" className="ml-1 text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {summary.locations.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-blue-800">מיקומים: </span>
                    {summary.locations.map((loc, idx) => (
                      <Badge key={idx} variant="secondary" className="ml-1 text-xs">
                        {loc}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Clock className="h-3 w-3" />
                  <span>{searchHistory.length} חיפושים בוצעו</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* טופס פרטים */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customer_name">שם מלא *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="customer_email">כתובת מייל *</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="customer_phone">מספר טלפון *</Label>
              <Input
                id="customer_phone"
                type="tel"
                value={formData.customer_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_phone: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="additional_notes">פרטים נוספים על מה שאתם מחפשים</Label>
              <Textarea
                id="additional_notes"
                value={formData.additional_notes}
                onChange={(e) => setFormData(prev => ({ ...prev, additional_notes: e.target.value }))}
                placeholder="תאריך האירוע, תקציב, דרישות מיוחדות..."
                rows={3}
              />
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-green-800 font-medium">
                ✅ הצוות המקצועי שלנו ימצא עבורכם בדיוק מה שאתם מחפשים
              </p>
              <p className="text-xs text-green-600 mt-1">
                נענה תוך 24 שעות עם המלצות מותאמות אישית
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={submitting}
              >
                {submitting ? 'שולח...' : 'שלח בקשה'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={submitting}
              >
                ביטול
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssistancePopup;
