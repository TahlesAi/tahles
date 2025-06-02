
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { useDetailedReviews } from '@/hooks/useDetailedReviews';
import { toast } from 'sonner';

interface DetailedReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  providerId: string;
  serviceId: string;
  serviceName: string;
  providerName: string;
}

interface RatingField {
  key: keyof DetailedReviewData;
  label: string;
}

interface DetailedReviewData {
  service_rating: number;
  quality_rating: number;
  price_rating: number;
  timing_rating: number;
}

const DetailedReviewForm: React.FC<DetailedReviewFormProps> = ({
  isOpen,
  onClose,
  bookingId,
  providerId,
  serviceId,
  serviceName,
  providerName
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

  const ratingFields: RatingField[] = [
    { key: 'service_rating', label: 'דירוג כללי של השירות' },
    { key: 'quality_rating', label: 'איכות השירות' },
    { key: 'price_rating', label: 'יחס מחיר-איכות' },
    { key: 'timing_rating', label: 'עמידה בזמנים' }
  ];

  const handleRatingChange = (field: keyof DetailedReviewData, rating: number) => {
    setFormData(prev => ({ ...prev, [field]: rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // וידוא שכל הדירוגים מולאו
    const missingRatings = ratingFields.filter(field => formData[field.key] === 0);
    if (missingRatings.length > 0) {
      toast.error('אנא מלאו את כל הדירוגים');
      return;
    }

    const result = await submitReview({
      booking_id: bookingId,
      provider_id: providerId,
      service_id: serviceId,
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      service_rating: formData.service_rating,
      quality_rating: formData.quality_rating,
      price_rating: formData.price_rating,
      timing_rating: formData.timing_rating,
      comment: formData.comment
    });

    if (result) {
      onClose();
      setFormData({
        customer_name: '',
        customer_email: '',
        service_rating: 0,
        quality_rating: 0,
        price_rating: 0,
        timing_rating: 0,
        comment: ''
      });
    }
  };

  const RatingStars = ({ rating, onRatingChange, label }: { 
    rating: number; 
    onRatingChange: (rating: number) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            דרגו את השירות: {serviceName}
          </DialogTitle>
          <p className="text-sm text-gray-600">ספק: {providerName}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* פרטי איש קשר */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">שם מלא</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                required
                placeholder="השם שלכם"
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
                placeholder="example@email.com"
              />
            </div>
          </div>

          {/* דירוגים */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">דרגו את השירות</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ratingFields.map((field) => (
                <RatingStars
                  key={field.key}
                  rating={formData[field.key]}
                  onRatingChange={(rating) => handleRatingChange(field.key, rating)}
                  label={field.label}
                />
              ))}
            </div>
          </div>

          {/* הערות */}
          <div>
            <Label htmlFor="comment">הערות נוספות (אופציונלי)</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="שתפו אותנו בחוויה שלכם..."
              rows={4}
            />
          </div>

          {/* הודעה על ההגרלה */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🎉 הזדמנות לזכות!</h4>
            <p className="text-sm text-blue-700">
              כל ביקורת שתשלחו מזכה אתכם בהשתתפות בהגרלה חודשית על פרס של 500 ₪!
              ההגרלה מתקיימת כל 500 ביקורות.
            </p>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              ביטול
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'שולח...' : 'שלח ביקורת'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DetailedReviewForm;
