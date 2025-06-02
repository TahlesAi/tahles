
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface RatingSystemProps {
  serviceId: string;
  providerId: string;
  onRatingSubmitted?: (rating: number, comment: string) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ 
  serviceId, 
  providerId, 
  onRatingSubmitted 
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast.error('אנא בחרו דירוג');
      return;
    }

    setIsSubmitting(true);
    try {
      // כאן נוסיף קריאה לשרת לשמירת הדירוג
      console.log('Submitting rating:', { serviceId, providerId, rating, comment });
      
      toast.success('הדירוג נשלח בהצלחה!');
      
      if (onRatingSubmitted) {
        onRatingSubmitted(rating, comment);
      }
      
      // איפוס הטופס
      setRating(0);
      setComment('');
    } catch (error) {
      toast.error('שגיאה בשליחת הדירוג');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>דרגו את השירות</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center space-x-1 rtl:space-x-reverse">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`transition-colors ${
                star <= (hoverRating || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star className="h-8 w-8 fill-current" />
            </button>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-600">
          {rating > 0 && (
            <span>
              {rating === 1 && 'גרוע'}
              {rating === 2 && 'לא טוב'}
              {rating === 3 && 'סביר'}
              {rating === 4 && 'טוב'}
              {rating === 5 && 'מעולה'}
            </span>
          )}
        </div>

        <Textarea
          placeholder="שתפו את החוויה שלכם (אופציונלי)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px]"
        />

        <Button 
          onClick={handleSubmitRating}
          disabled={rating === 0 || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'שולח...' : 'שלח דירוג'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RatingSystem;
