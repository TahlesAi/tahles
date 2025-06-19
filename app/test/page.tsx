'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/src/integrations/supabase/client'

export default function TestPage() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('test_services_basic')
        .select('*')
      if (error) {
        console.error('שגיאה:', error)
        setError(error.message)
      } else {
        console.log('✅ נתונים מה-View:', data)
        setData(data)
      }
    }

    fetchData()
  }, [])

  if (error) return <div>❌ שגיאה: {error}</div>
  return (
    <div>
      <h1>🔍 תוצאות מה-View</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
