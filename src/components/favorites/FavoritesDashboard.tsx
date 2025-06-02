
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useFavorites from '@/hooks/useFavorites';

const FavoritesDashboard = () => {
  const { favorites, removeFromFavorites, clearFavorites, favoriteCount } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('he-IL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Heart className="h-4 w-4 ml-1" />
          המועדפים שלי
          {favoriteCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {favoriteCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>המועדפים שלי ({favoriteCount})</span>
            {favoriteCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFavorites}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                נקה הכל
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">עדיין לא הוספת מועדפים</p>
              <p className="text-sm text-gray-400 mt-2">
                לחץ על הלב בכרטיסי השירותים להוספתם למועדפים
              </p>
            </div>
          ) : (
            favorites.map((favorite) => (
              <Card key={favorite.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromFavorites(favorite.id)}
                  className="absolute top-2 left-2 h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </Button>

                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {favorite.imageUrl && (
                      <img 
                        src={favorite.imageUrl}
                        alt={favorite.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 truncate">
                        {favorite.name}
                      </h4>
                      
                      {favorite.provider && (
                        <p className="text-xs text-blue-600 mb-1">
                          {favorite.provider}
                        </p>
                      )}
                      
                      {favorite.price && (
                        <p className="text-sm font-bold text-gray-900 mb-2">
                          ₪{favorite.price.toLocaleString()}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {favorite.type === 'service' ? 'שירות' : 'ספק'}
                        </Badge>
                        
                        <Link 
                          to={favorite.type === 'service' ? `/service/${favorite.id}` : `/provider/${favorite.id}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Button size="sm" variant="outline" className="h-6 text-xs">
                            <ExternalLink className="h-3 w-3 ml-1" />
                            צפה
                          </Button>
                        </Link>
                      </div>
                      
                      <p className="text-xs text-gray-400 mt-2">
                        נוסף ב-{formatDate(favorite.addedAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FavoritesDashboard;
