'use client';

import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function TestPage() {
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('test_services_basic')
        .select('*');

      if (error) {
        console.error('שגיאה:', error);
      } else {
        console.log('נתונים מה-View:', data);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>בדיקת טעינת נתונים מ-Supabase</h1>
      <p>פתח את הקונסול (F12) כדי לראות אם הנתונים נטענו בהצלחה.</p>
    </div>
  );
}
