import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('שגיאה בקבלת מוצרים:', error.message);
        setError(error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📦 מוצרים מתוך Supabase</h1>
      {error && <p style={{ color: 'red' }}>שגיאה: {error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            🛒 {product.name} – ₪{product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
