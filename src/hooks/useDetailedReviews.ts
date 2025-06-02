import { useState } from 'react';
import { toast } from 'sonner';

interface DetailedReview {
  booking_id: string;
  provider_id: string;
  service_id: string;
  customer_name: string;
  customer_email: string;
  service_rating: number;
  quality_rating: number;
  price_rating: number;
  timing_rating: number;
  comment: string;
}

export const useDetailedReviews = () => {
  const [loading, setLoading] = useState(false);

  const submitReview = async (reviewData: DetailedReview) => {
    setLoading(true);
    try {
      console.log('Submitting detailed review:', reviewData);
      
      // כאן נוסיף קריאה לשרת לשמירת הביקורת המפורטת
      // await supabase.from('detailed_reviews').insert([reviewData]);
      
      toast.success('הביקורת נשלחה בהצלחה! תודה על השיתוף 🎉');
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('שגיאה בשליחת הביקורת');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitReview };
};
