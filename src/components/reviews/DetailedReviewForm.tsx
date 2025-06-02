
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useDetailedReviews, DetailedReview } from '@/hooks/useDetailedReviews';

interface DetailedReviewFormProps {
  bookingId: string;
  providerId: string;
  serviceId: string;
  onSubmit?: () => void;
}

const RatingSection = ({ 
  title, 
  rating, 
  onChange 
}: { 
  title: string; 
  rating: number; 
  onChange: (rating: number) => void; 
}) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{title}</Label>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            star <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300 hover:text-yellow-200'
          }`}
          onClick={() => onChange(star)}
        />
      ))}
    </div>
  </div>
);

const DetailedReviewForm: React.FC<DetailedReviewFormProps> = ({
  bookingId,
  providerId,
  serviceId,
  onSubmit
}) => {
  const { loading, submitReview } = useDetailedReviews();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    service_rating: 0,
    quality_rating: 0,
    price_rating: 0,
    timing_rating: 0,
    comment: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer_name || !formData.customer_email) {
      return;
    }

    if (formData.service_rating === 0 || formData.quality_rating === 0 || 
        formData.price_rating === 0 || formData.timing_rating === 0) {
      return;
    }

    const review: DetailedReview = {
      booking_id: bookingId,
      provider_id: providerId,
      service_id: serviceId,
      ...formData
    };

    const result = await submitReview(review);
    if (result && onSubmit) {
      onSubmit();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" dir="rtl">
      <CardHeader>
        <CardTitle className="text-center">דירוג השירות</CardTitle>
        <p className="text-center text-sm text-gray-600">
          המשוב שלכם חשוב לנו ועוזר לשפר את השירות
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">שם מלא</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="customer_email">כתובת מייל</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RatingSection
              title="איכות השירות"
              rating={formData.service_rating}
              onChange={(rating) => setFormData(prev => ({ ...prev, service_rating: rating }))}
            />
            
            <RatingSection
              title="איכות המוצר"
              rating={formData.quality_rating}
              onChange={(rating) => setFormData(prev => ({ ...prev, quality_rating: rating }))}
            />
            
            <RatingSection
              title="יחס מחיר-איכות"
              rating={formData.price_rating}
              onChange={(rating) => setFormData(prev => ({ ...prev, price_rating: rating }))}
            />
            
            <RatingSection
              title="עמידה בזמנים"
              rating={formData.timing_rating}
              onChange={(rating) => setFormData(prev => ({ ...prev, timing_rating: rating }))}
            />
          </div>

          <div>
            <Label htmlFor="comment">הערות נוספות (אופציונלי)</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="שתפו את החוויה שלכם..."
              rows={4}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-blue-800 font-medium">
              🎉 הביקורת ה-500 זוכה בפרס של ₪500!
            </p>
            <p className="text-xs text-blue-600 mt-1">
              ההגרלה מתקיימת אוטומטית עם כל ביקורת
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'שולח...' : 'שלח ביקורת'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DetailedReviewForm;
