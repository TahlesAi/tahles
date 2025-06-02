
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CashbackCredit {
  id?: string;
  customer_id: string;
  amount: number;
  source_booking_id: string;
  expires_at: string;
  status: 'active' | 'used' | 'expired';
  created_at?: string;
  updated_at?: string;
}

export const useCashback = () => {
  const [loading, setLoading] = useState(false);

  const createCashbackCredit = async (
    customerId: string,
    bookingId: string,
    orderAmount: number,
    cashbackPercentage: number = 5
  ) => {
    setLoading(true);
    try {
      const cashbackAmount = Math.round((orderAmount * cashbackPercentage) / 100);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // תוקף 30 יום

      const { data, error } = await supabase
        .from('cashback_credits')
        .insert([{
          customer_id: customerId,
          amount: cashbackAmount,
          source_booking_id: bookingId,
          expires_at: expiryDate.toISOString(),
          status: 'active' as const
        }])
        .select()
        .single();

      if (error) throw error;

      toast.success(`זכיתם ב-${cashbackPercentage}% קאשבק!`, {
        description: `₪${cashbackAmount} נזכו לחשבונכם (תוקף 30 יום)`,
        duration: 6000
      });

      return data;
    } catch (error) {
      console.error('Error creating cashback credit:', error);
      toast.error('שגיאה ביצירת קרדיט קאשבק');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const applyCashbackToOrder = async (customerId: string, orderAmount: number) => {
    try {
      const { data: credits, error } = await supabase
        .from('cashback_credits')
        .select('*')
        .eq('customer_id', customerId)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (!credits || credits.length === 0) {
        return { appliedAmount: 0, remainingAmount: orderAmount };
      }

      let remainingOrder = orderAmount;
      let totalApplied = 0;
      const creditsToUpdate = [];

      for (const credit of credits) {
        if (remainingOrder <= 0) break;

        const creditAmount = Number(credit.amount);
        
        if (creditAmount <= remainingOrder) {
          // השתמש בכל הקרדיט
          totalApplied += creditAmount;
          remainingOrder -= creditAmount;
          creditsToUpdate.push({ id: credit.id, status: 'used' });
        } else {
          // השתמש בחלק מהקרדיט
          totalApplied += remainingOrder;
          const newAmount = creditAmount - remainingOrder;
          remainingOrder = 0;
          
          // עדכן את הקרדיט עם הסכום החדש
          await supabase
            .from('cashback_credits')
            .update({ amount: newAmount })
            .eq('id', credit.id);
        }
      }

      // עדכן קרדיטים שנוצלו במלואם
      for (const creditUpdate of creditsToUpdate) {
        await supabase
          .from('cashback_credits')
          .update({ status: creditUpdate.status })
          .eq('id', creditUpdate.id);
      }

      if (totalApplied > 0) {
        toast.success(`נוצל קרדיט קאשבק: ₪${totalApplied}`);
      }

      return {
        appliedAmount: totalApplied,
        remainingAmount: remainingOrder
      };

    } catch (error) {
      console.error('Error applying cashback:', error);
      return { appliedAmount: 0, remainingAmount: orderAmount };
    }
  };

  const getAvailableCashback = async (customerId: string) => {
    try {
      const { data: credits, error } = await supabase
        .from('cashback_credits')
        .select('amount')
        .eq('customer_id', customerId)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString());

      if (error) throw error;

      const total = credits?.reduce((sum: number, credit: any) => sum + Number(credit.amount), 0) || 0;
      return total;
    } catch (error) {
      console.error('Error getting available cashback:', error);
      return 0;
    }
  };

  return {
    loading,
    createCashbackCredit,
    applyCashbackToOrder,
    getAvailableCashback
  };
};
