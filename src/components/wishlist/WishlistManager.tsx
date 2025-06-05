
import React, { useState, useEffect } from 'react';
import { Heart, Share2, Trash2, ExternalLink, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useFavorites from '@/hooks/useFavorites';
import { useNavigate } from 'react-router-dom';

interface WishlistManagerProps {
  className?: string;
}

const WishlistManager: React.FC<WishlistManagerProps> = ({ className }) => {
  const { favorites, removeFromFavorites, clearFavorites, favoriteCount } = useFavorites();
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const serviceItems = favorites.filter(item => item.type === 'service');
  const providerItems = favorites.filter(item => item.type === 'provider');

  const handleShare = async () => {
    const shareData = {
      title: 'הרשימת המועדפים שלי מתכלס',
      text: `בדוק את ${favoriteCount} הפריטים המועדפים שלי!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // יכול להוסיף toast notification כאן
    }
  };

  const handleViewItem = (item: any) => {
    if (item.type === 'service') {
      navigate(`/service/${item.id}`);
    } else {
      navigate(`/provider/${item.id}`);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('he-IL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (favoriteCount === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Heart className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            עדיין לא הוספת פריטים למועדפים
          </h3>
          <p className="text-gray-500 text-center mb-6">
            התחל לחפש שירותים וספקים והוסף אותם למועדפים כדי לשמור עליהם למועד מאוחר יותר
          </p>
          <Button onClick={() => navigate('/search')}>
            התחל חיפוש
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-current" />
              רשימת המועדפים שלי
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {favoriteCount} פריטים במועדפים
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 ml-1" />
              שתף
            </Button>
            <Button variant="outline" size="sm" onClick={clearFavorites}>
              <Trash2 className="h-4 w-4 ml-1" />
              נקה הכל
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">הכל ({favoriteCount})</TabsTrigger>
            <TabsTrigger value="services">שירותים ({serviceItems.length})</TabsTrigger>
            <TabsTrigger value="providers">ספקים ({providerItems.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <div className="space-y-3">
              {favorites.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.type === 'service' ? 'שירות' : 'ספק'}
                      </Badge>
                    </div>
                    {item.provider && (
                      <p className="text-sm text-gray-600">מאת: {item.provider}</p>
                    )}
                    {item.price && (
                      <p className="text-sm font-medium text-green-600">
                        ₪{item.price.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      נוסף ב-{formatDate(item.addedAt)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewItem(item)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeFromFavorites(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="mt-4">
            {serviceItems.length > 0 ? (
              <div className="space-y-3">
                {serviceItems.map((service) => (
                  <div key={service.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    {service.imageUrl && (
                      <img 
                        src={service.imageUrl} 
                        alt={service.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{service.name}</h3>
                      {service.provider && (
                        <p className="text-sm text-gray-600">מאת: {service.provider}</p>
                      )}
                      {service.price && (
                        <p className="text-sm font-medium text-green-600">
                          ₪{service.price.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewItem(service)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromFavorites(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">אין שירותים במועדפים</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="providers" className="mt-4">
            {providerItems.length > 0 ? (
              <div className="space-y-3">
                {providerItems.map((provider) => (
                  <div key={provider.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    {provider.imageUrl && (
                      <img 
                        src={provider.imageUrl} 
                        alt={provider.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{provider.name}</h3>
                      <p className="text-xs text-gray-500">
                        נוסף ב-{formatDate(provider.addedAt)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewItem(provider)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromFavorites(provider.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">אין ספקים במועדפים</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <Alert className="mt-4">
          <Heart className="h-4 w-4" />
          <AlertDescription>
            <strong>טיפ:</strong> שתף את רשימת המועדפים שלך עם חברים או משפחה כדי לקבל דעה נוספת לפני ההזמנה.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default WishlistManager;
