
import { useState, useCallback, useEffect } from 'react';

interface FavoriteItem {
  id: string;
  type: 'service' | 'provider';
  name: string;
  imageUrl?: string;
  price?: number;
  provider?: string;
  addedAt: Date;
}

interface UseFavoritesReturn {
  favorites: FavoriteItem[];
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  favoriteCount: number;
}

const useFavorites = (): UseFavoritesReturn => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // טעינת מועדפים מ-localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('user_favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites).map((fav: any) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        }));
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // שמירת מועדפים ב-localStorage
  const saveFavorites = useCallback((newFavorites: FavoriteItem[]) => {
    localStorage.setItem('user_favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }, []);

  // הוספה למועדפים
  const addToFavorites = useCallback((item: Omit<FavoriteItem, 'addedAt'>) => {
    const newFavorite: FavoriteItem = {
      ...item,
      addedAt: new Date()
    };
    
    setFavorites(current => {
      // בדיקה שהפריט לא קיים כבר
      if (current.some(fav => fav.id === item.id)) {
        return current;
      }
      
      const updated = [...current, newFavorite];
      saveFavorites(updated);
      return updated;
    });
  }, [saveFavorites]);

  // הסרה מהמועדפים
  const removeFromFavorites = useCallback((id: string) => {
    setFavorites(current => {
      const updated = current.filter(fav => fav.id !== id);
      saveFavorites(updated);
      return updated;
    });
  }, [saveFavorites]);

  // בדיקה אם פריט הוא מועדף
  const isFavorite = useCallback((id: string) => {
    return favorites.some(fav => fav.id === id);
  }, [favorites]);

  // ניקוי כל המועדפים
  const clearFavorites = useCallback(() => {
    localStorage.removeItem('user_favorites');
    setFavorites([]);
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites,
    favoriteCount: favorites.length
  };
};

export default useFavorites;
