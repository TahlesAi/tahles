
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Calendar, Info } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CashbackCredit {
  id: string;
  amount: number;
  source_booking_id: string;
  expires_at: string;
  status: 'active' | 'used' | 'expired';
  created_at: string;
}

interface CashbackSystemProps {
  customerId: string;
}

const CashbackSystem: React.FC<CashbackSystemProps> = ({ customerId }) => {
  const [credits, setCredits] = useState<CashbackCredit[]>([]);
  const [totalActive, setTotalActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCashbackCredits();
  }, [customerId]);

  const loadCashbackCredits = async () => {
    try {
      // Use type assertion to work with the table until types are updated
      const { data, error } = await supabase
        .from('cashback_credits' as any)
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Type the data properly
      const typedData = data as CashbackCredit[];
      setCredits(typedData || []);
      
      // חישוב סך הקרדיט הפעיל
      const activeCredits = typedData?.filter(credit => 
        credit.status === 'active' && new Date(credit.expires_at) > new Date()
      ) || [];
      
      const total = activeCredits.reduce((sum, credit) => sum + credit.amount, 0);
      setTotalActive(total);
      
    } catch (error) {
      console.error('Error loading cashback credits:', error);
      toast.error('שגיאה בטעינת קרדיט קאשבק');
    } finally {
      setLoading(false);
    }
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL');
  };

  const getStatusBadge = (credit: CashbackCredit) => {
    const isExpired = new Date(credit.expires_at) < new Date();
    
    if (credit.status === 'used') {
      return <Badge variant="secondary">נוצל</Badge>;
    }
    
    if (isExpired || credit.status === 'expired') {
      return <Badge variant="destructive">פג תוקף</Badge>;
    }
    
    return <Badge variant="default" className="bg-green-600">פעיל</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* סיכום קרדיט */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-green-600" />
            קרדיט קאשבק זמין
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 mb-2">
            ₪{totalActive.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">
            זמין לשימוש בהזמנות הבאות שלכם
          </p>
          
          {totalActive > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">איך להשתמש בקרדיט:</p>
                  <p>בעת ביצוע הזמנה חדשה, הקרדיט יקוזז אוטומטית מהסכום הכולל.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* היסטוריית קרדיטים */}
      <Card>
        <CardHeader>
          <CardTitle>היסטוריית קאשבק</CardTitle>
        </CardHeader>
        <CardContent>
          {credits.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              <Coins className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>עדיין לא צברתם קרדיט קאשבק</p>
              <p className="text-sm mt-1">
                בצעו הזמנות אצל ספקים המשתתפים בתוכנית הקאשבק כדי לזכות ב-5% החזר!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {credits.map((credit) => (
                <div key={credit.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">₪{credit.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      פג תוקף: {formatExpiryDate(credit.expires_at)}
                    </div>
                  </div>
                  <div className="text-left">
                    {getStatusBadge(credit)}
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(credit.created_at).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CashbackSystem;
