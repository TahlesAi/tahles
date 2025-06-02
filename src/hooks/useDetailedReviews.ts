
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface DetailedReview {
  id?: string;
  booking_id: string;
  provider_id: string;
  service_id: string;
  customer_name: string;
  customer_email: string;
  service_rating: number;
  quality_rating: number;
  price_rating: number;
  timing_rating: number;
  comment?: string;
}

export const useDetailedReviews = () => {
  const [loading, setLoading] = useState(false);

  const submitReview = async (review: DetailedReview) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('detailed_reviews')
        .insert([review])
        .select()
        .single();

      if (error) throw error;

      toast.success('הביקורת נשלחה בהצלחה!', {
        description: 'תודה על המשוב שלכם, זה עוזר לנו להשתפר'
      });

      // בדיקה אם יש זוכה חדש בהגרלה
      await checkLotteryWinner();
      
      return data;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('שגיאה בשליחת הביקורת');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const checkLotteryWinner = async () => {
    try {
      const { data: winners } = await supabase
        .from('lottery_winners')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1);

      if (winners && winners.length > 0) {
        const latestWinner = winners[0];
        const winnerTime = new Date(latestWinner.created_at).getTime();
        const now = new Date().getTime();
        
        // אם הזוכה נבחר בדקות האחרונות
        if (now - winnerTime < 60000) { // דקה אחת
          toast.success('🎉 מזל טוב! נבחר זוכה חדש בהגרלה!', {
            description: `${latestWinner.customer_email} זכה בפרס של ₪${latestWinner.prize_amount}`,
            duration: 8000
          });
        }
      }
    } catch (error) {
      console.error('Error checking lottery winner:', error);
    }
  };

  const getProviderReviews = async (providerId: string) => {
    try {
      const { data, error } = await supabase
        .from('detailed_reviews')
        .select('*')
        .eq('provider_id', providerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching provider reviews:', error);
      return [];
    }
  };

  return {
    loading,
    submitReview,
    getProviderReviews
  };
};
