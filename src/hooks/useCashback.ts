
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

      // Use raw SQL query instead of typed query until types are updated
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: `INSERT INTO cashback_credits (customer_id, amount, source_booking_id, expires_at, status) 
              VALUES ($1, $2, $3, $4, $5) 
              RETURNING *`,
        params: [customerId, cashbackAmount, bookingId, expiryDate.toISOString(), 'active']
      });

      if (error) throw error;

      toast.success(`זכיתם ב-${cashbackPercentage}% קאשבק!`, {
        description: `₪${cashbackAmount} נזכו לחשבונכם (תוקף 30 יום)`,
        duration: 6000
      });

      return data;
    } catch (error) {
      console.error('Error creating cashback credit:', error);
      
      // Fallback: direct insert using raw query
      try {
        const cashbackAmount = Math.round((orderAmount * cashbackPercentage) / 100);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        const { data, error: insertError } = await supabase
          .from('cashback_credits' as any)
          .insert([{
            customer_id: customerId,
            amount: cashbackAmount,
            source_booking_id: bookingId,
            expires_at: expiryDate.toISOString(),
            status: 'active'
          }])
          .select()
          .single();

        if (insertError) throw insertError;

        toast.success(`זכיתם ב-${cashbackPercentage}% קאשבק!`, {
          description: `₪${cashbackAmount} נזכו לחשבונכם (תוקף 30 יום)`,
          duration: 6000
        });

        return data;
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        return null;
      }
    } finally {
      setLoading(false);
    }
  };

  const applyCashbackToOrder = async (customerId: string, orderAmount: number) => {
    try {
      // Use type assertion to work with the table
      const { data: credits, error } = await supabase
        .from('cashback_credits' as any)
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

        if (credit.amount <= remainingOrder) {
          // השתמש בכל הקרדיט
          totalApplied += credit.amount;
          remainingOrder -= credit.amount;
          creditsToUpdate.push({ id: credit.id, status: 'used' });
        } else {
          // השתמש בחלק מהקרדיט
          totalApplied += remainingOrder;
          const newAmount = credit.amount - remainingOrder;
          remainingOrder = 0;
          
          // עדכן את הקרדיט עם הסכום החדש
          await supabase
            .from('cashback_credits' as any)
            .update({ amount: newAmount })
            .eq('id', credit.id);
        }
      }

      // עדכן קרדיטים שנוצלו במלואם
      for (const creditUpdate of creditsToUpdate) {
        await supabase
          .from('cashback_credits' as any)
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
        .from('cashback_credits' as any)
        .select('amount')
        .eq('customer_id', customerId)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString());

      if (error) throw error;

      const total = credits?.reduce((sum: number, credit: any) => sum + credit.amount, 0) || 0;
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
